import jwt from "jsonwebtoken";
import { config } from "./validateEnvVariables.utils.js";

export const generateJwt = (userId: string): string => {
  return jwt.sign(
    { userId },
    config.jwt.SECRET as string,
    {
      expiresIn: config.jwt.EXPIRES_IN,
    } as jwt.SignOptions,
  );
};
