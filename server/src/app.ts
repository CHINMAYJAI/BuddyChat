import express from "express";
import type { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./utils/validateEnvVariables.utils.js";
import {
  googleAuthRouter,
  googleCallbackRouter,
} from "./routes/auth/index.auth.routes.js";

const app: Application = express();

// cors handling and whitelisting
const FRONTEND_URL = config.app.CORS_ORIGIN;

const whitelist: string[] = [FRONTEND_URL];

// allow only whitelisted origins (and no-origin request). Enable cookies
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) =>
    !origin || whitelist.includes(origin)
      ? callback(null, true)
      : callback(new Error("Not allowed by CORS"), false),

  credentials: true,
};

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// NOTE: use to silent favicon.ico when browser hits it
// TODO: remove this when building client
app.get("/favicon.ico", (_req: Request, res: Response) => res.sendStatus(204));

// Mount Google OAuth authentication and callback routes
app.use("/auth", googleAuthRouter);
app.use("/auth", googleCallbackRouter);

// route redirect
app.get("/", (req: Request, res: Response) => {
  res.redirect("/health");
});

// health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

export { app };
