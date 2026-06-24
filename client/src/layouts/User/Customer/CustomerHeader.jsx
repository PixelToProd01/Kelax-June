import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../../App";
import { toast } from "react-hot-toast";
import { clearUserData } from "../../../redux/slices/userSlice";
import { clearAdminData } from "../../../redux/slices/adminSlice";

const CustomerHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      // 🔥 CLEAR EVERYTHING
      dispatch(clearAdminData())
      dispatch(clearUserData());
      localStorage.removeItem("role");

      toast.success("Logged out successfully");

      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex justify-between items-center bg-white px-6 py-3 shadow">
      <h2 className="text-lg font-bold">Customer Dashboard Panel</h2>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default CustomerHeader;
