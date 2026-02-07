import crypto from "crypto";
import { redisConnectionDB } from "../../lib/db/redis.db.js";
import { Router } from "express";
import type { Router as ExpressRouter, Request, Response } from "express";
import { googleClient } from "../../lib/auth/googleOAuth.auth.lib.js";
import { config } from "../../utils/validateEnvVariables.utils.js";

const googleAuthRouter: ExpressRouter = Router();

googleAuthRouter.get(
  "/google",
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const state = crypto.randomBytes(16).toString("hex");
      const redisClient = await redisConnectionDB();
      await redisClient.setEx(`oauth_state:${state}`, Number(config.oauth.STATE_TTL_SECONDS), "valid");

      const url = googleClient.generateAuthUrl({
        access_type: "offline", // refresh token
        scope: ["openid", "profile", "email"], // info that app wants

        prompt: "consent select_account", // Ask the user to choose a Google account and show the permission screen again so we can get a refresh token for long-lasting login.
        redirect_uri: config.googleOAuth.REDIRECT_URI,
        state,
      });

      res.redirect(url);
    } catch (error) {
      console.error("Google OAuth URL generation error: ", error);
      res.status(500).json({ error: "Failed to generate Google OAuth URL" });
    }
  },
);

export default googleAuthRouter;
