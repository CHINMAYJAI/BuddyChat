import { postgresConnectionDB } from "../lib/db/index.db.js";
import { User } from "../models/index.model.js";
import { eq } from "drizzle-orm";
import type { GoogleUser } from "../services/auth/googleOAuth.auth.service.js";

// If user logs in with google, find them in your database or create them if they don’t exist and return their user ID.
export const findOrCreateGoogleUser = async (
  googleUser: GoogleUser,
): Promise<string> => {
  const db = postgresConnectionDB();

  const existing = await db
    .select()
    .from(User)
    .where(eq(User.googleId, googleUser.googleId))
    .limit(1);

  if (existing.length) return existing[0]!.id;

  const created = await db
    .insert(User)
    .values({
      googleId: googleUser.googleId,
      email: googleUser.email,
      fullName: googleUser.name,
      avatarUrl: googleUser.avatar,
    })
    .returning({ id: User.id });

  if (!created[0]) throw new Error("User creation failed");
  return created[0].id;
};
