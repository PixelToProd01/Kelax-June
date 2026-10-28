import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileText,
  Hash,
  Mail,
  MapPin,
  Package,
  Phone,
  RefreshCw,
  Search,
  UserRound,
  XCircle,
} from "lucide-react";
import { getMyDeals } from "../../../services/dealService";

const statusConfig = {
  Submitted: {
    className: "bg-blue-50 text-blue-700 ring-blue-600/20",
    icon: ClipboardList,
  },
  Approved: {
    className: "bg-green-50 text-green-700 ring-green-600/20",
    icon: CheckCircle2,
  },
  Rejected: {
    className: "bg-red-50 text-red-700 ring-red-600/20",
    icon: XCircle,
  },
};

const formatDate = (value) => {
  if (!value) return "Not provided";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function Detail({ icon: Icon, label, value, className = "" }) {
  const displayValue =
    value !== undefined && value !== null && String(value).trim() !== ""
      ? String(value)
      : "Not provided";

  return (
    <div
      className={`min-w-0 rounded-xl border border-slate-100 bg-slate-50 p-3 sm:p-4 ${className}`}
    >
      <div className="mb-2 flex items-center gap-2 text-slate-500">
        <Icon size={16} className="shrink-0 text-[#006db8]" />
        <span className="text-xs font-medium sm:text-sm">{label}</span>
      </div>

      <p className="break-words text-sm font-semibold leading-6 text-slate-800 [overflow-wrap:anywhere]">
        {displayValue}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const normalizedStatus = statusConfig[status] ? status : "Submitted";
  const config = statusConfig[normalizedStatus];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${config.className}`}
    >
      <Icon size={14} />
      {normalizedStatus}
    </span>
  );
}

export default function MyDeals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [expandedDeals, setExpandedDeals] = useState([]);

  const loadDeals = useCallback(async (showToast = false) => {
    setLoading(true);

    try {
      const { data } = await getMyDeals();
      setDeals(Array.isArray(data.deals) ? data.deals : []);

      if (showToast) {
        toast.success("Deals refreshed successfully.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to load your deals."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDeals();
  }, [loadDeals]);

  const filteredDeals = deals.filter((deal) => {
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
      ].some((value) => String(value || "").toLowerCase().includes(query));

    const matchesStatus =
      statusFilter === "All" || deal.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const toggleDetails = (id) => {
    setExpandedDeals((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const stats = [
    {
      label: "Total Deals",
      value: deals.length,
      color: "text-[#006db8]",
      icon: BriefcaseBusiness,
    },
    {
      label: "Submitted",
      value: deals.filter((deal) => deal.status === "Submitted").length,
      color: "text-blue-700",
      icon: ClipboardList,
    },
    {
      label: "Approved",
      value: deals.filter((deal) => deal.status === "Approved").length,
      color: "text-green-700",
      icon: CheckCircle2,
    },
    {
      label: "Rejected",
      value: deals.filter((deal) => deal.status === "Rejected").length,
      color: "text-red-700",
      icon: XCircle,
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#006db8] text-white">
              <BriefcaseBusiness size={23} />
            </div>

            <div>
              <p className="text-xs font-bold tracking-widest text-[#006db8]">
                KELAX
              </p>
              <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
                Partner Deal Management
              </h1>
            </div>
          </div>

          <Link
            to="/partner/dashboard"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50 sm:px-4"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <section className="mb-7 rounded-2xl bg-gradient-to-r from-slate-950 via-blue-950 to-[#006db8] p-5 text-white shadow-md sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div className="max-w-2xl">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-blue-100">
                PARTNER WORKSPACE
              </span>

              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                My Registered Deals
              </h2>

              <p className="mt-2 text-sm leading-6 text-blue-100 sm:text-base">
                Track your deals, customer details, product requirements and
                registration status in one place.
              </p>
            </div>

            <Link
              to="/partner/deal-registration"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#006db8] hover:bg-blue-50"
            >
              + Register New Deal
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        <section className="mb-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-slate-500 sm:text-sm">
                    {stat.label}
                  </p>
                  <Icon size={18} className={stat.color} />
                </div>

                <p className={`mt-3 text-2xl font-bold sm:text-3xl ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            );
          })}
        </section>

        <section className="mb-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h3 className="font-bold text-slate-900">Deal Records</h3>

          <p className="mt-1 text-sm text-slate-500">
            Search by Deal ID, customer, contact number, address or product.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_200px]">
            <div className="relative min-w-0">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search your deals..."
                aria-label="Search deals"
                className="min-h-11 w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#006db8] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter deals by status"
              className="min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#006db8]"
            >
              <option value="All">All statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </section>

        {loading ? (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <RefreshCw size={30} className="animate-spin text-[#006db8]" />
            <p className="mt-4 font-semibold">Loading your deals...</p>
          </div>
        ) : filteredDeals.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
            <BriefcaseBusiness
              size={34}
              className="mx-auto text-[#006db8]"
            />

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              {deals.length === 0
                ? "No deals registered yet"
                : "No matching deals found"}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {deals.length === 0
                ? "Register your first deal to start tracking its progress."
                : "Try another search term or select a different status."}
            </p>

            {deals.length === 0 ? (
              <Link
                to="/partner/deal-registration"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#006db8] px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Register Your First Deal
                <ArrowRight size={16} />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                }}
                className="mt-5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <section className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-600">
                Showing <strong>{filteredDeals.length}</strong> of{" "}
                <strong>{deals.length}</strong> deals
              </p>

              <button
                type="button"
                disabled={loading}
                onClick={() => loadDeals(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:text-[#006db8] disabled:opacity-60"
              >
                <RefreshCw size={15} />
                Refresh
              </button>
            </div>

            {filteredDeals.map((deal) => {
              const expanded = expandedDeals.includes(deal._id);

              return (
                <article
                  key={deal._id}
                  className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#006db8]">
                        <BriefcaseBusiness size={22} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                          Deal Registration ID
                        </p>
                        <h3 className="mt-1 break-all text-lg font-bold text-[#006db8] sm:text-xl">
                          {deal.dealId || "ID unavailable"}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          Registered on {formatDate(deal.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <StatusBadge status={deal.status} />

                      <button
                        type="button"
                        onClick={() => toggleDetails(deal._id)}
                        aria-expanded={expanded}
                        className="inline-flex cursor-pointer min-h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold hover:border-[#006db8] hover:text-[#006db8]"
                      >
                        {expanded ? "Hide Details" : "Full Details"}
                        <ArrowRight
                          size={16}
                          className={expanded ? "rotate-90" : ""}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
                    <Detail
                      icon={UserRound}
                      label="Customer Name"
                      value={deal.customerName}
                    />
                    <Detail
                      icon={Package}
                      label="Product Type"
                      value={deal.productType}
                    />
                    <Detail
                      icon={CalendarDays}
                      label="Expected Closing Date"
                      value={formatDate(deal.expectedClosingDate)}
                    />
                  </div>

                  {expanded && (
                    <div className="space-y-6 border-t border-slate-200 p-4 sm:p-6">
                      <section>
                        <h4 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
                          <UserRound size={19} className="text-[#006db8]" />
                          Customer Information
                        </h4>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                            label="Contact Number"
                            value={deal.customerContact}
                          />
                          <Detail
                            icon={MapPin}
                            label="Customer Address"
                            value={deal.customerAddress}
                            className="sm:col-span-2 lg:col-span-3"
                          />
                        </div>
                      </section>

                      <section>
                        <h4 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
                          <Package size={19} className="text-[#006db8]" />
                          Deal Information
                        </h4>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          <Detail
                            icon={Hash}
                            label="Deal ID"
                            value={deal.dealId}
                          />
                          <Detail
                            icon={Package}
                            label="Product Category"
                            value={deal.productType}
                          />
                          <Detail
                            icon={ClipboardList}
                            label="Quantity"
                            value={deal.quantity}
                          />
                          <Detail
                            icon={CalendarDays}
                            label="Expected Closing Date"
                            value={formatDate(deal.expectedClosingDate)}
                          />
                          <Detail
                            icon={CalendarDays}
                            label="Registration Date"
                            value={formatDate(deal.createdAt)}
                          />
                          <Detail
                            icon={ClipboardList}
                            label="Current Status"
                            value={deal.status}
                          />
                        </div>
                      </section>

                      <section>
                        <h4 className="mb-3 flex items-center gap-2 font-bold text-slate-900">
                          <FileText size={19} className="text-[#006db8]" />
                          Product Requirements
                        </h4>

                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                          <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">
                            {deal.productRequirements || "Not provided"}
                          </p>
                        </div>
                      </section>

                      {deal.status === "Rejected" && (
                        <section>
                          <h4 className="mb-3 font-bold text-red-800">
                            Rejection Reason
                          </h4>

                          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                            <p className="whitespace-pre-wrap break-words text-sm leading-6 text-red-900">
                              {deal.adminRemarks ||
                                "No rejection reason was provided."}
                            </p>
                          </div>
                        </section>
                      )}

                      {deal.status === "Approved" && (
                        <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                          Your deal has been approved by the Kelax administrator.
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        )}

        <footer className="mt-7 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <ClipboardList
              size={19}
              className="mt-0.5 shrink-0 text-[#006db8]"
            />
            <div>
              <h4 className="text-sm font-bold text-slate-800">
                Important Information
              </h4>
              <p className="mt-1 text-xs leading-6 text-slate-500 sm:text-sm">
                Deals have one of three statuses: Submitted, Approved or
                Rejected. Rejected deals display the administrator's reason
                here. Contact your Kelax administrator if you need clarification.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}