import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../App";

const PartnerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/auth/me`, {
          withCredentials: true,
        });

        setProfile(res.data.user);
      } catch (err) {
        console.log(err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <p className="animate-pulse text-lg">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-red-400">
        {error}
      </div>
    );
  }

  if (!profile) return null;

  // Date Calculations
  const today = new Date();
  const activeFromDate = new Date(profile.activeFrom);
  const activeToDate = new Date(profile.activeTill);

  const totalDays = Math.ceil(
    (activeToDate - activeFromDate) / (1000 * 60 * 60 * 24),
  );

  const remainingDays = Math.ceil(
    (activeToDate - today) / (1000 * 60 * 60 * 24),
  );

  const isActive = remainingDays > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Partner Profile</h1>

        {/* USER DETAILS */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">User Details</h2>

            <span
              className={`px-4 py-1 text-xs rounded-full font-medium ${
                isActive
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {isActive ? "Active" : "Expired"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
            <p>
              <strong className="text-white">Username:</strong>{" "}
              {profile.fullName}
            </p>
            <p>
              <strong className="text-white">Email:</strong> {profile.email}
            </p>
            <p>
              <strong className="text-white">Mobile:</strong> {profile.phone}
            </p>
            <p>
              <strong className="text-white">Job Title:</strong>{" "}
              {profile.jobTitle}
            </p>
            <p>
              <strong className="text-white">Job Level:</strong>{" "}
              {profile.jobLevel}
            </p>

            {/* <p><strong className="text-white">Active From:</strong> {profile.activeFrom}</p> */}
            <p>
              <strong className="text-white">Active From:</strong>{" "}
              {new Date(profile.activeFrom).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            {/* <p><strong className="text-white">Active To:</strong> {profile.activeTill}</p> */}
            <p>
              <strong className="text-white">Active To:</strong>{" "}
              {new Date(profile.activeTill).toLocaleString("en-In", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p>
              <strong className="text-white">Total Plan:</strong> {totalDays}{" "}
              Days
            </p>
            <p>
              <strong className="text-white">Remaining:</strong>{" "}
              {remainingDays > 0 ? `${remainingDays} Days` : "0 Days"}
            </p>
          </div>
        </div>

        {/* COMPANY DETAILS */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-6">
            Company Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
            <p>
              <strong className="text-white">Company Name:</strong>{" "}
              {profile.company.name}
            </p>
            <p>
              <strong className="text-white">Partner Type:</strong>{" "}
              {profile.company.partnershipType}
            </p>
            <p>
              <strong className="text-white">Website:</strong>{" "}
              {profile.company.website || "NA"}
            </p>
            <p>
              <strong className="text-white">GST Number:</strong>{" "}
              {profile.company.gst || "NA"}
            </p>

            <p>
              <strong className="text-white">Company Email:</strong>{" "}
              {profile.company.email}
            </p>
            <p>
              <strong className="text-white">Company Phone:</strong>{" "}
              {profile.company.phone}
            </p>

            <p>
              <strong className="text-white">Address:</strong>{" "}
              {profile.company.address}
            </p>
            <p>
              <strong className="text-white">City:</strong>{" "}
              {profile.company.city}
            </p>
            <p>
              <strong className="text-white">Pincode:</strong>{" "}
              {profile.company.pinCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerProfile;
