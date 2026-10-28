import mongoose from "mongoose";

const dealSchema = new mongoose.Schema(
  {
    dealId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    partner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },

    customerContact: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },

    customerAddress: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    productType: {
      type: String,
      enum: ["Server", "Workstation"],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      max: 100000,
    },

    expectedClosingDate: {
      type: Date,
      required: true,
    },

    productRequirements: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },

    status: {
      type: String,
      enum: ["Submitted", "Approved", "Rejected"],
      default: "Submitted",
      required: true,
      index: true,
    },

    // Required when the admin rejects a deal.
    adminRemarks: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    reviewedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

dealSchema.index({ partner: 1, createdAt: -1 });
dealSchema.index({ status: 1, createdAt: -1 });

const Deal =
  mongoose.models.Deal || mongoose.model("Deal", dealSchema);

export default Deal;