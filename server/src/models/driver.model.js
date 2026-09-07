import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    // Product Reference
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    // Type (Driver / Firmware / Utility / Software)
    type: {
      type: String,
      required: true,
      trim: true,
    },

    // Subtype (LAN, RAID, BIOS, VGA etc.)
    // subtype: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },

    // Driver Title
    // title: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },

    // Version
    version: {
      type: String,
      required: true,
      trim: true,
    },

    // Environment (Windows Server 2022, Ubuntu 24.04 etc.)
    environment: {
      type: String,
      required: true,
      trim: true,
    },

    // ZIP File Path
    driverFile: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;