import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../App";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ProductDetails = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/product/get-product/${slug}`
        );

        setProduct(res.data.product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center">
          Loading...
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center">
          Product not found
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">

          {/* PRODUCT TOP SECTION */}
          <div className="grid md:grid-cols-2 gap-12 mb-14">

            {/* IMAGE */}
            <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-center">
              <img
                src={`${serverUrl}${product.image}`}
                alt={product.name}
                className="max-h-[400px] object-contain"
              />
            </div>

            {/* INFO */}
            <div>

              <h1 className="text-4xl font-bold mb-6">
                {product.name}
              </h1>

              {/* DOWNLOAD DATASHEET */}
              <a
                href={`${serverUrl}${product.datasheet}`}
                target="_blank"
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                Download Datasheet
              </a>

            </div>

          </div>

          {/* INTRODUCTION */}
          <div className="bg-white p-8 rounded-xl shadow-md mb-10">

            <h2 className="text-2xl font-semibold mb-6">
              Product Introduction
            </h2>

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: product.introduction,
              }}
            />

          </div>

          {/* SPECIFICATIONS */}
          <div className="bg-white p-8 rounded-xl shadow-md">

            <h2 className="text-2xl font-semibold mb-6">
              Specifications
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full border">

                <tbody>

                  {product.specifications.map((spec, index) => (
                    <tr key={index} className="border-b">

                      <td className="p-4 font-medium bg-gray-50 w-1/3">
                        {spec.key}
                      </td>

                      <td className="p-4">
                        {spec.value}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProductDetails;