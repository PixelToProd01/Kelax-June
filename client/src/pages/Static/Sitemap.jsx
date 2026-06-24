import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import React from "react";
import { Link } from "react-router-dom";

const Sitemap = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Register", path: "/register" },
    { name: "Login", path: "/login" },
    { name: "Forgot Password", path: "/forgot-password" },

    // Static pages
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
    { name: "Disclaimer", path: "/disclaimer" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms-conditions" },
    { name: "Make In India", path: "/make-in-india" },
    { name: "Return / Refund / Cancellation", path: "/return-refund-cancellation" },
  ];

  return (
    <>
    <Navbar />
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Sitemap</h1>

      <ul className="space-y-3">
        {links.map((item, index) => (
          <li key={index} className="text-lg">
            <Link
              to={item.path}
              className="text-blue-600 hover:underline hover:text-blue-800"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <Footer />
    </>
  );
};

export default Sitemap;
