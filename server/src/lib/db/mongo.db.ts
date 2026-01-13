import mongoose from "mongoose";

const MONGO_URI: string = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is missing");
}

// Hard fail if required env vars are missing
const validateEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
};

export const mongoConnectionDB = async (): Promise<void> => {
  try {
    await mongoose.connect(`${MONGO_URI}/${validateEnv("MONGO_DB")}`, {
      serverSelectionTimeoutMS: 5000, // Limits how long Mongoose waits to find a MongoDB server.
      socketTimeoutMS: 45000, // Max time a DB operation can stay idle before timing out.
      autoIndex: false, // Prevents MongoDB from auto-creating indexes at runtime.
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed\nError: ", err);
    process.exit(1);
  }
};

export const shutMongoConnection = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.log("MongoDB disconnection failed\nError: ", error);
    process.exit(1);
  }
};
