import crypto from "node:crypto";
import fsp from "node:fs/promises";
import { createRedis } from "../src/keys/redisClient.js";
import type { ApiKeyRecord } from "../src/keys/types.js";

const sha256Hex = (input: string): string =>
  crypto.createHash("sha256").update(input, "utf8").digest("hex");

const param = (name: string, def?: string) => {
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
  const key = param("key");
  const keyHashParam = param("keyHash");
  const jsonPath = param("json", "./storage/pdf/api-keys.json")!;
  const redisUrl = param("redis");
  if (!key && !keyHashParam) throw new Error("Provide --key or --keyHash");
  const keyHash = keyHashParam || sha256Hex(key!);

  // JSON update
  try {
    const txt = await fsp.readFile(jsonPath, "utf-8");
    const list = JSON.parse(txt) as ApiKeyRecord[];
    const idx = list.findIndex((r) => r.keyHash === keyHash);
    if (idx >= 0) {
      list[idx].disabled = true;
      await fsp.writeFile(jsonPath, JSON.stringify(list, null, 2));
    }
  } catch {}

  if (redisUrl) {
    const r = await createRedis(redisUrl);
    await r.hSet(`pdf:apikey:${keyHash}`, { disabled: "true" });
    await r.sRem("pdf:apikeys", keyHash);
    await r.quit();
  }

  // eslint-disable-next-line no-console
  console.log(`revoked ${keyHash}`);
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
