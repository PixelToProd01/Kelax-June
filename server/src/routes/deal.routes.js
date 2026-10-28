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
  isAdminAuthenticated,
  isAuthenticated,
} from "../middlewares/auth.middleware.js";

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
  isAdminAuthenticated,
  authorizeRoles("admin"),
  getAllDeals
);

dealRouter.patch(
  "/admin/:id/status",
  isAdminAuthenticated,
  authorizeRoles("admin"),
  updateDealStatus
);

export default dealRouter;