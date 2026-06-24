import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/* =========================
   AUTHENTICATION For User -> Partners and Customer
========================= */
export const isAuthenticated = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Get token from cookie or header
    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2️⃣ No token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Find user (exclude password)
    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User no longer exists",
      });
    }

    // ✅ 5️⃣ STATUS CHECK
    if (user.userStatus !== "active") {
      return res.status(403).json({
        success: false,
        message: "Account is inactive. Contact admin.",
      });
    }

    // 6️⃣ Attach user to request
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

/* =========================
   Admin Authenticated only for Admin
========================= */

export const isAdminAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken;
    if (!token) {
      return res.status(401).json({ message: "Admin not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await User.findById(decoded._id).select("-password");

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Admin access denied" });
    }

    req.user = admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid admin token" });
  }
};

/* =========================
   Protect
========================= */
// export const protect = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) return res.status(401).json({ message: "Not authorized" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = await User.findById(decoded.id).select("-password");

//     if (!req.user) return res.status(401).json({ message: "User not found" });

//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };


/* =========================
   Admin Only AUTHORIZATION (ROLES)
========================= */
// export const adminOnly = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res
//       .status(403)
//       .json({ message: "Admin access only" });
//   }
//   next();
// };


/* =========================
   AUTHORIZATION (ROLES)
========================= */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to access this resource",
      });
    }

    next();
  };
};
