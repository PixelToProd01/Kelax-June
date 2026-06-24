import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import bgImage from "../../assets/regbg.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { serverUrl } from "../../App";
import { Eye, EyeOff } from "lucide-react";

const OTP_LENGTH = 6;

export default function ForgotPassword() {
  const navigate = useNavigate();

  /* ================= STEP CONTROL ================= */
  const [step, setStep] = useState(1); // 1=email | 2=otp | 3=reset

  /* ================= FORM STATES ================= */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  /* ================= OTP STATES ================= */
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const otpRefs = useRef([]);

  const [loading, setLoading] = useState(false);

  /* ================= OTP INPUT HANDLERS ================= */
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  /* ================= STEP 1 : SEND OTP ================= */
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Email is required");

    try {
      setLoading(true);

      const res = await axios.post(`${serverUrl}/api/auth/forgot-password`, {
        email,
      });
      

      toast.success("OTP sent to your email");

      // TEMP TOKEN FOR OTP VERIFY
      localStorage.setItem("verifyToken", res.data.verifyToken);

      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= STEP 2 : VERIFY OTP ================= */
  const handleVerifyOtp = async () => {
    if (otp.join("").length !== 6) {
      return toast.error("Enter valid 6 digit OTP");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${serverUrl}/api/auth/forgot-password/verify-otp`,
        { otp: otp.join("") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("verifyToken")}`,
          },
        }
      );

      toast.success("OTP verified");

      // IMPORTANT: SWITCH TOKEN
      localStorage.removeItem("verifyToken");
      localStorage.setItem("resetToken", res.data.resetToken);

      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= STEP 3 : RESET PASSWORD ================= */
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return toast.error("Both password fields are required");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    try {
      setLoading(true);

      await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        {
          newPassword: password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("resetToken")}`,
          },
        }
      );

      toast.success("Password reset successfully");

      localStorage.removeItem("resetToken");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen w-full flex items-center justify-center bg-cover bg-center md:mt-16"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 w-[90%] max-w-md">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Forgot Password
          </h2>

          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <>
              <p className="text-center text-white mb-6">
                Enter OTP sent to your email
              </p>

              <div className="flex justify-center gap-3 mb-6">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (otpRefs.current[i] = el)}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    onKeyDown={(e) => handleOtpKeyDown(e, i)}
                    maxLength={1}
                    className="w-12 h-12 text-xl text-center rounded-lg bg-white/20 text-white border border-white/30 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                ))}
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full cursor-pointer py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              {/* <button
                onClick={() => setStep(1)}
                className="w-full mt-3 text-sm text-white/70 hover:underline"
              >
                Change Email
              </button> */}
            </>
          )}

          {/* ================= STEP 3 ================= */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {/* <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /> */}

              <div className="relative">
                <label className="block text-sm text-white/80 mb-1">
                  New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer right-3 top-9 text-white/70"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative">
                <label className="block text-sm text-white/80 mb-1">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer right-3 top-9 text-white/70"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              /> */}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

          <p className="text-center text-white/70 text-sm mt-6">
            Remember password?{" "}
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
