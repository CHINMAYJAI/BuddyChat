import { createClient, type RedisClientType } from "redis";
import { config } from "../../utils/validateEnvVariables.utils.js";

let redis: RedisClientType | null = null;

// connect to single Redis instance
export const redisConnectionDB = async (): Promise<RedisClientType> => {
  if (redis) return redis; // singleton

  redis = createClient({
    url: config.redis.URL || "redis://127.0.0.1:6379",
    socket: {
      reconnectStrategy: (retries) => Math.min(retries * 100, 3000),
    },
    ...(config.redis.USERNAME && {
      username: config.redis.USERNAME,
    }),
    ...(config.redis.PASSWORD && {
      password: config.redis.PASSWORD,
    }),
  });

  redis.on("error", (err) => {
    console.error("Redis error occurred\nError: ", err);
    process.exit(1);
  });

  await redis.connect();
  console.log("Redis single-instance connected");

  return redis;
};

// shutdown
export const shutRedisConnection = async () => {
  if (!redis) return;
  await redis.quit();
  redis = null; // cleanup
};
