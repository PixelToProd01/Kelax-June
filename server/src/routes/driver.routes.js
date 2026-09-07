import express from "express";

import {
  createDriver,
  getAllDrivers,
  getDriversByProduct,
  getSingleDriver,
  updateDriver,
  deleteDriver,
} from "../controllers/driver.controller.js";

import {
  authorizeRoles,
  isAdminAuthenticated,
} from "../middlewares/auth.middleware.js";
import { uploadDriver } from "../middlewares/DriverUpload.middleware.js";

const driverRouter = express.Router();

/* ==========================================================
   CREATE DRIVER
========================================================== */

driverRouter.post(
  "/create-driver",
  uploadDriver.fields([
    {
      name: "driver",
      maxCount: 1,
    },
  ]),
  isAdminAuthenticated,
  authorizeRoles("admin"),
  createDriver,
);

/* ==========================================================
   GET ALL DRIVERS (ADMIN)
========================================================== */

driverRouter.get("/get-all-driver", getAllDrivers);

/* ==========================================================
   GET SINGLE DRIVER
========================================================== */

driverRouter.get("/get-single-driver/:id", getSingleDriver);

//  http://localhost:8000/api/driver/get-drivers?product=6a4b8899f2d0d1986f033127


/* ==========================================================
   GET DRIVERS OF A PRODUCT (WEBSITE)
========================================================== */

driverRouter.get("/get-drivers", getDriversByProduct);
// driverRouter.get("/get-drivers/:productId", getDriversByProduct);
// driverRouter.get("/get-driver/:productId", getDriversByProduct);

/* ==========================================================
   UPDATE DRIVER
========================================================== */

driverRouter.put(
  "/update-driver/:id",
  uploadDriver.fields([
    {
      name: "driver",
      maxCount: 1,
    },
  ]),
  isAdminAuthenticated,
  authorizeRoles("admin"),
  updateDriver,
);

/* ==========================================================
   DELETE DRIVER
========================================================== */

driverRouter.delete("/delete-driver/:id", isAdminAuthenticated, authorizeRoles("admin"), deleteDriver);

export default driverRouter;