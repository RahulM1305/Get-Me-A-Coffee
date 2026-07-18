import mongoose from "mongoose";

// Cache the connection across hot reloads / route invocations so we
// don't open a new connection on every request.
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI)
      .then((conn) => {
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
      })
      .catch((error) => {
        // Reset so the next request can retry instead of reusing a
        // rejected promise. Never process.exit() here — that kills
        // the whole Next.js server on a single failed connection.
        cached.promise = null;
        console.error(`MongoDB connection failed: ${error.message}`);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDb;
