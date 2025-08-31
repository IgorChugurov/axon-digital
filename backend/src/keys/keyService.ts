import crypto from "node:crypto";
import fsp from "node:fs/promises";
import { createRedis } from "./redisClient.js";
import type { RedisClientType } from "redis";
import type { ApiKeyRecord } from "./types.js";

const sha256Hex = (input: string): string =>
  crypto.createHash("sha256").update(input, "utf8").digest("hex");

export class KeyService {
  private redis?: RedisClientType<any, any, any>;
  private jsonPath?: string;
  private memoryApiKeys = new Set<string>();
  private cache = new Map<string, { ok: boolean; exp: number }>();

  constructor(opts: { redisUrl?: string; jsonPath?: string }) {
    this.jsonPath = opts.jsonPath;
    if (opts.redisUrl) {
      // no await here; call init() explicitly to connect
    }
  }

  async init(redisUrl?: string): Promise<void> {
    if (redisUrl) {
      this.redis = await createRedis(redisUrl);
    }
  }

  async validate(rawKey: string): Promise<boolean> {
    if (!rawKey) return false;
    const cached = this.cache.get(rawKey);
    const now = Date.now();
    if (cached && cached.exp > now) return cached.ok;

    const h = sha256Hex(rawKey);
    // redis path
    if (this.redis) {
      const keyHash = `pdf:apikey:${h}`;
      const rec = await this.redis.hGetAll(keyHash);
      if (rec && Object.keys(rec).length > 0) {
        const disabled = rec.disabled === "true";
        const expiresAt = rec.expiresAt
          ? Date.parse(rec.expiresAt)
          : Number.POSITIVE_INFINITY;
        const ok = !disabled && Date.now() < expiresAt;
        this.cache.set(rawKey, { ok, exp: now + 3000 });
        return ok;
      }
    }

    // json fallback (hashes)
    if (this.jsonPath) {
      try {
        const txt = await fsp.readFile(this.jsonPath, "utf-8");
        const list = JSON.parse(txt) as ApiKeyRecord[];
        const rec = list.find((r) => r.keyHash === h);
        if (rec) {
          const exp = rec.expiresAt
            ? Date.parse(rec.expiresAt)
            : Number.POSITIVE_INFINITY;
          const ok = !rec.disabled && Date.now() < exp;
          this.cache.set(rawKey, { ok, exp: now + 3000 });
          return ok;
        }
      } catch {}
    }

    this.cache.set(rawKey, { ok: false, exp: now + 3000 });
    return false;
  }
}
