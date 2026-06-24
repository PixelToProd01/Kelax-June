import mongoose from "mongoose";

const specificationSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    category: {
      type: String,
      enum: ["server", "workstation"],
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    introduction: {
      type: String, // HTML from React Quill
      required: true,
    },

    specifications: [specificationSchema],

    datasheet: {
      type: String, // PDF path
      required: true,
    },
  },
  { timestamps: true },
);

// const User = mongoose.model("User", userSchema);
// export default User;

const Product = mongoose.model("Product", productSchema);
export default Product;

// module.exports = mongoose.model("Product", productSchema);
