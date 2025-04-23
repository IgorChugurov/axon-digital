// src/utils/getClientIp.ts
import { getClientIp } from "request-ip";
import { NextRequest } from "next/server";

export function extractClientIp(req: NextRequest): string {
  const ip = getClientIp({
    headers: Object.fromEntries(req.headers.entries()),
    connection: {},
  } as any);

  return ip || "unknown";
}
