// Admin only: manage roles + employees  (RBAC)
import mongoose from "mongoose";
import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import {
  getPermissionMeta,
  hasAnyPermission,
  sanitizePermissions,
} from "../config/permissions.js";

const PHONE_REGEX = /^\+?[0-9]{10,15}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPLOYEE_HIDDEN_FIELDS =
  "-password -verifyEmailOtp -verifyEmailOtpExpire -resetPasswordToken -resetPasswordExpire";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const handleError = (res, error, fallback) => {
  if (error?.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0];
    return res.status(409).json({
      success: false,
      message:
        field === "email"
          ? "This email is already registered"
          : "Role with this name already exists",
    });
  }
  if (error?.name === "ValidationError") {
    const message = Object.values(error.errors)[0]?.message || "Invalid data";
    return res.status(400).json({ success: false, message });
  }
  console.error(`${fallback}:`, error);
  return res.status(500).json({ success: false, message: fallback });
};

/* =========================================================
   META  ->  GET /api/rbac/meta
   (modules + actions so the UI never hard-codes them)
========================================================= */
export const getRbacMeta = (req, res) => {
  res.status(200).json({ success: true, ...getPermissionMeta() });
};

/* =========================================================
   ROLES
========================================================= */

// GET /api/rbac/roles
export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find().sort({ createdAt: -1 }).lean();

    const counts = await User.aggregate([
      { $match: { role: "employee", assignedRole: { $ne: null } } },
      { $group: { _id: "$assignedRole", count: { $sum: 1 } } },
    ]);
    const countMap = new Map(counts.map((c) => [String(c._id), c.count]));

    const data = roles.map((role) => ({
      ...role,
      permissions: sanitizePermissions(role.permissions),
      employeeCount: countMap.get(String(role._id)) || 0,
    }));

    res.status(200).json({ success: true, total: data.length, roles: data });
  } catch (error) {
    handleError(res, error, "Failed to fetch roles");
  }
};

// POST /api/rbac/roles
export const createRole = async (req, res) => {
  try {
    const { name, description = "", permissions, isActive = true } = req.body;

    if (!name || !name.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Role name is required" });
    }

    const cleanPermissions = sanitizePermissions(permissions);
    if (!hasAnyPermission(cleanPermissions)) {
      return res.status(400).json({
        success: false,
        message: "Select at least one permission for this role",
      });
    }

    const role = await Role.create({
      name: name.trim(),
      nameKey: name.trim().toLowerCase(),
      description,
      permissions: cleanPermissions,
      isActive: isActive !== false,
      createdBy: req.user._id,
    });

    res
      .status(201)
      .json({ success: true, message: "Role created successfully", role });
  } catch (error) {
    handleError(res, error, "Failed to create role");
  }
};

// PUT /api/rbac/roles/:id
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: "Invalid role id" });
    }

    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ success: false, message: "Role not found" });
    }

    const { name, description, permissions, isActive } = req.body;

    if (name !== undefined) {
      if (!name.trim()) {
        return res
          .status(400)
          .json({ success: false, message: "Role name is required" });
      }
      role.name = name.trim();
      role.nameKey = name.trim().toLowerCase();
    }

    if (description !== undefined) role.description = description;

    if (permissions !== undefined) {
      const cleanPermissions = sanitizePermissions(permissions);
      if (!hasAnyPermission(cleanPermissions)) {
        return res.status(400).json({
          success: false,
          message: "Select at least one permission for this role",
        });
      }
      role.permissions = cleanPermissions;
      role.markModified("permissions");
    }

    if (isActive !== undefined) role.isActive = isActive === true;

    await role.save();

    res
      .status(200)
      .json({ success: true, message: "Role updated successfully", role });
  } catch (error) {
    handleError(res, error, "Failed to update role");
  }
};

// PATCH /api/rbac/roles/:id/status   { isActive: true|false }
export const setRoleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: "Invalid role id" });
    }
    if (typeof isActive !== "boolean") {
      return res
        .status(400)
        .json({ success: false, message: "isActive must be true or false" });
    }

    const role = await Role.findByIdAndUpdate(
      id,
      { isActive },
      { new: true },
    );
    if (!role) {
      return res.status(404).json({ success: false, message: "Role not found" });
    }

    res.status(200).json({
      success: true,
      message: `Role ${isActive ? "activated" : "deactivated"} successfully`,
      role,
    });
  } catch (error) {
    handleError(res, error, "Failed to update role status");
  }
};

// DELETE /api/rbac/roles/:id
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: "Invalid role id" });
    }

    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ success: false, message: "Role not found" });
    }

    const inUse = await User.countDocuments({
      role: "employee",
      assignedRole: role._id,
    });
    if (inUse > 0) {
      return res.status(400).json({
        success: false,
        message: `${inUse} employee(s) are using this role. Reassign or delete them first.`,
      });
    }

    await role.deleteOne();

    res.status(200).json({ success: true, message: "Role deleted successfully" });
  } catch (error) {
    handleError(res, error, "Failed to delete role");
  }
};

/* =========================================================
   EMPLOYEES
========================================================= */

const populateRole = { path: "assignedRole", select: "name isActive permissions" };

const shapeEmployee = (employee) => {
  const plain = employee.toObject ? employee.toObject() : employee;
  if (plain.assignedRole) {
    plain.assignedRole.permissions = sanitizePermissions(
      plain.assignedRole.permissions,
    );
  }
  return plain;
};

