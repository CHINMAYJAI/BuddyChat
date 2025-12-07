import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const User = pgTable("usersTable", {
  id: uuid("id").defaultRandom().primaryKey(),
  googleId: text("google_id").notNull().unique(),
  fullName: text("name"),
  email: text("email").notNull().unique(),
  avatarUrl: text("avatar_url"),
  // timestamps
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
