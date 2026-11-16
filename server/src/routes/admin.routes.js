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
import {
  isStaffAuthenticated,
  checkPermission,
  checkManagedUserPermission,
} from "../middlewares/rbac.middleware.js";
// import { getMyProfile } from "../controllers/auth.controllers.js";
// import { createEmployee } from "../controllers/admin.controller.js";

const adminRouter = Router();

// Admin Login + Logout Router
adminRouter.post("/login", adminLogin);
// Admin + Employee (any logged-in staff member)
adminRouter.post("/logout", isStaffAuthenticated, adminLogout);

adminRouter.get("/me", isStaffAuthenticated, getAdminMe);

// Route For Update Admin Profile
adminRouter.put("/update-profile", isStaffAuthenticated, updateAdminProfile);

// Route For Change Admin Password
adminRouter.put("/change-password", isStaffAuthenticated, changeAdminPassword);

// Dashboard stats (each figure is filtered by permission inside the controller)
adminRouter.get("/stats", isStaffAuthenticated, getAdminStats);

// Get All Partners
adminRouter.get(
  "/partners",
  isStaffAuthenticated,
  checkPermission("partners", "read"),
  getAllPartners,
);

// Get All Customers
adminRouter.get(
  "/customers",
  isStaffAuthenticated,
  checkPermission("customers", "read"),
  getAllCustomers,
);

// Approve User Login With Time Set By Admin
// (permission depends on target: partner -> partners.update, customer -> customers.update)
adminRouter.put(
  "/approve-user/:userId",
  isStaffAuthenticated,
  checkManagedUserPermission("update"),
  approveUser,
);

// Delete User by Admin
// (permission depends on target: partner -> partners.delete, customer -> customers.delete)
adminRouter.delete(
  "/delete-user/:userId",
  isStaffAuthenticated,
  checkManagedUserPermission("delete"),
  deleteUser,
);

// adminRouter.get("/my-profile", isAdminAuthenticated, authorizeRoles("admin"), getMyProfile)

// adminRouter.post("/create-employee", authMiddleware, authorize("admin"), createEmployee);

export default adminRouter;
