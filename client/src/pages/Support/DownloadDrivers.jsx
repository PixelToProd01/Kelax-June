import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import React from "react";
import { Link } from "react-router-dom";
import { Wrench, ArrowLeft, Hammer } from "lucide-react";

const DownloadDrivers = () => {
  return (
    <>
      <Navbar />
       <div className="min-h-screen flex items-center justify-center px-6 mt-20">
        <div className="max-w-2xl w-full p-10 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center shadow-lg">
              <Hammer className="w-12 h-12 text-[#006db8]" />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-[#006db8] font-semibold text-sm mb-5">
            <Wrench size={18} />
            Under Development
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
            This Page is
            <span className="text-[#006db8]"> Under Development</span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            We're currently working hard to bring you this page with exciting
            features and valuable content.
            <br />
            Please check back soon.
          </p>

          {/* Loading Animation */}
          <div className="flex justify-center gap-2 mb-10">
            <span className="w-3 h-3 rounded-full bg-[#006db8] animate-bounce"></span>
            <span
              className="w-3 h-3 rounded-full bg-[#006db8] animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></span>
            <span
              className="w-3 h-3 rounded-full bg-[#006db8] animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#006db8] hover:bg-[#00579a] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>

            <button
              onClick={() => window.location.reload()}
              className="border cursor-pointer border-[#006db8] text-[#006db8] hover:bg-blue-50 px-8 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Refresh Page
            </button>
          </div>

          {/* Footer Text */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Thank you for your patience. Our team is working to launch this
              page as soon as possible.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DownloadDrivers;
