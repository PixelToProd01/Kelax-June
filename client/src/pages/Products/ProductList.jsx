import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../App";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import serverPageBg from "../../assets/products/Server_Page_Hero.png"
import workstationPageBg from "../../assets/products/Workstation_Page_Hero.png"

import {
  FiShield,
  FiTrendingUp,
  FiSettings,
  FiCpu,
  FiLayers,
  FiArrowRight,
  FiHeadphones,
} from "react-icons/fi";

const FEATURES = [
  { icon: FiShield, title: "Enterprise", subtitle: "Grade Quality" },
  { icon: FiTrendingUp, title: "High", subtitle: "Performance" },
  { icon: FiSettings, title: "Built for", subtitle: "Reliability" },
];

// Pulls one spec's value out of a product's `specifications` array by key
// name (case-insensitive), e.g. getSpec(product, "Socket").
const getSpec = (product, keyName) => {
  const match = (product.specifications || []).find(
    (s) => s.key?.toLowerCase() === keyName.toLowerCase(),
  );
  return match?.value;
};

const ProductList = () => {
  const { category } = useParams();
  const heroBg = category === "workstation" ? workstationPageBg : serverPageBg;

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

      {/* ===== CHANGE: added min-h so the hero has enough room to show the
          full graphic (both server racks + the tower's headroom) instead
          of being squeezed down to just the text content's height, and
          swapped object-position from vertically-centered to top-anchored
          (object-right-top / object-top) so any cropping that does happen
          comes off the BOTTOM of the image, not the top. ===== */}
      <section className="relative pt-20 pb-8 overflow-hidden bg-gradient-to-br from-[#eef2fb] via-[#eef2fb] to-[#dfe7fb] min-h-[420px] md:min-h-[480px]">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-right-top md:object-top"
        />
        {/* <div className="absolute inset-0 bg-white md:bg-black/25" /> */}
        <div className="absolute inset-0 bg-black/30 md:bg-white/15" />
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-3">
            {/* <p className="text-sm font-semibold tracking-wide text-[#3050c8] uppercase mb-3">
              Our Products
            </p> */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-white md:text-gray-900 leading-tight mb-4 capitalize mt-12">
              {category || "Server"} Products
            </h1>
            <p className="text-gray-100 md:text-gray-600 text-lg leading-relaxed mb-8 max-w-md">
              Powerful. Reliable. Scalable. Our {category || "server"} range
              is built to handle today's workloads and tomorrow's challenges.
            </p>

            <div className="flex flex-wrap gap-8">
              {FEATURES.map(({ icon: Icon, title, subtitle }) => (
                <div key={title} className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-white/70 flex items-center justify-center text-[#3050c8] shrink-0">
                    <Icon className="text-lg" />
                  </div>
                  <p className="text-sm font-semibold text-white md:text-gray-800 leading-snug">
                      {title}
                      <br />
                      {subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 relative flex items-center justify-center min-h-[280px]" />
        </div>
      </section>

      <section className="bg-[#f9fafb] pt-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-0">
            <h2 className="text-2xl font-bold text-gray-900 max-w-md">
              Explore Our <span className="capitalize">{category || "Server"}</span> Range
            </h2>
          </div>
        </div>
      </section>

      <section className="bg-[#f9fafb] pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006db8]"></div>
            </div>
          )}

          {error && <p className="text-center text-red-500 text-lg">{error}</p>}

          {!loading && !error && products.length === 0 && (
            <p className="text-center text-gray-500 text-lg py-20">
              No products found.
            </p>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition duration-300 overflow-hidden flex flex-col mt-8"
                >
                  <div className="w-full aspect-[4/3] flex items-center justify-center px-6 pt-6">
                    <img
                      src={`${serverUrl}${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="px-5 pb-5 pt-3 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {product.name}
                    </h3>

                    {(getSpec(product, "Socket") || getSpec(product, "Memory Slots")) && (
                      <ul className="space-y-1.5 mb-4 text-sm text-gray-500">
                        {getSpec(product, "Socket") && (
                          <li className="flex items-center gap-2">
                            <FiCpu className="text-gray-400 shrink-0" />
                            Socket: {getSpec(product, "Socket")}
                          </li>
                        )}
                        {getSpec(product, "Memory Slots") && (
                          <li className="flex items-center gap-2">
                            <FiLayers className="text-gray-400 shrink-0" />
                            Memory Slots: {getSpec(product, "Memory Slots")}
                          </li>
                        )}
                      </ul>
                    )}

                    <div className="mt-auto">
                      <Link
                        to={`/products/details/${product.slug}`}
                        className="flex items-center justify-center gap-2 bg-[#006db8] text-white py-2.5 rounded-lg font-medium hover:bg-[#005a98] transition"
                      >
                        View Details
                        <FiArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="hidden md:flex h-12 w-12 rounded-full bg-blue-50 items-center justify-center text-[#006db8] text-xl shrink-0">
                <FiHeadphones />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Need help choosing the right {category || "server"}?
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Our experts are here to help you find the perfect solution
                  for your business needs.
                </p>
              </div>
            </div>

            <a
              href="/contact-us"
              className="shrink-0 flex items-center gap-2 bg-[#006db8] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#005a98] transition whitespace-nowrap"
            >
              Talk to an Expert
              <FiArrowRight />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProductList;