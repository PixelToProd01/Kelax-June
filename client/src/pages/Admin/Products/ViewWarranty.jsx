import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../App";
import toast from "react-hot-toast";
import { Pencil, Trash2, X, RefreshCw } from "lucide-react";

const LIMIT = 20;

const EMPTY_FORM = {
  category: "server",
  serialNumber: "",
  modelNumber: "",
  customerName: "",
  customerEmail: "",
  customerContact: "",
  customerAddress: "",
  resellerName: "",
  productConfiguration: "",
  warrantyType: "NBD",
  validFrom: "",
  validTo: "",
};

const toDateInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  // Use local calendar date to avoid UTC shifting the selected day.
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleDateString();
};

const getProductType = (product) =>
  String(product?.type || product?.category || "").toLowerCase();

const ViewWarranty = () => {
  const [warranties, setWarranties] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [editingWarranty, setEditingWarranty] = useState(null);
  const [editForm, setEditForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchWarranties = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${serverUrl}/api/warranty/view-warranty`, {
        params: { page, limit: LIMIT },
        withCredentials: true,
      });
      const data = res.data?.warranties || [];
      setWarranties(data);
      setHasMore(data.length === LIMIT);
    } catch (error) {
      console.error("Failed to load warranties:", error);
      toast.error(error.response?.data?.message || "Failed to load warranty");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchWarranties();
  }, [fetchWarranties]);

  const fetchProducts = useCallback(async () => {
    try {
      setProductsLoading(true);
      const res = await axios.get(`${serverUrl}/api/product/get-all-product`, {
        withCredentials: true,
      });
      setProducts(res.data?.products || []);
    } catch (error) {
      console.error("Failed to load products:", error);
      toast.error("Unable to load products for warranty editing");
    } finally {
      setProductsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) => getProductType(product) === editForm.category,
      ),
    [products, editForm.category],
  );

  const openEditWarranty = (warranty) => {
    setEditingWarranty(warranty);
    setEditForm({
      category: String(warranty.category || "server").toLowerCase(),
      serialNumber: warranty.serialNumber || "",
      modelNumber:
        typeof warranty.modelNumber === "object"
          ? warranty.modelNumber?._id || ""
          : warranty.modelNumber || "",
      customerName: warranty.customerName || "",
      customerEmail: warranty.customerEmail || "",
      customerContact: warranty.customerContact || "",
      customerAddress: warranty.customerAddress || "",
      resellerName: warranty.resellerName || "",
      productConfiguration: warranty.productConfiguration || "",
      warrantyType: warranty.warrantyType || "NBD",
      validFrom: toDateInput(warranty.validFrom),
      validTo: toDateInput(warranty.validTo),
    });

    // Ensure product options are available when opening the modal.
    if (products.length === 0) fetchProducts();
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditForm((current) => ({
      ...current,
      [name]: value,
      ...(name === "category" ? { modelNumber: "" } : {}),
    }));
  };

  const closeEditWarranty = () => {
    if (saving) return;
    setEditingWarranty(null);
    setEditForm(EMPTY_FORM);
  };

  const handleUpdateWarranty = async (event) => {
    event.preventDefault();
    if (!editingWarranty?._id) return;

    if (
      editForm.validFrom &&
      editForm.validTo &&
      editForm.validTo < editForm.validFrom
    ) {
      toast.error("Warranty end date cannot be before start date");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        ...editForm,
        serialNumber: editForm.serialNumber.trim().toUpperCase(),
      };

      const res = await axios.put(
        `${serverUrl}/api/warranty/update-warranty/${editingWarranty._id}`,
        payload,
        { withCredentials: true },
      );

      toast.success(res.data?.message || "Warranty updated successfully");
      setEditingWarranty(null);
      setEditForm(EMPTY_FORM);
      await fetchWarranties();
    } catch (error) {
      console.error("Failed to update warranty:", error);
      toast.error(error.response?.data?.message || "Failed to update warranty");
    } finally {
      setSaving(false);
    }
  };

  const deleteWarranty = async (id) => {
    if (!window.confirm("Are you sure you want to delete this warranty?"))
      return;

    try {
      await axios.delete(`${serverUrl}/api/warranty/delete-warranty/${id}`, {
        withCredentials: true,
      });
      toast.success("Warranty deleted successfully");

      // If the last item on this page was deleted, move back one page.
      if (warranties.length === 1 && page > 1) {
        setPage((current) => current - 1);
      } else {
        await fetchWarranties();
      }
    } catch (error) {
      console.error("Failed to delete warranty:", error);
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const statusColor = (status) => {
    if (status === "Active") return "bg-green-100 text-green-700";
    if (status === "Expired") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  const WarrantyActions = ({ warranty }) => (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => openEditWarranty(warranty)}
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        <Pencil size={16} /> Edit
      </button>
      <button
        type="button"
        onClick={() => deleteWarranty(warranty._id)}
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        <Trash2 size={16} /> Delete
      </button>
    </div>
  );

  return (
    <div className="min-h-screen max-w-4xl mx-auto bg-gray-100 p-3 md:p-2">
      {/* <h1 className="text-2xl font-bold mb-5">Warranty Management</h1> */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Warranty Management</h1>
        <button
          type="button"
          onClick={fetchWarranties}
          disabled={loading}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border bg-white px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />{" "}
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden max-h-[65vh] overflow-auto rounded-xl bg-white shadow md:block">
            <table className="min-w-[1100px] w-full text-sm">
              <thead className="sticky top-0 z-10 bg-[#006db8] text-white">
                <tr>
                  <th className="border-r border-white/30 px-4 py-3 text-left">
                    S. No.
                  </th>
                  <th className="border-r border-white/30 p-4 text-left">
                    Product Detail
                  </th>
                  <th className="border-r border-white/30 p-4 text-left">
                    Customer Detail
                  </th>
                  <th className="border-r border-white/30 p-4 text-left">
                    Warranty Timing
                  </th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {warranties.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      No warranties found.
                    </td>
                  </tr>
                ) : (
                  warranties.map((warranty, index) => (
                    <tr
                      key={warranty._id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="border-r px-4 py-3 font-semibold text-gray-600">
                        {(page - 1) * LIMIT + index + 1}
                      </td>
                      <td className="space-y-2 border-r p-4">
                        <p>
                          <b>Product Type:</b>{" "}
                          <span className="ml-1 capitalize">
                            {warranty.category || "-"}
                          </span>
                        </p>
                        <p>
                          <b>Serial Number:</b>{" "}
                          <span className="ml-1">
                            {warranty.serialNumber || "-"}
                          </span>
                        </p>
                        <p className="text-gray-600">
                          <b>Model Number:</b>{" "}
                          {warranty.modelNumber?.name || "NA"}
                        </p>
                        <p className="text-gray-600">
                          <b>Warranty:</b> {warranty.warrantyType || "-"}
                        </p>
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs ${statusColor(warranty.warrantyStatus)}`}
                        >
                          {warranty.warrantyStatus || "Unknown"}
                        </span>
                      </td>
                      <td className="space-y-2 border-r p-4">
                        <p>
                          <b>Customer Name:</b> {warranty.customerName || "NA"}
                        </p>
                        <p>
                          <b>Customer Email:</b>{" "}
                          {warranty.customerEmail || "NA"}
                        </p>
                        <p>
                          <b>Customer Contact:</b>{" "}
                          {warranty.customerContact || "NA"}
                        </p>
                        <p>
                          <b>Customer Address:</b>{" "}
                          {warranty.customerAddress || "NA"}
                        </p>
                        <p>
                          <b>Reseller:</b> {warranty.resellerName || "NA"}
                        </p>
                        <p>
                          <b>Config:</b> {warranty.productConfiguration || "NA"}
                        </p>
                      </td>
                      <td className="space-y-3 border-r p-4">
                        <p>
                          <b>From:</b> {formatDate(warranty.validFrom)}
                        </p>
                        <p>
                          <b>To:</b> {formatDate(warranty.validTo)}
                        </p>
                      </td>
                      <td className="p-4">
                        <WarrantyActions warranty={warranty} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="grid gap-4 md:hidden">
            {warranties.length === 0 ? (
              <div className="rounded-xl bg-white p-6 text-center text-gray-500 shadow">
                No warranties found.
              </div>
            ) : (
              warranties.map((warranty, index) => (
                <article
                  key={warranty._id}
                  className="rounded-xl bg-white p-4 shadow"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-bold">
                        {warranty.modelNumber?.name || "NA"}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {warranty.serialNumber || "-"}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        S. No. {(page - 1) * LIMIT + index + 1}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${statusColor(warranty.warrantyStatus)}`}
                    >
                      {warranty.warrantyStatus || "Unknown"}
                    </span>
                  </div>
                  <div className="mt-4 space-y-2 break-words text-sm">
                    <p>
                      <b>Product Type:</b>{" "}
                      <span className="capitalize">
                        {warranty.category || "-"}
                      </span>
                    </p>
                    <p>
                      <b>Customer:</b> {warranty.customerName || "NA"}
                    </p>
                    <p>
                      <b>Email:</b> {warranty.customerEmail || "NA"}
                    </p>
                    <p>
                      <b>Contact:</b> {warranty.customerContact || "NA"}
                    </p>
                    <p>
                      <b>Address:</b> {warranty.customerAddress || "NA"}
                    </p>
                    <p>
                      <b>Reseller:</b> {warranty.resellerName || "NA"}
                    </p>
                    <p>
                      <b>Configuration:</b>{" "}
                      {warranty.productConfiguration || "NA"}
                    </p>
                    <p>
                      <b>Warranty:</b> {warranty.warrantyType || "-"}
                    </p>
                    <p>
                      <b>From:</b> {formatDate(warranty.validFrom)}
                    </p>
                    <p>
                      <b>To:</b> {formatDate(warranty.validTo)}
                    </p>
                  </div>
                  <div className="mt-4">
                    <WarrantyActions warranty={warranty} />
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between rounded-xl bg-white p-4 shadow">
            <button
              type="button"
              disabled={page === 1 || loading}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="rounded border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Prev
            </button>
            <span className="text-sm font-medium">Page {page}</span>
            <button
              type="button"
              disabled={!hasMore || loading}
              onClick={() => setPage((current) => current + 1)}
              className="rounded border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Edit warranty modal */}
      {editingWarranty && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeEditWarranty();
          }}
        >
          <div className="max-h-[94vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold">Edit Product Warranty</h2>
              <button
                type="button"
                onClick={closeEditWarranty}
                disabled={saving}
                className="rounded-full p-2 hover:bg-gray-100 disabled:opacity-50"
                aria-label="Close edit form"
              >
                <X size={22} />
              </button>
            </div>

            {productsLoading && (
              <p className="mb-3 text-sm text-gray-500">
                Loading product models...
              </p>
            )}

            <form onSubmit={handleUpdateWarranty} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Product Type *
                </label>
                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                  required
                  className="w-full rounded-lg border p-3"
                >
                  <option value="server">Server</option>
                  <option value="workstation">Workstation</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Model Number *
                </label>
                <select
                  name="modelNumber"
                  value={editForm.modelNumber}
                  onChange={handleEditChange}
                  required
                  className="w-full rounded-lg border p-3"
                >
                  <option value="">Select Product</option>
                  {filteredProducts.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                  {/* Keep current selected product visible if its type field differs from expected shape. */}
                  {editForm.modelNumber &&
                    !filteredProducts.some(
                      (product) => product._id === editForm.modelNumber,
                    ) && (
                      <option value={editForm.modelNumber}>
                        {editingWarranty.modelNumber?.name ||
                          "Current selected product"}
                      </option>
                    )}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Serial Number *
                </label>
                <input
                  name="serialNumber"
                  value={editForm.serialNumber}
                  onChange={handleEditChange}
                  required
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  End Customer Name *
                </label>
                <input
                  name="customerName"
                  value={editForm.customerName}
                  onChange={handleEditChange}
                  required
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Contact Person Email Address
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  value={editForm.customerEmail}
                  onChange={handleEditChange}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Contact Person Phone Number
                </label>
                <input
                  name="customerContact"
                  value={editForm.customerContact}
                  onChange={handleEditChange}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Customer Registered Office Address
                </label>
                <input
                  name="customerAddress"
                  value={editForm.customerAddress}
                  onChange={handleEditChange}
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Reseller Name *
                </label>
                <input
                  name="resellerName"
                  value={editForm.resellerName}
                  onChange={handleEditChange}
                  required
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Product Configuration *
                </label>
                <input
                  name="productConfiguration"
                  value={editForm.productConfiguration}
                  onChange={handleEditChange}
                  required
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Warranty Type *
                </label>
                <select
                  name="warrantyType"
                  value={editForm.warrantyType}
                  onChange={handleEditChange}
                  required
                  className="w-full rounded-lg border p-3"
                >
                  <option value="NBD">NBD</option>
                  <option value="MissionCritical">Mission Critical</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Warranty Start Date *
                </label>
                <input
                  type="date"
                  name="validFrom"
                  value={editForm.validFrom}
                  onChange={handleEditChange}
                  required
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Warranty End Date *
                </label>
                <input
                  type="date"
                  name="validTo"
                  value={editForm.validTo}
                  min={editForm.validFrom || undefined}
                  onChange={handleEditChange}
                  required
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeEditWarranty}
                  disabled={saving}
                  className="w-full cursor-pointer rounded-lg border py-3 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || productsLoading}
                  className="w-full cursor-pointer rounded-lg bg-indigo-600 py-3 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Updating..." : "Update Warranty"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewWarranty;
