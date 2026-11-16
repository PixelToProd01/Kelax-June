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
  isStaffAuthenticated,
  checkPermission,
} from "../middlewares/rbac.middleware.js";
import { uploadDriver } from "../middlewares/DriverUpload.middleware.js";

const driverRouter = express.Router();

/* ==========================================================
   CREATE DRIVER
========================================================== */

driverRouter.post(
  "/create-driver",
  isStaffAuthenticated,
  checkPermission("drivers", "create"),
  uploadDriver.fields([
    {
      name: "driver",
      maxCount: 1,
    },
  ]),
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
  isStaffAuthenticated,
  checkPermission("drivers", "update"),
  uploadDriver.fields([
    {
      name: "driver",
      maxCount: 1,
    },
  ]),
  updateDriver,
);

/* ==========================================================
   DELETE DRIVER
========================================================== */

driverRouter.delete(
  "/delete-driver/:id",
  isStaffAuthenticated,
  checkPermission("drivers", "delete"),
  deleteDriver,
);

export default driverRouter;