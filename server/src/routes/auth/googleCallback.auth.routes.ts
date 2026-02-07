import { redisConnectionDB } from "../../lib/db/redis.db.js";
import { Router } from "express";
import type { Router as ExpressRouter, Request, Response } from "express";
import { handleGoogleCallback } from "../../services/auth/index.auth.service.js";
import { googleCallbackRateLimiter } from "../../middleware/rateLimiter.middleware.js";
import { config } from "../../utils/validateEnvVariables.utils.js";

const googleCallbackRouter: ExpressRouter = Router();

googleCallbackRouter.get(
  "/google/callback",
  googleCallbackRateLimiter,
  async (req: Request, res: Response) => {
    const { code, state } = req.query as { code?: string; state?: string };

    // validate state
    if (!state || typeof state !== "string") {
      return res
        .status(403)
        .json({ error: "CSRF validation failed: missing state" });
    }

    const redisClient = await redisConnectionDB();

    const storedState = await redisClient.get(`oauth_state:${state}`);
    if (!storedState)
      return res.status(403).json({ error: "CSRF validation failed" });

    // single-use
    await redisClient.del(`oauth_state:${state}`);

    // Reject anything that is not a valid OAuth callback
    if (!code || typeof code !== "string") {
      // return res.sendStatus(204);
      return res.status(400).json({ error: "Invalid OAuth callback" });
    }

    try {
      const token = await handleGoogleCallback(code);

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: config.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: Number(config.cookies.EXPIRES_IN),
      });

      return res.redirect(config.app.FRONTEND_DASHBOARD_URL);
    } catch (err) {
      console.error("Google OAuth callback error:", err);
      return res.status(401).json({ error: `Google OAuth failed : ${err}` });
    }
  },
);

export default googleCallbackRouter;
