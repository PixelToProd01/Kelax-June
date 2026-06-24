import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { serverUrl } from "../../App";
import { useDispatch } from "react-redux";
import { setAdminData } from "../../redux/slices/adminSlice";
import { clearUserData } from "../../redux/slices/userSlice";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/admin/login`,
        { email, password },
        { withCredentials: true }
      );

      const user = result.data.user;
      // role check
      if (user.role !== "admin") {
        toast.error("Not authorized");
        return;
      }

      // ✅ SAVE ROLE FROM BACKEND
      localStorage.setItem("role", user.role);

      // ✅ SET REDUX USER
      dispatch(setAdminData(user));
      dispatch(clearUserData());

      toast.success("Admin Login Successful");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
