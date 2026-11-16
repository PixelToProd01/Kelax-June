
import mongoose from "mongoose";

const warrantySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["server", "workstation"],
      required: true,
    },

    serialNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    modelNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    customerName: {
      type: String,
    },

    customerEmail: {
      type: String,
    },

    customerContact: {
      type: String,
    },

    customerAddress: {
      type: String,
    },

    resellerName: {
      type: String,
      required: true,
    },

    productConfiguration: {
      type: String,
      required: true,
    },

    warrantyStatus: {
      type: String,
      enum: ["Active", "Expired"],
      default: "Active",
    },

    warrantyType: {
      type: String,
      enum: ["NBD", "MissionCritical"],
      default: "NBD",
    },

    validFrom: {
      type: Date,
      required: true,
    },

    validTo: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Warranty = mongoose.model("Warranty", warrantySchema);

export default Warranty;
