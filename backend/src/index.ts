import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import fsp from "node:fs/promises";
import { loadConfig } from "./config.js";
import { corsMiddleware } from "./middleware/cors.js";
import { adminRouter } from "./admin/routes.js";
import { authMiddleware } from "./middleware/auth.js";
import { rateLimitMiddleware } from "./middleware/rateLimit.js";
import { PdfService, type PdfRequest } from "./pdfService.js";
import { LocalDiskStorage } from "./storage/localDiskStorage.js";
import { JobStore } from "./jobs/jobStore.js";
import { JobQueue } from "./jobs/jobQueue.js";
import type { CreatePdfJobInput } from "./jobs/jobTypes.js";
import { TokenService } from "./tokens/tokenService.js";
import { AccessLogger } from "./logs/accessLogger.js";
import { ErrorLogger } from "./logs/errorLogger.js";
import { KeyAdminService } from "./admin/keyAdminService.js";

const config = loadConfig();
const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: `${config.bodyLimitMb}mb` }));
app.use(corsMiddleware);

// health
app.get("/health", (_req: Request, res: Response) =>
  res.json({ status: "ok" }),
);

// (auth applied after public routes)

// Admin routes (protected by admin token only)
app.use("/v1/admin", adminRouter(config));

// expose artificial delay for PdfService (test only)
(globalThis as any).__PDF_SERVICE_TEST_DELAY_MS = config.testArtificialDelayMs;

const pdfService = new PdfService(config);
const storage = new LocalDiskStorage({ baseDir: config.storageDir });
await storage.init();
const jobStore = new JobStore({ ttlMs: config.jobTtlMs });
const jobQueue = new JobQueue({ config, jobStore, pdfService, storage });
const tokenService = new TokenService(config.tokenTtlMs);
const accessLogger = new AccessLogger(config.requestLogPath);
const errorLogger = new ErrorLogger(config.errorLogPath);
if (!config.accessLogDisabled) {
  await accessLogger.init();
}
await errorLogger.init();

// Sync Redis mirror from file at startup (file is the source of truth)
const keyAdmin = new KeyAdminService({
  redisUrl: config.redisUrl,
  jsonPath: config.keysJsonPath,
});
await keyAdmin.syncFromJsonToRedis().catch((e) => {
  // eslint-disable-next-line no-console
  console.error("Key sync failed:", e);
});

// load fixed test content if enabled
let fixedHtmlContent: string | null = null;
let fixedCssContent: string | null = null;
if (config.testFixedContentEnabled) {
  try {
    const [html, css] = await Promise.all([
      fsp.readFile(
        new URL("../doc/stress-test-content.html", import.meta.url),
        "utf-8",
      ),
      fsp.readFile(
        new URL("../doc/stress-test-content.css", import.meta.url),
        "utf-8",
      ),
    ]);
    fixedHtmlContent = html;
    fixedCssContent = css;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Failed to load fixed test content:", e);
  }
}

app.post(
  "/v1/pdf",
  authMiddleware(config),
  rateLimitMiddleware(config),
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as PdfRequest | undefined;
    if (!body || typeof body.html !== "string") {
      return res.status(400).json({ error: "invalid_body" });
    }
    try {
      const pdf = await pdfService.renderPdf({
        html: body.html,
        css: body.css,
      });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline; filename=doc.pdf");
      return res.status(200).send(Buffer.from(pdf));
    } catch (err) {
      const message = err instanceof Error ? err.message : "unknown_error";
      await errorLogger.write({
        at: new Date().toISOString().slice(0, 16),
        message,
        route: "/v1/pdf",
        method: "POST",
        status: message === "render_timeout" ? 504 : 500,
        apiKeyMasked: accessLogger.maskKey((req as any).apiKey),
        clientIp: req.ip,
        stack: err instanceof Error ? err.stack : undefined,
      });
      const status = message === "render_timeout" ? 504 : 500;
      return res.status(status).json({ error: message });
    }
  },
);

// Static serving removed; use token-protected download endpoint only

// One-time download by token validated with API key
app.get("/v1/download/:token", async (req: Request, res: Response) => {
  const apiKey = req.header("x-api-key");
  const rec = tokenService.consume(req.params.token);
  if (!rec) return res.status(410).json({ error: "expired_or_used" });
  if (rec.apiKey && apiKey !== rec.apiKey) {
    return res.status(401).json({ error: "unauthorized" });
  }
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename="${rec.fileName}"`);
  const stream = storage.createReadStream(rec.fileId);
  stream.pipe(res);
  stream.on("close", async () => {
    if (config.deleteAfterDownload) {
      await storage.delete(rec.fileId);
    }
  });
  return stream;
});

// auth + rate-limit (protected routes below)
app.use(authMiddleware(config));
app.use(rateLimitMiddleware(config));

// Submit async job
app.post("/v1/jobs/pdf", async (req: Request, res: Response) => {
  const body = req.body as Partial<CreatePdfJobInput> | undefined;
  if (!config.testFixedContentEnabled) {
    if (!body || typeof body.html !== "string") {
      return res.status(400).json({ error: "invalid_body" });
    }
  }
  if (!jobQueue.canAccept()) {
    return res.status(503).json({ error: "busy" });
  }
  const injectedHtml =
    config.testFixedContentEnabled && fixedHtmlContent
      ? fixedHtmlContent
      : body?.html || "";
  const injectedCss =
    config.testFixedContentEnabled && fixedCssContent
      ? fixedCssContent
      : body?.css;
  const injectedFileName = config.testFixedContentEnabled
    ? `document-${Date.now()}.pdf`
    : body?.fileName;

  const job = jobStore.create({
    html: injectedHtml,
    css: injectedCss,
    fileName: injectedFileName,
    apiKey: (req as any).apiKey as string,
    clientIp: req.ip,
  });
  jobQueue.enqueue(job.id, {
    html: injectedHtml,
    css: injectedCss,
    fileName: injectedFileName,
    apiKey: (req as any).apiKey as string,
    clientIp: req.ip,
  });
  return res.status(202).json({ jobId: job.id, status: "queued" });
});

// Check job status
app.get("/v1/jobs/:id", async (req: Request, res: Response) => {
  const job = jobStore.get(req.params.id);
  if (!job) return res.status(404).json({ error: "not_found" });
  if (job.status === "done" && job.fileId) {
    const { token, expAt } = tokenService.issue(
      job.fileId,
      job.fileName || "document.pdf",
    );
    const downloadUrl = `/v1/download/${token}`;
    if (!config.accessLogDisabled) {
      await accessLogger.write({
        at: new Date().toISOString().slice(0, 16),
        apiKeyMasked: accessLogger.maskKey(job.apiKey),
        clientIp: job.clientIp,
        jobId: job.id,
        fileName: job.fileName,
        status: job.status,
        durationMs: job.durationMs,
        htmlBytes: job.htmlBytes,
        pdfBytes: job.pdfBytes,
      });
    }
    return res.status(200).json({
      status: job.status,
      fileName: job.fileName,
      downloadUrl,
      expiresAt: new Date(expAt).toISOString(),
    });
  }
  return res.status(200).json({ status: job.status, error: job.error });
});

// (download route defined above, public)

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`PDF service listening on http://localhost:${config.port}`);
});

// Periodic cleanup of old files
setInterval(() => {
  storage
    .cleanupOlderThan(config.fileRetentionMs)
    // eslint-disable-next-line no-console
    .catch((e) => console.error("cleanup error", e));
}, 60_000).unref();
