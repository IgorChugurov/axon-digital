import dotenv from "dotenv";

dotenv.config();

const numberFromEnv = (key: string, def: number): number => {
  const v = process.env[key];
  if (!v) return def;
  const parsed = Number(v);
  return Number.isFinite(parsed) ? parsed : def;
};

export interface ServiceConfig {
  port: number;
  apiKeys: Set<string>;
  rateLimitQpm: number;
  bodyLimitMb: number;
  concurrency: number;
  renderTimeoutMs: number;
  storageDir: string;
  requestLogPath: string;
  errorLogPath: string;
  accessLogDisabled: boolean;
  redisUrl: string; // required
  keysJsonPath: string; // hardcoded default path
  adminToken?: string;
  authDisabled: boolean; // allow bypassing auth for local tests
  tokenTtlMs: number;
  jobTtlMs: number;
  maxPdfBytes: number;
  maxQueue: number;
  deleteAfterDownload: boolean;
  fileRetentionMs: number;
  // test-only controls
  testFixedContentEnabled: boolean;
  testArtificialDelayMs: number;
}

export const loadConfig = (): ServiceConfig => {
  const apiKeys = new Set<string>();

  return {
    port: numberFromEnv("PORT", 3001),
    apiKeys,
    rateLimitQpm: numberFromEnv("RATE_LIMIT_QPM", 60),
    bodyLimitMb: numberFromEnv("BODY_LIMIT_MB", 20),
    concurrency: numberFromEnv("CONCURRENCY", 2),
    renderTimeoutMs: numberFromEnv("RENDER_TIMEOUT_MS", 60000),
    storageDir: process.env.STORAGE_DIR || "./storage/pdf",
    requestLogPath: process.env.REQUEST_LOG_PATH || "./storage/pdf/access.log",
    errorLogPath: process.env.ERROR_LOG_PATH || "./storage/pdf/error.log",
    accessLogDisabled: (process.env.ACCESS_LOG_DISABLED ?? "false") === "true",
    redisUrl: process.env.REDIS_URL || "redis://127.0.0.1:6379",
    keysJsonPath: "./storage/pdf/api-keys.json",
    adminToken: process.env.ADMIN_TOKEN || undefined,
    authDisabled: (process.env.AUTH_DISABLED ?? "false") === "true",
    tokenTtlMs: numberFromEnv("TOKEN_TTL_MS", 7_200_000),
    jobTtlMs: numberFromEnv("JOB_TTL_MS", 48 * 3600_000),
    maxPdfBytes: numberFromEnv("MAX_PDF_BYTES", 50_000_000),
    maxQueue: numberFromEnv("MAX_QUEUE", 100),
    deleteAfterDownload:
      (process.env.DELETE_AFTER_DOWNLOAD ?? "true") === "true",
    fileRetentionMs: numberFromEnv("FILE_RETENTION_MS", 48 * 3600_000),
    testFixedContentEnabled:
      (process.env.TEST_FIXED_CONTENT ?? "false") === "true",
    testArtificialDelayMs: numberFromEnv("TEST_ARTIFICIAL_DELAY_MS", 0),
  };
};
