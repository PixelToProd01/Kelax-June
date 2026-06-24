import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Prevent duplicate logs
let isConnected = false;

mongoose.connection.on("connected", () => {
  if (!isConnected) {
    console.log("🟢 MongoDB initial connection established");
    isConnected = true;
  }
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠ MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("🔄 MongoDB reconnected");
});

export default connectDb;
