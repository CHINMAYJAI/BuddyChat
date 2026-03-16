import type { RateLimitRequestHandler } from "express-rate-limit";
import rateLimit from "express-rate-limit";
import { config } from "../utils/index.utils.js";

let firstHitTime: number | null = null;

const remainingTime = (): number => {
    const now: number = Date.now();
    if (!firstHitTime) {
        firstHitTime = now;
    }

    const unlockTime: number =
        firstHitTime + Number(config.rateLimiter.WINDOW_MS);
    const diffMs: number = unlockTime - now;

    return Math.max(Math.ceil(diffMs / 60000), 0);
};

export const googleCallbackRateLimiter: RateLimitRequestHandler = rateLimit({
    windowMs: Number(config.rateLimiter.WINDOW_MS),
    limit: Number(config.rateLimiter.REQUEST_PER_WINDOW),
    message: `Limit is reached...\nTry again in ${remainingTime()} minutes`,
    statusCode: 429,
});
