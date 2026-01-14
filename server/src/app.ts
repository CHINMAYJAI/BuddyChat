import express from "express";
import type { Application, Request, Response } from "express";
import cors from "cors";
import { config } from "./utils/validateEnvVariables.utils.js";

const app: Application = express();

// cors handling and whitelisting
const FRONTEND_URL = config.app.CORS_ORIGIN;

const whitelist: string[] = [FRONTEND_URL];

// allow only whitelisted origins (and no-origin request). Enable cookies
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) =>
    !origin || whitelist.includes(origin)
      ? callback(null, true)
      : callback(new Error("Not allowed by CORS"), false),

  credentials: true,
};

// middlewares
app.use(cors(corsOptions));
app.use(express.json());

// health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

export { app };
