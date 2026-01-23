import { Router } from "express";
import type { Router as ExpressRouter, Request, Response } from "express";
import { googleClient } from "../../lib/auth/googleOAuth.auth.lib.js";
import { config } from "../../utils/validateEnvVariables.utils.js";

const googleAuthRouter: ExpressRouter = Router();

googleAuthRouter.get("/google", (_req: Request, res: Response): void => {
  try {
    const url = googleClient.generateAuthUrl({
      access_type: "offline", // refresh token
      scope: ["openid", "profile", "email"], // info that app wants
      prompt: "consent",
      redirect_uri: config.googleOAuth.REDIRECT_URI,
    });

    res.redirect(url);
  } catch (error) {
    console.error("Google OAuth URL generation error: ", error);
    res.status(500).json({ error: "Failed to generate Google OAuth URL" });
  }
});

export default googleAuthRouter;
