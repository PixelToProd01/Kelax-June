import React, { useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import bgImage from "../../assets/regbg.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { serverUrl } from "../../App.jsx";

const OTP_LENGTH = 6;

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = Register | 2 = OTP
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* ================= USER STATE ================= */
  const [userForm, setUserForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "partner",
    jobTitle: "",
    jobTitleOther: "",
    jobLevel: "",
    jobLevelOther: "",
  });

  /* ================= COMPANY STATE ================= */
  const [companyForm, setCompanyForm] = useState({
    name: "",
    address: "",
    city: "",
    pinCode: "",
    phone: "",
    email: "",
    website: "",
    gstNumber: "",
    partnershipType: "",
  });

  /* ================= OTP ================= */
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const otpRefs = useRef([]);

  /* ================= HANDLERS ================= */

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ===== OTP INPUT (FIXED DELETE + AUTO MOVE) ===== */
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

  /* ================= REGISTER SUBMIT ================= */
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...userForm,
        jobTitle:
          userForm.jobTitle === "Other"
            ? userForm.jobTitleOther
            : userForm.jobTitle,

        jobLevel:
          userForm.jobLevel === "Other"
            ? userForm.jobLevelOther
            : userForm.jobLevel,

        company:
          userForm.role === "partner" || userForm.role === "customer"
            ? companyForm
            : null,
      };

      const res = await axios.post(`${serverUrl}/api/auth/register`, payload, {
        withCredentials: true,
      });

      localStorage.setItem("verifyToken", res.data.verifyToken);
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const handleVerifyOtp = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/auth/email-verify`,
        { otp: otp.join("") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("verifyToken")}`,
          },
        }
      );

      toast.success("Email verified successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      toast.error(err.response.data.message || "Invalid OTP");
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 md:mt-16"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="w-full max-w-5xl backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 mt-24 mb-24">
          <h2 className="text-3xl font-bold text-white text-center mb-2">
            Create Account as a {userForm.role}
          </h2>

          {step === 1 && (
            <p className="text-white/70 text-center mb-6">
              Already registered?{" "}
              <Link to="/login" className="underline font-semibold">
                Login here
              </Link>
            </p>
          )}

          {/* ================= STEP 1 : REGISTER ================= */}
          {step === 1 && (
            <form onSubmit={handleRegister}>
              {/* ROLE SWITCH */}
              <div className="flex bg-white/20 rounded-full p-1 mb-8 max-w-md mx-auto">
                {["partner", "customer"].map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setUserForm((p) => ({ ...p, role: r }))}
                    className={`flex-1 py-2 cursor-pointer rounded-full font-semibold transition ${
                      userForm.role === r
                        ? "bg-blue-600 text-white"
                        : "text-white/70"
                    }`}
                  >
                    {r.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* USER INFO */}
              <Section title="Personal Information">
                <Input
                  name="fullName"
                  required
                  label="Full Name"
                  onChange={handleUserChange}
                />
                <Input
                  name="phone"
                  required
                  label="Contact Number"
                  onChange={handleUserChange}
                />
                <Input
                  name="email"
                  required
                  label="Email"
                  type="email"
                  onChange={handleUserChange}
                />
                {/* <Input
                  name="phone"
                  required
                  label="Contact Number"
                  onChange={handleUserChange}
                /> */}
                {/* <Input name="password" label="Password" type="password" onChange={handleUserChange} /> */}
                {/* Password */}
                <div className="relative">
                  <Input
                    name="password"
                    required
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    // value={password}
                    onChange={handleUserChange}
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

                <Select
                  name="jobTitle"
                  required
                  label="Job Title *"
                  onChange={handleUserChange}
                  options={[
                    "Sales",
                    "Pre Sales",
                    "Technical",
                    "Management",
                    "Finance",
                    "CEO",
                    "BDM",
                    "Director",
                    "Other",
                  ]}
                />
                {userForm.jobTitle === "Other" && (
                  <Input
                    name="jobTitleOther"
                    required
                    label="Specify Job Title"
                    onChange={handleUserChange}
                  />
                )}

                <Select
                  name="jobLevel"
                  required
                  label="Job Level *"
                  onChange={handleUserChange}
                  options={[
                    "Staff",
                    "Low Management",
                    "Mid Management",
                    "Senior Management",
                    "Other",
                  ]}
                />
                {userForm.jobLevel === "Other" && (
                  <Input
                    name="jobLevelOther"
                    required
                    label="Specify Job Level"
                    onChange={handleUserChange}
                  />
                )}
              </Section>

              {/* COMPANY INFO */}
              <Section title="Company Information">
                <Input
                  name="name"
                  required
                  label="Company Name"
                  onChange={handleCompanyChange}
                />
                <Input
                  name="email"
                  required
                  label="Company Email"
                  onChange={handleCompanyChange}
                />
                <Input
                  name="phone"
                  required
                  label="Company Phone"
                  onChange={handleCompanyChange}
                />
                <Input
                  name="website"
                  label="Company Website"
                  onChange={handleCompanyChange}
                />
                <Input
                  name="address"
                  required
                  label="Company Address"
                  onChange={handleCompanyChange}
                />
                <Input
                  name="city"
                  required
                  label="City"
                  onChange={handleCompanyChange}
                />
                <Input
                  name="pinCode"
                  required
                  label="Pin Code"
                  onChange={handleCompanyChange}
                />
                <Input
                  name="gstNumber"
                  label="GST Number"
                  onChange={handleCompanyChange}
                />

                {userForm.role === "partner" && (
                  <Select
                    name="partnershipType"
                    required
                    label="Partnership Type *"
                    onChange={handleCompanyChange}
                    options={[
                      "Reseller",
                      "Solution Provider",
                      "System Integrator",
                      "Solution Partner",
                      "Consultant",
                      "OEM",
                    ]}
                  />
                )}
              </Section>

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer mt-10 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                {loading ? "Processing..." : "Register & Send OTP"}
              </button>
            </form>
          )}

          {/* ================= STEP 2 : OTP ================= */}
          {step === 2 && (
            <div className="max-w-md mx-auto">
              <p className="text-center text-white mb-6">
                Enter OTP sent to your email
              </p>

              <div className="flex justify-center gap-3 mb-8">
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
                className="w-full py-3 cursor-pointer rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Verify OTP
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

/* ================= REUSABLE UI ================= */

const Section = ({ title, children }) => (
  <>
    <h3 className="text-xl text-white font-semibold mb-4 mt-8">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  </>
);

const Input = ({ label, type = "text", name, onChange, required = false }) => (
  <div>
    <label className="block text-sm text-white/80 mb-1">
      {label} {required && "*"}
    </label>
    <input
      name={name}
      type={type}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-3 rounded-xl bg-white/20 text-white outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const Select = ({ label, options, name, onChange }) => (
  <div>
    <label className="block text-sm text-white/80 mb-1">{label}</label>
    <select
      name={name}
      onChange={onChange}
      required
      className="w-full px-4 py-3 rounded-xl bg-white/20 text-white outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="text-black">
          {opt}
        </option>
      ))}
    </select>
  </div>
);
