import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../App";
import toast from "react-hot-toast";
import EditProductModal from "../../../components/EditProductModal.jsx";

const LIMIT = 20;

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // ============================================================
  // FETCH PRODUCTS
  // ============================================================

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${serverUrl}/api/product/get-all-product`,
        {
          params: {
            page,
            limit: LIMIT,
          },
          withCredentials: true,
        }
      );

      const data = res.data.products || [];

      setProducts(data);
      setHasMore(data.length === LIMIT);

    } catch (error) {
      console.error("Fetch products error:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  // ============================================================
  // DELETE PRODUCT
  // ============================================================

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${serverUrl}/api/product/delete-product/${id}`,
        {
          withCredentials: true,
        }
      );

      toast.success("Product deleted successfully");

      await fetchProducts();

    } catch (error) {
      console.error("Delete product error:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete product"
      );
    }
  };

  // ============================================================
  // OPEN EDIT MODAL
  // ============================================================

  const handleEditClick = (id) => {
    setSelectedProductId(id);
    setIsEditModalOpen(true);
  };

  // ============================================================
  // CLOSE EDIT MODAL
  // ============================================================

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProductId(null);
  };

  // ============================================================
  // EDIT SUCCESS
  // ============================================================

  const handleUpdateSuccess = async () => {
    await fetchProducts();
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto bg-gray-100 p-3 md:p-2">

      <h1 className="text-2xl font-bold mb-5">
        Product Management
      </h1>

      {/* ======================================================
          LOADING
      ====================================================== */}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <>
          {/* ==================================================
              DESKTOP TABLE
          ================================================== */}

          <div className="hidden md:block bg-white rounded-xl shadow overflow-auto max-h-[60vh]">

            <table className="min-w-[1000px] text-sm">

              <thead className="bg-[#006db8] text-white sticky top-0 z-10">

                <tr>

                  <th className="px-4 py-3 text-left w-22 border-r border-gray-500">
                    S. No.
                  </th>

                  <th className="p-4 text-left border-r border-gray-500">
                    Product Name
                  </th>

                  <th className="p-4 text-left border-r border-gray-500">
                    Product Type
                  </th>

                  <th className="p-4 text-left border-r border-gray-500">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {products.length === 0 ? (

                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-10 text-gray-500"
                    >
                      No products found
                    </td>
                  </tr>

                ) : (

                  products.map((product, index) => (

                    <tr
                      key={product._id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="px-4 py-3 font-semibold text-gray-600 border-r border-gray-500">
                        {(page - 1) * LIMIT + index + 1}
                      </td>

                      <td className="p-4 border-r border-gray-500 font-semibold">
                        {product.name}
                      </td>

                      <td className="p-4 border-r border-gray-500 capitalize">
                        {product.category}
                      </td>

                      <td className="px-6 py-5">

                        <button
                          onClick={() =>
                            deleteProduct(product._id)
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg cursor-pointer"
                        >
                          Delete
                        </button>

                        <button
                          onClick={() =>
                            handleEditClick(product._id)
                          }
                          className="bg-gray-500 hover:bg-gray-700 text-white ml-4 px-5 py-2 rounded-lg cursor-pointer"
                        >
                          Edit
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

          {/* ==================================================
              MOBILE
          ================================================== */}

          <div className="grid gap-4 md:hidden">

            {products.map((product) => (

              <div
                key={product._id}
                className="bg-white rounded-xl shadow p-4"
              >

                <div className="space-y-2 text-sm">

                  <p>
                    <b>Product Name:</b>{" "}
                    {product.name}
                  </p>

                  <p>
                    <b>Product Type:</b>{" "}
                    <span className="capitalize">
                      {product.category}
                    </span>
                  </p>

                  <button
                    onClick={() =>
                      deleteProduct(product._id)
                    }
                    className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg w-full"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() =>
                      handleEditClick(product._id)
                    }
                    className="mt-3 bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg w-full"
                  >
                    Edit
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* ==================================================
              PAGINATION
          ================================================== */}

          <div className="flex justify-between items-center mt-6 bg-white p-4 rounded-xl">

            <button
              disabled={page === 1}
              onClick={() =>
                setPage((current) => current - 1)
              }
              className="px-4 py-2 border rounded disabled:opacity-40 cursor-pointer"
            >
              Prev
            </button>

            <span>
              Page {page}
            </span>

            <button
              disabled={!hasMore}
              onClick={() =>
                setPage((current) => current + 1)
              }
              className="px-4 py-2 border rounded disabled:opacity-40 cursor-pointer"
            >
              Next
            </button>

          </div>

        </>
      )}

      {/* ======================================================
          EDIT PRODUCT MODAL
      ====================================================== */}

      {isEditModalOpen && selectedProductId && (

        <EditProductModal
          productId={selectedProductId}
          onClose={handleCloseEditModal}
          onUpdateSuccess={handleUpdateSuccess}
        />

      )}

    </div>
  );
};

export default ViewProducts;