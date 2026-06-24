import { Router } from "express";
import {
  emailVerify,
  getMyProfile,
  loginUser,
  logoutUser,
  registerUser,
  forgotPassword,
  verifyForgotOtp,
  resetPassword,
  userLogout,
  downloadCertificate,
} from "../controllers/auth.controllers.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const authRouter = Router();

// User Auth
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", isAuthenticated, logoutUser);

// OTP Verify
authRouter.post("/email-verify", emailVerify); // Verify Email For User Register

// Forgot Password Otp + Verify + reset Password
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/forgot-password/verify-otp", verifyForgotOtp);
authRouter.post("/reset-password", resetPassword);

// User Routes
authRouter.get("/me", isAuthenticated, getMyProfile);

// Update My Profile  ----> Partner, Customer
// authRouter.put("/update-profile/:userId", isAuthenticated, )

// Download Partner Certificate Route
authRouter.get("/certificate/download", isAuthenticated, downloadCertificate)

//  Delete User --> Partner and Customer
authRouter.post("/user/logout", userLogout);

export default authRouter;

// AUTH
// router.post("/register/verify-otp", verifyRegisterOtp);

// // PASSWORD
// router.post("/forgot-password", forgotPassword);
// router.post("/forgot-password/verify-otp", verifyForgotOtp);
// router.post("/reset-password", resetPassword);
