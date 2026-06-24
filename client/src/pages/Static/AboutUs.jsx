import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AboutUs() {
  return (
    <>
    <Navbar />
    <div className="relative overflow-hidden w-full bg-white text-gray-800 py-24 px-6 mt-10">

      {/* BACKGROUND GRID + ORBS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#006db8]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0099e6]/20 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:30px_30px] opacity-30" />
      </div>

      {/* HEADER */}
      <div className="relative max-w-7xl mx-auto text-center animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          <span className="text-[#006db8]">We Are</span>{" "}
          <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
            Kelax
          </span>
        </h1>

        <p className="mt-5 text-gray-600 text-lg max-w-3xl mx-auto">
          India's next-gen engineering hub — crafting ultra-reliable servers, 
          high-performance systems, and future-ready technologies built for scale.
        </p>

        {/* Divider */}
        <div className="mt-8 h-[3px] w-36 mx-auto bg-[#006db8] rounded-full animate-pulse" />
      </div>

      {/* GLASS SECTION */}
      <div className="relative mt-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

        {/* Card 1 */}
        <div className="
          group p-10 rounded-3xl bg-white/40 backdrop-blur-xl
          border border-white/80 shadow-xl hover:shadow-2xl
          transition-all duration-500 hover:-translate-y-2
          hover:bg-white/60 relative overflow-hidden
        ">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#006db8]/20 rounded-full blur-3xl group-hover:blur-[70px] transition-all" />
          <h2 className="text-3xl font-bold text-[#006db8] mb-4">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            Kelax stands at the intersection of engineering, precision and innovation.  
            From custom-built servers to specialized performance systems, everything 
            we create is designed for speed, reliability, and excellence.
          </p>
        </div>

        {/* Card 2 */}
        <div className="
          group p-10 rounded-3xl bg-white/40 backdrop-blur-xl
          border border-white/80 shadow-xl hover:shadow-2xl
          transition-all duration-500 hover:-translate-y-2
          hover:bg-white/60 relative overflow-hidden
        ">
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#0099e6]/20 rounded-full blur-3xl group-hover:blur-[70px] transition-all" />
          <h2 className="text-3xl font-bold text-[#006db8] mb-4">
            Our Engineering DNA
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Every component is hand-tested, thermally optimized, firmware-tuned,  
            and performance-balanced by engineers who believe in perfection.  
            Reliability is not a goal — it's our culture.
          </p>
        </div>

      </div>

      {/* WORK CULTURE */}
      <div className="relative mt-28 max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-12">
          <span className="bg-gradient-to-r from-[#006db8] to-[#0099e6] text-transparent bg-clip-text">
            Work Culture at Kelax
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Innovation Everyday",
              desc: "Where new ideas turn into real engineering products that impact thousands."
            },
            {
              title: "Ownership & Leadership",
              desc: "Every engineer leads — planning, creating, solving, and improving daily."
            },
            {
              title: "Growth Mindset",
              desc: "Training, R&D exposure, tools, and a culture that supports big thinking."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="
                group p-10 rounded-3xl bg-white/40 backdrop-blur-xl 
                border border-white/70 shadow-lg hover:shadow-2xl 
                transition-all duration-500 hover:-translate-y-2
                relative overflow-hidden
              "
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                bg-gradient-to-br from-[#006db8]/10 to-transparent transition-all" />

              <h3 className="text-2xl font-bold text-[#006db8] mb-3">
                {item.title}
              </h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* VISION / FUTURE */}
      <div className="relative mt-28 max-w-7xl mx-auto grid md:grid-cols-2 gap-12">

        {/* Vision Block */}
        <div className="p-12 rounded-3xl bg-gradient-to-br from-[#006db8] to-[#0099e6] text-white shadow-xl">
          <h2 className="text-4xl font-extrabold mb-4">Our Vision</h2>
          <p className="text-lg leading-relaxed opacity-90">
            To establish Kelax as India’s most trusted name in high-performance 
            computing — powering AI labs, enterprises, research centers,  
            and next-gen innovation across the nation.
          </p>
        </div>

        {/* The Future */}
        <div className="
          p-12 rounded-3xl bg-white/40 backdrop-blur-xl 
          border border-white/60 shadow-xl
        ">
          <h2 className="text-4xl font-extrabold text-[#006db8] mb-4">
            The Future
          </h2>
          <ul className="space-y-4 text-gray-700 text-lg">
            <li>• Advanced AI-driven hardware R&D center</li>
            <li>• Custom server chassis & enterprise cooling tech</li>
            <li>• Pan-India support ecosystem</li>
            <li>• Global HPC & Cloud Technology Alliances</li>
          </ul>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
