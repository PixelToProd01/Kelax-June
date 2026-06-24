import mongoose from "mongoose";

const warrantySchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },

    resellerName: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    customerAddress: {
      type: String,
      required: true,
    },

    productConfiguration: {
      type: String,
      required: true,
    },

    serialNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    productName: {
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
  { timestamps: true },
);

// ✅ ENSURE INDEX FORCE CREATE
warrantySchema.index({ serialNumber: 1 }, { unique: true });

// export default mongoose.model("Warranty", warrantySchema);

const Warranty = mongoose.model("Warranty", warrantySchema);
export default Warranty;
