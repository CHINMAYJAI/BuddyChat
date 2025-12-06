import express from "express";
import type { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

// PORT handling
const PORT: number = Number(process.env.PORT || "8080");

if (isNaN(PORT) || PORT <= 0) {
  throw new Error("Invalid PORT number in environment variables");
}

// cors handling and whitelisting
const FRONTEND_URL = process.env.CORS_ORIGIN;

if (!FRONTEND_URL) {
  throw new Error("CORS_ORIGIN is missing in environment variables");
}

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
  res.json({ message: `Server is running at PORT: ${PORT}` });
});

export { app, PORT };
