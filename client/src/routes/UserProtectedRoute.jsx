import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProtectedRoute = ({ allowedRoles }) => {
  const { userData, loading } = useSelector((state) => state.user);

  if(loading) return null;

  // ⏳ /me API chal rahi hai
  if (userData === undefined) {
    return <div>Checking session...</div>;
  }

  // ❌ login nahi hai
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  // ❌ role match nahi karta
  if (!allowedRoles.includes(userData.role)) {
    return <Navigate to="/login" replace />;
  }

  // ✅ login + role OK
  return <Outlet />;
};


export default UserProtectedRoute;