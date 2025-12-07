import "dotenv";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/models/user.model.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.PG_DATABASE_URL!,
  },
});
