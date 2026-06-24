import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../App";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ProductList = () => {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${serverUrl}/api/product/get-products/${category}`,
        );

        console.log("API RESPONSE :", res.data);

        // ✅ Correct response handling
        setProducts(res.data.products || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gray-50 pt-28 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <h1 className="text-4xl font-bold text-center mb-14 capitalize text-gray-800">
            {category} Products
          </h1>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {/* Error */}
          {error && <p className="text-center text-red-500 text-lg">{error}</p>}

          {/* No Products */}
          {!loading && products.length === 0 && (
            <p className="text-center text-gray-500 text-lg">
              No products found.
            </p>
          )}

          {/* Product Grid */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="w-full aspect-[4/3] overflow-hidden flex items-center justify-center">
                  <img
                    src={`${serverUrl}${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-contain transition duration-300 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between h-40">
                  <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
                    {product.name}
                  </h2>

                  <Link
                    to={`/products/details/${product.slug}`}
                    className="mt-4 inline-block text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProductList;
