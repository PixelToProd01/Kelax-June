import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../App";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

const LIMIT = 20;

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${serverUrl}/api/product/get-all-product`, {
        params: {
          page,
          limit: LIMIT,
        },
        withCredentials: true,
      });

      const data = res.data.products || [];

      setProducts(data);

      setHasMore(data.length === LIMIT);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load warranty");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const deleteProduct = async (id) => {
    if (!confirm("Delete Product?")) return;

    try {
      await axios.delete(`${serverUrl}/api/product/delete-product/${id}`, {
        withCredentials: true,
      });

      toast.success("Warranty Deleted");

      fetchProducts();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="bg-gray-100 p-3 md:p-2">
      <h1 className="text-2xl font-bold mb-5">Product Management</h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <>
          {/* ================= DESKTOP TABLE ================= */}

          <div className="hidden md:block bg-white rounded-xl shadow overflow-auto max-h-[60vh]">
            <table
              className="
              min-w-[1000px]
              text-sm
          "
            >
              {/* HEADER */}

              <thead
                className="
              bg-[#006db8]
              text-white
              sticky
              top-0
              z-10
            "
              >
                <tr>
                  <th
                    className="
                  px-4 py-3 text-left w-22 border-r border-gray-500
                "
                  >
                    S. No.
                  </th>

                  <th className="p-4 text-left border-r border-gray-500">
                    Product Name
                  </th>

                  <th className="p-4 text-left border-r border-gray-500">
                    Product Type
                  </th>

                  {/* <th className="p-4 text-left border-r border-gray-500">
                    Warranty Timing
                  </th> */}

                  <th className="p-4 text-left border-r border-gray-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((p, index) => (
                  <tr
                    key={p._id}
                    className="
              border-b
              hover:bg-gray-50
              "
                  >
                    {/* SERIAL */}

                    <td
                      className="
              px-4 py-3 font-semibold text-gray-600 border-r border-gray-500
              "
                    >
                      {(page - 1) * LIMIT + index + 1}
                    </td>

                    {/* PRODUCT */}

                    <td
                      className="
              p-4 space-y-1 border-r border-gray-500
              "
                    >
                      <p className="font-semibold">
                        <span className="ml-2">{p.name}</span>
                      </p>
                    </td>

                    {/* CUSTOMER */}

                    <td className=" p-4 space-y-1 border-r border-gray-500">
                      <p>{p.category}</p>
                    </td>

                    {/* ACTION */}

                    <td
                      className="
              px-6
              py-5
              "
                    >
                      <button
                        onClick={() => deleteProduct(p._id)}
                        className="
              bg-red-600
              hover:bg-red-700
              text-white
              px-5
              py-2
              rounded-lg
              cursor-pointer
              "
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* ================= MOBILE ================= */}

          <div className="grid gap-4 md:hidden">
            {products.map((item, index) => (
              <div
                key={item._id}
                className="
    bg-white
    rounded-xl
    shadow
    p-4
    "
              >
                <div className="mt-4 space-y-2 text-sm">
                  <p>
                    <b>Product Name:</b> {item.name}
                  </p>

                  <p>
                    <b>Product Type:</b> {item.category}
                  </p>

                  <button
                    onClick={() => deleteProduct(item._id)}
                    className="
    mt-3
    bg-red-600
    text-white
    px-4
    py-2
    rounded-lg
    w-full
    "
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}

          <div
            className="
    flex
    justify-between
    items-center
    mt-6
    bg-white
    p-4
    rounded-xl
    "
          >
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="
    px-4 py-2
    cursor-pointer
    border
    rounded
    disabled:opacity-40
    "
            >
              Prev
            </button>

            <span>Page {page}</span>

            <button
              disabled={!hasMore}
              onClick={() => setPage((p) => p + 1)}
              className="
    px-4 py-2
    cursor-pointer
    border
    rounded
    disabled:opacity-40
    "
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewProducts;
