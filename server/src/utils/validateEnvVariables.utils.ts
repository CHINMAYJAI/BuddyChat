const required = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return value;
};

export const config = {
  NODE_ENV: required("NODE_ENV"),

  app: {
    CORS_ORIGIN: required("CORS_ORIGIN"),
    PORT: Number(required("PORT")),
    FRONTEND_DASHBOARD_URL: required("FRONTEND_DASHBOARD_URL"),
  },

  mongo: {
    URI: required("MONGO_URI"),
    DB: required("MONGO_DB"),
  },

  postgres: {
    USER: required("PG_USER"),
    DATABASE: required("PG_DATABASE"),
    PASSWORD: required("PG_PASSWORD"),
    URL: required("PG_DATABASE_URL"),
  },

  redis: {
    URL: required("REDIS_URL"),
    USERNAME: required("REDIS_USERNAME"),
    PASSWORD: required("REDIS_PASSWORD"),
  },

  googleOAuth: {
    CLIENT_ID: required("GOOGLE_CLIENT_ID"),
    CLIENT_SECRET: required("GOOGLE_CLIENT_SECRET"),
    REDIRECT_URI: required("GOOGLE_REDIRECT_URI"),
  },

  jwt: {
    SECRET: required("JWT_SECRET"),
    EXPIRES_IN: required("JWT_EXPIRES_IN"),
  },

  cookies: {
    EXPIRES_IN: required("COOKIES_EXPIRES_IN"),
  },

  oauth: {
    STATE_TTL_SECONDS: required("OAUTH_STATE_TTL_SECONDS"),
  },
};

if (Number.isNaN(config.app.PORT)) throw new Error("PORT must be a number");

if (config.app.PORT <= 0)
  throw new Error("Invalid PORT number in environment variable");
