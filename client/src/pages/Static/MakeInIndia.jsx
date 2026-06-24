import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function MakeInIndia() {
  return (
    <>
    <Navbar />
    <div
      className="min-h-screen py-12 px-6 md:px-16 lg:px-28"
      style={{
        background: "linear-gradient(to bottom, #FF9933 0%, white 50%, #138808 100%)",
      }}
    >
      {/* Main Container with glass effect */}
      <div className="bg-white/80 backdrop-blur-md shadow-xl p-8 md:p-12 rounded-2xl mt-20">

        {/* Header */}
        <h1
          className="text-3xl md:text-4xl font-bold text-center mb-6"
          style={{ color: "#006db8" }}
        >
          Make In India
        </h1>

        {/* Intro */}
        <p className="text-lg leading-relaxed mb-8 text-gray-700">
          As part of the Make In India initiative, Furious Computer Solutions Private
          Limited proudly manufactures Kelax servers and workstations within India. By
          supporting local production, we strengthen India's technological foundation and
          deliver high-quality, reliable computing solutions for businesses across the nation.
        </p>

        {/* Section Title */}
        <h2
          className="text-2xl md:text-3xl font-semibold mb-5"
          style={{ color: "#006db8" }}
        >
          Why Choose Kelax Under the Make in India Initiative?
        </h2>

        <p className="text-lg leading-relaxed mb-10 text-gray-700">
          Kelax stands out with superior build quality, advanced performance, strong support
          services, and truly indigenous manufacturing. Here’s what makes Kelax the preferred
          choice under the Make in India mission.
        </p>

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 hover:scale-105 transition transform"
            style={{ borderColor: "#006db8" }}>
            <h3 className="text-xl font-semibold mb-3" style={{ color: "#006db8" }}>
              Trusted Certifications
            </h3>
            <p className="text-gray-700">
              Kelax holds BIS, FCC Class A, ISO 9001, and ISO 14001 certifications, ensuring
              safety, performance, and environmental responsibility.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 hover:scale-105 transition transform"
            style={{ borderColor: "#006db8" }}>
            <h3 className="text-xl font-semibold mb-3" style={{ color: "#006db8" }}>
              Extensive OS Compatibility
            </h3>
            <p className="text-gray-700">
              Fully compatible with Windows Server, RedHat Enterprise Linux, Windows 10/11,
              CentOS 7+, and more.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 hover:scale-105 transition transform"
            style={{ borderColor: "#006db8" }}>
            <h3 className="text-xl font-semibold mb-3" style={{ color: "#006db8" }}>
              Genuine Make in India
            </h3>
            <p className="text-gray-700">
              Most components are locally manufactured, contributing to India’s economic growth
              and self-reliance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 hover:scale-105 transition transform"
            style={{ borderColor: "#006db8" }}>
            <h3 className="text-xl font-semibold mb-3" style={{ color: "#006db8" }}>
              Customer-Centric Approach
            </h3>
            <p className="text-gray-700">
              Quick support, smooth RMA handling, and a dedicated customer portal ensure
              hassle-free service.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 hover:scale-105 transition transform"
            style={{ borderColor: "#006db8" }}>
            <h3 className="text-xl font-semibold mb-3" style={{ color: "#006db8" }}>
              Flexible Support Options
            </h3>
            <p className="text-gray-700">
              Choose from Standard NBD support or Premium Priority Support depending on your
              requirements.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 hover:scale-105 transition transform"
            style={{ borderColor: "#006db8" }}>
            <h3 className="text-xl font-semibold mb-3" style={{ color: "#006db8" }}>
              High Performance & Reliability
            </h3>
            <p className="text-gray-700">
              Designed for demanding workloads with industry-leading processors, thermal
              engineering, and quality testing.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 hover:scale-105 transition transform"
            style={{ borderColor: "#006db8" }}>
            <h3 className="text-xl font-semibold mb-3" style={{ color: "#006db8" }}>
              Cutting-Edge Technology
            </h3>
            <p className="text-gray-700">
              Continuously updated with the latest processors, storage technology, and security
              features.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 hover:scale-105 transition transform"
            style={{ borderColor: "#006db8" }}>
            <h3 className="text-xl font-semibold mb-3" style={{ color: "#006db8" }}>
              Eco-Friendly Manufacturing
            </h3>
            <p className="text-gray-700">
              Following ISO 14001 standards, Kelax ensures minimal environmental impact.
            </p>
          </div>

        </div>

        {/* Conclusion */}
        <p className="text-lg leading-relaxed mt-10 text-gray-700">
          Kelax continues to empower Indian industries with indigenous technology, reliable
          performance, superior quality, and modern engineering — making it a strong pillar of
          the Make in India initiative.
        </p>

      </div>
    </div>
    <Footer />
    </>
  );
}
