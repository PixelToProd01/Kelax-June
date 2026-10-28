import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerDeal } from "../../../services/dealService";

const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const initialForm = {
  customerName: "",
  customerEmail: "",
  customerContact: "",
  customerAddress: "",
  productType: "Server",
  quantity: "1",
  expectedClosingDate: "",
  productRequirements: "",
};

export default function DealRegistration() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    const quantity = Number(form.quantity);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100000) {
      toast.error("Quantity must be a whole number between 1 and 100000.");
      return;
    }

    if (form.expectedClosingDate < getToday()) {
      toast.error("Expected closing date cannot be in the past.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        customerName: form.customerName.trim(),
        customerEmail: form.customerEmail.trim().toLowerCase(),
        customerContact: form.customerContact.trim(),
        customerAddress: form.customerAddress.trim(),
        productRequirements: form.productRequirements.trim(),
        quantity,
      };

      const response = await registerDeal(payload);
      const dealId = response.data?.deal?.dealId;

      toast.success(
        dealId
          ? `Deal registered successfully: ${dealId}`
          : "Deal registered successfully."
      );

      setForm(initialForm);
      navigate("/partner/my-deals");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to register deal. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#006db8] focus:ring-1 focus:ring-[#006db8] disabled:bg-gray-100";

  const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <p className="text-sm font-semibold text-[#006db8]">
            PARTNER PORTAL
          </p>

          <h1 className="mt-1 text-2xl font-bold text-gray-900">
            Register a New Deal
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Enter customer and product details below. Your Deal ID will be
            generated automatically, and the initial status will be Submitted.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-8"
        >
          <section>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Customer Details
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="customerName">
                  Customer Name *
                </label>
                <input
                  id="customerName"
                  required
                  maxLength={150}
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="Enter customer name"
                  disabled={loading}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="customerEmail">
                  Customer Email *
                </label>
                <input
                  id="customerEmail"
                  required
                  type="email"
                  maxLength={254}
                  name="customerEmail"
                  value={form.customerEmail}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="customer@example.com"
                  disabled={loading}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="customerContact">
                  Contact Number *
                </label>
                <input
                  id="customerContact"
                  required
                  type="tel"
                  maxLength={30}
                  name="customerContact"
                  value={form.customerContact}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="Enter contact number"
                  disabled={loading}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="customerAddress">
                  Customer Address *
                </label>
                <textarea
                  id="customerAddress"
                  required
                  maxLength={1000}
                  name="customerAddress"
                  value={form.customerAddress}
                  onChange={handleChange}
                  className={fieldClass}
                  rows={2}
                  placeholder="Company address"
                  disabled={loading}
                />
              </div>
            </div>
          </section>

          <hr className="border-gray-200" />

          <section>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Deal Requirements
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="productType">
                  Product Type *
                </label>
                <select
                  id="productType"
                  required
                  name="productType"
                  value={form.productType}
                  onChange={handleChange}
                  className={fieldClass}
                  disabled={loading}
                >
                  <option value="Server">Server</option>
                  <option value="Workstation">Workstation</option>
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="quantity">
                  Quantity *
                </label>
                <input
                  id="quantity"
                  required
                  type="number"
                  min="1"
                  max="100000"
                  step="1"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className={fieldClass}
                  disabled={loading}
                />
              </div>

              <div>
                <label
                  className={labelClass}
                  htmlFor="expectedClosingDate"
                >
                  Expected Closing Date *
                </label>
                <input
                  id="expectedClosingDate"
                  required
                  type="date"
                  min={getToday()}
                  name="expectedClosingDate"
                  value={form.expectedClosingDate}
                  onChange={handleChange}
                  className={fieldClass}
                  disabled={loading}
                />
              </div>

              <div className="md:col-span-2">
                <label
                  className={labelClass}
                  htmlFor="productRequirements"
                >
                  Project Requirements *
                </label>
                <textarea
                  id="productRequirements"
                  required
                  minLength={5}
                  maxLength={5000}
                  name="productRequirements"
                  value={form.productRequirements}
                  onChange={handleChange}
                  className={fieldClass}
                  rows={5}
                  placeholder="Mention configuration, processor, RAM, storage, budget or other requirements..."
                  disabled={loading}
                />
                <p className="mt-1 text-right text-xs text-gray-400">
                  {form.productRequirements.length}/5000 characters
                </p>
              </div>
            </div>
          </section>

          <div className="flex flex-wrap justify-end gap-3 border-t border-gray-200 pt-5">
            <button
              type="button"
              onClick={() => navigate("/partner/my-deals")}
              disabled={loading}
              className="cursor-pointer rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer rounded-lg bg-[#006db8] px-6 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Register Deal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}