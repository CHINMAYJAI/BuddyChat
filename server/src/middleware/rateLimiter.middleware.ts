import rateLimit from "express-rate-limit";
import type { RateLimitRequestHandler } from "express-rate-limit";

let firstHitTime: number | null = null;

const remainingTime = (): number => {
  const now: number = Date.now();
  if (!firstHitTime) {
    firstHitTime = now;
  }

  const unlockTime: number = firstHitTime + 10 * 60 * 1000; // 10 minutes
  const diffMs: number = unlockTime - now;

  return Math.max(Math.ceil(diffMs / 60000), 0);
};

export const googleCallbackRateLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minute
  limit: 100, // 100 requests per window
  message: `Limit is reached...\nTry again in ${remainingTime()} minutes`,
  statusCode: 429,
});
