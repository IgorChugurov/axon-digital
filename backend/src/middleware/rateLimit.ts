import type { Request, Response, NextFunction } from "express";
import type { ServiceConfig } from "../config.js";

interface BucketState {
  windowStart: number;
  count: number;
}

const buckets = new Map<string, BucketState>();

export const rateLimitMiddleware = (config: ServiceConfig) => {
  const windowMs = 60_000; // 1 minute
  return (req: Request, res: Response, next: NextFunction) => {
    const apiKey: string | undefined = (req as any).apiKey;
    if (!apiKey) {
      return res.status(401).json({ error: "unauthorized" });
    }
    const now = Date.now();
    const state = buckets.get(apiKey);
    if (!state) {
      buckets.set(apiKey, { windowStart: now, count: 1 });
      return next();
    }
    if (now - state.windowStart >= windowMs) {
      state.windowStart = now;
      state.count = 0;
    }
    state.count += 1;
    if (state.count > config.rateLimitQpm) {
      return res
        .status(429)
        .json({
          error: "rate_limited",
          retryAfterMs: windowMs - (now - state.windowStart),
        });
    }
    next();
  };
};
