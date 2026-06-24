import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    query: "",
    email: "",
    phone: "",
    company: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("https://formsubmit.co/ajax/info@kelax.in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setShowPopup(true);

      setFormData({
        name: "",
        query: "",
        email: "",
        phone: "",
        company: "",
      });
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col lg:flex-row items-center justify-between w-full min-h-screen bg-[#ffffff] mt-20">
        <div className="w-full lg:w-1/2 p-10">
          <h1 className="text-4xl font-bold mb-3">
            Get in <span className="text-[#006db8]">Touch</span>
          </h1>

          <p className="text-gray-600 mb-6">
            For any questions or concerns regarding our products, you may
            contact us.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name *"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />

            <input
              type="text"
              name="query"
              value={formData.query}
              onChange={handleChange}
              placeholder="Query *"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email *"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone number *"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company *"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-md font-semibold cursor-pointer bg-[#006db8] hover:bg-[#005a98] text-white"
            >
              SEND
            </button>
          </form>
          {/* CONTACT ICONS */}
          <div className="mt-8">
            <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:gap-10">
              {/* PHONE */}
              <div>
                <p className="font-bold text-sm">PHONE</p>
                <p className="text-gray-700 text-sm break-words">9355854953</p>
              </div>

              {/* EMAIL */}
              <div>
                <p className="font-bold text-sm">EMAIL</p>
                <p className="text-gray-700 text-sm break-words">
                  info@kelax.in
                </p>
              </div>

              {/* ADDRESS */}
              <div className="max-w-md">
                <p className="font-bold text-sm">HEAD QUARTER</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Ground Floor, Block-A Building No.-101 Sector-63, Noida, UP-201301
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MAP */}

        <div className="w-full lg:w-1/2 px-4 sm:px-6 lg:px-0 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="w-full h-[350px] rounded-xl overflow-hidden">
              <iframe
                // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2948347424635!2d77.37577657416804!3d28.62092438461012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef000a1ed60f%3A0x848a8cbed2a90a08!2sFurious%20computer%20solutions%20pvt%20ltd%20noida%20branch!5e0!3m2!1sen!2sin!4v1763988288112!5m2!1sen!2sin"
                // src="https://share.google/wdHHN3o5Bg1BEUFCR"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2667.761984110717!2d77.378355!3d28.620989699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce50e422822cd%3A0x6fb985036b6498d1!2sKelax%20Solutions%20Pvt.%20Ltd!5e1!3m2!1sen!2sin!4v1781517796591!5m2!1sen!2sin"
                className="w-full h-full border-0"
                loading="lazy"
                title="map"
              ></iframe>
            </div>
          </div>
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
              className="bg-[#006db8] text-white cursor-pointer px-6 py-2 rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
