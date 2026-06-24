import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, UserCheck, User, Package, Server, Computer } from "lucide-react";
import { serverUrl } from "../../App";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/admin/stats`, {
          withCredentials: true,
        });
        setStats(res.data.stats);
      } catch (err) {
        console.log(err);
        console.error("Stats fetch failed");
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-4 md:p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        {!stats ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <StatCard
              title="Total Users"
              value={stats.totalUsers - 1 || "0"}
              icon={<Users size={28} />}
              color="from-purple-400 to-purple-600"
            />

            <StatCard
              title="Total Products"
              value={stats.totalProducts || "0"}
              icon={<Package size={28} />}
              color="from-orange-400 to-orange-600"
            />

            <StatCard
              title="Total Partners"
              value={stats.totalPartners || "0"}
              icon={<UserCheck size={28} />}
              color="from-green-400 to-green-600"
            />

            <StatCard
              title="Total Servers"
              value={stats.totalServers || "0"}
              icon={<Server size={28} />}
              color="from-cyan-400 to-cyan-600"
            />

            <StatCard
              title="Total Customers"
              value={stats.totalCustomers || "0"}
              icon={<User size={28} />}
              color="from-blue-400 to-blue-600"
            />

            <StatCard
              title="Total Workstations"
              value={stats.totalWorkstations || "0"}
              icon={<Computer size={28} />}
              color="from-gray-400 to-gray-600"
            />
          </>
        )}
      </div>
    </div>
  );
};

/* ================= CARD ================= */

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold text-gray-800 mt-1">{value}</h2>
    </div>

    <div
      className={`w-14 h-14 rounded-full flex items-center justify-center text-white bg-gradient-to-r ${color}`}
    >
      {icon}
    </div>
  </div>
);

/* ================= SKELETON ================= */

const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between animate-pulse">
    <div className="space-y-3">
      <div className="h-4 w-24 bg-gray-300 rounded"></div>
      <div className="h-8 w-16 bg-gray-300 rounded"></div>
    </div>

    <div className="w-14 h-14 rounded-full bg-gray-300"></div>
  </div>
);

export default AdminDashboard;
