import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../App";
import { toast } from "react-hot-toast";
import { CheckCircle, XCircle, Clock, Trash2, Calendar } from "lucide-react";

const LIMIT = 50;

export default function AdminPartners() {
  const [partners, setPartners] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  //   const ITEMS_PER_PAGE = 50;
  //   const [currentPage, setCurrentPage] = useState(1);

  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTill, setActiveTill] = useState("");

  /* ================= FETCH ================= */
  const fetchPartners = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${serverUrl}/api/admin/partners?page=${page}&limit=${LIMIT}`,
        { withCredentials: true },
      );

      const data = res.data.partners || [];
      setPartners(data);
      setHasMore(data.length === LIMIT);
    } catch {
      toast.error("Failed to load partners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, [page]);

  /* ================= HELPERS ================= */
  const daysLeft = (date) => {
    if (!date) return "-";
    const diff = new Date(date) - new Date();
    if (diff <= 0) return "Expired";
    return Math.ceil(diff / (1000 * 60 * 60 * 24)) + " days left";
  };

  const statusStyle = (status, selected) => {
    const base =
      "transition-all duration-200 ease-out inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold focus:outline-none focus:ring-2";

    if (status === "active")
      return `${base} ${
        selected
          ? "bg-emerald-600 text-white ring-emerald-300"
          : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
      }`;

    if (status === "pending")
      return `${base} ${
        selected
          ? "bg-amber-500 text-white ring-amber-300"
          : "bg-amber-100 text-amber-700 hover:bg-amber-200"
      }`;

    return `${base} ${
      selected
        ? "bg-red-500 text-white ring-red-300"
        : "bg-red-100 text-red-700 hover:bg-red-200"
    }`;
  };

  /* ================= UPDATE STATUS ================= */
  const activateUser = async () => {
    if (!activeTill) return toast.error("Select expiry date");

    try {
      await axios.put(
        `${serverUrl}/api/admin/approve-user/${selectedUser._id}`,
        { status: "active", activeTill },
        { withCredentials: true },
      );

      toast.success("User activated");
      setSelectedUser(null);
      fetchPartners();
    } catch {
      toast.error("Failed to update status");
    }
  };

  /* ================= DELETE ================= */
  const deleteUser = async (id) => {
    if (!confirm("Delete this user permanently?")) return;

    try {
      await axios.delete(`${serverUrl}/api/admin/delete-user/${id}`, {
        withCredentials: true,
      });
      toast.success("User deleted");
      fetchPartners();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-4 md:p-2">
      <h1 className="text-2xl font-bold mb-6">Partners Management</h1>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-auto max-h-[60vh]">
        <table className="min-w-[1000px] text-sm">
          <thead className="bg-[#006db8] text-white sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left w-12 border-r border-gray-500">
                #
              </th>
              <th className="p-4 text-left border-r border-gray-500">User</th>
              <th className="p-4 text-left border-r border-gray-500">Job</th>
              <th className="p-4 text-left border-r border-gray-500">
                Company
              </th>
              <th className="p-4 text-left border-r border-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {partners.map((p, index) => (
              <tr key={p._id} className="border-t hover:bg-gray-50">
                {/* Number */}
                <td className="px-4 py-3 font-semibold text-gray-600 border-r border-gray-500">
                  {(page - 1) * LIMIT + index + 1}
                </td>

                {/* USER */}
                <td className="p-4 space-y-1 border-r border-gray-500">
                  <p className="font-semibold">Name: {p.fullName}</p>
                  <p className="text-gray-500">Email: {p.email}</p>
                  <p className="text-gray-500">Mobile: {p.phone}</p>
                  <p className="text-gray-500">
                    Registered At:{" "}
                    {new Date(p.createdAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">Email:</span>

                    {p.isVerified ? (
                      <span className="flex items-center gap-1 text-green-600 font-medium">
                        ✔ Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-600 font-medium">
                        ✖ Not Verified
                      </span>
                    )}
                  </div>

                  {/* ${statusStyle(p.userStatus, selectedUser?.id === p.id)} */}
                  <button
                    onClick={() => setSelectedUser(p)}
                    aria-label={`User status ${p.userStatus}`}
                    className={`
    relative group cursor-pointer
    ${statusStyle(p.userStatus, selectedUser?.id === p._id)}
    hover:scale-[1.03]
    active:scale-95
  `}
                  >
                    {/* Status Icon */}
                    {p.userStatus === "active" && <CheckCircle size={14} />}
                    {p.userStatus === "pending" && <Clock size={14} />}
                    {p.userStatus === "inactive" && <XCircle size={14} />}

                    {/* Status Text */}
                    <span className="capitalize">{p.userStatus}</span>

                    {/* Divider dot */}
                    <span className="opacity-60">•</span>

                    {/* Days Left */}
                    <span className="font-medium">
                      {daysLeft(p.activeTill)}
                    </span>

                    {/* Tooltip */}
                    <div
                      className="
    pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2
    whitespace-nowrap rounded-md bg-black text-white text-[11px]
    px-2 py-1 opacity-0 group-hover:opacity-100
    transition-opacity duration-200 z-20
  "
                    >
                      Account valid till{" "}
                      {new Date(p.activeTill).toLocaleDateString()}
                    </div>
                  </button>
                </td>

                {/* JOB */}
                <td className="p-4 border-r border-gray-500">
                  <p>
                    <b>Title:</b> {p.jobTitle || "-"}
                  </p>
                  <p>
                    <b>Level:</b> {p.jobLevel || "-"}
                  </p>
                </td>

                {/* COMPANY */}
                <td className="p-4 text-gray-700 space-y-1 border-r border-gray-500">
                  <p>
                    <b>Name:</b> {p.company?.name || "-"}
                  </p>
                  <p>
                    <b>Address:</b> {p.company?.address || "-"}
                  </p>
                  <p>
                    <b>City:</b> {p.company?.city || "-"}
                  </p>
                  <p>
                    <b>PinCode:</b> {p.company?.pinCode || "-"}
                  </p>
                  <p>
                    <b>Phone:</b> {p.company?.phone || "-"}
                  </p>
                  <p>
                    <b>Email:</b> {p.company?.email || "-"}
                  </p>
                  <p>
                    <b>Partnership Type:</b> {p.company?.partnershipType || "-"}
                  </p>
                  <p>
                    <b>Website:</b> {p.company?.website || "NA"}
                  </p>
                  <p>
                    <b>GST:</b> {p.company?.gstNumber || "NA"}
                  </p>
                </td>

                {/* ACTION */}
                <td className="p-4">
                  <button
                    onClick={() => deleteUser(p._id)}
                    className="flex cursor-pointer items-center gap-1 text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!partners.length && !loading && (
          <p className="text-center py-6 text-gray-500">No partners found</p>
        )}
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {partners.map((p) => (
          <div key={p._id} className="bg-white shadow rounded-xl p-4 space-y-2">
            <h2 className="font-semibold">Name: {p.fullName}</h2>
            <p className="text-sm text-gray-500">Email: {p.email}</p>
            <p className="text-sm">Phone: {p.phone}</p>

            <button
              onClick={() => setSelectedUser(p)}
              className={`px-3 py-1 rounded-full text-xs ${statusStyle(
                p.userStatus,
              )}`}
            >
              {p.userStatus} • {daysLeft(p.activeTill)}
            </button>

            <button
              onClick={() => deleteUser(p._id)}
              className="text-red-600 text-sm flex items-center gap-1"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 cursor-pointer py-2 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="font-semibold">Page {page}</span>

        <button
          disabled={!hasMore}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 cursor-pointer border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>

      {/* ================= MODAL ================= */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Calendar size={18} /> Activate Partner
            </h2>

            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setActiveTill(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 cursor-pointer py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={activateUser}
                className="px-4 cursor-pointer py-2 bg-green-600 text-white rounded"
              >
                Activate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
