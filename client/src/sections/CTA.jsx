import React, { useState } from "react";

export default function CTAWithForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.query
    ) {
      alert("Please fill all fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Enter valid email");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Enter valid 10 digit phone number");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await fetch("https://formsubmit.co/ajax/info@kelax.in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === "true" || data.success === true) {
        setShowPopup(true);

        setFormData({
          name: "",
          email: "",
          phone: "",
          query: "",
        });
      }
    } catch (error) {
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <section
      className="w-full py-20 px-6 bg-gradient-to-br from-white to-[#eef6ff] relative overflow-hidden"
      data-aos="flip-right"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#006db8] opacity-20 blur-[130px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#006db8] opacity-20 blur-[130px] rounded-full"></div>

      <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Let’s Build
            <span className="text-[#006db8]"> Powerful Infrastructure </span>
            For Your Business
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            Whether you need enterprise-grade servers, high-performance
            workstations, or custom IT solutions — our team is ready to help you
            scale.
          </p>

          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3 items-start">
              <span className="text-[#006db8] text-xl">✔</span>
              High-Performance Server Deployment
            </li>

            <li className="flex gap-3 items-start">
              <span className="text-[#006db8] text-xl">✔</span>
              Fully Customized Workstations
            </li>

            <li className="flex gap-3 items-start">
              <span className="text-[#006db8] text-xl">✔</span>
              24×7 Priority Support & Maintenance
            </li>
          </ul>
        </div>

        {/* RIGHT FORM */}
        <div
          className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl p-8 rounded-3xl
                         hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-5">
            Get a Free Consultation
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name *"
              required
              className="w-full p-4 rounded-xl border border-gray-300 focus:border-[#006db8] outline-none"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address *"
              required
              className="w-full p-4 rounded-xl border border-gray-300 focus:border-[#006db8] outline-none"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number *"
              required
              className="w-full p-4 rounded-xl border border-gray-300 focus:border-[#006db8] outline-none"
            />

            <textarea
              rows="4"
              name="query"
              value={formData.query}
              onChange={handleChange}
              placeholder="Tell us about your requirement *"
              required
              className="w-full p-4 rounded-xl border border-gray-300 focus:border-[#006db8] outline-none"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-[#006db8] text-white text-lg font-semibold
              hover:bg-[#005a98] transition-all duration-300
              shadow-[0_12px_30px_rgba(0,109,184,0.4)]
              hover:shadow-[0_18px_45px_rgba(0,109,184,0.6)]
              hover:-translate-y-1 cursor-pointer"
            >
              {loading ? "Sending..." : "Submit Request"}
            </button>
          </form>
        </div>
      </div>

      {/* SUCCESS POPUP */}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-md">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Message Sent Successfully
            </h2>

            <p className="text-gray-600 mb-6">
              Thank you for contacting us. Our team will get back to you
              shortly.
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="bg-[#006db8] text-white px-6 py-2 rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
