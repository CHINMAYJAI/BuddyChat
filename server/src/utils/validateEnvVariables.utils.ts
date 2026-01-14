const required = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return value;
};

export const config = {
  app: {
    CORS_ORIGIN: required("CORS_ORIGIN"),
    PORT: Number(required("PORT")),
  },

  mongo: {
    URI: required("MONGO_URI"),
    DB: required("MONGO_DB"),
  },

  postgres: {
    USER: required("PG_USER"),
    PASSWORD: required("PG_PASSWORD"),
    DATABASE: required("PG_DATABASE"),
  },

  redis: {
    URL: required("REDIS_URL"),
    USERNAME: required("REDIS_USERNAME"),
    PASSWORD: required("REDIS_PASSWORD"),
  },
};

if (Number.isNaN(config.app.PORT)) throw new Error("PORT must be a number");

if (config.app.PORT <= 0)
  throw new Error("Invalid PORT number in environment variable");
