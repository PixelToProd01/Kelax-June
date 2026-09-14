import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../App";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  FiDownload,
  FiCpu,
  FiLayers,
  FiShield,
  FiSettings,
  FiActivity,
  FiCheckCircle,
  FiLock,
  FiHeadphones,
  FiPhone,
  FiMail,
  FiServer,
  FiZap,
} from "react-icons/fi";
import { PiLeaf } from "react-icons/pi";

// Pulls one spec's value out of a product's `specifications` array by key
// name (case-insensitive), e.g. getSpec(product, "Socket").
const getSpec = (product, keyName) => {
  const match = (product.specifications || []).find(
    (s) => s.key?.toLowerCase() === keyName.toLowerCase()
  );
  return match?.value || null;
};

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

  // ===== CHANGE: derive real spec values used across the new hero /
  // trust strip so nothing is hardcoded that we actually have data for.
  const socket = getSpec(product, "Socket");
  const memorySlots = getSpec(product, "Memory Slots");
  const processor = getSpec(product, "Processor");
  const warranty = getSpec(product, "Warranty");

  // ===== CHANGE: teaser shows only the first paragraph/line of the
  // product's introduction (e.g. "Introducing Kelax VedaVault Server
  // Series: Empowering Server-Centric Verticals and Segments") instead of
  // a fixed character slice, so every product shows just that opening
  // line in the hero — the rest of the introduction still appears in full
  // further down the page.
  const firstIntroBlockMatch = (product.introduction || "").match(
    /<(p|h[1-6])[^>]*>([\s\S]*?)<\/\1>/i
  );
  const introTeaser = (
    firstIntroBlockMatch ? firstIntroBlockMatch[2] : product.introduction || ""
  )
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return (
    <>
      <Navbar />

      {/* ===== CHANGE: PRODUCT TOP SECTION replaced with a hero band
          (gradient bg, dot-grid accent, tagline, feature chips) matching
          the mockup — same product data as before, new layout.
          ===== CHANGE: sizing scaled down ~15-20% across this section
          (headings, spacing, paddings) so 100% zoom shows the same
          amount of content as before at 80% zoom, instead of overflowing
          the viewport. ===== */}
      <section className="relative pt-24 pb-8 overflow-hidden bg-gradient-to-br from-[#eef2fb] via-[#eef2fb] to-[#dfe7fb]">
        <div
          className="absolute top-14 left-6 w-32 h-32 opacity-40 pointer-events-none hidden md:block"
          style={{
            backgroundImage:
              "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
          {/* IMAGE + spec highlight panel */}
          <div>
            {/* CHANGE: image now sits in a bordered card of the same
                width/style as the Socket Type / Memory Slots panel below
                it, so both boxes line up edge-to-edge instead of the
                photo floating narrower than the panel underneath. */}
            <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-center min-h-[220px] mb-5">
              <img
                src={`${serverUrl}${product.image}`}
                alt={product.name}
                className="max-h-[260px] object-contain drop-shadow-xl"
              />
            </div>

            {(socket || memorySlots) && (
              <div className="bg-white rounded-2xl shadow-sm p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {socket && (
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center text-[#006db8] shrink-0">
                      <FiCpu className="text-base" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Socket Type</p>
                      <p className="text-gray-500 text-sm">{socket}</p>
                    </div>
                  </div>
                )}

                {memorySlots && (
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center text-[#006db8] shrink-0">
                      <FiLayers className="text-base" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Memory Slots</p>
                      <p className="text-gray-500 text-sm">{memorySlots}</p>
                    </div>
                  </div>
                )}

                {/* CHANGE: 2 extra hardcoded highlights so this panel
                    reads as a fuller 2x2 grid instead of just 2 items */}
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center text-[#006db8] shrink-0">
                    <FiServer className="text-base" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Form Factor</p>
                    <p className="text-gray-500 text-sm">2U Rack Server</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center text-[#006db8] shrink-0">
                    <FiZap className="text-base" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Power Supply</p>
                    <p className="text-gray-500 text-sm">Redundant, Hot-Swappable</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* INFO */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 leading-tight">
              {product.name}
            </h1>

            <p className="text-lg font-semibold text-gray-800 mb-3">
              Powerful. Reliable.{" "}
              <span className="text-[#006db8]">Built for Demanding Workloads.</span>
            </p>

            {/* CHANGE: intro teaser — just the first paragraph/heading
                line of the product's introduction, no truncation */}
            {introTeaser && (
              <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-xl">
                {introTeaser}
              </p>
            )}

            {/* DOWNLOAD DATASHEET */}
            <a
              href={`${serverUrl}${product.datasheet}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#006db8] text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-[#005a98] transition mb-7"
            >
              <FiDownload />
              Download Datasheet
            </a>

            {/* CHANGE: icon + title now sit on one line (same height for
                all 4 items), so every title starts at the same level and
                every description below it starts at the same level too */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <FiActivity className="text-[#006db8] text-xl shrink-0" />
                  <p className="font-semibold text-gray-900 text-sm">High Performance</p>
                </div>
                <p className="text-gray-500 text-xs leading-snug">
                  {processor
                    ? `Powered by ${processor}.`
                    : "Latest Gen processors for maximum performance."}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <FiShield className="text-[#006db8] text-xl shrink-0" />
                  <p className="font-semibold text-gray-900 text-sm">Enterprise Grade</p>
                </div>
                <p className="text-gray-500 text-xs leading-snug">
                  {warranty
                    ? `Backed by ${warranty}.`
                    : "Built for 24x7 reliability and data integrity."}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <FiLayers className="text-[#006db8] text-xl shrink-0" />
                  <p className="font-semibold text-gray-900 text-sm">Scalable Storage</p>
                </div>
                <p className="text-gray-500 text-xs leading-snug">
                  Flexible configuration for growing needs.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <FiSettings className="text-[#006db8] text-xl shrink-0" />
                  <p className="font-semibold text-gray-900 text-sm">Easy Management</p>
                </div>
                <p className="text-gray-500 text-xs leading-snug">
                  Remote management and monitoring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CHANGE: new dark trust strip section (not in original file) —
          padding scaled down to match the more compact hero ===== */}
      <section className="bg-gradient-to-r from-[#071233] to-[#0b2352] px-6 py-8">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex gap-3">
            <div className="h-9 w-9 rounded-full border border-white/30 flex items-center justify-center text-white shrink-0">
              <FiActivity className="text-base" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Optimized Performance</p>
              <p className="text-blue-100/80 text-xs leading-snug mt-0.5">
                Designed for virtualization, cloud, and enterprise apps.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="h-9 w-9 rounded-full border border-white/30 flex items-center justify-center text-white shrink-0">
              <FiCheckCircle className="text-base" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Maximum Reliability</p>
              <p className="text-blue-100/80 text-xs leading-snug mt-0.5">
                Redundant components & rigorous testing for non-stop operations.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="h-9 w-9 rounded-full border border-white/30 flex items-center justify-center text-white shrink-0">
              <PiLeaf className="text-base" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Energy Efficient</p>
              <p className="text-blue-100/80 text-xs leading-snug mt-0.5">
                Optimized power consumption for a lower TCO.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="h-9 w-9 rounded-full border border-white/30 flex items-center justify-center text-white shrink-0">
              <FiLock className="text-base" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Trusted Security</p>
              <p className="text-blue-100/80 text-xs leading-snug mt-0.5">
                Built-in features to protect your data and infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION — padding/spacing scaled down slightly to stay
          consistent with the more compact hero and trust strip above */}
      <section className="bg-[#f9fafb] px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">
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
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Quick Specs:
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border">
                <tbody>
                  {product.specifications.map((spec, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-3 font-medium bg-gray-50 w-1/3">
                        {spec.key}
                      </td>
                      <td className="p-3">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ===== CHANGE: new CTA bar (not in original file) ===== */}
          <div className="mt-8 bg-blue-50/60 rounded-2xl p-5 md:p-7 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="hidden md:flex h-11 w-11 rounded-full bg-white items-center justify-center text-[#006db8] text-lg shrink-0">
                <FiHeadphones />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Need help choosing the right server?
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Talk to our experts and find the perfect solution for your
                  business.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="/contact-us"
                className="flex items-center justify-center gap-2 bg-white border border-[#006db8] text-[#006db8] px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition whitespace-nowrap"
              >
                <FiMail />
                Contact Sales
              </a>

              <a
                href="/contact-us"
                className="flex items-center justify-center gap-2 bg-[#006db8] text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-[#005a98] transition whitespace-nowrap"
              >
                <FiPhone />
                Request a Callback
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProductDetails;