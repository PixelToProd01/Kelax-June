import express from "express";
import {
  createWarranty,
  deleteWarranties,
  getAllWarranties,
  getWarrantyBySerial,
  updateWarranty,
} from "../controllers/warranty.controllers.js";
import {
  isStaffAuthenticated,
  checkPermission,
} from "../middlewares/rbac.middleware.js";
import { uploadWarranty } from "../middlewares/warrantyUpload.middleware.js";

const warrantyRouter = express.Router();

// USER Can Check Their Warranty Status By Using Serial Number
warrantyRouter.get("/check-warranty/:serial", getWarrantyBySerial);

// ADMIN Can Create a New Warranty
warrantyRouter.post(
  "/create-warranty",
  isStaffAuthenticated,
  checkPermission("warranty", "create"),
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
  isStaffAuthenticated,
  checkPermission("warranty", "read"),
  getAllWarranties,
);

// ADMIN Can Update Warranty
warrantyRouter.put(
  "/update-warranty/:id",
  isStaffAuthenticated,
  checkPermission("warranty", "update"),
  updateWarranty,
);

// ADMIN Can Delete Warranty
warrantyRouter.delete(
  "/delete-warranty/:id",
  isStaffAuthenticated,
  checkPermission("warranty", "delete"),
  deleteWarranties,
);

export default warrantyRouter;
