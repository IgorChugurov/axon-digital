import { createRedis } from "../src/keys/redisClient.js";
import fsp from "node:fs/promises";
import type { ApiKeyRecord } from "../src/keys/types.js";

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

async function fromRedis(redisUrl: string) {
  const r = await createRedis(redisUrl);
  const hashes = await r.sMembers("pdf:apikeys");
  const items = await Promise.all(
    hashes.map(async (h) => ({
      h,
      fields: await r.hGetAll(`pdf:apikey:${h}`),
    })),
  );
  await r.quit();
  return items.map((it) => ({
    keyHash: it.h,
    owner: it.fields.owner,
    last4: it.fields.last4,
    expiresAt: it.fields.expiresAt,
    disabled: it.fields.disabled === "true",
  }));
}

async function fromJson(jsonPath: string) {
  const txt = await fsp.readFile(jsonPath, "utf-8");
  const list = JSON.parse(txt) as ApiKeyRecord[];
  return list;
}

async function main() {
  const jsonPath = param("json", "./storage/pdf/api-keys.json")!;
  const redisUrl = param("redis");
  let list: Array<{
    keyHash: string;
    owner: string;
    last4: string;
    expiresAt: string;
    disabled?: boolean;
  }>;
  if (redisUrl) list = await fromRedis(redisUrl);
  else list = await fromJson(jsonPath);

  // eslint-disable-next-line no-console
  console.table(
    list.map((x) => ({
      owner: x.owner,
      last4: x.last4,
      keyHash: x.keyHash.slice(0, 8) + "…",
      expiresAt: x.expiresAt,
      disabled: !!x.disabled,
    })),
  );
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
