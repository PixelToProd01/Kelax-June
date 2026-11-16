import { Link, Outlet } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import usePermission from "../hooks/usePermission";

/**
 * Wrap admin-panel routes:
 *   <Route element={<PermissionRoute module="products" action="create" />}>
 *   <Route element={<PermissionRoute adminOnly />}>
 * (must be rendered inside AdminProtectedRoute)
 */
const PermissionRoute = ({ module: moduleKey, action = "read", adminOnly = false }) => {
  const { can, isAdmin } = usePermission();

  const allowed = adminOnly ? isAdmin : can(moduleKey, action);

  if (allowed) return <Outlet />;

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
        <ShieldAlert size={32} />
      </div>
      <h2 className="text-xl font-bold text-gray-800">Access Denied</h2>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        You do not have permission to open this page. Please contact your
        administrator if you need access.
      </p>
      <Link
        to="/admin/dashboard"
        className="mt-5 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default PermissionRoute;
