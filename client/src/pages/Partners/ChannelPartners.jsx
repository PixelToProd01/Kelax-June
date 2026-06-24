import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";

export default function ChannelPartners() {
  return (
    <div className="w-full bg-white text-gray-800 mt-20">
      <Navbar />
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-br from-[#001f3f] via-[#003b73] to-[#006db8] text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Welcome to Kelax Channel Partners
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl mt-3 opacity-90">
          Are you looking to expand your horizons in the tech industry? Look no
          further. At Kelax, we value partnerships, and your success is our
          success. Our Channel Partner program is tailored to empower you with
          the tools and resources you need to grow your business.
        </p>
      </section>

      {/* Why Join Us */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Why Join Us</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 shadow-md rounded-xl bg-gray-50 hover:scale-105 transition transform">
            <h3 className="text-xl font-semibold mb-2">
              🌟 Cutting-edge Products
            </h3>
            <p>Access our innovative server and workstation solutions.</p>
          </div>

          <div className="p-6 shadow-md rounded-xl bg-gray-50 hover:scale-105 transition transform">
            <h3 className="text-xl font-semibold mb-2">
              💼 Attractive Margins
            </h3>
            <p>Enjoy competitive margins and lucrative incentives.</p>
          </div>

          <div className="p-6 shadow-md rounded-xl bg-gray-50 hover:scale-105 transition transform">
            <h3 className="text-xl font-semibold mb-2">🤝 Dedicated Support</h3>
            <p>Count on our dedicated Channel Partner support team.</p>
          </div>

          <div className="p-6 shadow-md rounded-xl bg-gray-50 hover:scale-105 transition transform">
            <h3 className="text-xl font-semibold mb-2">🌐 Global Reach</h3>
            <p>Tap into our global network and reach new markets.</p>
          </div>

          <div className="p-6 shadow-md rounded-xl bg-gray-50 hover:scale-105 transition transform">
            <h3 className="text-xl font-semibold mb-2">
              📈 Growth Opportunities
            </h3>
            <p>Grow your business with a trusted industry leader.</p>
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">How to Get Started</h2>

          <ul className="text-lg max-w-2xl mx-auto space-y-5 text-left">
            <li>
              ✅ <strong>Sign Up:</strong> Join our Channel Partner program by
              signing up today.
            </li>
            <li>
              ✅ <strong>Training:</strong> Gain insights with training and
              resources to excel in sales and support.
            </li>
            <li>
              ✅ <strong>Access Portal:</strong> Get exclusive access to our
              Partner Portal for easy management.
            </li>
            <li>
              ✅ <strong>Start Earning:</strong> Begin selling and earning with
              Kelax products.
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">
          Become a Kelax Channel Partner
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg">
          Join us in shaping the future of technology solutions. Become a Kelax
          Channel Partner and embark on a journey of growth and success. Sign up
          now!
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="px-8 py-3 bg-gray-200 rounded-lg text-lg font-semibold hover:bg-gray-300"
          >
            Already have a partner account?
          </Link>

          <Link
            to="/register"
            className="px-8 py-3 bg-[#006db8] text-white rounded-lg text-lg font-semibold flex items-center gap-2 hover:bg-[#005c9c]"
          >
            Sign Up Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
