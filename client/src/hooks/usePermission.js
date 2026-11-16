import { useSelector } from "react-redux";

/**
 * RBAC helper for the admin panel (admin + employee).
 *
 *   const { can, isAdmin } = usePermission();
 *   can("products", "create")  // true / false
 *   can("partners")            // same as can("partners", "read")
 *
 * Admin => always true.
 * Employee => driven by adminData.permissions (sent by the backend).
 * NOTE: this only controls what the UI shows – the server enforces the same
 * rules on every API call.
 */
const usePermission = () => {
  const { adminData } = useSelector((state) => state.admin);

  const isAdmin = adminData?.role === "admin";
  const isEmployee = adminData?.role === "employee";

  const can = (moduleKey, action = "read") => {
    if (!adminData) return false;
    if (isAdmin) return true;
    return adminData.permissions?.[moduleKey]?.[action] === true;
  };

  return { can, isAdmin, isEmployee, adminData };
};

export default usePermission;
