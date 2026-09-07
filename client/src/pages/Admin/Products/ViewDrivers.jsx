import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Trash2,
  FileArchive,
  Package,
  Monitor,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

import { serverUrl } from "../../../App";

const LIMIT = 10;

const ViewDrivers = () => {
  const [drivers, setDrivers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    currentPage: 1,
  });

  /* =====================================================
      FETCH DRIVERS
  ===================================================== */

  const fetchDrivers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${serverUrl}/api/driver/get-drivers`,
        {
          params: {
            page,
            limit: LIMIT,
          },

          withCredentials: true,
        },
      );

      /*
        Expected Backend Response:

        {
          success: true,
          drivers: [],
          pagination: {
            total: 20,
            totalPages: 2,
            currentPage: 1
          }
        }
      */

      setDrivers(res.data.drivers || []);

      if (res.data.pagination) {
        setPagination(res.data.pagination);
      } else {
        /*
          Fallback if backend pagination
          has not been added yet.
        */

        setPagination({
          total: res.data.count || res.data.drivers?.length || 0,
          totalPages: 1,
          currentPage: page,
        });
      }
    } catch (error) {
      console.error("Fetch Drivers Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load drivers",
      );

      setDrivers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, [page]);

  /* =====================================================
      DELETE DRIVER
  ===================================================== */

  const deleteDriver = async (id, title) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${title}"?`,
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const res = await axios.delete(
        `${serverUrl}/api/driver/delete-driver/${id}`,
        {
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success("Driver deleted successfully");

        /*
          If current page becomes empty after deletion,
          go to previous page.
        */

        if (drivers.length === 1 && page > 1) {
          setPage((prev) => prev - 1);
        } else {
          fetchDrivers();
        }
      }
    } catch (error) {
      console.error("Delete Driver Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete driver",
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* =====================================================
      PAGE CHANGE
  ===================================================== */

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (page < pagination.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  /* =====================================================
      PAGE NUMBERS
  ===================================================== */

  const getPageNumbers = () => {
    const totalPages = pagination.totalPages;

    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (page > 3) {
        pages.push("...");
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  /* =====================================================
      UI
  ===================================================== */

  return (
    <div className="min-h-screen max-w-4xl mx-auto bg-slate-50 p-3 sm:p-5 lg:p-6">
      {/* =============================================
          HEADER
      ============================================= */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Driver Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage uploaded product drivers and software files.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <p className="text-xs text-slate-500">
              Total Drivers
            </p>

            <p className="text-xl font-bold text-[#006db8]">
              {pagination.total}
            </p>
          </div>

          <button
            onClick={fetchDrivers}
            disabled={loading}
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />

            Refresh
          </button>
        </div>
      </div>

      {/* =============================================
          LOADING
      ============================================= */}

      {loading ? (
        <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-[#006db8]" />

            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading drivers...
            </p>
          </div>
        </div>
      ) : drivers.length === 0 ? (
        /* =============================================
            EMPTY STATE
        ============================================= */

        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
            <FileArchive
              size={30}
              className="text-[#006db8]"
            />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-800">
            No Drivers Found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            No drivers have been uploaded yet. Upload a driver
            to make it available for product downloads.
          </p>
        </div>
      ) : (
        <>
          {/* =============================================
              DESKTOP TABLE
          ============================================= */}

          <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
            <div className="hidden md:block bg-white rounded-xl shadow overflow-auto max-h-[60vh]">
              <table className="min-w-[1000px] text-sm">
                <thead className="bg-[#006db8] text-white sticky top-0 z-10">
                  <tr className="border-b border-slate-200">
                    <th className="w-[70px] px-4 py-4 text-center text-xs font-bold uppercase tracking-wide text-white">
                      S. No.
                    </th>

                    <th className="min-w-[180px] px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-white">
                      Model
                    </th>

                    <th className="min-w-[150px] px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-white">
                      Type
                    </th>

                    <th className="min-w-[120px] px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-white">
                      Version
                    </th>

                    <th className="min-w-[170px] px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-white">
                      Environment
                    </th>

                    <th className="w-[140px] px-5 py-4 text-center text-xs font-bold uppercase tracking-wide text-white">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {drivers.map((driver, index) => (
                    <tr
                      key={driver._id}
                      className="transition-colors hover:bg-blue-50/40"
                    >
                      {/* Number */}

                      <td className="px-4 py-5 text-center text-sm font-bold text-slate-500">
                        {(page - 1) * LIMIT + index + 1}
                      </td>

                      {/* Product */}

                      <td className="px-5 py-5">
                        <div className="flex items-center gap-3">
                          {/* <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#006db8]">
                            <Package size={18} />
                          </div> */}

                          <div className="min-w-0">
                            <p className="truncate font-semibold text-slate-800">
                              {driver.product?.name ||
                                "Unknown Product"}
                            </p>

                            <p className="mt-0.5 text-xs capitalize text-slate-400">
                              {driver.product?.category || "-"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Type */}

                      <td className="px-5 py-5">
                        <div className="space-y-1">
                          <span className="inline-flex rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                            {driver.type || "-"}
                          </span>
                        </div>
                      </td>

                      {/* Version */}

                      <td className="px-5 py-5">
                        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                          {driver.version || "-"}
                        </span>
                      </td>

                      {/* Environment */}

                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Monitor
                            size={16}
                            className="shrink-0 text-slate-400"
                          />

                          <span className="line-clamp-2">
                            {driver.environment || "-"}
                          </span>
                        </div>
                      </td>

                      {/* Delete */}

                      <td className="px-5 py-5 text-center">
                        <button
                          onClick={() =>
                            deleteDriver(
                              driver._id,
                              driver.title,
                            )
                          }
                          disabled={
                            deletingId === driver._id
                          }
                          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {deletingId === driver._id ? (
                            <>
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-300 border-t-red-600" />
                              Deleting
                            </>
                          ) : (
                            <>
                              <Trash2 size={17} />
                              Delete
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* =============================================
              MOBILE + TABLET CARDS
          ============================================= */}

          <div className="grid gap-4 lg:hidden">
            {drivers.map((driver, index) => (
              <div
                key={driver._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                {/* Card Header */}

                <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-4 sm:p-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#006db8]">
                      <FileArchive size={21} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-400">
                        Driver #
                        {(page - 1) * LIMIT + index + 1}
                      </p>

                      <h2 className="truncate text-base font-bold text-slate-800">
                        {driver.title}
                      </h2>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-lg bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700">
                    {driver.type || "Driver"}
                  </span>
                </div>

                {/* Product */}

                <div className="border-b border-slate-100 bg-slate-50/60 p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <Package
                      size={18}
                      className="text-[#006db8]"
                    />

                    <div>
                      <p className="text-xs text-slate-400">
                        Product Model
                      </p>

                      <p className="font-semibold text-slate-800">
                        {driver.product?.name ||
                          "Unknown Product"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Details */}

                <div className="grid grid-cols-2 gap-4 p-4 sm:p-5">

                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                      Version
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {driver.version || "-"}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                      Environment
                    </p>

                    <div className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <Monitor
                        size={16}
                        className="text-slate-400"
                      />

                      {driver.environment || "-"}
                    </div>
                  </div>
                </div>

                {/* Delete */}

                <div className="border-t border-slate-100 bg-slate-50 p-4 sm:p-5">
                  <button
                    onClick={() =>
                      deleteDriver(
                        driver._id,
                        driver.title,
                      )
                    }
                    disabled={deletingId === driver._id}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-50 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === driver._id ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-300 border-t-red-600" />

                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 size={18} />

                        Delete Driver
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* =============================================
              PAGINATION
          ============================================= */}

          {pagination.totalPages > 1 && (
            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              {/* Info */}

              <p className="text-center text-sm text-slate-500 sm:text-left">
                Showing page{" "}
                <span className="font-semibold text-slate-800">
                  {page}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-800">
                  {pagination.totalPages}
                </span>
              </p>

              {/* Controls */}

              <div className="flex items-center justify-center gap-1 sm:justify-end">
                {/* Previous */}

                <button
                  onClick={goToPreviousPage}
                  disabled={page === 1}
                  className="flex h-10 cursor-pointer items-center gap-1 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={17} />

                  <span className="hidden sm:inline">
                    Previous
                  </span>
                </button>

                {/* Page Numbers */}

                <div className="flex items-center gap-1">
                  {getPageNumbers().map(
                    (pageNumber, index) =>
                      pageNumber === "..." ? (
                        <span
                          key={`dots-${index}`}
                          className="flex h-10 w-8 items-center justify-center text-sm text-slate-400"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={pageNumber}
                          onClick={() =>
                            setPage(pageNumber)
                          }
                          className={`h-10 min-w-10 cursor-pointer rounded-lg px-3 text-sm font-semibold transition ${
                            page === pageNumber
                              ? "bg-[#006db8] text-white shadow-sm"
                              : "text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      ),
                  )}
                </div>

                {/* Next */}

                <button
                  onClick={goToNextPage}
                  disabled={
                    page === pagination.totalPages
                  }
                  className="flex h-10 cursor-pointer items-center gap-1 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span className="hidden sm:inline">
                    Next
                  </span>

                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewDrivers;