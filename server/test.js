import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

console.log("Connecting...");

try {
  await mongoose.connect(uri);
  console.log("✅ Connected");
} catch (err) {
  console.error(err);
}