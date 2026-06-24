import express from "express";
import {
  createWarranty,
  deleteWarranties,
  getAllWarranties,
  getWarrantyBySerial,
} from "../controllers/warranty.controllers.js";
import {
  authorizeRoles,
  isAdminAuthenticated,
} from "../middlewares/auth.middleware.js";
import { uploadWarranty } from "../middlewares/warrantyUpload.middleware.js";

const warrantyRouter = express.Router();

// USER Can Check Their Warranty Status By Using Serial Number
warrantyRouter.get("/check-warranty/:serial", getWarrantyBySerial);

// ADMIN Can Create a New Warranty
warrantyRouter.post(
  "/create-warranty",
  isAdminAuthenticated,
  authorizeRoles("admin"),
  uploadWarranty.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  createWarranty,
);

// ADMIN Can View Warranty
warrantyRouter.get(
  "/view-warranty",
  isAdminAuthenticated,
  authorizeRoles("admin"),
  getAllWarranties,
);

// ADMIN Can Delete Warranty
warrantyRouter.delete(
  "/delete-warranty/:id",
  isAdminAuthenticated,
  authorizeRoles("admin"),
  deleteWarranties,
);

export default warrantyRouter;
