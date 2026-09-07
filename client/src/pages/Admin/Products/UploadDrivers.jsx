import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../App";
import toast from "react-hot-toast";

const UploadDrivers = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    product: "",
    type: "",
    subtype: "",
    title: "",
    version: "",
    environment: "",
  });

  const [driverFile, setDriverFile] = useState(null);

  const [driverName, setDriverName] = useState("");

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

  /* ==============================
      HANDLE INPUT
  ============================== */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ==============================
      DRIVER FILE
  ============================== */

  const handleDriver = (file) => {
    if (!file) return;

    if (
      file.type !== "application/zip" &&
      file.type !== "application/x-zip-compressed"
    ) {
      toast.error("Only ZIP file allowed");
      return;
    }

    setDriverFile(file);

    setDriverName(file.name);
  };

  /* ==============================
      SUBMIT
  ============================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!driverFile) {
      return toast.error("Select ZIP file");
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("product", formData.product);

      data.append("type", formData.type);

      data.append("subtype", formData.subtype);

      data.append("title", formData.title);

      data.append("version", formData.version);

      data.append("environment", formData.environment);

      data.append("driver", driverFile);

      const res = await axios.post(
        `${serverUrl}/api/driver/create-driver`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      toast.success(res.data.message);

      setFormData({
        product: "",
        type: "",
        subtype: "",
        title: "",
        version: "",
        environment: "",
      });

      setDriverFile(null);

      setDriverName("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Driver Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Upload Product Driver
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product */}

          <div>
            <label className="block mb-2 font-semibold">
              Select Model Number
            </label>

            <select
              name="product"
              value={formData.product}
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

          {/* Type */}

          <div>
            <label className="block mb-2 font-semibold">Type</label>

            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="LAN"
              required
              className="w-full border rounded-xl p-3"
            />
          </div>

          {/* Sub Type */}

          {/* <div>
            <label className="block mb-2 font-semibold">Sub Type</label>

            <input
              type="text"
              name="subtype"
              value={formData.subtype}
              onChange={handleChange}
              placeholder="Storage Controller"
              required
              className="w-full border rounded-xl p-3"
            />
          </div> */}

          {/* Title */}

          {/* <div>
            <label className="block mb-2 font-semibold">Driver Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Intel LAN Driver"
              required
              className="w-full border rounded-xl p-3"
            />
          </div> */}

          {/* Version */}

          <div>
            <label className="block mb-2 font-semibold">Version</label>

            <input
              type="text"
              name="version"
              value={formData.version}
              onChange={handleChange}
              placeholder="v2.0.1"
              required
              className="w-full border rounded-xl p-3"
            />
          </div>

          {/* Environment */}

          <div>
            <label className="block mb-2 font-semibold">Environment</label>

            <input
              type="text"
              name="environment"
              value={formData.environment}
              onChange={handleChange}
              placeholder="Windows, Linux, VMware"
              required
              className="w-full border rounded-xl p-3"
            />
          </div>

          {/* ZIP Upload */}

          <div>
            <label className="block mb-2 font-semibold">
              Upload Driver (.zip) - (Maximum driver ZIP size: 1000 MB)
            </label>

            <label className="w-full border rounded-xl p-3 flex items-center justify-between cursor-pointer">
              <span className="text-gray-500">
                {driverName ? driverName : "Select ZIP File"}
              </span>

              <span className="bg-blue-600 text-white px-5 py-2 rounded-lg">
                Browse
              </span>

              <input
                type="file"
                accept=".zip"
                hidden
                onChange={(e) => handleDriver(e.target.files[0])}
              />
            </label>
          </div>

          {/* Button */}

          <button
            disabled={loading}
            className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl text-lg"
          >
            {loading ? "Uploading..." : "Upload Driver"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadDrivers;
