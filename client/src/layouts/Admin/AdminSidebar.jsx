import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PackagePlus,
  Package,
  Users,
  UserCheck,
  ShoppingCart,
  User,
  Menu,
  X,
  Award,
  View,
} from "lucide-react";
import { useState } from "react";

const sectionClass =
  "px-4 mt-6 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded-md text-sm transition
   ${
     isActive
       ? "bg-indigo-600 text-white"
       : "text-gray-300 hover:bg-gray-800 hover:text-white"
   }`;

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white p-2 rounded"
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 h-screen w-64 bg-slate-900 text-white
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Top Brand */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <h2 className="text-lg font-bold tracking-wide">Admin Panel</h2>
          <button onClick={() => setOpen(false)} className="md:hidden">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Area */}
        <nav className="h-[calc(100vh-64px)] overflow-y-auto pb-6">
          {/* Admin For */}
          <p className={sectionClass}>Admin For</p>

          <NavLink
            to="/admin/dashboard"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/profile"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <User size={18} />
            Profile
          </NavLink>

          {/* Products */}
          <p className={sectionClass}>Products</p>
          <NavLink
            to="/admin/create-product"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <PackagePlus size={18} />
            Create Product
          </NavLink>

          <NavLink
            to="/admin/view-product"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <Package size={18} />
            View Products
          </NavLink>

          {/* Add Warranty */}
          <NavLink
            to="/admin/add-warranty"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <Award size={18} />
            Add Warranty
          </NavLink>

          {/* View Warranty */}
          <NavLink
            to="/admin/view-warranty"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <View size={18} />
            View Warranty
          </NavLink>

          {/* Partners */}
          <p className={sectionClass}>Partners</p>
          <NavLink
            to="/admin/partners"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <Users size={18} />
            View Partners
          </NavLink>

          {/* Customers */}
          <p className={sectionClass}>Customers</p>
          <NavLink
            to="/admin/customers"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <UserCheck size={18} />
            View Customers
          </NavLink>

          {/* Orders */}
          {/* <p className={sectionClass}>Orders</p>
          <NavLink to="/admin/orders" className={linkClass} onClick={() => setOpen(false)}>
            <ShoppingCart size={18} />
            View Orders
          </NavLink> */}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
