// partner or customer register + login
import PDFDocument from "pdfkit";
import path from "path";
import { fileURLToPath } from "url";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { sendForgotOtpMail, sendOtpMail } from "../emails/sendOtpMail.js";

// ========== Register =========
export const registerUser = async (req, res) => {
  const OTP_EXPIRES_MINUTES = 10; // OTP Valid For 10 Minutes Only

  try {
    const {
      fullName,
      email,
      password,
      phone,
      role,
      jobTitle,
      jobLevel,
      company,
    } = req.body;

    // 1️⃣ Basic user validation
    if (!fullName || !email || !phone || !password || !role) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    if (
      (role === "partner" || role === "customer") &&
      (!jobTitle || !jobLevel)
    ) {
      return res.status(400).json({
        message: "Job title and job level required for partner/customer",
      });
    }

    // 2️⃣ Role-based company validation
    if (role === "partner" || role === "customer") {
      if (!company) {
        return res.status(400).json({
          message: "Company details are required for partner/customer",
        });
      }

      const requiredCompanyFields = [
        "name",
        "address",
        "city",
        "pinCode",
        "phone",
        "email",
      ];
      for (let field of requiredCompanyFields) {
        if (!company[field]) {
          return res
            .status(400)
            .json({ message: `Company ${field} is required` });
        }
      }
    }

    // 3️⃣ Check if user already exists
    // const existUser = await User.findOne({ email }).select("-password");
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ message: "This Email Already Registered!" });
    }

    // 4️⃣ Hash password
    // const hashedPassword = await bcrypt.hash(password, 10); // user123 -> ejbcuwyecudddeybe

    // Make OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit
    const hashedOtp = await bcrypt.hash(otp, 10);

    const verifyEmailOtpExpire = Date.now() + OTP_EXPIRES_MINUTES * 60 * 1000;

    // 5️⃣ Prepare new user object
    // const newUser = new User.create({
    const user = await User.create({
      fullName,
      email,
      phone,
      // password: hashedPassword,
      password, // ✅ NO bcrypt here
      role,
      jobTitle: jobTitle || null,
      jobLevel: jobLevel || null,
      company: company || null,
      verifyEmailOtp: hashedOtp,
      verifyEmailOtpExpire,

      isVerified: false, // OTP verification can be implemented later
      userStatus: "pending", // Will be active after Admin verification
    });

    // Send OTP Mail
    const emailSent = await sendOtpMail(user, otp);

    if (!emailSent) {
      console.warn("OTP email failed but user registered");
    }

    // 🔐 TEMP TOKEN (15 min only)
    const verifyToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.status(201).json({
      success: true,
      message: "OTP sent to your email",
      verifyToken,
    });

    // 6️⃣ Save user
    // const user = await newUser.save();
    // const { password: pass, verifyEmailOtp: verify, ...rest } = user._doc; // hide Password

    // // 7️⃣ Respond
    // res.status(201).json({
    //   success: true,
    //   message:
    //     "User registered successfully. Please verify your email to activate account.",
    //   user: rest,
    // });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//  ===========  Email Verify ==========
export const emailVerify = async (req, res) => {
  const { otp } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!otp || !token) {
    return res.status(400).json({ message: "OTP required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || !user.verifyEmailOtp) {
      return res.status(400).json({ message: "Invalid request" });
    }

    if (user.verifyEmailOtpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const isMatch = await bcrypt.compare(otp, user.verifyEmailOtp);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.verifyEmailOtp = undefined;
    user.verifyEmailOtpExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ========== Login =========
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2️⃣ Find user
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3️⃣ Role check (IMPORTANT)
    if (!["partner", "customer"].includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "Only partners or customers can login here",
      });
    }

    // 4️⃣ Compare password
    // const isMatch = await bcrypt.compare(password, user.password);

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 5️⃣ Email verification
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    // 6️⃣ Account status check
    if (user.userStatus !== "active") {
      return res.status(403).json({
        success: false,
        message: "Your account is not active. Contact admin.",
      });
    }

    // 7️⃣ Generate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "30d",
    });

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    };

    // 8️⃣ Hide password
    const { password: pass, ...rest } = user._doc;

    // 9️⃣ Response
    res.status(200).cookie("token", token, options).json({
      success: true,
      message: "Login successful",
      //   token,
      user: rest,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ========== Logout =========
export const logoutUser = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    };

    res.status(200).clearCookie("token", options).json({
      success: true,
      message: "Logout Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout Error!",
    });
  }
};

