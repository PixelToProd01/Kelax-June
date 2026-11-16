import { fullPermissions, sanitizePermissions } from "../config/permissions.js";

/**
 * Safe user object for admin-panel login / me responses.
 * Adds `permissions` (what the sidebar & buttons are built from).
 * `user.assignedRole` must be populated for employees.
 */
export const buildStaffPayload = (user) => {
  const plain = user.toObject ? user.toObject() : { ...user };

  delete plain.password;
  delete plain.verifyEmailOtp;
  delete plain.verifyEmailOtpExpire;
  delete plain.resetPasswordToken;
  delete plain.resetPasswordExpire;

  if (plain.role === "admin") {
    plain.permissions = fullPermissions();
    plain.assignedRole = null;
    return plain;
  }

  const role = plain.assignedRole;
  plain.permissions = sanitizePermissions(role?.permissions);
  plain.assignedRole = role
    ? { _id: role._id, name: role.name, isActive: role.isActive }
    : null;

  return plain;
};
