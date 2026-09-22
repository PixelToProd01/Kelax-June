import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../App";
import toast from "react-hot-toast";

const AddWarranty = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    category: "server",
    serialNumber: "",
    modelNumber: "",
    customerName: "",
    customerEmail: "",
    customerContact: "",
    customerAddress: "",
    // customerCompany: "",
    resellerName: "",
    productConfiguration: "",
    warrantyType: "NBD",
    validFrom: "",
    validTo: "",
  });

  // const [category, setCategory] = useState("server");

  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(false);

  // const [image, setImage] = useState(null);
  // const [imagePreview, setImagePreview] = useState(null);

  // Image Preview
  // const handleImageChange = (file) => {
  //   setImage(file);

  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     setImagePreview(reader.result);
  //   };

  //   reader.readAsDataURL(file);
  // };

  /* ==============================
      FETCH PRODUCTS
  ============================== */

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/product/get-all-product`, {
        withCredentials: true,
      });

      setProducts(res.data.products || []);
    } catch (error) {
      toast.error("Unable to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

      submitData.append("category", formData.category);
      submitData.append("serialNumber", formData.serialNumber);
      submitData.append("modelNumber", formData.modelNumber);
      submitData.append("customerName", formData.customerName);
      submitData.append("customerEmail", formData.customerEmail);
      submitData.append("customerContact", formData.customerContact);
      submitData.append("customerAddress", formData.customerAddress);
      // submitData.append("customerCompany", formData.customerCompany);
      submitData.append("resellerName", formData.resellerName);
      submitData.append("productConfiguration", formData.productConfiguration);
      submitData.append("warrantyType", formData.warrantyType);
      submitData.append("validFrom", formData.validFrom);
      submitData.append("validTo", formData.validTo);

      // Image
      // submitData.append("image", image);

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
          category: "server",
          serialNumber: "",
          modelNumber: "",
          customerName: "",
          customerEmail: "",
          customerContact: "",
          customerAddress: "",
          // customerCompany: "",
          resellerName: "",
          productConfiguration: "",
          warrantyType: "NBD",
          validFrom: "",
          validTo: "",
        });

        // setImage(null);
        // setImagePreview(null);
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
          {/* Category */}
          <label className="text- font-semibold">Product Type *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          >
            <option value="server">Server</option>
            <option value="workstation">Workstation</option>
          </select>

          {/* <label className="w-full p-2">Serial Number *</label>
          <input
            type="text"
            name="serialNumber"
            placeholder="Serial Number"
            value={formData.serialNumber}
            onChange={handleChange}
            required
            className="w-full border rounded-xl p-3"
          /> */}

          {/* <label className="w-full p-2">Model Number *</label>
          <input
            type="text"
            name="modelNumber"
            placeholder="Model Number"
            value={formData.modelNumber}
            onChange={handleChange}
            required
            className="w-full border rounded-xl p-3"
          /> */}

          <div>
            <label className="block mb-2 font-semibold">Model Number *</label>

            <select
              name="modelNumber"
              value={formData.modelNumber}
              onChange={handleChange}
              required
              className="w-full border rounded-xl p-3"
            >
              <option value="">Select Product</option>

              {products.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <label className="w-full p-2">Serial Number *</label>
          <input
            type="text"
            name="serialNumber"
            placeholder="Serial Number"
            value={formData.serialNumber}
            onChange={handleChange}
            required
            className="w-full border rounded-xl p-3"
          />

          <label className="w-full p-2">End Customer Name *</label>
          <input
            type="text"
            name="customerName"
            placeholder="ABC Technologies Pvt. Ltd."
            value={formData.customerName}
            onChange={handleChange}
            required
            className="w-full border rounded-xl p-3"
          />

          <label className="w-full p-2">Contact Person Email Address</label>
          <input
            type="text"
            name="customerEmail"
            placeholder="abc@company.com"
            value={formData.customerEmail}
            onChange={handleChange}
            // required
            className="w-full border rounded-xl p-3"
          />

          <label className="w-full p-2">Contact Person Phone Number</label>
          <input
            type="text"
            name="customerContact"
            placeholder="+91 9876543210"
            value={formData.customerContact}
            onChange={handleChange}
            // required
            className="w-full border rounded-xl p-3"
          />

          <label className="w-full p-2">
            Customer Registered Office Address
          </label>
          <input
            type="text"
            name="customerAddress"
            placeholder="xyz sector 52 Noida Uttar Pradesh"
            value={formData.customerAddress}
            onChange={handleChange}
            // required
            className="w-full border rounded-xl p-3"
          />

          {/* <label className="w-full p-2">Customer Company</label>
          <input
            type="text"
            name="customerCompany"
            placeholder="Customer Company"
            value={formData.customerCompany}
            onChange={handleChange}
            // required
            className="w-full border rounded-xl p-3"
          /> */}

          <label className="w-full p-2">Reseller Name *</label>
          <input
            type="text"
            name="resellerName"
            placeholder="Reseller Name"
            value={formData.resellerName}
            onChange={handleChange}
            required
            className="w-full border rounded-xl p-3"
          />

          <label className="w-full p-2">Product Configuration *</label>
          <input
            type="text"
            name="productConfiguration"
            placeholder="Product Configuration"
            value={formData.productConfiguration}
            onChange={handleChange}
            required
            className="w-full border rounded-xl p-3"
          />

          <label className="w-full p-2">Warranty Type *</label>
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
          {/* <div className="w-full">
            <label className="block mb-2 font-medium">
              Upload Product Image *
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
          </div> */}

          {/* {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="h-40 mt-3 rounded-lg"
            />
          )} */}

          <div className="grid">
            <label>Warranty Start Date *</label>
            <input
              type="date"
              name="validFrom"
              value={formData.validFrom}
              onChange={handleChange}
              required
              className="border rounded-xl p-3  mb-4"
            />

            <label>Warranty End Date *</label>
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
