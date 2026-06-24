import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../App";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateProducts = () => {

  const [name, setName] = useState("");
  const [category, setCategory] = useState("server");
  const [introduction, setIntroduction] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],      
      ["link", "image"],
      ["clean"],
    ],
  };

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [datasheet, setDatasheet] = useState(null);

  // ✅ Default Specs (locked)
  const defaultSpecs = [
    { key: "Processor", value: "", isCustom: false },
    { key: "Socket", value: "", isCustom: false },
    { key: "Memory Type", value: "", isCustom: false },
    { key: "Memory Slots", value: "", isCustom: false },
    { key: "Storage", value: "", isCustom: false },
    { key: "Supported Drives", value: "", isCustom: false },
    { key: "OS", value: "", isCustom: false },
    { key: "Warranty", value: "", isCustom: false },
  ];

  const [specifications, setSpecifications] = useState(defaultSpecs);

  const [loading, setLoading] = useState(false);

  // value change
  const handleValueChange = (index, value) => {

    setSpecifications((prev) =>
      prev.map((spec, i) =>
        i === index ? { ...spec, value } : spec
      )
    );

  };

  // key change
  const handleKeyChange = (index, value) => {

    setSpecifications((prev) =>
      prev.map((spec, i) =>
        i === index ? { ...spec, key: value } : spec
      )
    );

  };

  // add custom spec
  const addSpecification = () => {

    setSpecifications([
      ...specifications,
      { key: "", value: "", isCustom: true },
    ]);

  };

  // remove custom spec
  const removeSpecification = (index) => {

    const updated = specifications.filter((_, i) => i !== index);
    setSpecifications(updated);

  };

  // image preview
  const handleImageChange = (file) => {

    setImage(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);

  };

  // submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data = new FormData();

      data.append("name", name);
      data.append("category", category);
      data.append("introduction", introduction);
      data.append("specifications", JSON.stringify(specifications));

      if (image) data.append("image", image);
      if (datasheet) data.append("datasheet", datasheet);

      const res = await axios.post(
        `${serverUrl}/api/product/create-product`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      alert(res.data.message);

      setName("");
      setIntroduction("");
      setImage(null);
      setDatasheet(null);
      setImagePreview(null);
      setSpecifications(defaultSpecs);

    } catch (error) {

      console.error(error);
      alert("Error creating product");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-10">

        <h1 className="text-3xl font-bold text-center mb-10">
          Create Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Product Name */}

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-xl p-3"
          />

          {/* Category */}

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-xl p-3"
          >
            <option value="server">Server</option>
            <option value="workstation">Workstation</option>
          </select>

          {/* Image */}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e.target.files[0])}
            required
            className="w-full border rounded-xl p-3"
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="h-40 mt-3 rounded-lg"
            />
          )}

          {/* Introduction */}

          <ReactQuill
            theme="snow"
            value={introduction}
            onChange={setIntroduction}
            modules={modules}
          />

          {/* Specifications */}

          <div>

            <h3 className="text-lg font-semibold mb-4">
              Specifications
            </h3>

            <div className="space-y-3">

              {specifications.map((spec, index) => (

                <div
                  key={index}
                  className="grid grid-cols-2 gap-3"
                >

                  {/* key */}

                  <input
                    type="text"
                    value={spec.key}
                    placeholder="Key"
                    readOnly={!spec.isCustom}
                    onChange={(e) =>
                      handleKeyChange(index, e.target.value)
                    }
                    className="border p-3 rounded-lg bg-gray-100"
                  />

                  {/* value */}

                  <div className="flex gap-2">

                    <input
                      type="text"
                      value={spec.value}
                      placeholder="Value"
                      onChange={(e) =>
                        handleValueChange(index, e.target.value)
                      }
                      className="flex-1 border p-3 rounded-lg"
                    />

                    {spec.isCustom && (

                      <button
                        type="button"
                        onClick={() => removeSpecification(index)}
                        className="bg-red-500 text-white px-4 rounded-lg"
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
              className="mt-4 bg-indigo-600 text-white cursor-pointer px-6 py-2 rounded-lg"
            >
              + Add Specification
            </button>

          </div>

          {/* Datasheet */}

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setDatasheet(e.target.files[0])}
            required
            className="w-full border rounded-xl p-3"
          />

          {/* submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 cursor-pointer text-white py-4 rounded-xl text-lg"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>

        </form>

      </div>

    </div>
  );

};

export default CreateProducts;