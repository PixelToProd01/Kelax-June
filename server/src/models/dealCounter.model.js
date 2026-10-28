import mongoose from "mongoose";

const dealCounterSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    sequence: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    versionKey: false,
  }
);

const DealCounter =
  mongoose.models.DealCounter ||
  mongoose.model("DealCounter", dealCounterSchema);

export default DealCounter;