import bgImage from "../../assets/regbg.jpg";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useDispatch } from "react-redux";
import { serverUrl } from "../../App.jsx";
import { setUserData } from "../../redux/slices/userSlice.js";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { clearAdminData } from "../../redux/slices/adminSlice.js";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Role → Route map
  const roleRedirectMap = {
    customer: "/customer/dashboard",
    partner: "/partner/dashboard",
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault(); // 🔥 IMPORTANT
    setLoading(true);

    if (!email || !password) {
      toast.error("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      const { user } = res.data;

      // ❌ Safety check
      if (!user) {
        toast.error("Invalid server response");
        return;
      }

      // ❌ Block admin / employee login
      if (!["customer", "partner"].includes(user.role)) {
        toast.error("You can login here only as Partner or Customer");
        setLoading(false);
        return;
      }

      // optional (sirf role agar chaho)
      localStorage.setItem("role", user.role);

      // ✅ REDUX STORE
      dispatch(setUserData(user));
      dispatch(clearAdminData()); // 🔥 VERY IMPORTANT

      toast.success("Login successful! Redirecting...");

      setTimeout(() => {
        navigate(roleRedirectMap[user.role], { replace: true });
      }, 1200);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Wrong email or password");
      } else {
        toast.error("Something went wrong. Try again!");
      }
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
            Login to Kelax
          </h2>

          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label className="block text-sm text-white/80 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm text-white/80 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
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

            <p className="text-right text-white/70 text-sm">
              <Link to="/forgot-password" className="hover:underline">
                Forgotten password?
              </Link>
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer mt-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-semibold"
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Login"}
            </button>
          </form>

          <p className="text-center text-white/70 text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="hover:underline font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
