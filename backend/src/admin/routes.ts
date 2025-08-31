import express, { type Request, type Response } from "express";
import type { ServiceConfig } from "../config.js";
import { adminAuthMiddleware } from "../middleware/adminAuth.js";
import { KeyAdminService } from "./keyAdminService.js";
import { LogsService } from "./logsService.js";
import type {
  CreateKeyBody,
  CreateKeyResponse,
  ListKeysResponse,
  RevokeKeyBody,
  DeleteKeyBody,
} from "./types.js";

export const adminRouter = (config: ServiceConfig) => {
  const router = express.Router();
  const auth = adminAuthMiddleware(config);
  const keyService = new KeyAdminService({
    redisUrl: config.redisUrl,
    jsonPath: config.keysJsonPath,
  });
  const logs = new LogsService(config.requestLogPath);
  const errLogs = new LogsService(config.errorLogPath);

  // list keys
  router.get("/keys", auth, async (_req: Request, res: Response) => {
    const list = await keyService.list();
    return res.json(list satisfies ListKeysResponse);
  });

  // create key
  router.post("/keys", auth, async (req: Request, res: Response) => {
    const body = req.body as CreateKeyBody | undefined;
    if (!body || !body.owner)
      return res.status(400).json({ error: "invalid_body" });
    const { key, record } = await keyService.create(
      body.owner,
      body.days,
      body.noExpiry,
    );
    const resp: CreateKeyResponse = {
      owner: record.owner,
      key,
      last4: record.last4,
      expiresAt: record.expiresAt,
    };
    return res.status(201).json(resp);
  });

  // revoke
  router.post("/keys/revoke", auth, async (req: Request, res: Response) => {
    const body = req.body as RevokeKeyBody | undefined;
    if (!body || (!body.key && !body.keyHash)) {
      return res.status(400).json({ error: "invalid_body" });
    }
    try {
      const hash = await keyService.revokeByKeyOrHash({
        key: body.key,
        keyHash: body.keyHash,
      });
      return res.json({ ok: true, keyHash: hash });
    } catch (e) {
      return res.status(400).json({ error: (e as Error).message });
    }
  });

  // delete
  router.post("/keys/delete", auth, async (req: Request, res: Response) => {
    const body = req.body as DeleteKeyBody | undefined;
    if (!body || !body.keyHash)
      return res.status(400).json({ error: "invalid_body" });
    try {
      await keyService.deleteByHash(body.keyHash);
      return res.json({ ok: true });
    } catch (e) {
      return res.status(400).json({ error: (e as Error).message });
    }
  });

  // logs tail
  router.get("/logs", auth, async (req: Request, res: Response) => {
    const bytesParam = req.query.bytes as string | undefined;
    const bytes = bytesParam ? Number(bytesParam) : undefined;
    const text = await logs.tail(bytes ?? 50_000);
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.send(text);
  });

  // logs as JSON records (newest first)
  router.get("/logs/list", auth, async (req: Request, res: Response) => {
    const limitParam = req.query.limit as string | undefined;
    const bytesParam = req.query.bytes as string | undefined;
    const limit = limitParam ? Number(limitParam) : 200;
    const bytes = bytesParam ? Number(bytesParam) : 200_000;
    const items = await logs.tailJson(limit, bytes);
    return res.json(items);
  });

  // error logs (plain)
  router.get("/error-logs", auth, async (req: Request, res: Response) => {
    const bytesParam = req.query.bytes as string | undefined;
    const bytes = bytesParam ? Number(bytesParam) : undefined;
    const text = await errLogs.tail(bytes ?? 50_000);
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.send(text);
  });

  // error logs as JSON (newest first)
  router.get("/error-logs/list", auth, async (req: Request, res: Response) => {
    const limitParam = req.query.limit as string | undefined;
    const bytesParam = req.query.bytes as string | undefined;
    const limit = limitParam ? Number(limitParam) : 200;
    const bytes = bytesParam ? Number(bytesParam) : 200_000;
    const items = await errLogs.tailJson(limit, bytes);
    return res.json(items);
  });

  return router;
};
