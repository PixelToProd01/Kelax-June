import React from "react";
import { Link } from "react-router-dom";

const PartnerDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 flex flex-col">

      {/* Main Section */}
      <main className="flex-1 flex items-center justify-center px-6">

        <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-12 rounded-2xl shadow-2xl text-center max-w-xl w-full">

          <h2 className="text-3xl font-semibold text-white mb-4">
            Welcome to Partner Portal
          </h2>

          <p className="text-gray-300 text-sm mb-10">
            Manage your services and access your account.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">

            <Link to="/partner/dashboard" className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer transition-all duration-300 text-white px-8 py-3 rounded-lg text-sm font-medium shadow-lg">
              Dashboard
            </Link>

            <Link to="/partner/profile" className="bg-white/20 hover:bg-white/30 cursor-pointer transition-all duration-300 text-white px-8 py-3 rounded-lg text-sm font-medium border border-white/30">
              Profile
            </Link>

            <Link to="/partner/certificate" className="bg-white/20 hover:bg-white/30 cursor-pointer transition-all duration-300 text-white px-8 py-3 rounded-lg text-sm font-medium border border-white/30">
              Certificate
            </Link>

          </div>

        </div>

      </main>

    </div>
  );
};

export default PartnerDashboard;
