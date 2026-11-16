import { Router } from "express";
import {
  authorizeRoles,
  isAdminAuthenticated,
} from "../middlewares/auth.middleware.js";
import {
  getRbacMeta,
  getRoles,
  createRole,
  updateRole,
  setRoleStatus,
  deleteRole,
  getEmployees,
  createEmployee,
  updateEmployee,
  setEmployeeStatus,
  deleteEmployee,
} from "../controllers/rbac.controllers.js";

const rbacRouter = Router();

// Roles & employees can only ever be managed by the real admin.
rbacRouter.use(isAdminAuthenticated, authorizeRoles("admin"));

rbacRouter.get("/meta", getRbacMeta);

// Roles
rbacRouter.get("/roles", getRoles);
rbacRouter.post("/roles", createRole);
rbacRouter.put("/roles/:id", updateRole);
rbacRouter.patch("/roles/:id/status", setRoleStatus);
rbacRouter.delete("/roles/:id", deleteRole);

// Employees
rbacRouter.get("/employees", getEmployees);
rbacRouter.post("/employees", createEmployee);
rbacRouter.put("/employees/:id", updateEmployee);
rbacRouter.patch("/employees/:id/status", setEmployeeStatus);
rbacRouter.delete("/employees/:id", deleteEmployee);

export default rbacRouter;
