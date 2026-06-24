import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      // select: false, // 🔴 IMPORTANT (security)
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^\+?[0-9]{10,15}$/, "Invalid phone number"],
    },

    role: {
      type: String,
      enum: ["admin", "partner", "customer"],
      required: true,
    },

    jobTitle: {
      type: String,
      required: function () {
        return this.role === "partner" || this.role === "customer";
      },
    },

    jobLevel: {
      type: String,
      required: function () {
        return this.role === "partner" || this.role === "customer";
      },
    },

    // 🔹 Embedded company object
    company: {
      name: { type: String, trim: true },
      address: { type: String, trim: true },
      city: { type: String, trim: true },
      pinCode: { type: String, trim: true },
      gstNumber: { type: String, trim: true },
      phone: { type: String, trim: true },
      email: { type: String, lowercase: true, trim: true },
      website: {
        type: String,
        trim: true,
        lowercase: true,
        match: [
          /^(https?:\/\/)?(www\.)?[a-z0-9-]+(\.[a-z]{2,})(\/.*)?$/,
          "Invalid website URL",
        ],
      },
      partnershipType: {
        type: String,
        required: function () {
          return this.role === "partner";
        },
        // enum: [
        //   "reseller",
        //   "solution_provider",
        //   "system_integrator",
        //   "solution_partner",
        //   "consultant",
        //   "oem",
        // ],
      },
    },

    // OTP + Verification
    isVerified: { type: Boolean, default: false },
    verifyEmailOtp: String,
    verifyEmailOtpExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    userStatus: {
      type: String,
      enum: ["pending", "active", "inactive"],
      default: "pending",
    },

    activeFrom: {
      type: Date,
    },

    activeTill: {
      type: Date,
    },

    // activationStartDate: {
    //   type: Date,
    // },

    // activationEndDate: {
    //   type: Date,
    // },

    // approvedByAdmin: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true },
);

/* ================= PASSWORD HASH ================= */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

/* ================= PASSWORD MATCH ================= */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;

// userType: {
//   type: String,
//   enum: ["external", "internal"],
//   required: true,
// },

// createdByAdmin: {
//   type: Boolean,
//   default: false,
// },

// user or employ
