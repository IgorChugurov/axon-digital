import crypto from "node:crypto";
import fsp from "node:fs/promises";
import path from "node:path";
import { createRedis } from "../src/keys/redisClient.js";
import type { ApiKeyRecord } from "../src/keys/types.js";

const sha256Hex = (input: string): string =>
  crypto.createHash("sha256").update(input, "utf8").digest("hex");

const param = (name: string, def?: string) => {
  // supports --name=value and --name value
  const idx = process.argv.findIndex(
    (a) => a === `--${name}` || a.startsWith(`--${name}=`),
  );
  if (idx >= 0) {
    const token = process.argv[idx];
    if (token.includes("=")) return token.split("=")[1];
    const next = process.argv[idx + 1];
    if (next && !next.startsWith("--")) return next;
  }
  return process.env[name.toUpperCase()] || def;
};

async function main() {
  const owner = param("owner") || "unknown";
  const daysStr = param("days", "90")!;
  const noExpiry =
    param("no-expiry") === "true" || param("noExpiry") === "true";
  const jsonPath = param("json", "./storage/pdf/api-keys.json")!;
  const redisUrl = param("redis");

  const days = Number(daysStr);
  const now = new Date();
  const expiresAt = noExpiry
    ? new Date("9999-12-31T00:00:00.000Z")
    : new Date(now.getTime() + days * 86400_000);

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

  await fsp.mkdir(path.dirname(jsonPath), { recursive: true });
  let list: ApiKeyRecord[] = [];
  try {
    const txt = await fsp.readFile(jsonPath, "utf-8");
    list = JSON.parse(txt) as ApiKeyRecord[];
  } catch {}
  list.push(rec);
  await fsp.writeFile(jsonPath, JSON.stringify(list, null, 2));

  if (redisUrl) {
    const r = await createRedis(redisUrl);
    await r.hSet(`pdf:apikey:${keyHash}`, {
      owner: rec.owner,
      createdAt: rec.createdAt,
      expiresAt: rec.expiresAt,
      disabled: String(!!rec.disabled),
      last4: rec.last4,
    });
    await r.sAdd("pdf:apikeys", keyHash);
    await r.quit();
  }

  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify(
      { owner, key: raw, last4, expiresAt: rec.expiresAt },
      null,
      2,
    ),
  );
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
