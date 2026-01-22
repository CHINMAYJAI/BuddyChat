import "dotenv/config";
import "dotenv";
import { defineConfig } from "drizzle-kit";
import { config } from "./src/utils/validateEnvVariables.utils";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/models/user.model.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: config.postgres.URL,
  },
});
