import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  FileDown,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { FaRegHandshake } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { FaUsersViewfinder } from "react-icons/fa6";

const sectionClass =
  "px-4 mt-6 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded-md text-sm transition
   ${
     isActive
       ? "bg-indigo-600 text-white"
       : "text-gray-300 hover:bg-gray-800 hover:text-white"
   }`;

const PartnerSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
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
          <h2 className="text-lg font-bold tracking-wide">
            Partner Panel
          </h2>
          <button onClick={() => setOpen(false)} className="md:hidden">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Nav */}
        <nav className="h-[calc(100vh-64px)] overflow-y-auto pb-6">

          {/* Partner Section */}
          <p className={sectionClass}>Partner Menu</p>

          <NavLink
            to="/partner/dashboard"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/partner/profile"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <User size={18} />
            Profile
          </NavLink>

          <NavLink
            to="/partner/certificate"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <FileDown size={18} />
            Certificate Downloads
          </NavLink>

          <NavLink
            to="/partner/deal-registration"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <FaRegHandshake size={18} />
            Register Deal
          </NavLink>

          <NavLink
            to="/partner/my-deals"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <FaUsersViewfinder size={18} />
            My Deals
          </NavLink>

          <NavLink
            to="/support/downloads"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <LuDownload size={18} />
            Downloads Drivers
          </NavLink>

          <NavLink
            to="/support/warranty-check"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <ShieldCheck size={18} />
            Check Warranty
          </NavLink>

        </nav>
      </aside>
    </>
  );
};

export default PartnerSidebar;
