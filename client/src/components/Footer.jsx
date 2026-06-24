import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import wlogo from "../assets/wlogo.png";

export default function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#004f8b] to-[#0079c9] text-gray-200 pt-16 pb-10 px-6 md:px-20 relative overflow-hidden">
      {/* Glass Blur Effect Circles */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-10">
        {/* Brand Section */}
        <div className="col-span-2 md:col-span-2">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-wide">
            <img
              src={wlogo}
              alt="Logo"
              className="h-12 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </h2>
          <p className="text-gray-300 leading-6">
            High-performance Servers & Workstations engineered for India’s
            digital future. Made with precision. Designed for reliability.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5 mt-6">
            {[
              { Icon: FaFacebook, link: "https://www.facebook.com/share/1aThYg4PzJ/?mibextid=wwXIfr" },
              { Icon: FaInstagram, link: "https://www.instagram.com/kelax.india" },
              { Icon: FaLinkedin, link: "https://www.linkedin.com/company/104266748/admin/dashboard/" },
              { Icon: FaXTwitter, link: "https://x.com/KelaxI63233" },
            ].map(({ Icon, link }) => (
              <Icon
                key={link}
                size={28}
                className="cursor-pointer hover:scale-110 hover:text-white transition-all duration-300"
                onClick={() => window.open(link, "_blank")}
              />
            ))}
          </div>
        </div>

        {/* Solutions */}
        <FooterColumn
          title="Solutions"
          links={[
            { label: "Media & Entertainment", path: "/solutions/industry/media-entertainment" },
            { label: "Security & Surveillance", path: "/solutions/industry/security-surveillance" },
            { label: "Government & Public Sector", path: "/solutions/industry/government-public-sector" },
            { label: "Education & Academic", path: "/solutions/industry/education-academic" },
            { label: "See All", path: "/solutions" },
          ]}
          navigate={navigate}
        />

        {/* Support */}
        <FooterColumn
          title="Support"
          links={[
            { label: "Technical Support", path: "/technical-support" },
            { label: "Warranty Check", path: "/warranty-check" },
            { label: "Downloads", path: "/downloads" },
            { label: "Solutions", path: "/solutions" },
          ]}
          navigate={navigate}
        />

        {/* Quick Links */}
        <FooterColumn
          title="Company"
          links={[
            { label: "About Us", path: "/about-us" },
            { label: "Make in India", path: "/make-in-india" },
            { label: "Contact Us", path: "/contact-us" },
            { label: "Disclaimer", path: "/disclaimer" },
          ]}
          navigate={navigate}
        />

        {/* Policies */}
        <FooterColumn
          title="Legal"
          links={[
            { label: "Terms & Conditions", path: "/terms-conditions" },
            { label: "Privacy & Security", path: "/privacy-policy" },
            {
              label: "Return / Refund / Cancellation",
              path: "/return-refund-cancellation",
            },
            { label: "Sitemap", path: "/sitemap" },
          ]}
          navigate={navigate}
        />
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/20 mt-12 pt-5 text-center">
        <p className="text-sm text-gray-200 tracking-wide">
          {/* © 2021–{currentYear} | Kelax • All Rights Reserved. */}
          © {currentYear} | Kelax All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

/* Reusable Component */
function FooterColumn({ title, highlighted, links, navigate }) {
  return (
    <div>
      <h3 className="text-white font-semibold text-xl mb-4">{title}</h3>

      {highlighted && (
        <p className="text-yellow-300 font-semibold mb-3 text-[15px]">
          {highlighted}
        </p>
      )}

      <ul className="space-y-2">
        {links.map((item) => (
          <li
            key={item.label}
            className="cursor-pointer hover:text-white hover:translate-x-1 transition-all duration-300 text-[15px]"
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
