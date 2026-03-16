// creates and export redis instance

import type { RedisClientType } from "redis";
import { redisConnectionDB } from "../lib/db/index.db.js";

let redis: RedisClientType;

// get the already connected singleton
export const getRedis = async (): Promise<RedisClientType> => {
    if (!redis) redis = await redisConnectionDB();
    return redis;
};
