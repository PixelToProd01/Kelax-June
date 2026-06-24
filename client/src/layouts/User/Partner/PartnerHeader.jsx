import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAdminData } from "../../../redux/slices/adminSlice";
import { serverUrl } from "../../../App";
import { toast } from "react-hot-toast";
import { clearUserData } from "../../../redux/slices/userSlice";
import { Home, LogOut } from "lucide-react";

const PartnerHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/auth/user/logout`,
        {},
        { withCredentials: true }
      );

      // 🔥 CLEAR EVERYTHING
      dispatch(clearAdminData());
      dispatch(clearUserData());
      localStorage.removeItem("role");
      localStorage.clear();

      toast.success("Logged out successfully");

      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err);
      toast.error("Logout failed");
    }
  };

  return (
    <header className="w-full bg-white shadow-md px-4 sm:px-6 py-3 flex items-center justify-between">
      {/* LEFT SIDE */}
      <div className="flex flex-col md:ml-1 ml-14">
        <h1 className="text-base sm:text-lg font-semibold text-gray-800">
          Hello {userData?.fullName || "Partner"} 👋
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Welcome to Partner Portal
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Go to Website */}
        <button
          onClick={() => navigate("/")}
          className="flex cursor-pointer items-center gap-1 text-sm sm:text-base bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded transition"
        >
          <Home size={16} />
          <span className="hidden sm:inline">View Website</span>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex cursor-pointer items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded transition text-sm sm:text-base"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default PartnerHeader;
 