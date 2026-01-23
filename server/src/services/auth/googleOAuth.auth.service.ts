import { googleClient } from "../../lib/auth/googleOAuth.auth.lib.js";
import { config } from "../../utils/validateEnvVariables.utils.js";

export interface GoogleUser {
  googleId: string;
  email: string;
  name: string;
  avatar?: string | undefined;
}

const extractUsernameFromEmail = (email: string): string => {
  const parts = email.split("@");
  const username = parts[0];
  return (username || "").replace(/[^a-zA-Z0-9]/g, ""); // returns clean username
};

export const verifyGoogleUser = async (code: string): Promise<GoogleUser> => {
  try {
    const { tokens } = await googleClient.getToken(code);
    
    if (!tokens.id_token) {
      throw new Error("No id_token received from Google");
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: config.googleOAuth.CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Type guard to ensure payload is an object with required fields
    if (
      !payload ||
      typeof payload !== "object" ||
      !("sub" in payload) ||
      !("email" in payload) ||
      typeof payload.sub !== "string" ||
      typeof payload.email !== "string"
    ) {
      throw new Error("Invalid Google payload");
    }

    const googleId = payload.sub;
    const email = payload.email;

    // NOTE: fetching clean username
    const hasProperName =
      payload.name &&
      typeof payload.name === "string" &&
      payload.name.trim().length > 0;

    const name: string = hasProperName
      ? (payload.name as string)
      : extractUsernameFromEmail(email);

    // NOTE: fetch avatar
    const avatar =
      payload.picture && typeof payload.picture === "string"
        ? payload.picture
        : undefined;

    return {
      googleId,
      email,
      name,
      avatar,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Google verification error:", error.message);
      throw new Error(`Google verification failed: ${error.message}`);
    }
    console.error("Unknown Google verification error:", error);
    throw new Error("Google verification failed: Unknown error");
  }
};
