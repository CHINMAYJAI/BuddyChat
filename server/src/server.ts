import 'dotenv/config';
import { app } from "./app.js";
import dotenv from "dotenv";
import {
  shutMongoConnection,
  shutPostgresConnection,
  shutRedisConnection,
} from "./lib/db/index.db.js";
import type { Server } from "http";
import { config } from "./utils/validateEnvVariables.utils.js";

dotenv.config();

// PORT handling
const PORT: number = Number(config.app.PORT || "8080");

const server: Server = app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});

// graceful shutdown
let isShuttingDown = false;
const shutdown = async (): Promise<void> => {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log("Shutting down...");

  // wait for server to stop accepting new connections
  await new Promise<void>((resolve) => server.close(() => resolve()));

  // run DB shutdowns and report each result explicitly
  const results = await Promise.allSettled([
    shutMongoConnection(),
    shutPostgresConnection(),
    shutRedisConnection(),
  ]);

  const names = ["Mongo", "Postgres", "Redis"];
  results.forEach((r, i) => {
    if (r.status === "fulfilled") {
      console.log(`${names[i]} shutdown successful`);
    } else {
      console.error(`${names[i]} shutdown failed`, r.reason);
    }
  });

  console.log("All Server Closed!");
  setTimeout(() => process.exit(0), 100); // time to flush logs and finish cleanups
};

// signals
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
