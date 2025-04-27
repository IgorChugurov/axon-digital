import { RateLimiterMemory, RateLimiterRedis } from "rate-limiter-flexible";
import Redis from "ioredis";
import { RATE_LIMIT } from "@/config/rateLimitConfig";

const isProd = false; //process.env.NODE_ENV === "production"; // теперь правильно

export function createRateLimiter(points: number, duration: number) {
  return isProd
    ? new RateLimiterRedis({
        storeClient: new Redis({
          host: process.env.REDIS_HOST || "127.0.0.1",
          port: parseInt(process.env.REDIS_PORT || "6379", 10),
          enableOfflineQueue: false,
        }),
        keyPrefix: "rlflx",
        points,
        duration,
      })
    : new RateLimiterMemory({
        points,
        duration,
      });
}

// Основной лимитер сайта по умолчанию
export const defaultRateLimiter = createRateLimiter(
  RATE_LIMIT.SHORT_TERM.points,
  RATE_LIMIT.SHORT_TERM.duration
);
