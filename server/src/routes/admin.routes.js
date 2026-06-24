import { Router } from "express";
import {
  adminLogin,
  adminLogout,
  approveUser,
  changeAdminPassword,
  deleteUser,
  getAdminMe,
  getAdminStats,
  getAllCustomers,
  getAllPartners,
  updateAdminProfile,
} from "../controllers/admin.controllers.js";
import {
  authorizeRoles,
  isAdminAuthenticated,
} from "../middlewares/auth.middleware.js";
// import { getMyProfile } from "../controllers/auth.controllers.js";
// import { createEmployee } from "../controllers/admin.controller.js";

const adminRouter = Router();

// Admin Login + Logout Router
adminRouter.post("/login", adminLogin);
adminRouter.post(
  "/logout",
  isAdminAuthenticated,
  authorizeRoles("admin"),
  adminLogout,
);

adminRouter.get(
  "/me",
  isAdminAuthenticated,
  authorizeRoles("admin"),
  getAdminMe,
);

// Route For Update Admin Profile
adminRouter.put(
  "/update-profile",
  isAdminAuthenticated,
  authorizeRoles("admin"),
  updateAdminProfile,
);

// Route For Change Admin Password
adminRouter.put(
  "/change-password",
  isAdminAuthenticated,
  authorizeRoles("admin"),
  changeAdminPassword,
);

adminRouter.get(
  "/stats",
  isAdminAuthenticated,
  authorizeRoles("admin"),
  getAdminStats,
);

// Get All Partners
adminRouter.get(
  "/partners",
  isAdminAuthenticated,
  authorizeRoles("admin"),
  getAllPartners,
);

// Get All Customers
adminRouter.get(
  "/customers",
  isAdminAuthenticated,
  authorizeRoles("admin"),
  getAllCustomers,
);

// Approve User Login With Time Set By Admin 
adminRouter.put(
  "/approve-user/:userId",
  isAdminAuthenticated,
  authorizeRoles("admin"),
  approveUser,
);

// Delete User by Admin
adminRouter.delete(
  "/delete-user/:userId",
  isAdminAuthenticated,
  authorizeRoles("admin"),
  deleteUser,
);

// adminRouter.get("/my-profile", isAdminAuthenticated, authorizeRoles("admin"), getMyProfile)

// adminRouter.post("/create-employee", authMiddleware, authorize("admin"), createEmployee);

export default adminRouter;
