import mongoose from "mongoose";
import { emptyPermissions } from "../config/permissions.js";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Role name is required"],
      trim: true,
      minlength: [2, "Role name must be at least 2 characters"],
      maxlength: [50, "Role name cannot exceed 50 characters"],
    },

    // lower-cased copy of name -> case-insensitive uniqueness ("Sales" == "sales")
    nameKey: {
      type: String,
      required: true,
      unique: true,
      select: false,
    },

    description: {
      type: String,
      trim: true,
      maxlength: [250, "Description cannot exceed 250 characters"],
      default: "",
    },

    // { products: {create,read,update,delete}, partners: {...}, ... }
    permissions: {
      type: mongoose.Schema.Types.Mixed,
      default: emptyPermissions,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, minimize: false },
);

const Role = mongoose.model("Role", roleSchema);
export default Role;
