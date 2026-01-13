import { mongoConnectionDB, shutMongoConnection } from "./mongo.db.js";
import { postgresConnectionDB, shutPostgresConnection } from "./postgres.db.js";
import { redisConnectionDB, shutRedisConnection } from "./redis.db.js";

export {
  mongoConnectionDB,
  postgresConnectionDB,
  redisConnectionDB,
  shutMongoConnection,
  shutPostgresConnection,
  shutRedisConnection,
};
