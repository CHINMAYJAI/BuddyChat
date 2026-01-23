import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

// verifies the tokens and extract the userId
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response => {
  const token = req.cookies?.auth_token;
  if (!token) return res.status(401).send("Unauthorized Token");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    (req as any).userId = decoded.userId;
    next();
  } catch {
    return res.status(401).send("Invalid token");
  }
};
