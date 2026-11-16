import express from "express";
import {
  registerDeal,
  getMyDeals,
  getMyDealById,
  updateMyDeal,
  getAllDeals,
  updateDealStatus,
} from "../controllers/deal.controllers.js";

import {
  authorizeRoles,
  isAuthenticated,
} from "../middlewares/auth.middleware.js";
import {
  isStaffAuthenticated,
  checkPermission,
} from "../middlewares/rbac.middleware.js";

const dealRouter = express.Router();

// Partner routes
dealRouter.post(
  "/register",
  isAuthenticated,
  authorizeRoles("partner"),
  registerDeal
);

dealRouter.get(
  "/my-deals",
  isAuthenticated,
  authorizeRoles("partner"),
  getMyDeals
);

dealRouter.get(
  "/my-deals/:id",
  isAuthenticated,
  authorizeRoles("partner"),
  getMyDealById
);

dealRouter.put(
  "/my-deals/:id",
  isAuthenticated,
  authorizeRoles("partner"),
  updateMyDeal
);

// Admin routes
dealRouter.get(
  "/admin/all",
  isStaffAuthenticated,
  checkPermission("deals", "read"),
  getAllDeals
);

dealRouter.patch(
  "/admin/:id/status",
  isStaffAuthenticated,
  checkPermission("deals", "update"),
  updateDealStatus
);

export default dealRouter;