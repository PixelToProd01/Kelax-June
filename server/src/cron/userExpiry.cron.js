import cron from "node-cron";
import User from "../models/user.model.js";
import mongoose from "mongoose";

console.log("✅ User expiry cron initialized");

// Every 1 minute   ----->  * * * * *  -----> 5 
cron.schedule("0 0 * * *", async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log("⚠ MongoDB is not ready to connected. Skipping cron...");
      return;
    }

    const now = new Date();

    const result = await User.updateMany(
      {
        userStatus: "active",
        activeTill: { $lte: now }, // <= better than <====>   
      },
      {
        $set: { userStatus: "inactive" },
      }
    );

    if (result.modifiedCount > 0) {
      console.log(
        `⏰ ${result.modifiedCount} user(s) set to inactive at ${now}`
      );
    }
  } catch (error) {
    console.log("❌ Cron error:", error.message);
  }
});
