import cron from "node-cron";
import mongoose from "mongoose";
import Warranty from "../models/warranty.model.js";

console.log("✅ Warranty Expiry Cron Initialized");

// Every 1 minute for testing only ---------->  * * * * *  ------> 5
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("⏰ Checking Warranty Expiry");

    // MongoDB Connection Check
    if (mongoose.connection.readyState !== 1) {
      console.log("⚠ MongoDB is not ready to connected. Skipping cron...");
      return;
    }

    const now = new Date();

    console.log("Current Time:", now);

    //  DEBUGGING.....
    const matchedWarranties = await Warranty.find({
      warrantyStatus: "Active",
      validTo: { $lte: now },
    });

    console.log("Matched Warranties:", matchedWarranties);

    const result = await Warranty.updateMany(
      {
        warrantyStatus: "Active",
        validTo: { $lte: now }, // <= better than  <====>
      },
      {
        $set: { warrantyStatus: "Expired" },
      },
    );

    if (result.modifiedCount > 0) {
      console.log(`⏰ ${result.modifiedCount} warranty expired at ${now}`);
    }
  } catch (error) {
    console.log("❌ Warranty Cron Error:", error.message);
  }
});
