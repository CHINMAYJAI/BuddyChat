import { OAuth2Client } from "google-auth-library";
import { config } from "../../utils/validateEnvVariables.utils.js";

export const googleClient = new OAuth2Client(
  config.googleOAuth.CLIENT_ID,
  config.googleOAuth.CLIENT_SECRET,
  config.googleOAuth.REDIRECT_URI,
);
