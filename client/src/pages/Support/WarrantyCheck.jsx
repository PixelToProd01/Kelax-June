import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { serverUrl } from "../../App";
import {
  ShieldCheck,
  CalendarDays,
  PackageSearch,
  Search,
  BadgeCheck,
} from "lucide-react";

const WarrantyCheck = () => {
  const [serial, setSerial] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Format Date -> DD/MM/YYYY
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB");
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!serial.trim()) return;

    try {
      setLoading(true);
      setError("");
      setData(null);

      const res = await axios.get(
        `${serverUrl}/api/warranty/check-warranty/${serial}`,
      );

      setData(res.data.warranty);
    } catch (err) {
      setError(err.response?.data?.message || "Warranty not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-[#f5f7ff] via-[#eef2ff] to-[#f8fafc] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* TOP HEADING */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 mb-5 shadow-md">
              <ShieldCheck className="w-10 h-10 text-indigo-600" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Warranty Product Check
            </h1>

            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
              Enter your product serial number to instantly verify warranty
              coverage and additional product support information.
            </p>
          </div>

          {/* SEARCH BOX */}
          <div className="bg-white rounded-3xl shadow-2xl p-5 md:p-8 border border-gray-100">
            <form
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row gap-4"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter Product Serial Number"
                  value={serial}
                  onChange={(e) => setSerial(e.target.value)}
                  className="w-full h-14 rounded-2xl border border-gray-300 bg-gray-50 px-5 pr-14 text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />

                <PackageSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition shadow-lg hover:shadow-indigo-300 flex items-center justify-center gap-2"
              >
                <Search size={20} />
                {loading ? "Checking..." : "Check Warranty"}
              </button>
            </form>

            {/* ERROR */}
            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-center font-medium">
                {error}
              </div>
            )}

            {/* RESULT */}
            {data && (
              <div className="mt-10">
                {/* STATUS CARD */}
                <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-2xl">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* LEFT SIDE - WARRANTY STATUS */}

                    <div>
                      <p className="text-indigo-100 text-sm uppercase tracking-wider mb-2">
                        Coverage Status
                      </p>

                      <div className="flex items-center gap-3">
                        {data.warrantyStatus === "Active" ? (
                          <BadgeCheck className="w-10 h-10 text-green-400" />
                        ) : (
                          <ShieldCheck className="w-10 h-10 text-red-400" />
                        )}

                        <h2 className="text-3xl font-bold">
                          {data.warrantyStatus}
                        </h2>
                      </div>

                      <p className="mt-4 text-indigo-100 leading-relaxed">
                        {data.warrantyStatus === "Active"
                          ? "Your product is currently protected under Kelax warranty coverage."
                          : "Warranty period has expired. Contact support for renewal options."}
                      </p>

                      <div className="mt-6">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            data.warrantyStatus === "Active"
                              ? "bg-green-500/20 text-green-200 border border-green-400"
                              : "bg-red-500/20 text-red-200 border border-red-400"
                          }`}
                        >
                          {data.warrantyType}
                        </span>
                      </div>
                    </div>

                    {/* CENTER - PRODUCT IMAGE */}

                    <div className="flex justify-center">
                      <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-lg">
                        <img
                          src={`${serverUrl}${data.image}`}
                          alt={data.productName}
                          className="w-full max-w-[280px] h-[220px] object-cover rounded-2xl"
                        />
                      </div>
                    </div>

                    {/* RIGHT SIDE - PRODUCT INFO */}

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                      <p className="text-sm text-indigo-100 mb-1">
                        Product Name
                      </p>

                      <h3 className="text-2xl font-bold mb-5">
                        {data.productName}
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-indigo-100">
                            Serial Number
                          </p>

                          <p className="font-semibold text-lg">
                            {data.serialNumber}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-indigo-100">
                            Customer Name
                          </p>

                          <p className="font-semibold">{data.customerName}</p>
                        </div>

                        <div>
                          <p className="text-sm text-indigo-100">
                            Reseller Name
                          </p>

                          <p className="font-semibold">{data.resellerName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DETAILS */}
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  {/* WARRANTY TYPE */}
                  <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mb-5">
                      <ShieldCheck className="text-indigo-600 w-7 h-7" />
                    </div>

                    <p className="text-gray-500 text-sm mb-2">Warranty Type</p>

                    <h3 className="text-2xl font-bold text-gray-900">
                      {data.warrantyType}
                    </h3>
                  </div>

                  {/* VALID FROM */}
                  <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition">
                    <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-5">
                      <CalendarDays className="text-green-600 w-7 h-7" />
                    </div>

                    <p className="text-gray-500 text-sm mb-2">Valid From</p>

                    <h3 className="text-2xl font-bold text-gray-900">
                      {formatDate(data.validFrom)}
                    </h3>
                  </div>

                  {/* VALID TO */}
                  <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition">
                    <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mb-5">
                      <CalendarDays className="text-red-600 w-7 h-7" />
                    </div>

                    <p className="text-gray-500 text-sm mb-2">Valid To</p>

                    <h3 className="text-2xl font-bold text-gray-900">
                      {formatDate(data.validTo)}
                    </h3>
                  </div>
                </div>

                {/* EXTRA NOTE */}
                <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-3xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Need Assistance?
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-5">
                    For warranty claims, support requests, or product-related
                    assistance, please reach out to our support team. Keep your
                    serial number handy for quicker support.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl p-4 shadow-sm border">
                      <p className="text-sm text-gray-500 mb-1">
                        Email Support
                      </p>

                      <a
                        href="mailto:info@kelax.in"
                        className="font-semibold text-[#006db8]"
                      >
                        info@kelax.in
                      </a>
                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow-sm border">
                      <p className="text-sm text-gray-500 mb-1">Call Us</p>

                      <a
                        href="tel:9654094331"
                        className="font-semibold text-[#006db8]"
                      >
                        +91 9654094331
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default WarrantyCheck;
