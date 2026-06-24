// admin actions like create employee
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

//  Admin Login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !["admin", "employee"].includes(user.role)) {
    return res.status(403).json({ message: "Admin access only" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" },
  );

  res.cookie("adminToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  const { password: pass, ...safeUser } = user._doc;

  res.status(200).json({
    success: true,
    message: "Admin logged in",
    user: safeUser,
    // user,
  });
};

//  Admin Logout
export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("adminToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Admin logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Admin logout failed",
    });
  }
};

// ========== Get Admin  ==================
// controllers/adminController.js
export const getAdminMe = async (req, res) => {
  try {
    const token = req.cookies.adminToken;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await User.findById(decoded._id).select("-password");

    // if (!admin || !["admin", "employee"].includes(admin.role)) {
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.status(200).json({
      success: true,
      user: admin,
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Get Admin Stats for Show on Admin Dashboard
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalPartners = await User.countDocuments({
      role: "partner",
    });

    const totalCustomers = await User.countDocuments({
      role: "customer",
    });

    const totalProducts = await Product.countDocuments();

    const totalServers = await Product.countDocuments({
      category: "server"
    })

    const totalWorkstations = await Product.countDocuments({
      category: "workstation"
    })

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalPartners,
        totalCustomers,
        totalProducts,
        totalServers,
        totalWorkstations
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin states",
    });
  }
};

// Edit Admin Profile
export const updateAdminProfile = async (req, res) => {
  try {
    const { fullName, phone } = req.body;

    const admin = await User.findById(req.user._id);

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    if (fullName) admin.fullName = fullName;
    if (phone) admin.phone = phone;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Profile updated",
      user: {
        fullName: admin.fullName,
        phone: admin.phone,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Profile update failed" });
  }
};

// For Change Admin Password
export const changeAdminPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Old and new password required" });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    const admin = await User.findById(req.user._id).select("+password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await admin.matchPassword(oldPassword);

    if (!isMatch) {
      return res.status(401).json({
        message: "Old password is incorrect",
      });
    }

    admin.password = newPassword;
    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Password change failed" });
  }
};

/* ================= VIEW PARTNERS ================= */
export const getAllPartners = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const partners = await User.find({ role: "partner" })
      .select("-password -verifyEmailOtp -resetPasswordToken")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments({role: "partner" });

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      partners,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= VIEW CUSTOMERS ================= */
export const getAllCustomers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const customers = await User.find({ role: "customer" })
      .select("-password -verifyEmailOtp -resetPasswordToken")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments({ role: "customer" });

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      customers,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= Approve User Controller ================= */
export const approveUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status, activeTill } = req.body;

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const now = new Date();

    // 🔒 BLOCK EDIT IF USER ALREADY ACTIVE
    if (user.userStatus === "active" && status === "active") {
      return res.status(400).json({
        message: "Active user cannot be modified until expired or inactive",
      });
    }

    /* =========================
       ACTIVATE USER
    ========================== */
    if (status === "active") {
      if (!activeTill) {
        return res.status(400).json({
          message: "activeTill date is required",
        });
      }

      // 🟢 Convert DATE to END OF DAY
      const expiryDate = new Date(activeTill);
      expiryDate.setHours(23, 59, 59, 999);

      if (expiryDate <= now) {
        return res.status(400).json({
          message: "activeTill must be a future date",
        });
      }

      user.userStatus = "active";
      user.activeFrom = now;
      user.activeTill = expiryDate;
    }

    /* =========================
       DEACTIVATE USER
    ========================== */
    if (status === "inactive") {
      user.userStatus = "inactive";
      user.activeFrom = null;
      user.activeTill = null;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${status} successfully`,
      user,
    });
  } catch (error) {
    console.error("Approve user error:", error);
    res.status(500).json({
      message: "Failed to update user status",
    });
  }
};

  // @desc    Delete user (Admin only)
  // @route   DELETE /api/admin/delete-user/:userId
  // @access  Admin

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // ❌ invalid mongo id
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId);

    // ❌ user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ❌ admin cannot delete himself
    if (user._id.toString() === req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Admin cannot delete himself" });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      userId,
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};


// Create Employee BY Admin  --> Pending Currently
export const createEmployee = async (req, res) => {
  const { fullName, email, password, phone, jobTitle } = req.body;

  if (!fullName || !email || !password || !jobTitle) {
    return res.status(400).json({ message: "All fields required" });
  }

  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json({ message: "User exists" });

  const hashed = await bcrypt.hash(password, 10);

  const employee = await User.create({
    fullName,
    email,
    phone,
    password: hashed,
    role: "employee",
    jobTitle,
    isVerified: true,
    userStatus: "active",
  });

  res.status(201).json({ success: true, employee });
};
