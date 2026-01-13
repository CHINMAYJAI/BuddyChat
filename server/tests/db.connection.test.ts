import "dotenv/config";
import {
  mongoConnectionDB,
  postgresConnectionDB,
  redisConnectionDB,
  shutMongoConnection,
  shutPostgresConnection,
  shutRedisConnection,
} from "../src/lib/db/index.db.js";

const testDBs = async () => {
  try {
    // MongoDB
    await mongoConnectionDB();
    console.log("MongoDB OK");
    await shutMongoConnection();

    // Postgres
    const pg = postgresConnectionDB();
    console.log("Postgres OK");
    await shutPostgresConnection();

    // Redis
    const redis = await redisConnectionDB();
    console.log("Redis OK");
    await shutRedisConnection();
    
    console.log("All DBs connected successfully");
  } catch (err) {
    console.error("DB test failed\nError: ", err);
  }
};

testDBs();
