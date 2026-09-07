import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Download,
  Search,
  ChevronDown,
  HardDriveDownload,
  Package,
  Monitor,
  Cpu,
  X,
  AlertCircle,
  FileArchive,
} from "lucide-react";
import { serverUrl } from "../../App";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar.jsx"
import Footer from "../../components/Footer.jsx";

const DownloadDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState("");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(true);

  /* =====================================================
      FETCH PRODUCTS
  ===================================================== */

  const fetchProducts = async () => {
    try {
      setProductLoading(true);

      const res = await axios.get(
        `${serverUrl}/api/product/get-all-product`,
      );

      setProducts(res.data.products || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    } finally {
      setProductLoading(false);
    }
  };

  /* =====================================================
      FETCH DRIVERS
  ===================================================== */

  const fetchDrivers = async () => {
    try {
      setLoading(true);

      const url = selectedProduct
        ? `${serverUrl}/api/driver/get-drivers?product=${selectedProduct}`
        // ? `${serverUrl}/api/driver/get-drivers/${selectedProduct}`
        : `${serverUrl}/api/driver/get-all-driver`;

      const res = await axios.get(url);

      setDrivers(res.data.drivers || []);
    } catch (error) {
      console.error(error);

      setDrivers([]);

      toast.error(
        error.response?.data?.message ||
          "Failed to load drivers",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchDrivers();
  }, [selectedProduct]);

  /* =====================================================
      FILTER DRIVERS
  ===================================================== */

  const filteredDrivers = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return drivers;
    }

    return drivers.filter((driver) => {
      return (
        driver.type?.toLowerCase().includes(value) ||
        // driver.subtype?.toLowerCase().includes(value) ||
        // driver.title?.toLowerCase().includes(value) ||
        driver.version?.toLowerCase().includes(value) ||
        driver.environment?.toLowerCase().includes(value) ||
        driver.product?.name?.toLowerCase().includes(value)
      );
    });
  }, [drivers, search]);

  /* =====================================================
      DOWNLOAD
  ===================================================== */

  const handleDownload = (driver) => {
    if (!driver.driverFile) {
      toast.error("Driver file not available");
      return;
    }

    const fileUrl = `${serverUrl}${driver.driverFile}`;

    const link = document.createElement("a");

    link.href = fileUrl;

    link.setAttribute(
      "download",
      driver.title
        ? `${driver.title}.zip`
        : "driver.zip",
    );

    link.target = "_blank";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  /* =====================================================
      SELECTED PRODUCT
  ===================================================== */

  const selectedProductData = products.find(
    (product) => product._id === selectedProduct,
  );

  /* =====================================================
      CLEAR FILTER
  ===================================================== */

  const clearFilters = () => {
    setSelectedProduct("");
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative mt-20 overflow-hidden bg-gradient-to-br from-[#003f70] via-[#006db8] to-[#008bd2]">

        {/* Decorative circles */}

        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10" />

        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

          <div className="max-w-3xl">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">

              <HardDriveDownload size={17} />

              Kelax Support

            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">

              Drivers & Downloads

            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">

              Download the latest drivers and software for your
              Kelax products. Select your model to find the
              drivers compatible with your system.

            </p>

          </div>

        </div>
      </section>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

        {/* =================================================
            FILTER CARD
        ================================================= */}

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

          <div className="grid gap-5 lg:grid-cols-[1fr_1fr_auto] lg:items-end">

            {/* Product */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">

                Select Model

              </label>

              <div className="relative">

                <Package
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={selectedProduct}
                  onChange={(e) =>
                    setSelectedProduct(e.target.value)
                  }
                  disabled={productLoading}
                  className="w-full appearance-none rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                >

                  <option value="">
                    All Models
                  </option>

                  {products.map((product) => (
                    <option
                      key={product._id}
                      value={product._id}
                    >
                      {product.name}
                    </option>
                  ))}

                </select>

                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

              </div>

            </div>

            {/* Search */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">

                Search Drivers

              </label>

              <div className="relative">

                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search driver, version, environment..."
                  className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-10 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    <X size={17} />
                  </button>
                )}

              </div>

            </div>

            {/* Clear */}

            {(selectedProduct || search) && (
              <button
                type="button"
                onClick={clearFilters}
                className="h-12 rounded-xl border border-slate-300 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                Clear Filters
              </button>
            )}

          </div>

          {/* Selected Product */}

          {selectedProductData && (
            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">

              <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">

                <Monitor size={16} />

                {selectedProductData.name}

              </div>

              <span className="text-sm text-slate-500">
                Showing available drivers
              </span>

            </div>
          )}

        </div>

        {/* =================================================
            RESULT HEADER
        ================================================= */}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Available Drivers
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {loading
                ? "Loading drivers..."
                : `${filteredDrivers.length} driver${
                    filteredDrivers.length !== 1
                      ? "s"
                      : ""
                  } available`}
            </p>

          </div>

          {!loading && filteredDrivers.length > 0 && (
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">

              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              Latest available downloads

            </div>
          )}

        </div>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">

            <div className="flex flex-col items-center justify-center">

              <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

              <p className="mt-4 text-sm font-medium text-slate-500">
                Loading drivers...
              </p>

            </div>

          </div>
        )}

        {/* =================================================
            EMPTY
        ================================================= */}

        {!loading && filteredDrivers.length === 0 && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">

              <AlertCircle
                size={30}
                className="text-slate-400"
              />

            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-800">
              No Drivers Found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">

              We couldn't find any drivers matching your
              selected model or search criteria.

            </p>

            {(selectedProduct || search) && (
              <button
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                View All Drivers
              </button>
            )}

          </div>
        )}

        {/* =================================================
            DESKTOP TABLE
        ================================================= */}

        {!loading && filteredDrivers.length > 0 && (
          <div className="mt-6 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1000px] border-collapse">

                <thead>

                  <tr className="border-b border-slate-200 bg-slate-50">

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Type
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Model Number
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Version
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Environment
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                      Download
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {filteredDrivers.map((driver) => (

                    <tr
                      key={driver._id}
                      className="transition hover:bg-blue-50/40"
                    >

                      {/* Type */}

                      <td className="px-6 py-5">

                        <div className="flex flex-col gap-1">

                          <span className="w-fit rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                            {driver.type || "Driver"}
                          </span>

                          {/* <span className="text-sm text-slate-600">
                            {driver.subtype || "-"}
                          </span> */}

                        </div>

                      </td>

                      {/* Title */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

                            <FileArchive size={19} />

                          </div>

                          <div>

                            {/* <p className="font-semibold text-slate-800">
                              {driver.title}
                            </p> */}

                            {driver.product?.name && (
                              <p className="mt-1 text-xs text-slate-400">
                                {driver.product.name}
                              </p>
                            )}

                          </div>

                        </div>

                      </td>

                      {/* Version */}

                      <td className="px-6 py-5">

                        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                          {driver.version || "-"}
                        </span>

                      </td>

                      {/* Environment */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2 text-sm text-slate-600">

                          <Cpu size={16} className="text-slate-400" />

                          {driver.environment || "-"}

                        </div>

                      </td>

                      {/* Download */}

                      <td className="px-6 py-5 text-right">

                        <button
                          onClick={() =>
                            handleDownload(driver)
                          }
                          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#006db8] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#005b9b] hover:shadow-md active:scale-95"
                        >

                          <Download size={17} />

                          Download

                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>
        )}

        {/* =================================================
            MOBILE / TABLET CARDS
        ================================================= */}

        {!loading && filteredDrivers.length > 0 && (
          <div className="mt-6 grid gap-4 lg:hidden">

            {filteredDrivers.map((driver) => (

              <div
                key={driver._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >

                {/* Card Header */}

                <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-4 sm:p-5">

                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

                      <FileArchive size={20} />

                    </div>

                    <div className="min-w-0">

                      {/* <h3 className="truncate text-sm font-bold text-slate-800 sm:text-base">
                        {driver.title}
                      </h3> */}

                      {driver.product?.name && (
                        <p className="mt-1 truncate text-xs text-slate-400">
                          {driver.product.name}
                        </p>
                      )}

                    </div>

                  </div>

                  <span className="shrink-0 rounded-lg bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700">
                    {driver.type || "Driver"}
                  </span>

                </div>

                {/* Card Details */}

                <div className="grid grid-cols-2 gap-x-4 gap-y-4 p-4 sm:p-5">

                  <div>

                    {/* <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Subtype
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {driver.subtype || "-"}
                    </p> */}

                  </div>

                  <div>

                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Version
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {driver.version || "-"}
                    </p>

                  </div>

                  <div className="col-span-2">

                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Environment
                    </p>

                    <div className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-700">

                      <Monitor
                        size={15}
                        className="text-slate-400"
                      />

                      {driver.environment || "-"}

                    </div>

                  </div>

                </div>

                {/* Download */}

                <div className="border-t border-slate-100 bg-slate-50 p-4 sm:p-5">

                  <button
                    onClick={() =>
                      handleDownload(driver)
                    }
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#006db8] py-3 text-sm font-semibold text-white transition hover:bg-[#005b9b] active:scale-[0.98]"
                  >

                    <Download size={18} />

                    Download Driver

                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </main>
      <Footer />

    </div>
  );
};

export default DownloadDrivers;