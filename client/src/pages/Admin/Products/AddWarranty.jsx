import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../App";

const AddWarranty = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    resellerName: "",
    customerAddress: "",
    productConfiguration: "",
    serialNumber: "",
    productName: "",
    warrantyType: "NBD",
    validFrom: "",
    validTo: "",
  });

  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Image Preview
  const handleImageChange = (file) => {
    setImage(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const submitData = new FormData();

      submitData.append("customerName", formData.customerName);
      submitData.append("resellerName", formData.resellerName);
      submitData.append("customerAddress", formData.customerAddress);
      submitData.append("productConfiguration", formData.productConfiguration);
      submitData.append("serialNumber", formData.serialNumber);
      submitData.append("productName", formData.productName);
      submitData.append("warrantyType", formData.warrantyType);
      submitData.append("validFrom", formData.validFrom);
      submitData.append("validTo", formData.validTo);

      // Image
      submitData.append("image", image);

      const res = await axios.post(
        `${serverUrl}/api/warranty/create-warranty`,
        submitData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.data.success) {
        setPopup({
          type: "success",
          text: "✅ Warranty Created Successfully",
        });

        setFormData({
          customerName: "",
          resellerName: "",
          customerAddress: "",
          productConfiguration: "",
          serialNumber: "",
          productName: "",
          warrantyType: "NBD",
          validFrom: "",
          validTo: "",
        });

        setImage(null);
        setImagePreview(null);
      }
    } catch (err) {
      setPopup({
        type: "error",
        text: err.response?.data?.message || "Error creating warranty",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Add Product Warranty
        </h1>

        {/* Popup */}
        {popup && (
          <div
            className={`mb-6 text-center p-3 rounded-xl 
            ${
              popup.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {popup.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="w-full p-2">Enter Customer Name</label>
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="w-full border rounded-xl p-3"
          />

          <label className="w-full p-2">Enter Reseller Name</label>
          <input
            type="text"
            name="resellerName"
            placeholder="Reseller Name"
            value={formData.resellerName}
            onChange={handleChange}
            required
            className="w-full border rounded-xl p-3"
          />

          <label className="w-full p-2">Enter Customer Address</label>
          <input
            type="text"
            name="customerAddress"
            placeholder="Customer Address"
            value={formData.customerAddress}
            onChange={handleChange}
            required
            className="w-full border rounded-xl p-3"
          />

          <label className="w-full p-2">Enter Product Configuration</label>
          <input
            type="text"
            name="productConfiguration"
            placeholder="Product Configuration"
            value={formData.productConfiguration}
            onChange={handleChange}
            required
            className="w-full border rounded-xl p-3"
          />

          <label className="w-full p-2">Enter Serial Number</label>
          <input
            type="text"
            name="serialNumber"
            placeholder="Serial Number"
            value={formData.serialNumber}
            onChange={handleChange}
            required
            className="w-full border rounded-xl p-3"
          />

          <label className="w-full p-2">Enter Model Number</label>
          <input
            type="text"
            name="productName"
            placeholder="Model Number"
            value={formData.productName}
            onChange={handleChange}
            required
            className="w-full border rounded-xl p-3"
          />

          <label className="w-full p-2">Enter Warranty Type</label>
          <select
            name="warrantyType"
            value={formData.warrantyType}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          >
            <option value="NBD">NBD</option>
            <option value="MissionCritical">Mission Critical</option>
          </select>

          {/* Warranty Image Add */}
          <div className="w-full">
            <label className="block mb-2 font-medium">
              Upload Product Image
            </label>
            <label className="w-full border rounded-xl p-3 flex items-center justify-between cursor-pointer bg-white">
              <span className="text-gray-500">
                {image ? image.name : "Select Image file"}
              </span>

              <span className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Browse
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files[0])}
                required
                className="hidden"
              />
            </label>
          </div>

          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="h-40 mt-3 rounded-lg"
            />
          )}

          <div className="grid grid-cols-2 gap-4">
            
            <input
              type="date"
              name="validFrom"
              value={formData.validFrom}
              onChange={handleChange}
              required
              className="border rounded-xl p-3"
            />

            <input
              type="date"
              name="validTo"
              value={formData.validTo}
              onChange={handleChange}
              required
              className="border rounded-xl p-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700"
          >
            {loading ? "Creating..." : "Create Warranty"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWarranty;
