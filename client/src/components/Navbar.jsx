import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import blogo from "../assets/blogo.png";

// React Icons
import { FaBars, FaTimes, FaServer, FaLaptopCode } from "react-icons/fa";
import { FaHandshake, FaNetworkWired } from "react-icons/fa";
import { FiPhoneCall, FiCheckCircle, FiDownload } from "react-icons/fi";
import { PiBuildingOfficeFill } from "react-icons/pi";

import {
  FiPackage,
  FiUsers,
  FiLifeBuoy,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

import { FiLayers, FiPhone } from "react-icons/fi";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const { adminData } = useSelector((state) => state.admin);
  // console.log("Yha prr hai admin ka data",adminData)

  const [openMenu, setOpenMenu] = useState(null); // desktop dropdown
  const [mobileOpen, setMobileOpen] = useState(false); // mobile menu
  const [mobileDropdown, setMobileDropdown] = useState(null); // mobile dropdown

  const handleMobileNavigate = (path) => {
    navigate(path);
    setMobileOpen(false);
    setMobileDropdown(null);
  };

  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"; // disable background scroll
    } else {
      document.body.style.overflow = "auto"; // re-enable scroll
    }
  }, [mobileOpen]);

  const navigate = useNavigate();

 const getDashboardConfig = () => {

  // 🔐 Admin logged in
  if (adminData?.role === "admin") {
    return {
      label: "Admin Dashboard",
      path: "/admin/dashboard",
    };
  }

  // 👤 Partner / Customer
  if (userData?.role === "partner") {
    return {
      label: "Partner Dashboard",
      path: "/partner/dashboard",
    };
  }

  if (userData?.role === "customer") {
    return {
      label: "Customer Dashboard",
      path: "/customer/dashboard",
    };
  }

  // ❌ No one logged in
  return {
    label: "Register / Login",
    path: "/register",
  };
};


  const { label, path } = getDashboardConfig();

  return (
    <div className="w-full fixed top-0 left-0 select-none z-50 backdrop-blur-xl bg-white/60 border-b border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
      {/* ================= TOP NAVBAR ================= */}
      <div className="flex items-center justify-between px-6 lg:px-12 py-4">
        {/* LOGO */}
        <img
          src={blogo}
          alt="Logo"
          className="h-12 cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* ======== DESKTOP NAVIGATION ======== */}
        <ul className="hidden lg:flex items-center gap-8 text-[16px] font-medium text-gray-800">
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("products")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <li className="cursor-pointer text-black hover:text-[#006db8] transition">
              Products ▾
            </li>

            {openMenu === "products" && (
              <div className="absolute left-0 top-full w-full bg-transparent py-6 px-12 flex justify-center gap-36 z-40"></div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("partners")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <li className="cursor-pointer text-black hover:text-[#006db8] transition">
              Partners ▾
            </li>

            {openMenu === "partners" && (
              <div className="absolute left-0 top-full w-full bg-transparent py-6 px-12 flex justify-center gap-36 z-40">
                {/* <div
                  className="flex items-center gap-3 cursor-pointer group hover:bg-gray-100 px-4 py-2 rounded"
                  onClick={() => navigate("/partners/alliance")}
                >
                  <FaHandshake
                    size={26}
                    className="transition group-hover:text-[#006db8]"
                  />
                  <p className="font-medium transition group-hover:text-[#006db8]">
                    Alliance Partners
                  </p>
                </div> */}
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("support")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <li className="cursor-pointer text-black hover:text-[#006db8] transition">
              Support ▾
            </li>

            {openMenu === "support" && (
              <div className="absolute left-0 top-full w-full bg-transparent py-6 px-12 flex justify-center gap-36 z-40"></div>
            )}
          </div>

          <li
            className="cursor-pointer text-black hover:text-[#006db8] transition"
            onClick={() => navigate("/resources")}
          >
            Resources
          </li>

          <li
            className="cursor-pointer text-black hover:text-[#006db8] transition"
            onClick={() => navigate("/company")}
          >
            Company
          </li>

          <li
            className="cursor-pointer text-black hover:text-[#006db8] transition"
            onClick={() => navigate("/contact-us")}
          >
            Contact Us
          </li>
        </ul>

        {/* Partner dashboard + registration --> This is Long Way */}
        {/* {userData?.role === "partner" ? (
          <button
            className="hidden lg:block bg-[#006db8] text-white px-5 py-2 cursor-pointer rounded-md hover:bg-[#005a98]"
            onClick={() => navigate("/partner/dashboard")}
          >
            Partner Dashboard
          </button>
        ) : (
          <button
            className="hidden lg:block bg-[#006db8] text-white px-5 py-2 cursor-pointer rounded-md hover:bg-[#005a98]"
            onClick={() => navigate("/register")}
          >
            Register / Login
          </button>
        )} */}

        <button
          className="hidden lg:block bg-[#006db8] text-white px-5 py-2 cursor-pointer rounded-md hover:bg-[#005a98]"
          onClick={() => navigate(path)}
        >
          {label}
        </button>

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden text-3xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ------ MEGA DROPDOWNS (DESKTOP) ------- */}

      {/* PRODUCTS */}
      {openMenu === "products" && (
        <div
          className="absolute left-0 top-full w-full bg-white shadow-lg border-t 
    py-6 px-12 flex justify-center gap-36 z-40"
          onMouseEnter={() => setOpenMenu("products")}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div
            className="flex items-center gap-3 cursor-pointer group hover:bg-gray-100 px-4 py-2 rounded"
            onClick={() => navigate("/products/server")}
          >
            <FaServer
              size={26}
              className="transition group-hover:text-[#006db8]"
            />
            <p className="font-medium transition group-hover:text-[#006db8]">
              Server
            </p>
          </div>

          <div
            className="flex items-center gap-3 cursor-pointer group hover:bg-gray-100 px-4 py-2 rounded"
            onClick={() => navigate("/products/workstation")}
          >
            <FaLaptopCode
              size={26}
              className="transition group-hover:text-[#006db8]"
            />
            <p className="font-medium transition group-hover:text-[#006db8]">
              Workstation
            </p>
          </div>
        </div>
      )}

      {/* PARTNERS */}
      {openMenu === "partners" && (
        <div
          className="absolute left-0 top-full w-full bg-white shadow-lg border-t 
    py-6 px-12 flex justify-center gap-36 z-40"
          onMouseEnter={() => setOpenMenu("partners")}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div
            className="flex items-center gap-3 cursor-pointer group hover:bg-gray-100 px-4 py-2 rounded"
            onClick={() => navigate("/partners/technology")}
          >
            <FaHandshake
              size={26}
              className="transition group-hover:text-[#006db8]"
            />
            <p className="font-medium transition group-hover:text-[#006db8]">
              Technology Partners
            </p>
          </div>

          <div
            className="flex items-center gap-3 cursor-pointer group hover:bg-gray-100 px-4 py-2 rounded"
            onClick={() => navigate("/partners/channel")}
          >
            <FaNetworkWired
              size={26}
              className="transition group-hover:text-[#006db8]"
            />
            <p className="font-medium transition group-hover:text-[#006db8]">
              Channel Partners
            </p>
          </div>
        </div>
      )}

      {/* SUPPORT */}
      {openMenu === "support" && (
        <div
          className="absolute left-0 top-full w-full bg-white shadow-lg border-t 
    py-6 px-12 flex justify-center gap-36 z-40"
          onMouseEnter={() => setOpenMenu("support")}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div
            className="flex items-center gap-3 cursor-pointer group hover:bg-gray-100 px-4 py-2 rounded"
            onClick={() => navigate("/support/warranty-call-log")}
          >
            <FiPhoneCall
              size={26}
              className="transition group-hover:text-[#006db8]"
            />
            <p className="font-medium transition group-hover:text-[#006db8]">
              Warranty Call Log
            </p>
          </div>

          <div
            className="flex items-center gap-3 cursor-pointer group hover:bg-gray-100 px-4 py-2 rounded"
            onClick={() => navigate("/support/warranty-check")}
          >
            <FiCheckCircle
              size={26}
              className="transition group-hover:text-[#006db8]"
            />
            <p className="font-medium transition group-hover:text-[#006db8]">
              Warranty Check
            </p>
          </div>

          <div
            className="flex items-center gap-3 cursor-pointer group hover:bg-gray-100 px-4 py-2 rounded"
            onClick={() => navigate("/support/downloads")}
          >
            <FiDownload
              size={26}
              className="transition group-hover:text-[#006db8]"
            />
            <p className="font-medium transition group-hover:text-[#006db8]">
              Downloads
            </p>
          </div>
        </div>
      )}

      {/* ================= MOBILE NAVIGATION ================= */}
      {mobileOpen && (
        <div className="lg:hidden bg-white shadow-xl w-full px-6 py-5 flex flex-col gap-5 animate-slideDown rounded-b-2xl">
          {/* ITEM BLOCK COMPONENT */}
          <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() =>
                setMobileDropdown(
                  mobileDropdown === "products" ? null : "products"
                )
              }
            >
              <div className="flex items-center gap-3">
                <span className="text-xl text-blue-600">
                  <FiPackage />
                </span>
                <p className="font-semibold text-gray-900 text-[17px]">
                  Products
                </p>
              </div>

              <span className="text-xl">
                {mobileDropdown === "products" ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </span>
            </div>

            {mobileDropdown === "products" && (
              <div className="mt-3 pl-9 flex flex-col gap-3">
                <p
                  className="cursor-pointer text-gray-700"
                  onClick={() => handleMobileNavigate("/products/server")}
                >
                  Servers
                </p>
                <p
                  className="cursor-pointer text-gray-700"
                  onClick={() => handleMobileNavigate("/products/workstation")}
                >
                  Workstation
                </p>
              </div>
            )}
          </div>

          {/* PARTNERS */}
          <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() =>
                setMobileDropdown(
                  mobileDropdown === "partners" ? null : "partners"
                )
              }
            >
              <div className="flex items-center gap-3">
                <span className="text-xl text-purple-600">
                  <FiUsers />
                </span>
                <p className="font-semibold text-gray-900 text-[17px]">
                  Partners
                </p>
              </div>

              <span className="text-xl">
                {mobileDropdown === "partners" ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </span>
            </div>

            {mobileDropdown === "partners" && (
              <div className="mt-3 pl-9 flex flex-col gap-3">
                <p
                  className="cursor-pointer text-gray-700"
                  onClick={() => handleMobileNavigate("/partners/technology")}
                >
                  Technology Partners
                </p>
                <p
                  className="cursor-pointer text-gray-700"
                  onClick={() => handleMobileNavigate("/partners/channel")}
                >
                  Channel Partners
                </p>
              </div>
            )}
          </div>

          {/* SUPPORT */}
          <div className="border border-gray-200 rounded-xl p-4 shadow-sm">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() =>
                setMobileDropdown(
                  mobileDropdown === "support" ? null : "support"
                )
              }
            >
              <div className="flex items-center gap-3">
                <span className="text-xl text-red-500">
                  <FiLifeBuoy />
                </span>
                <p className="font-semibold text-gray-900 text-[17px]">
                  Support
                </p>
              </div>

              <span className="text-xl">
                {mobileDropdown === "support" ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </span>
            </div>

            {mobileDropdown === "support" && (
              <div className="mt-3 pl-9 flex flex-col gap-3">
                <p
                  className="cursor-pointer text-gray-700"
                  onClick={() =>
                    handleMobileNavigate("/support/warranty-call-log")
                  }
                >
                  Warranty Call Log
                </p>
                <p
                  className="cursor-pointer text-gray-700"
                  onClick={() =>
                    handleMobileNavigate("/support/warranty-check")
                  }
                >
                  Warranty Check
                </p>
                <p
                  className="cursor-pointer text-gray-700"
                  onClick={() => handleMobileNavigate("/support/downloads")}
                >
                  Downloads
                </p>
              </div>
            )}
          </div>

          {/* DIRECT LINKS */}
          <div className="flex flex-col gap-3 pl-1 mt-2">
            <div
              className="flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer 
               hover:bg-gray-100 transition-all group"
              onClick={() => handleMobileNavigate("/resources")}
            >
              <span className="text-lg text-blue-600 group-hover:translate-x-1 transition">
                <FiLayers />
              </span>
              <p className="text-gray-800 font-medium group-hover:text-blue-600">
                Resources
              </p>
            </div>

            <div
              className="flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer 
               hover:bg-gray-100 transition-all group"
              onClick={() => handleMobileNavigate("/company")}
            >
              <span className="text-lg text-purple-600 group-hover:translate-x-1 transition">
                <PiBuildingOfficeFill />
              </span>
              <p className="text-gray-800 font-medium group-hover:text-purple-600">
                Company
              </p>
            </div>

            <div
              className="flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer 
               hover:bg-gray-100 transition-all group"
              onClick={() => handleMobileNavigate("/contact-us")}
            >
              <span className="text-lg text-green-600 group-hover:translate-x-1 transition">
                <FiPhone />
              </span>
              <p className="text-gray-800 font-medium group-hover:text-green-600">
                Contact Us
              </p>
            </div>
          </div>

          <button
            className="bg-[#006db9] text-white w-full py-3 rounded-lg hover:bg-[#005a98] font-medium text-[16px] mt-1"
            onClick={() => handleMobileNavigate("/register")}
          >
            Register/Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;