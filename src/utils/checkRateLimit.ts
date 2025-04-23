import rateLimiter from "./rateLimiter";

export async function checkRateLimit(ip: string): Promise<
  | { ok: true }
  | {
      ok: false;
      status: number;
      headers: HeadersInit;
      body: string;
    }
> {
  try {
    await rateLimiter.consume(ip);
    return { ok: true };
  } catch (rateLimiterRes: any) {
    const retryAfter = Math.ceil(rateLimiterRes.msBeforeNext / 1000);
    const headers: HeadersInit = {
      "Retry-After": retryAfter.toString(),
      "X-RateLimit-Limit": String(
        rateLimiterRes.remainingPoints + rateLimiterRes.consumedPoints
      ),
      "X-RateLimit-Remaining": String(rateLimiterRes.remainingPoints),
      "X-RateLimit-Reset": String(
        Math.ceil(Date.now() + rateLimiterRes.msBeforeNext) / 1000
      ),
    };

    return {
      ok: false,
      status: 429,
      headers,
      body: "Too many requests",
    };
  }
}
