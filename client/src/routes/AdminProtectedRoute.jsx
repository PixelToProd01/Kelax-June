import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectedRoute = () => {
  const { adminData, loading } = useSelector((state) => state.admin);

  if (loading) return null;

  // ⏳ abhi /me API chal rahi hai
  if (adminData === undefined) {
    return <div>Checking session...</div>;
  }

  // if (!adminData || role !== "admin") {
  if (!adminData) {
    return <Navigate to="/admin/login" replace />;
  }

  // ❌ role match nahi karta
  // if (!allowedRoles.includes(adminData.role)) {
  //   return <Navigate to="/login" replace />;
  // }

  return <Outlet />;
};

export default AdminProtectedRoute;