import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import "../models/role.model.js"; // registers the Role model for populate()
import {
  PERMISSION_MODULES,
  fullPermissions,
  sanitizePermissions,
} from "../config/permissions.js";

const deny = (res, status, message, code) =>
  res.status(status).json({ success: false, message, ...(code && { code }) });

/* =========================================================
   isStaffAuthenticated
   Admin  -> always allowed, every permission.
   Employee -> allowed only if:
       - account is active
       - a role is assigned
       - that role is active
   Permissions are re-read from the DB on EVERY request, so when an admin
   edits a role / deactivates an employee it takes effect immediately.
========================================================= */
export const isStaffAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.adminToken;
    if (!token) return deny(res, 401, "Admin not authenticated");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id)
      .select("-password")
      .populate("assignedRole");

    if (!user) return deny(res, 401, "User no longer exists");

    if (user.role === "admin") {
      req.user = user;
      req.isAdmin = true;
      req.permissions = fullPermissions();
      return next();
    }

    if (user.role === "employee") {
      if (user.userStatus !== "active") {
        return deny(
          res,
          403,
          "Your account is inactive. Contact admin.",
          "STAFF_ACCESS_REVOKED",
        );
      }
      if (!user.assignedRole) {
        return deny(
          res,
          403,
          "No role is assigned to your account. Contact admin.",
          "STAFF_ACCESS_REVOKED",
        );
      }
      if (!user.assignedRole.isActive) {
        return deny(
          res,
          403,
          "Your role is inactive. Contact admin.",
          "STAFF_ACCESS_REVOKED",
        );
      }

      req.user = user;
      req.isAdmin = false;
      req.permissions = sanitizePermissions(user.assignedRole.permissions);
      return next();
    }

    return deny(res, 403, "Admin access denied");
  } catch (error) {
    return deny(res, 401, "Invalid admin token");
  }
};

/* =========================================================
   checkPermission("products", "create")
   Must run AFTER isStaffAuthenticated.
========================================================= */
export const checkPermission = (moduleKey, action) => {
  const mod = PERMISSION_MODULES[moduleKey];
  if (!mod || !mod.actions.includes(action)) {
    throw new Error(`RBAC: unknown permission "${moduleKey}.${action}"`);
  }

  return (req, res, next) => {
    if (req.isAdmin || req.permissions?.[moduleKey]?.[action] === true) {
      return next();
    }
    return deny(
      res,
      403,
      `You do not have permission to ${action} ${mod.label.toLowerCase()}`,
      "PERMISSION_DENIED",
    );
  };
};

/* =========================================================
   checkManagedUserPermission("update" | "delete")
   For /approve-user/:userId and /delete-user/:userId which work on ANY user.
   Permission depends on the TARGET's role:
       partner  -> partners.<action>
       customer -> customers.<action>
       admin / employee -> admin only  (an employee can never touch them)
========================================================= */
export const checkManagedUserPermission = (action) => async (req, res, next) => {
  try {
    if (req.isAdmin) return next();

    const target = await User.findById(req.params.userId).select("role");
    if (!target) return deny(res, 404, "User not found");

    const moduleKey =
      target.role === "partner"
        ? "partners"
        : target.role === "customer"
          ? "customers"
          : null;

    if (!moduleKey) {
      return deny(res, 403, "Only admin can manage this account");
    }

    if (
      !PERMISSION_MODULES[moduleKey].actions.includes(action) ||
      req.permissions?.[moduleKey]?.[action] !== true
    ) {
      return deny(
        res,
        403,
        `You do not have permission to ${action} ${PERMISSION_MODULES[moduleKey].label.toLowerCase()}`,
        "PERMISSION_DENIED",
      );
    }

    return next();
  } catch (error) {
    return deny(res, 400, "Invalid user id");
  }
};