//  ============== Forgot Password ===========
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // 🔐 ROLE CHECK (MAIN SECURITY)
    if (!["partner", "customer"].includes(user.role)) {
      return res.status(403).json({
        message: "Password reset not allowed for this account",
      });
    }

    // Optional: only verified users
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email first",
      });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetPasswordToken = otp;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Valid For 10 Minutes

    await user.save();

    const sendOtpEmail = await sendForgotOtpMail(user, otp);
    if (!sendOtpEmail) {
      return res
        .status(400)
        .json({ message: "Fail to Send Forgot Password OTP" });
    }

    // 🔐 TEMP TOKEN (15 min only)
    const verifyToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.status(200).json({
      success: true,
      message: "OTP sent to registered email",
      verifyToken,
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ============== Verify Forgot OTP ==============
export const verifyForgotOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) {
      return res.status(400).json({ message: "OTP is Required" });
    }

    const user = await User.findOne({
      resetPasswordToken: otp,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Create temporary reset token
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    // OTP invalidate
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP verified",
      resetToken,
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ============== Reset Password ==============
export const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!newPassword) {
      return res.status(400).json({ message: "Password is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // user.password = await bcrypt.hash(newPassword, 10);

    // ✅ ONLY SET PLAIN PASSWORD
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Invalid or expired token" });
  }
};

//  ============ getMe ===================
// export const getMe = async (req, res) => {
//   try {
//     res.status(200).json({
//       success: true,
//       user: req.user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Unable to fetch user",
//     });
//   }
// };

// ==============  Get My Profile  =======================
export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get User Profile Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//  -------------- Download Partner Certificate --------
// import PDFDocument from "pdfkit";
// import path from "path";
// import { fileURLToPath } from "url";
// import User from "../models/User.js";

// ✅ Fix __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const downloadCertificate = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      user.userStatus !== "active" ||
      !user.activeFrom ||
      !user.activeTill
    ) {
      return res.status(400).json({
        message: "Certificate not available. User not active.",
      });
    }

    const now = new Date();

    if (user.activeTill < now) {
      return res.status(400).json({
        message: "Certificate expired.",
      });
    }

    const doc = new PDFDocument({
      layout: "landscape",
      size: "A4",
    });

    // ✅ IMPORTANT: Pipe first before anything
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "inline; filename=certificate.pdf"
    );

    doc.pipe(res);

    // ✅ Correct template path
    const templatePath = path.join(
      __dirname,
      "../templates/certificate.png"
    );

    // Background image
    doc.image(templatePath, 0, 0, { width: 842 });

    // Partner Name
    doc.fontSize(28)
      .fillColor("#0f3b63")
      .text(user.company.name, 50, 230, {
        align: "center",
      });

    // Dates
    doc.fontSize(14)
      .fillColor("black")
      .text(
        // `Approval Date : ${user.activeFrom.toDateString()}`,
        ` ${user.activeFrom.toDateString()}`,
        550,
        390
      );

    doc.text(
      // `Cert. Expiry Date : ${user.activeTill.toDateString()}`,
      ` ${user.activeTill.toDateString()}`,
      560,
      415
    );

    doc.end(); // ✅ End after everything

  } catch (error) {
    console.error("Certificate Error:", error);

    // ✅ IMPORTANT: Don't crash server
    if (!res.headersSent) {
      res.status(500).json({
        message: "Failed to generate certificate",
      });
    }
  }
};


// --------------  Update My Profile  ---------------
// export const updateMyProfile = async (req, res) => {
//   try {
//     const { fullName, jobTitle, jobLevel } = req.body;

//     const user = await User.findById(req.user._id);

//     if (!user) return res.status(404).json({ message: "User Not Found" });

//     if (fullName) user.fullName = fullName;
//     if (jobTitle) user.jobTitle = jobTitle;
//     if (jobLevel) user.jobLevel = jobLevel;

//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Profile Updated",
//       user: {
//         fullName: user.fullName,
//         jobTitle: user.jobTitle,
//         jobLevel: user.jobLevel,
//       }
//     })
//   } catch (error) {
//     res.status(500).json({message: "Profile Updated Failed"})
//   }
// };

//  ------------- Delete User  ----------------------
export const userLogout = async (req, res) => {
  try {
    const cookiesToClear = ["token"];

    cookiesToClear.forEach((cookieName) => {
      res.clearCookie(cookieName, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
      });
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User logout failed",
    });
  }
};
