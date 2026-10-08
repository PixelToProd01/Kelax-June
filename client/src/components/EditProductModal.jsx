import { useState, useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { X } from "lucide-react";

// ============================================================
// DEFAULT SPECIFICATIONS
// ============================================================

const defaultSpecs = [
  {
    key: "Processor",
    value: "",
    isCustom: false,
  },
  {
    key: "Socket",
    value: "",
    isCustom: false,
  },
  {
    key: "Memory Type",
    value: "",
    isCustom: false,
  },
  {
    key: "Memory Slots",
    value: "",
    isCustom: false,
  },
  {
    key: "Storage",
    value: "",
    isCustom: false,
  },
  {
    key: "Supported Drives",
    value: "",
    isCustom: false,
  },
  {
    key: "OS",
    value: "",
    isCustom: false,
  },
  {
    key: "Warranty",
    value: "",
    isCustom: false,
  },
];

// ============================================================
// FILE URL HELPER
// ============================================================

const getFileUrl = (filePath) => {
  if (!filePath) {
    return null;
  }

  // Already full URL
  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return filePath;
  }

  // Backend URL + file path
  return `${serverUrl}${filePath.startsWith("/") ? "" : "/"}${filePath}`;
};

// ============================================================
// COMPONENT
// ============================================================

const EditProductModal = ({ productId, onClose, onUpdateSuccess }) => {
  // ==========================================================
  // STATES
  // ==========================================================

  const [name, setName] = useState("");

  const [category, setCategory] = useState("server");

  const [introduction, setIntroduction] = useState("");

  const [specifications, setSpecifications] = useState(defaultSpecs);

  const [image, setImage] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);

  const [datasheet, setDatasheet] = useState(null);

  const [loading, setLoading] = useState(false);

  const [fetching, setFetching] = useState(true);

  const [existingDatasheet, setExistingDatasheet] = useState(null);

  // ==========================================================
  // QUILL CONFIG
  // ==========================================================

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  // ==========================================================
  // FETCH PRODUCT
  // ==========================================================

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setFetching(true);

        const response = await axios.get(
          `${serverUrl}/api/product/get-product/${productId}`,
          {
            withCredentials: true,
          },
        );

        const product = response.data.product;

        if (!product) {
          throw new Error("Product not found");
        }

        // ------------------------------------------
        // BASIC DATA
        // ------------------------------------------

        setName(product.name || "");

        setCategory(product.category || "server");

        setIntroduction(product.introduction || "");

        // ------------------------------------------
        // IMAGE
        // ------------------------------------------

        setImage(null);

        setImagePreview(getFileUrl(product.image));

        // ------------------------------------------
        // DATASHEET
        // ------------------------------------------

        setDatasheet(null);

        setExistingDatasheet(getFileUrl(product.datasheet));

        // ------------------------------------------
        // SPECIFICATIONS
        // ------------------------------------------

        if (
          Array.isArray(product.specifications) &&
          product.specifications.length > 0
        ) {
          const normalizedSpecs = product.specifications.map((spec) => ({
            key: spec.key || "",
            value: spec.value || "",
            isCustom: !defaultSpecs.some(
              (defaultSpec) => defaultSpec.key === spec.key,
            ),
          }));

          setSpecifications(normalizedSpecs);
        } else {
          setSpecifications(
            defaultSpecs.map((spec) => ({
              ...spec,
            })),
          );
        }
      } catch (error) {
        console.error("Fetch product details error:", error);

        toast.error(
          error.response?.data?.message || "Failed to fetch product details",
        );

        onClose();
      } finally {
        setFetching(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId, onClose]);

  // ==========================================================
  // SPECIFICATION VALUE
  // ==========================================================

  const handleValueChange = (index, value) => {
    setSpecifications((previous) =>
      previous.map((spec, i) =>
        i === index
          ? {
              ...spec,
              value,
            }
          : spec,
      ),
    );
  };

  // ==========================================================
  // SPECIFICATION KEY
  // ==========================================================

  const handleKeyChange = (index, value) => {
    setSpecifications((previous) =>
      previous.map((spec, i) =>
        i === index
          ? {
              ...spec,
              key: value,
            }
          : spec,
      ),
    );
  };

  // ==========================================================
  // ADD SPECIFICATION
  // ==========================================================

  const addSpecification = () => {
    setSpecifications((previous) => [
      ...previous,
      {
        key: "",
        value: "",
        isCustom: true,
      },
    ]);
  };

  // ==========================================================
  // REMOVE SPECIFICATION
  // ==========================================================

  const removeSpecification = (index) => {
    setSpecifications((previous) => previous.filter((_, i) => i !== index));
  };

  // ==========================================================
  // IMAGE CHANGE
  // ==========================================================

  const handleImageChange = (file) => {
    if (!file) {
      return;
    }

    // Validate image
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");

      return;
    }

    // 10MB
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be less than 10MB");

      return;
    }

    setImage(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // ==========================================================
  // DATASHEET CHANGE
  // ==========================================================

  const handleDatasheetChange = (file) => {
    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");

      return;
    }

    // 10MB
    if (file.size > 10 * 1024 * 1024) {
      toast.error("PDF must be less than 10MB");

      return;
    }

    setDatasheet(file);
  };

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("Product name is required");

      return;
    }

    if (!category) {
      toast.error("Product category is required");

      return;
    }

    // ------------------------------------------
    // CLEAN SPECIFICATIONS
    // ------------------------------------------

    const cleanSpecifications = specifications
      .map((spec) => ({
        key: spec.key.trim(),
        value: spec.value.trim(),
      }))
      .filter((spec) => spec.key && spec.value);

    try {
      setLoading(true);

      // ------------------------------------------
      // FORM DATA
      // ------------------------------------------

      const formData = new FormData();

      // IMPORTANT:
      // category MUST come before files
      formData.append("name", name.trim());

      formData.append("category", category);

      formData.append("introduction", introduction);

      formData.append("specifications", JSON.stringify(cleanSpecifications));

      // ------------------------------------------
      // NEW IMAGE
      // ------------------------------------------

      if (image) {
        formData.append("image", image);
      }

      // ------------------------------------------
      // NEW DATASHEET
      // ------------------------------------------

      if (datasheet) {
        formData.append("datasheet", datasheet);
      }

      // ------------------------------------------
      // DEBUG
      // ------------------------------------------

      console.log("Updating product:", productId);

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // ------------------------------------------
      // API REQUEST
      // ------------------------------------------

      const response = await axios.put(
        `${serverUrl}/api/product/update-product/${productId}`,
        formData,
        {
          withCredentials: true,
        },
      );

      // ------------------------------------------
      // SUCCESS
      // ------------------------------------------

      toast.success(response.data.message || "Product updated successfully");

      await onUpdateSuccess();

      onClose();
    } catch (error) {
      console.error("Update product error:", error);

      toast.error(error.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // FETCHING UI
  // ==========================================================

  if (fetching) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 flex flex-col items-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>

          <p className="mt-4 font-semibold text-gray-700">
            Loading Product Data...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================================
  // MODAL
  // ==========================================================

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full my-8 p-6 sm:p-10 relative max-h-[90vh] overflow-y-auto">
        {/* ==================================================
            CLOSE
        ================================================== */}

        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-6 cursor-pointer h-6 text-gray-600" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ==================================================
              PRODUCT NAME
          ================================================== */}

          <div>
            <label className="block mb-2 font-semibold">Product Name</label>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="w-full border rounded-xl p-3"
            />
          </div>

          {/* ==================================================
              PRODUCT TYPE
          ================================================== */}

          <div>
            <label className="block mb-2 font-semibold">Product Type</label>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full cursor-pointer border rounded-xl p-3 bg-white"
            >
              <option value="server">Server</option>

              <option value="workstation">Workstation</option>
            </select>
          </div>

          {/* ==================================================
              IMAGE
          ================================================== */}

          <div>
            <label className="block mb-2 font-medium">Product Image</label>

            <label className="w-full border rounded-xl p-3 flex items-center justify-between cursor-pointer bg-white">
              <span className="text-gray-500 truncate">
                {image ? image.name : "Select new image to replace"}
              </span>

              <span className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Browse
              </span>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={(event) => handleImageChange(event.target.files?.[0])}
                className="hidden"
              />
            </label>
          </div>

          {/* ==================================================
              IMAGE PREVIEW
          ================================================== */}

          {imagePreview && (
            <div>
              <p className="text-sm font-semibold mb-2">Current Image</p>

              <img
                src={imagePreview}
                alt={name || "Product"}
                className="h-40 w-auto max-w-full object-contain rounded-lg border"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}

          {/* ==================================================
              INTRODUCTION
          ================================================== */}

          <div>
            <label className="block mb-2 font-semibold">
              Product Introduction
            </label>

            <ReactQuill
              theme="snow"
              value={introduction}
              onChange={setIntroduction}
              modules={modules}
            />
          </div>

          {/* ==================================================
              SPECIFICATIONS
          ================================================== */}

          <div>
            <h3 className="text-lg font-semibold mb-3">Specifications</h3>

            <div className="space-y-3">
              {specifications.map((spec, index) => (
                <div
                  key={`${index}-${spec.key}`}
                  className="grid grid-cols-2 gap-3"
                >
                  <input
                    type="text"
                    value={spec.key}
                    placeholder="Key"
                    readOnly={!spec.isCustom}
                    onChange={(event) =>
                      handleKeyChange(index, event.target.value)
                    }
                    className={`border p-3 rounded-lg ${
                      spec.isCustom ? "bg-white" : "bg-gray-100"
                    }`}
                  />

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={spec.value}
                      placeholder="Value"
                      onChange={(event) =>
                        handleValueChange(index, event.target.value)
                      }
                      className="flex-1 border p-3 rounded-lg"
                    />

                    {spec.isCustom && (
                      <button
                        type="button"
                        onClick={() => removeSpecification(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 rounded-lg"
                      >
                        X
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addSpecification}
              className="mt-4 cursor-pointer bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              + Add Specification
            </button>
          </div>

          {/* ==================================================
              DATASHEET
          ================================================== */}

          <div>
            <label className="block mb-2 font-medium">Datasheet PDF</label>

            {existingDatasheet && (
              <a
                href={existingDatasheet}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mb-3 text-blue-600 hover:underline"
              >
                View Current Datasheet
              </a>
            )}

            <label className="w-full border rounded-xl p-3 flex items-center justify-between cursor-pointer bg-white">
              <span className="text-gray-500 truncate">
                {datasheet ? datasheet.name : "Select new PDF to replace"}
              </span>

              <span className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Browse
              </span>

              <input
                type="file"
                accept="application/pdf,.pdf"
                onChange={(event) =>
                  handleDatasheetChange(event.target.files?.[0])
                }
                className="hidden"
              />
            </label>
          </div>

          {/* ==================================================
              BUTTONS
          ================================================== */}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 cursor-pointer py-3 border rounded-xl text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 cursor-pointer text-white px-8 py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
