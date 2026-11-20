import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../App";

const CustomerProfile = () => {
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
        console.error("Customer profile error:", err);
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const formatDate = (date) => {
    if (!date) return "NA";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "NA";

    return parsedDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRemainingDays = (activeTill) => {
    if (!activeTill) return null;

    const expiryDate = new Date(activeTill);

    if (Number.isNaN(expiryDate.getTime())) return null;

    return Math.max(
      0,
      Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24)),
    );
  };

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

  const company = profile.company || {};
  const remainingDays = getRemainingDays(profile.activeTill);

  const accountStatus =
    profile.userStatus ||
    profile.status ||
    (remainingDays === null
      ? "Unknown"
      : remainingDays > 0
        ? "Active"
        : "Expired");

  const isActive =
    accountStatus.toLowerCase() === "active" &&
    (remainingDays === null || remainingDays > 0);

  const activeFrom = profile.activeFrom || profile.createdAt;
  const activeTill = profile.activeTill;

  let totalDays = "NA";

  if (activeFrom && activeTill) {
    const start = new Date(activeFrom);
    const end = new Date(activeTill);

    if (!Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime())) {
      totalDays = Math.max(0, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8">
          Customer Profile
        </h1>

        {/* USER DETAILS */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-5 sm:p-8 rounded-2xl shadow-xl mb-8">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
            <h2 className="text-xl font-semibold text-white">User Details</h2>

            <span
              className={`px-4 py-1 text-xs rounded-full font-medium ${
                isActive
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {accountStatus}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
            <p>
              <strong className="text-white">Full Name:</strong>{" "}
              {profile.fullName || "NA"}
            </p>

            <p>
              <strong className="text-white">Email:</strong>{" "}
              {profile.email || "NA"}
            </p>

            <p>
              <strong className="text-white">Mobile:</strong>{" "}
              {profile.phone || "NA"}
            </p>

            <p>
              <strong className="text-white">Job Title:</strong>{" "}
              {profile.jobTitle || "NA"}
            </p>

            <p>
              <strong className="text-white">Job Level:</strong>{" "}
              {profile.jobLevel || "NA"}
            </p>

            <p>
              <strong className="text-white">Email Verified:</strong>{" "}
              <span
                className={
                  profile.emailVerified || profile.isVerified
                    ? "text-green-400"
                    : "text-yellow-400"
                }
              >
                {profile.emailVerified || profile.isVerified
                  ? "Verified"
                  : "Not Verified"}
              </span>
            </p>

            <p>
              <strong className="text-white">Account Created:</strong>{" "}
              {formatDate(profile.createdAt)}
            </p>

            <p>
              <strong className="text-white">Active From:</strong>{" "}
              {formatDate(activeFrom)}
            </p>

            <p>
              <strong className="text-white">Active To:</strong>{" "}
              {formatDate(activeTill)}
            </p>

            <p>
              <strong className="text-white">Total Plan:</strong>{" "}
              {totalDays === "NA" ? "NA" : `${totalDays} Days`}
            </p>

            <p>
              <strong className="text-white">Remaining:</strong>{" "}
              {remainingDays === null ? "NA" : `${remainingDays} Days`}
            </p>
          </div>
        </div>

        {/* COMPANY DETAILS */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-5 sm:p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-6">
            Company Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
            <p>
              <strong className="text-white">Company Name:</strong>{" "}
              {company.name || "NA"}
            </p>

            <p>
              <strong className="text-white">Website:</strong>{" "}
              {company.website || "NA"}
            </p>

            <p>
              <strong className="text-white">GST Number:</strong>{" "}
              {company.gst || "NA"}
            </p>

            <p>
              <strong className="text-white">Company Email:</strong>{" "}
              {company.email || "NA"}
            </p>

            <p>
              <strong className="text-white">Company Phone:</strong>{" "}
              {company.phone || "NA"}
            </p>

            <p>
              <strong className="text-white">Address:</strong>{" "}
              {company.address || "NA"}
            </p>

            <p>
              <strong className="text-white">City:</strong>{" "}
              {company.city || "NA"}
            </p>

            <p>
              <strong className="text-white">Pincode:</strong>{" "}
              {company.pinCode || "NA"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
