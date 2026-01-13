import { app } from "./app.js";
import dotenv from "dotenv";
import {
  shutMongoConnection,
  shutPostgresConnection,
  shutRedisConnection,
} from "./lib/db/index.db.js";
import type { Server } from "http";

dotenv.config();

// PORT handling
const PORT: number = Number(process.env.PORT || "8080");

if (isNaN(PORT) || PORT <= 0) {
  throw new Error("Invalid PORT number in environment variables");
}

const server: Server = app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});

// graceful shutdown
const shutdown = async (): Promise<void> => {
  console.log("Shutting down...");

  server.close(async () => {
    await Promise.allSettled([
      shutMongoConnection(),
      shutPostgresConnection(),
      shutRedisConnection(),
    ]);
    console.log("All Server Closed!");
    setTimeout(() => process.exit(0), 100); // time to flush logs and finish cleanups
  });

};

// signals
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
