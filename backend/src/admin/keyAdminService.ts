import crypto from "node:crypto";
import fsp from "node:fs/promises";
import path from "node:path";
import { createRedis } from "../keys/redisClient.js";
import type { ApiKeyRecord } from "../keys/types.js";

const sha256Hex = (input: string): string =>
  crypto.createHash("sha256").update(input, "utf8").digest("hex");

export class KeyAdminService {
  private redisUrl?: string;
  private jsonPath: string;

  constructor(opts: { redisUrl?: string; jsonPath: string }) {
    this.redisUrl = opts.redisUrl;
    this.jsonPath = opts.jsonPath;
  }

  async syncFromJsonToRedis(): Promise<void> {
    if (!this.redisUrl) return;
    let list: ApiKeyRecord[] = [];
    try {
      const txt = await fsp.readFile(this.jsonPath, "utf-8");
      list = JSON.parse(txt) as ApiKeyRecord[];
    } catch {
      list = [];
    }
    const r = await createRedis(this.redisUrl);
    try {
      const existing = new Set(await r.sMembers("pdf:apikeys"));
      const fileSet = new Set<string>();
      for (const rec of list) {
        fileSet.add(rec.keyHash);
        await r.hSet(`pdf:apikey:${rec.keyHash}`, {
          owner: rec.owner,
          createdAt: rec.createdAt,
          expiresAt: rec.expiresAt,
          disabled: String(!!rec.disabled),
          last4: rec.last4,
        });
        await r.sAdd("pdf:apikeys", rec.keyHash);
      }
      // remove hashes that are not present in file
      for (const h of existing) {
        if (!fileSet.has(h)) {
          await r.del(`pdf:apikey:${h}`);
          await r.sRem("pdf:apikeys", h);
        }
      }
    } finally {
      await r.quit();
    }
  }

  async list(): Promise<ApiKeyRecord[]> {
    // File is source of truth: list from JSON to include disabled keys as well
    try {
      const txt = await fsp.readFile(this.jsonPath, "utf-8");
      const list = JSON.parse(txt) as ApiKeyRecord[];
      const arr = Array.isArray(list) ? list : [];
      return arr.sort(
        (a, b) =>
          Date.parse(b.createdAt || "0") - Date.parse(a.createdAt || "0"),
      );
    } catch {
      return [];
    }
  }

  async create(
    owner: string,
    days?: number,
    noExpiry?: boolean,
  ): Promise<{ key: string; record: ApiKeyRecord }> {
    const now = new Date();
    const expiresAt = noExpiry
      ? new Date("9999-12-31T00:00:00.000Z")
      : new Date(now.getTime() + (Number(days) || 90) * 86400_000);

    const raw = crypto.randomBytes(24).toString("base64url");
    const keyHash = sha256Hex(raw);
    const last4 = raw.slice(-4);

    const rec: ApiKeyRecord = {
      keyHash,
      last4,
      owner,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      disabled: false,
    };

    await fsp.mkdir(path.dirname(this.jsonPath), { recursive: true });
    let list: ApiKeyRecord[] = [];
    try {
      const txt = await fsp.readFile(this.jsonPath, "utf-8");
      list = JSON.parse(txt) as ApiKeyRecord[];
    } catch {}
    list.push(rec);
    await fsp.writeFile(this.jsonPath, JSON.stringify(list, null, 2));

    if (this.redisUrl) {
      const r = await createRedis(this.redisUrl);
      try {
        await r.hSet(`pdf:apikey:${keyHash}`, {
          owner: rec.owner,
          createdAt: rec.createdAt,
          expiresAt: rec.expiresAt,
          disabled: String(!!rec.disabled),
          last4: rec.last4,
        });
        await r.sAdd("pdf:apikeys", keyHash);
      } finally {
        await r.quit();
      }
    }

    return { key: raw, record: rec };
  }

  async revokeByKeyOrHash(params: {
    key?: string;
    keyHash?: string;
  }): Promise<string> {
    const keyHash =
      params.keyHash || (params.key ? sha256Hex(params.key) : undefined);
    if (!keyHash) throw new Error("Provide key or keyHash");

    // JSON update
    try {
      const txt = await fsp.readFile(this.jsonPath, "utf-8");
      const list = JSON.parse(txt) as ApiKeyRecord[];
      const idx = list.findIndex((r) => r.keyHash === keyHash);
      if (idx >= 0) {
        list[idx].disabled = true;
        await fsp.writeFile(this.jsonPath, JSON.stringify(list, null, 2));
      }
    } catch {}

    if (this.redisUrl) {
      const r = await createRedis(this.redisUrl);
      try {
        await r.hSet(`pdf:apikey:${keyHash}`, { disabled: "true" });
        // keep membership; listing is based on file, not Redis
      } finally {
        await r.quit();
      }
    }

    return keyHash;
  }

  async deleteByHash(keyHash: string): Promise<void> {
    if (!keyHash) throw new Error("Provide keyHash");
    // JSON remove
    try {
      const txt = await fsp.readFile(this.jsonPath, "utf-8");
      const list = JSON.parse(txt) as ApiKeyRecord[];
      const next = list.filter((r) => r.keyHash !== keyHash);
      await fsp.writeFile(this.jsonPath, JSON.stringify(next, null, 2));
    } catch {}

    if (this.redisUrl) {
      const r = await createRedis(this.redisUrl);
      try {
        await r.del(`pdf:apikey:${keyHash}`);
        await r.sRem("pdf:apikeys", keyHash);
      } finally {
        await r.quit();
      }
    }
  }
}
