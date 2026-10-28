import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  RefreshCw,
  Search,
  CheckCircle2,
  XCircle,
  ClipboardList,
  BriefcaseBusiness,
  CalendarDays,
  UserRound,
  Mail,
  Phone,
  MapPin,
  Package,
  FileText,
  Hash,
  Eye,
  Check,
  X,
} from "lucide-react";

import {
  getAllDeals,
  updateDealStatus,
} from "../../../services/dealService";

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const statusStyles = {
  Submitted: "bg-blue-50 text-blue-700 ring-blue-600/20",
  Approved: "bg-green-50 text-green-700 ring-green-600/20",
  Rejected: "bg-red-50 text-red-700 ring-red-600/20",
};

function StatusBadge({ status }) {
  const validStatus = statusStyles[status] ? status : "Submitted";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${statusStyles[validStatus]}`}
    >
      {validStatus}
    </span>
  );
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="min-w-0 rounded-lg border border-slate-100 bg-slate-50 p-3">
      <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
        <Icon size={15} className="shrink-0 text-[#006db8]" />
        {label}
      </div>

      <p className="break-words text-sm font-medium text-slate-800">
        {value === undefined ||
        value === null ||
        String(value).trim() === ""
          ? "—"
          : String(value)}
      </p>
    </div>
  );
}

export default function ManageDeals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const loadDeals = useCallback(async (showToast = false) => {
    setLoading(true);

    try {
      const { data } = await getAllDeals();

      setDeals(Array.isArray(data.deals) ? data.deals : []);

      if (showToast) {
        toast.success("Deals refreshed successfully.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to load deals."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDeals();
  }, [loadDeals]);

  const handleStatusChange = async (deal, status) => {
    if (savingId || deal.status !== "Submitted") return;

    let adminRemarks = "";

    if (status === "Approved") {
      const confirmed = window.confirm(
        `Are you sure you want to approve deal ${deal.dealId}?`
      );

      if (!confirmed) return;
    } else if (status === "Rejected") {
      const remarks = window.prompt(
        `Enter the rejection reason for ${deal.dealId} (required):`
      );

      if (remarks === null) return;

      adminRemarks = remarks.trim();

      if (!adminRemarks) {
        toast.error("A rejection reason is required.");
        return;
      }

      if (adminRemarks.length > 2000) {
        toast.error("Rejection reason cannot exceed 2000 characters.");
        return;
      }

      const confirmed = window.confirm(
        `Reject deal ${deal.dealId} with the reason you entered?`
      );

      if (!confirmed) return;
    } else {
      return;
    }

    try {
      setSavingId(deal._id);

      const { data } = await updateDealStatus(deal._id, {
        status,
        adminRemarks,
      });

      if (!data.deal) {
        throw new Error("The server did not return the updated deal.");
      }

      setDeals((previous) =>
        previous.map((item) =>
          item._id === deal._id ? data.deal : item
        )
      );

      toast.success(
        status === "Approved"
          ? `${deal.dealId} approved successfully.`
          : `${deal.dealId} rejected successfully.`
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to update deal status."
      );

      // Reload server data in case another admin already reviewed it.
      await loadDeals();
    } finally {
      setSavingId(null);
    }
  };

  const filteredDeals = deals.filter((deal) => {
    const partnerName =
      deal.partner?.fullName ||
      deal.partner?.name ||
      deal.partner?.email ||
      "";

    const query = search.trim().toLowerCase();

    const matchesSearch =
      !query ||
      [
        deal.dealId,
        deal.customerName,
        deal.customerEmail,
        deal.customerContact,
        deal.customerAddress,
        deal.productType,
        deal.productRequirements,
        partnerName,
        deal.partner?.email,
      ].some((value) =>
        String(value || "").toLowerCase().includes(query)
      );

    const matchesStatus =
      filterStatus === "All" || deal.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      label: "Total Deals",
      value: deals.length,
      icon: BriefcaseBusiness,
      color: "text-[#006db8]",
    },
    {
      label: "Submitted",
      value: deals.filter((deal) => deal.status === "Submitted").length,
      icon: ClipboardList,
      color: "text-blue-700",
    },
    {
      label: "Approved",
      value: deals.filter((deal) => deal.status === "Approved").length,
      icon: CheckCircle2,
      color: "text-green-700",
    },
    {
      label: "Rejected",
      value: deals.filter((deal) => deal.status === "Rejected").length,
      icon: XCircle,
      color: "text-red-700",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <header className="mb-7">
          <p className="text-sm font-bold tracking-wider text-[#006db8]">
            ADMIN PORTAL
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Deal Registration Management
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Review partner registrations, inspect customer requirements and
            approve or reject submitted deals.
          </p>
        </header>

        {/* Summary cards */}
        <section className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <Icon size={20} className={stat.color} />
                </div>

                <p className={`mt-3 text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            );
          })}
        </section>

        {/* Search, filter and refresh */}
        <section className="mb-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_210px_auto]">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search Deal ID, customer, email or partner..."
                aria-label="Search deals"
                className="min-h-11 w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#006db8] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(event) => setFilterStatus(event.target.value)}
              aria-label="Filter by deal status"
              className="min-h-11 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#006db8]"
            >
              <option value="All">All statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>

            <button
              type="button"
              disabled={loading}
              onClick={() => loadDeals(true)}
              className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={16}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>
        </section>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-slate-600">
            Showing <strong>{filteredDeals.length}</strong> of{" "}
            <strong>{deals.length}</strong> deals
          </p>

          <p className="text-xs text-slate-500">
            Only Submitted deals can be reviewed.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-64 items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white">
            <RefreshCw size={22} className="animate-spin text-[#006db8]" />
            <span className="text-sm text-slate-600">Loading deals...</span>
          </div>
        ) : filteredDeals.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
            <BriefcaseBusiness
              size={34}
              className="mx-auto text-[#006db8]"
            />

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              {deals.length === 0
                ? "No deals registered yet"
                : "No matching deals found"}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try another search term or select a different status.
            </p>

            {(search || filterStatus !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setFilterStatus("All");
                }}
                className="mt-4 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <section className="space-y-5">
            {filteredDeals.map((deal) => {
              const partnerName =
                deal.partner?.fullName ||
                deal.partner?.name ||
                "Partner";

              const isSaving = savingId === deal._id;
              const isSubmitted = deal.status === "Submitted";
              const isExpanded = expandedId === deal._id;

              return (
                <article
                  key={deal._id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                >
                  {/* Deal heading */}
                  <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:p-5 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#006db8]">
                        <BriefcaseBusiness size={22} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Deal Registration ID
                        </p>

                        <h2 className="mt-1 break-all text-lg font-bold text-[#006db8]">
                          {deal.dealId || "ID unavailable"}
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                          Registered on {formatDate(deal.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={deal.status} />

                      <button
                        type="button"
                        onClick={() =>
                          setExpandedId(isExpanded ? null : deal._id)
                        }
                        className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold hover:border-[#006db8] hover:text-[#006db8]"
                      >
                        <Eye size={16} />
                        {isExpanded ? "Hide Details" : "View Details"}
                      </button>
                    </div>
                  </div>

                  {/* Quick summary */}
                  <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
                    <Detail
                      icon={UserRound}
                      label="Partner"
                      value={partnerName}
                    />
                    <Detail
                      icon={UserRound}
                      label="Customer"
                      value={deal.customerName}
                    />
                    <Detail
                      icon={Package}
                      label="Product"
                      value={`${deal.productType || "—"} · Qty: ${
                        deal.quantity ?? "—"
                      }`}
                    />
                    <Detail
                      icon={CalendarDays}
                      label="Expected Closing"
                      value={formatDate(deal.expectedClosingDate)}
                    />
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="space-y-5 border-t border-slate-200 p-4 sm:p-5">
                      <section>
                        <h3 className="mb-3 font-bold text-slate-900">
                          Partner Information
                        </h3>

                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                          <Detail
                            icon={UserRound}
                            label="Partner Name"
                            value={partnerName}
                          />
                          <Detail
                            icon={Mail}
                            label="Partner Email"
                            value={deal.partner?.email}
                          />
                          <Detail
                            icon={Phone}
                            label="Partner Phone"
                            value={deal.partner?.phone}
                          />
                        </div>
                      </section>

                      <section>
                        <h3 className="mb-3 font-bold text-slate-900">
                          Customer Information
                        </h3>

                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                          <Detail
                            icon={UserRound}
                            label="Customer Name"
                            value={deal.customerName}
                          />
                          <Detail
                            icon={Mail}
                            label="Customer Email"
                            value={deal.customerEmail}
                          />
                          <Detail
                            icon={Phone}
                            label="Customer Contact"
                            value={deal.customerContact}
                          />
                          <Detail
                            icon={MapPin}
                            label="Customer Address"
                            value={deal.customerAddress}
                          />
                          <Detail
                            icon={Hash}
                            label="Deal ID"
                            value={deal.dealId}
                          />
                          <Detail
                            icon={CalendarDays}
                            label="Expected Closing Date"
                            value={formatDate(deal.expectedClosingDate)}
                          />
                        </div>
                      </section>

                      <section>
                        <h3 className="mb-3 font-bold text-slate-900">
                          Product Requirements
                        </h3>

                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                          <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">
                            {deal.productRequirements || "Not provided"}
                          </p>
                        </div>
                      </section>

                      {deal.status === "Rejected" && (
                        <section>
                          <h3 className="mb-2 font-bold text-red-800">
                            Rejection Reason
                          </h3>

                          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                            <p className="whitespace-pre-wrap break-words text-sm leading-6 text-red-900">
                              {deal.adminRemarks || "No reason recorded."}
                            </p>
                          </div>
                        </section>
                      )}

                      {deal.status === "Approved" && (
                        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                          This deal has been approved.
                        </div>
                      )}
                    </div>
                  )}

                  {/* Admin actions */}
                  <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {isSubmitted
                          ? "Review this deal"
                          : `Deal ${deal.status}`}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {isSubmitted
                          ? "Choose Approve or Reject to record your decision."
                          : `Reviewed on ${formatDate(deal.reviewedAt)}`}
                      </p>
                    </div>

                    {isSubmitted ? (
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          disabled={Boolean(savingId)}
                          onClick={() =>
                            handleStatusChange(deal, "Approved")
                          }
                          className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Check size={16} />
                          {isSaving ? "Saving..." : "Approve"}
                        </button>

                        <button
                          type="button"
                          disabled={Boolean(savingId)}
                          onClick={() =>
                            handleStatusChange(deal, "Rejected")
                          }
                          className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <X size={16} />
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs font-medium text-slate-500">
                        No further status changes available
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </div>
  );
}