// GET /api/rbac/employees?page=1&limit=10&search=&status=
export const getEmployees = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
    const { search = "", status = "", roleId = "" } = req.query;

    const filter = { role: "employee" };

    if (["active", "inactive"].includes(status)) filter.userStatus = status;
    if (roleId && isValidId(roleId)) filter.assignedRole = roleId;

    if (search.trim()) {
      const regex = new RegExp(escapeRegex(search.trim()), "i");
      filter.$or = [{ fullName: regex }, { email: regex }, { phone: regex }];
    }

    const [employees, total] = await Promise.all([
      User.find(filter)
        .select(EMPLOYEE_HIDDEN_FIELDS)
        .populate(populateRole)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      User.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.max(Math.ceil(total / limit), 1),
      employees: employees.map(shapeEmployee),
    });
  } catch (error) {
    handleError(res, error, "Failed to fetch employees");
  }
};

// POST /api/rbac/employees
export const createEmployee = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      password,
      jobTitle = "",
      assignedRole,
      userStatus = "active",
    } = req.body;

    if (!fullName?.trim() || !email?.trim() || !phone?.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, phone and password are required",
      });
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid email address" });
    }
    if (!PHONE_REGEX.test(phone.trim())) {
      return res.status(400).json({
        success: false,
        message: "Phone must be 10-15 digits (optional leading +)",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }
    if (!assignedRole || !isValidId(assignedRole)) {
      return res
        .status(400)
        .json({ success: false, message: "Please select a role" });
    }
    if (!["active", "inactive"].includes(userStatus)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const role = await Role.findById(assignedRole);
    if (!role) {
      return res.status(404).json({ success: false, message: "Role not found" });
    }
    if (!role.isActive) {
      return res.status(400).json({
        success: false,
        message: "This role is inactive. Activate it or pick another role.",
      });
    }

    const exists = await User.findOne({ email: email.trim().toLowerCase() });
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "This email is already registered" });
    }

    // password is hashed by the User model's pre-save hook
    const employee = await User.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      password,
      role: "employee",
      jobTitle: jobTitle.trim(),
      assignedRole: role._id,
      isVerified: true,
      userStatus,
    });

    const created = await User.findById(employee._id)
      .select(EMPLOYEE_HIDDEN_FIELDS)
      .populate(populateRole);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee: shapeEmployee(created),
    });
  } catch (error) {
    handleError(res, error, "Failed to create employee");
  }
};

// PUT /api/rbac/employees/:id    (email cannot be changed, password optional)
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid employee id" });
    }

    const employee = await User.findOne({ _id: id, role: "employee" });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    const { fullName, phone, jobTitle, password, assignedRole } = req.body;

    if (fullName !== undefined) {
      if (!fullName.trim()) {
        return res
          .status(400)
          .json({ success: false, message: "Name cannot be empty" });
      }
      employee.fullName = fullName.trim();
    }

    if (phone !== undefined) {
      if (!PHONE_REGEX.test(phone.trim())) {
        return res.status(400).json({
          success: false,
          message: "Phone must be 10-15 digits (optional leading +)",
        });
      }
      employee.phone = phone.trim();
    }

    if (jobTitle !== undefined) employee.jobTitle = jobTitle.trim();

    if (password) {
      if (password.length < 8) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 8 characters",
        });
      }
      employee.password = password; // hashed by pre-save hook
    }

    if (assignedRole !== undefined) {
      if (!isValidId(assignedRole)) {
        return res
          .status(400)
          .json({ success: false, message: "Please select a role" });
      }
      const role = await Role.findById(assignedRole);
      if (!role) {
        return res.status(404).json({ success: false, message: "Role not found" });
      }
      // an employee may keep their current (even inactive) role, but cannot
      // be moved INTO an inactive one
      const unchanged = String(employee.assignedRole) === String(role._id);
      if (!role.isActive && !unchanged) {
        return res.status(400).json({
          success: false,
          message: "This role is inactive. Activate it or pick another role.",
        });
      }
      employee.assignedRole = role._id;
    }

    await employee.save();

    const updated = await User.findById(employee._id)
      .select(EMPLOYEE_HIDDEN_FIELDS)
      .populate(populateRole);

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee: shapeEmployee(updated),
    });
  } catch (error) {
    handleError(res, error, "Failed to update employee");
  }
};

// PATCH /api/rbac/employees/:id/status   { status: "active" | "inactive" }
export const setEmployeeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!isValidId(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid employee id" });
    }
    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const employee = await User.findOneAndUpdate(
      { _id: id, role: "employee" },
      { userStatus: status },
      { new: true },
    )
      .select(EMPLOYEE_HIDDEN_FIELDS)
      .populate(populateRole);

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    res.status(200).json({
      success: true,
      message: `Employee ${status === "active" ? "activated" : "deactivated"} successfully`,
      employee: shapeEmployee(employee),
    });
  } catch (error) {
    handleError(res, error, "Failed to update employee status");
  }
};

// DELETE /api/rbac/employees/:id
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid employee id" });
    }

    const employee = await User.findOneAndDelete({ _id: id, role: "employee" });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    handleError(res, error, "Failed to delete employee");
  }
};
