import crypto from "node:crypto";

export interface TokenRecord {
  fileId: string;
  fileName: string;
  expAt: number;
  used: boolean;
  apiKey?: string;
}

export class TokenService {
  private tokens = new Map<string, TokenRecord>();
  private ttlMs: number;

  constructor(ttlMs: number) {
    this.ttlMs = ttlMs;
    setInterval(() => this.cleanup(), 60_000).unref();
  }

  issue(
    fileId: string,
    fileName: string,
    apiKey?: string,
  ): { token: string; expAt: number } {
    const token = crypto.randomUUID();
    const expAt = Date.now() + this.ttlMs;
    this.tokens.set(token, { fileId, fileName, expAt, used: false, apiKey });
    return { token, expAt };
  }

  consume(token: string): TokenRecord | null {
    const rec = this.tokens.get(token);
    if (!rec) return null;
    const now = Date.now();
    if (rec.used || rec.expAt < now) return null;
    rec.used = true;
    return rec;
  }

  private cleanup() {
    const now = Date.now();
    for (const [t, rec] of this.tokens) {
      if (rec.used || rec.expAt < now) this.tokens.delete(t);
    }
  }
}
