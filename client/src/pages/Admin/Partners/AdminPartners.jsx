import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../App";
import { toast } from "react-hot-toast";
import usePermission from "../../../hooks/usePermission";
import {
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Calendar,
  Users,
  RefreshCw,
  Filter,
} from "lucide-react";

const LIMIT = 50;
const STATUS_FILTERS = [
  { value: "all", label: "All Partners" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "inactive", label: "Inactive" },
];

const normalizeStatus = (status) => {
  const value = String(status || "pending").toLowerCase();
  return ["active", "inactive", "pending"].includes(value) ? value : "pending";
};

export default function AdminPartners() {
  const { can } = usePermission();
  const canEdit = can("partners", "update");
  const canDelete = can("partners", "delete");
  const [partners, setPartners] = useState([]);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTill, setActiveTill] = useState("");
  const [activating, setActivating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Load every API page so the status filter works across ALL partners,
  // not just the 50 records on the currently selected backend page.
  const fetchPartners = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const allPartners = [];
      const seenIds = new Set();
      const seenPageSignatures = new Set();
      const MAX_PAGES = 200;

      for (let apiPage = 1; apiPage <= MAX_PAGES; apiPage += 1) {
        const res = await axios.get(
          `${serverUrl}/api/admin/partners?page=${apiPage}&limit=${LIMIT}`,
          { withCredentials: true },
        );

        const data = Array.isArray(res.data?.partners) ? res.data.partners : [];

        if (data.length === 0) break;

        // Prevent an infinite loop if the backend ignores the page parameter.
        const signature = data.map((user) => user._id).join(",");
        if (seenPageSignatures.has(signature)) break;
        seenPageSignatures.add(signature);

        data.forEach((user) => {
          if (user?._id && !seenIds.has(user._id)) {
            seenIds.add(user._id);
            allPartners.push(user);
          }
        });

        if (data.length < LIMIT) break;
      }

      setPartners(allPartners);
      setHasLoaded(true);
    } catch (error) {
      console.error("Failed to load partners:", error);
      toast.error(error.response?.data?.message || "Failed to load partners");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  const filteredPartners = useMemo(() => {
    if (statusFilter === "all") return partners;
    return partners.filter(
      (partner) => normalizeStatus(partner.userStatus) === statusFilter,
    );
  }, [partners, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredPartners.length / LIMIT));
  const currentPage = Math.min(page, totalPages);
  const visiblePartners = filteredPartners.slice(
    (currentPage - 1) * LIMIT,
    currentPage * LIMIT,
  );

  useEffect(() => {
    if (page !== currentPage) setPage(currentPage);
  }, [page, currentPage]);

  const counts = useMemo(
    () => ({
      all: partners.length,
      active: partners.filter((p) => normalizeStatus(p.userStatus) === "active")
        .length,
      pending: partners.filter(
        (p) => normalizeStatus(p.userStatus) === "pending",
      ).length,
      inactive: partners.filter(
        (p) => normalizeStatus(p.userStatus) === "inactive",
      ).length,
    }),
    [partners],
  );

  /* ================= HELPERS ================= */
  const daysLeft = (date) => {
    if (!date) return "-";
    const expiry = new Date(date);
    if (Number.isNaN(expiry.getTime())) return "-";
    const diff = expiry.getTime() - Date.now();
    if (diff <= 0) return "Expired";
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return `${days} day${days === 1 ? "" : "s"} left`;
  };

  const statusStyle = (status) => {
    const base =
      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors";
    switch (normalizeStatus(status)) {
      case "active":
        return `${base} bg-emerald-100 text-emerald-700 hover:bg-emerald-200`;
      case "pending":
        return `${base} bg-amber-100 text-amber-700 hover:bg-amber-200`;
      default:
        return `${base} bg-red-100 text-red-700 hover:bg-red-200`;
    }
  };

  const StatusIcon = ({ status, size = 14 }) => {
    const normalized = normalizeStatus(status);
    if (normalized === "active") return <CheckCircle size={size} />;
    if (normalized === "pending") return <Clock size={size} />;
    return <XCircle size={size} />;
  };

  const openActivationModal = (user) => {
    setSelectedUser(user);
    setActiveTill(
      user.activeTill && new Date(user.activeTill) > new Date()
        ? new Date(user.activeTill).toISOString().split("T")[0]
        : "",
    );
  };

  const closeActivationModal = () => {
    if (activating) return;
    setSelectedUser(null);
    setActiveTill("");
  };

  /* ================= UPDATE STATUS ================= */
  const activateUser = async () => {
    if (!selectedUser) return;
    if (!activeTill) {
      toast.error("Please select an account expiry date");
      return;
    }

    const selectedDate = new Date(`${activeTill}T23:59:59`);
    if (Number.isNaN(selectedDate.getTime()) || selectedDate < new Date()) {
      toast.error("Expiry date must be today or in the future");
      return;
    }

    try {
      setActivating(true);
      await axios.put(
        `${serverUrl}/api/admin/approve-user/${selectedUser._id}`,
        { status: "active", activeTill },
        { withCredentials: true },
      );

      toast.success("Partner activated successfully");
      setSelectedUser(null);
      setActiveTill("");
      await fetchPartners(true);
    } catch (error) {
      console.error("Failed to update partner status:", error);
      toast.error(error.response?.data?.message || "Failed to update status");
    } finally {
      setActivating(false);
    }
  };

  /* ================= DELETE ================= */
  const deleteUser = async (user) => {
    const confirmed = window.confirm(
      `Delete ${user.fullName || "this partner"} permanently? This action cannot be undone.`,
    );
    if (!confirmed) return;

    try {
      setDeletingId(user._id);
      await axios.delete(`${serverUrl}/api/admin/delete-user/${user._id}`, {
        withCredentials: true,
      });
      setPartners((current) => current.filter((p) => p._id !== user._id));
      toast.success("Partner deleted successfully");
    } catch (error) {
      console.error("Failed to delete partner:", error);
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return "-";
    return parsed.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const PartnerStatus = ({ partner }) => (
    <button
      type="button"
      onClick={() => canEdit && openActivationModal(partner)}
      disabled={!canEdit}
      aria-label={`Change ${partner.fullName || "partner"} status, currently ${normalizeStatus(partner.userStatus)}`}
      className={`${statusStyle(partner.userStatus)} ${canEdit ? "cursor-pointer" : "cursor-default"}`}
      title={
        partner.activeTill
          ? `Account valid till ${new Date(partner.activeTill).toLocaleDateString()}`
          : canEdit
            ? "Click to activate or set expiry date"
            : "You do not have permission to change status"
      }
    >
      <StatusIcon status={partner.userStatus} />
      <span className="capitalize">{normalizeStatus(partner.userStatus)}</span>
      <span className="opacity-60">•</span>
      <span>{daysLeft(partner.activeTill)}</span>
    </button>
  );

  const PartnerDetails = ({ partner }) => (
    <>
      <p className="font-semibold">Name: {partner.fullName || "-"}</p>
      <p className="text-gray-500 break-all">Email: {partner.email || "-"}</p>
      <p className="text-gray-500">Mobile: {partner.phone || "-"}</p>
      <p className="text-gray-500">
        Registered: {formatDate(partner.createdAt)}
      </p>
      <div className="flex items-center gap-2">
        <span className="text-gray-500">Email:</span>
        {partner.isVerified ? (
          <span className="font-medium text-green-600">✔ Verified</span>
        ) : (
          <span className="font-medium text-red-600">✖ Not Verified</span>
        )}
      </div>
      <div className="pt-1">
        <PartnerStatus partner={partner} />
      </div>
    </>
  );

  const DeleteButton = ({ partner }) => (
    <button
      type="button"
      onClick={() => deleteUser(partner)}
      disabled={deletingId === partner._id}
      className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash2 size={16} />
      {deletingId === partner._id ? "Deleting..." : "Delete"}
    </button>
  );

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-4 md:p-2">
      {/* <h1 className="text-2xl font-bold mb-6">Partners Management</h1> */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Partners Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Review partner accounts, filter by status, and manage access.
          </p>
        </div>
        <button
          type="button"
          onClick={() => fetchPartners(true)}
          disabled={loading || refreshing}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Status filters */}
      <div className="mb-5 rounded-xl border bg-white p-3 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
          <Filter size={16} />
          Filter partners by status
        </div>
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((filter) => {
            const count = counts[filter.value];
            const selected = statusFilter === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => {
                  setStatusFilter(filter.value);
                  setPage(1);
                }}
                className={`rounded-lg cursor-pointer border px-4 py-2 text-sm font-semibold transition-colors ${
                  selected
                    ? "border-[#006db8] bg-[#006db8] text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {filter.label}
                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                    selected
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between text-sm text-gray-600">
        <span className="inline-flex items-center gap-2">
          <Users size={16} />
          Showing {visiblePartners.length} of {filteredPartners.length} partners
        </span>
        {loading && <span>Loading partners...</span>}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-auto max-h-[60vh]">
        <table className="min-w-[1000px] text-sm">
          <thead className="sticky top-0 z-10 bg-[#006db8] text-white">
            <tr>
              <th className="w-12 border-r border-white/20 px-4 py-3 text-left">
                #
              </th>
              <th className="border-r border-white/20 p-4 text-left">User</th>
              <th className="border-r border-white/20 p-4 text-left">Job</th>
              <th className="border-r border-white/20 p-4 text-left">
                Company
              </th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visiblePartners.map((partner, index) => (
              <tr
                key={partner._id}
                className="border-t align-top hover:bg-gray-50"
              >
                <td className="border-r px-4 py-3 font-semibold text-gray-600">
                  {(currentPage - 1) * LIMIT + index + 1}
                </td>
                <td className="min-w-[270px] space-y-2 border-r p-4">
                  <PartnerDetails partner={partner} />
                </td>
                <td className="min-w-[150px] space-y-2 border-r p-4">
                  <p>
                    <b>Title:</b> {partner.jobTitle || "-"}
                  </p>
                  <p>
                    <b>Level:</b> {partner.jobLevel || "-"}
                  </p>
                </td>
                <td className="min-w-[250px] space-y-1 border-r p-4 text-gray-700">
                  <p>
                    <b>Name:</b> {partner.company?.name || "-"}
                  </p>
                  <p>
                    <b>Address:</b> {partner.company?.address || "-"}
                  </p>
                  <p>
                    <b>City:</b> {partner.company?.city || "-"}
                  </p>
                  <p>
                    <b>Pin Code:</b> {partner.company?.pinCode || "-"}
                  </p>
                  <p>
                    <b>Phone:</b> {partner.company?.phone || "-"}
                  </p>
                  <p className="break-all">
                    <b>Email:</b> {partner.company?.email || "-"}
                  </p>
                  <p>
                    <b>Partnership Type:</b>{" "}
                    {partner.company?.partnershipType || "-"}
                  </p>
                  <p className="break-all">
                    <b>Website:</b> {partner.company?.website || "NA"}
                  </p>
                  <p>
                    <b>GST:</b> {partner.company?.gstNumber || "NA"}
                  </p>
                </td>
                <td className="p-4">
                  {canDelete && <DeleteButton partner={partner} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && visiblePartners.length === 0 && (
          <div className="px-4 py-12 text-center text-gray-500">
            {hasLoaded
              ? `No ${statusFilter === "all" ? "" : statusFilter + " "}partners found.`
              : "Loading partners..."}
          </div>
        )}
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="space-y-4 md:hidden">
        {visiblePartners.map((partner, index) => (
          <article
            key={partner._id}
            className="space-y-3 rounded-xl bg-white p-4 shadow"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-1">
                <h2 className="break-words font-semibold">
                  {partner.fullName || "-"}
                </h2>
                <p className="break-all text-sm text-gray-500">
                  {partner.email || "-"}
                </p>
                <p className="text-sm text-gray-600">
                  Phone: {partner.phone || "-"}
                </p>
                <p className="text-xs text-gray-500">
                  Registered: {formatDate(partner.createdAt)}
                </p>
              </div>
              <span className="shrink-0 text-xs text-gray-400">
                #{(currentPage - 1) * LIMIT + index + 1}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <PartnerStatus partner={partner} />
              {partner.isVerified ? (
                <span className="text-xs font-medium text-green-600">
                  Email verified
                </span>
              ) : (
                <span className="text-xs font-medium text-red-600">
                  Email not verified
                </span>
              )}
            </div>
            <div className="space-y-1 border-t pt-3 text-sm text-gray-700">
              <p>
                <b>Job title:</b> {partner.jobTitle || "-"}
              </p>
              <p>
                <b>Job level:</b> {partner.jobLevel || "-"}
              </p>
              <p>
                <b>Company:</b> {partner.company?.name || "-"}
              </p>
              <p>
                <b>Address:</b> {partner.company?.address || "-"}
              </p>
              <p>
                <b>City:</b> {partner.company?.city || "-"}
              </p>
              <p>
                <b>Pin code:</b> {partner.company?.pinCode || "-"}
              </p>
              <p>
                <b>Company phone:</b> {partner.company?.phone || "-"}
              </p>
              <p className="break-all">
                <b>Company email:</b> {partner.company?.email || "-"}
              </p>
              <p>
                <b>Partnership type:</b>{" "}
                {partner.company?.partnershipType || "-"}
              </p>
              <p className="break-all">
                <b>Website:</b> {partner.company?.website || "NA"}
              </p>
              <p>
                <b>GST:</b> {partner.company?.gstNumber || "NA"}
              </p>
            </div>
            <div className="border-t pt-3">
              {canDelete && <DeleteButton partner={partner} />}
            </div>
          </article>
        ))}
        {!loading && visiblePartners.length === 0 && (
          <div className="rounded-xl bg-white px-4 py-12 text-center text-gray-500 shadow">
            {hasLoaded
              ? `No ${statusFilter === "all" ? "" : statusFilter + " "}partners found.`
              : "Loading partners..."}
          </div>
        )}
      </div>

      {/* ================= PAGINATION ================= */}
      {/* Client-side pagination for the filtered result set */}
      <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage <= 1 || loading}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Prev
          </button>
          <button
            type="button"
            disabled={currentPage >= totalPages || loading}
            onClick={() =>
              setPage((current) => Math.min(totalPages, current + 1))
            }
            className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeActivationModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="activate-partner-title"
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
          >
            <h2
              id="activate-partner-title"
              className="mb-2 flex items-center gap-2 text-lg font-bold"
            >
              <Calendar size={18} />
              {normalizeStatus(selectedUser.userStatus) === "active"
                ? "Update Partner Expiry"
                : "Activate Partner"}
            </h2>
            <p className="mb-4 text-sm text-gray-600">
              {selectedUser.fullName || selectedUser.email} — choose the date
              until which this account will remain active.
            </p>
            <label
              htmlFor="activeTill"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Account valid until
            </label>
            <input
              id="activeTill"
              type="date"
              min={new Date().toLocaleDateString("en-CA")}
              value={activeTill}
              onChange={(event) => setActiveTill(event.target.value)}
              className="mb-5 w-full rounded-lg border px-3 py-2 outline-none focus:border-[#006db8] focus:ring-2 focus:ring-blue-100"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeActivationModal}
                disabled={activating}
                className="rounded-lg border px-4 py-2 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={activateUser}
                disabled={activating || !activeTill}
                className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {activating ? "Saving..." : "Save & Activate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
