import React from "react";
import aboutImage from "../assets/home/about.jpg";
import { useNavigate } from "react-router-dom";

export default function AboutUsSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full py-20 bg-white" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-6 md:px-20 grid md:grid-cols-2 gap-16 items-center">

        {/* ======================== LEFT SIDE TEXT ======================== */}
        <div className="relative">

          {/* Vertical Animated Line */}
          <div className="
            absolute -left-6 top-0 h-full w-[4px]
            bg-gradient-to-b from-[#006db8] to-[#005a98]
            rounded-full animate-pulse
          "></div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            About  
            <span className="text-[#006db8]"> Kelax</span>
          </h2>

          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            Kelax is shaping the future of India’s computing backbone with 
            performance-engineered servers and workstations built for 
            real-world reliability and extreme speed.  
          </p>

          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            Our systems power enterprises, creators, startups, R&D labs, 
            and AI infrastructure — making us one of India’s most trusted 
            names in performance engineering.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/about-us")}
            className="
              mt-8 px-10 py-3 rounded-full text-white font-semibold text-lg
              bg-[#006db8] hover:bg-[#005a98] transition-all cursor-pointer
              shadow-[0_0_20px_rgba(0,109,184,0.4)] hover:shadow-[0_0_30px_rgba(0,109,184,0.6)]
              hover:-translate-y-1
            "
          >
            Learn More
          </button>

        </div>

        {/* ======================== RIGHT SIDE IMAGE BLOCK ======================== */}
        <div className="relative">

          {/* Glass Layer Behind Image */}
          <div
            className="
              absolute inset-0 rounded-3xl bg-white/40
              backdrop-blur-xl border border-white/70 shadow-xl 
              -z-10 scale-110
            "
          ></div>

          {/* Floating Image */}
          <img
            src={aboutImage}
            alt="Kelax About"
            className="
              w-full rounded-3xl shadow-2xl 
              transition-all duration-500 hover:scale-105
              hover:shadow-[0_0_40px_rgba(0,109,184,0.35)]
            "
          />

          {/* Small Floating Tag */}
          <div
            className="
              absolute -bottom-6 right-6 px-6 py-3 
              bg-white/60 backdrop-blur-xl border border-white/70
              rounded-full shadow-md
              text-[#006db8] font-semibold tracking-wide
            "
          >
            Engineered for Performance
          </div>
        </div>
      </div>

      {/* =============== FLOATING 3D INFO CARDS =============== */}
      <div className="max-w-7xl mx-auto mt-24 grid md:grid-cols-3 gap-10 px-6 md:px-20">

        {[
          {
            title: "Precision Engineering",
            desc: "Every Kelax system is tested, tuned and balanced at component level."
          },
          {
            title: "Performance First",
            desc: "Servers and workstations built for demanding real-world workloads."
          },
          {
            title: "Future Ready",
            desc: "We engineer systems that support AI, cloud, gaming, R&D and enterprise scale."
          }
        ].map((card, i) => (
          <div
            key={i}
            className="
              p-8 rounded-2xl bg-white/40 backdrop-blur-xl 
              border border-white/70 shadow-lg 
              transition-all duration-500 hover:shadow-xl
              hover:-translate-y-1
            "
          >
            <h3 className="text-xl font-bold text-[#006db8] mb-3">
              {card.title}
            </h3>
            <p className="text-gray-700">{card.desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
