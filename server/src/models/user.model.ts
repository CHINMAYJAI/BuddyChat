import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const User = pgTable("usersTable", {
    // uuid is used as a random unique value
  id: uuid("id").defaultRandom().primaryKey(),
    // Stores the unique user identifier provided by Google OAuth.
  googleId: text("google_id").notNull().unique(),
  fullName: text("name"),
  email: text("email").notNull().unique(),
  avatarUrl: text("avatar_url"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
