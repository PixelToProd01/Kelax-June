// Optional helper: creates the first admin if your database has none.
//   npm run seed:admin
// Or with your own values:
//   ADMIN_EMAIL=me@kelax.in ADMIN_PASSWORD=Secret@123 ADMIN_NAME="Kelax Admin" ADMIN_PHONE=9999999999 npm run seed:admin
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../src/models/user.model.js";

dotenv.config();

const email = (process.env.ADMIN_EMAIL || "admin@kelax.in").toLowerCase();
const password = process.env.ADMIN_PASSWORD || "Admin@12345";
const fullName = process.env.ADMIN_NAME || "Kelax Admin";
const phone = process.env.ADMIN_PHONE || "9999999999";

try {
  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 8000 });

  const exists = await User.findOne({ email });
  if (exists) {
    console.log(`ℹ️  User with email ${email} already exists (role: ${exists.role}). Nothing changed.`);
  } else {
    await User.create({
      fullName,
      email,
      phone,
      password, // hashed by the model
      role: "admin",
      isVerified: true,
      userStatus: "active",
    });
    console.log("✅ Admin created");
    console.log(`   Email   : ${email}`);
    console.log(`   Password: ${password}   (change it after first login)`);
  }
} catch (error) {
  console.error("❌ Failed:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
