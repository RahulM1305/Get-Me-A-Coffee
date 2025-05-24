// // import mongoose from "mongoose";

// // const connectDb = async () => {
// //         try {
// //             const conn = await mongoose.connect(process.env.MONGO_URI, {
// //                 useNewUrlParser: true,
// //             });
// //             console.log(`MongoDB Connected: ${conn.connection.host}`);
// //             return conn;

// //         } catch (error) {
// //             console.error(error.message);
// //             process.exit(1);
// //         }
// //     }

// //   export default connectDb;

// // /lib/connectDb.js or /db/connectDb.js

// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGO_URI;

// if (!MONGODB_URI) {
//   throw new Error("MONGO_URI not defined in environment variables");
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectDb() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, {
//       bufferCommands: false,
//     });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default connectDb;

// db/connectDb.js
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables.");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDb() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDb;
