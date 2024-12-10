import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;
if (!MONGO_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

interface MongooseCache {
  conection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: MongooseCache = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = { conection: null, promise: null };
}

export async function dbConnect() {
  if (cached.conection) {
    return cached.conection;
  }

  if (!cached.promise) {
    try {
      cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
        console.log("MongoDB successfully connected.");
        return mongoose;
      });
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw new Error("Failed to connect to MongoDB.");
    }
  }

  try {
    cached.conection = await cached.promise;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    cached.promise = null;
    throw new Error("Failed to establish MongoDB connection.");
  }

  return cached.conection;
}