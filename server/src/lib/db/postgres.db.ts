import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { readFileSync } from "fs";

let pool: Pool | null = null;
let db: ReturnType<typeof drizzle> | null = null;

// Hard fail if required env vars are missing
const validateEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const postgresConnectionDB = () => {
  if (db) return db; // singleton

  // Create a connection pool
  pool = new Pool({
    host: process.env.PG_HOST ?? "localhost",
    port: Number(process.env.PG_PORT ?? 5432),
    user: validateEnv("PG_USER"),
    password: validateEnv("PG_PASSWORD"),
    database: validateEnv("PG_DATABASE"),
    max: 10, // Maximum number of connections
    idleTimeoutMillis: 10000, // close idle clients after 10s
    connectionTimeoutMillis: 5000, // wait max 5s for connection
    ssl:
      process.env.PG_SSL === "true"
        ? {
            rejectUnauthorized: true,
            key: process.env.PG_SSL_KEY
              ? readFileSync(process.env.PG_SSL_KEY)
              : undefined,
            cert: process.env.PG_SSL_CERT
              ? readFileSync(process.env.PG_SSL_CERT)
              : undefined,
            ca: process.env.PG_SSL_CA
              ? readFileSync(process.env.PG_SSL_CA)
              : undefined,
          }
        : false,
  });

  pool.on("error", (err) => {
    console.error("Postgres pool error occurred\nError: ", err);
    process.exit(1);
  });

  // Initialize Drizzle ORM
  db = drizzle(pool);

  console.log("Postgres connection pool established");

  return db;
};

export const shutPostgresConnection = async () => {
  if (!pool) return;
  await pool.end();
  // Cleanup
  pool = null;
  db = null;

  console.log("Postgres connection pool closed");
};
