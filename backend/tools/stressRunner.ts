/*
  Stress test runner for PDF service
  Usage:
    N_REQUESTS=300 N_CONCURRENCY=50 BASE_URL=http://localhost:3001 API_KEY=dev_local_key ts-node backend/tools/stressRunner.ts
*/
import os from "node:os";
import process from "node:process";
import axios, { AxiosInstance } from "axios";

interface SubmitResp {
  jobId: string;
  status: string;
}

interface StatusDoneResp {
  status: "done" | "error" | "queued" | "processing";
  fileName?: string;
  downloadUrl?: string;
  expiresAt?: string;
  error?: string;
}

interface Metrics {
  submitted: number;
  submitFailed: number;
  completed: number;
  errored: number;
  timedOut: number;
  downloaded: number;
  downloadFailed: number;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const TOTAL_REQUESTS = Number(process.env.N_REQUESTS || 200);
const CONCURRENCY = Number(process.env.N_CONCURRENCY || os.cpus().length * 4);
const BASE_URL = String(process.env.BASE_URL || "http://localhost:3001");
const API_KEY = String(process.env.API_KEY || "dev_local_key");
const STATUS_INTERVAL_MS = Number(process.env.STATUS_INTERVAL_MS || 300);
const STATUS_TIMEOUT_MS = Number(process.env.STATUS_TIMEOUT_MS || 60_000);

const createClient = (): AxiosInstance =>
  axios.create({
    baseURL: BASE_URL,
    timeout: 30_000,
    headers: { "x-api-key": API_KEY },
    validateStatus: () => true,
  });

async function submitJob(
  client: AxiosInstance,
  label: string,
): Promise<string> {
  const maxRetries = Number(process.env.SUBMIT_MAX_RETRIES || 30);
  let attempt = 0;
  while (true) {
    // eslint-disable-next-line no-console
    console.log(`[${label}] submitting job (attempt ${attempt + 1})`);
    const body = {
      html: "<p>Test</p>",
      css: "",
      fileName: `document-${Date.now()}.pdf`,
    };
    const resp = await client.post<SubmitResp>("/v1/jobs/pdf", body);
    if (resp.status === 202 && resp.data?.jobId) {
      // eslint-disable-next-line no-console
      console.log(`[${label}] submitted -> jobId=${resp.data.jobId}`);
      return resp.data.jobId;
    }
    if (resp.status === 429 || resp.status === 503) {
      attempt += 1;
      if (attempt >= maxRetries) {
        throw new Error(`submit_failed:${resp.status}`);
      }
      const backoff = Math.min(2000, 100 + attempt * 100);
      // eslint-disable-next-line no-console
      console.log(
        `[${label}] throttled (${resp.status}), retry in ${backoff}ms`,
      );
      await sleep(backoff);
      continue;
    }
    throw new Error(`submit_failed:${resp.status}`);
  }
}

async function waitForCompletion(
  client: AxiosInstance,
  jobId: string,
  label: string,
): Promise<StatusDoneResp> {
  const start = Date.now();
  let attempt = 0;
  let lastStatus = "";
  while (Date.now() - start <= STATUS_TIMEOUT_MS) {
    const resp = await client.get<StatusDoneResp>(`/v1/jobs/${jobId}`);
    if (resp.status === 200) {
      if (resp.data.status !== lastStatus) {
        lastStatus = resp.data.status;
        // eslint-disable-next-line no-console
        console.log(
          `[${label}] poll#${attempt} status=${resp.data.status} elapsed=${
            Date.now() - start
          }ms`,
        );
      }
      if (resp.data.status === "done" || resp.data.status === "error") {
        return resp.data;
      }
    } else if (resp.status === 404) {
      throw new Error("status_not_found");
    }
    attempt += 1;
    await sleep(STATUS_INTERVAL_MS);
  }
  throw new Error("status_timeout");
}

async function downloadPdf(
  client: AxiosInstance,
  urlPath: string,
  label: string,
) {
  // eslint-disable-next-line no-console
  console.log(`[${label}] downloading ${urlPath}`);
  const resp = await client.get<ArrayBuffer>(urlPath, {
    responseType: "arraybuffer",
  });
  if (resp.status !== 200) throw new Error(`download_status_${resp.status}`);
  const ctype = String(resp.headers["content-type"] || "");
  if (!ctype.includes("application/pdf")) throw new Error("not_pdf");
  const bytes = resp.data.byteLength || 0;
  // eslint-disable-next-line no-console
  console.log(`[${label}] downloaded ${bytes} bytes`);
  return bytes;
}

async function run() {
  const client = createClient();
  const startedAt = Date.now();
  const metrics: Metrics = {
    submitted: 0,
    submitFailed: 0,
    completed: 0,
    errored: 0,
    timedOut: 0,
    downloaded: 0,
    downloadFailed: 0,
  };

  const inFlight: Promise<void>[] = [];
  let nextIndex = 0;

  const worker = async () => {
    while (true) {
      const idx = nextIndex++;
      if (idx >= TOTAL_REQUESTS) return;
      const label = `${idx + 1}/${TOTAL_REQUESTS}`;
      try {
        const jobId = await submitJob(client, label);
        metrics.submitted += 1;
        const status = await waitForCompletion(client, jobId, label);
        if (status.status === "done" && status.downloadUrl) {
          metrics.completed += 1;
          try {
            await downloadPdf(client, status.downloadUrl, label);
            metrics.downloaded += 1;
          } catch {
            // eslint-disable-next-line no-console
            console.log(`[${label}] download failed`);
            metrics.downloadFailed += 1;
          }
        } else if (status.status === "error") {
          // eslint-disable-next-line no-console
          console.log(`[${label}] job error: ${status.error || "unknown"}`);
          metrics.errored += 1;
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        // eslint-disable-next-line no-console
        console.log(`[${label}] failed: ${msg}`);
        if (msg === "status_timeout") metrics.timedOut += 1;
        else metrics.submitFailed += 1;
      }
    }
  };

  const workers = Math.min(CONCURRENCY, TOTAL_REQUESTS);
  for (let i = 0; i < workers; i += 1) inFlight.push(worker());
  await Promise.all(inFlight);

  const durationMs = Date.now() - startedAt;
  const rps = (metrics.submitted / (durationMs / 1000)).toFixed(2);
  // eslint-disable-next-line no-console
  console.log("\n=== Stress Test Report ===");
  // eslint-disable-next-line no-console
  console.log(
    `Total: ${TOTAL_REQUESTS}, Concurrency: ${CONCURRENCY}, Duration: ${durationMs} ms, Submit RPS: ${rps}`,
  );
  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify(
      {
        submitted: metrics.submitted,
        submitFailed: metrics.submitFailed,
        completed: metrics.completed,
        errored: metrics.errored,
        timedOut: metrics.timedOut,
        downloaded: metrics.downloaded,
        downloadFailed: metrics.downloadFailed,
      },
      null,
      2,
    ),
  );
}

run().catch((e) => {
  // eslint-disable-next-line no-console
  console.error("Stress test failed:", e);
  process.exit(1);
});
