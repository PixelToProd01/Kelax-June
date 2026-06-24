import React from "react";

import c1 from "../assets/home/certifications/iso.png";
import c2 from "../assets/home/certifications/bis.svg";
import c3 from "../assets/home/certifications/RoHS.png";
import c4 from "../assets/home/certifications/Startup-India.png";
import c5 from "../assets/home/certifications/gem.webp";
import c6 from "../assets/home/certifications/qci.png";
import c7 from "../assets/home/certifications/msme.png";

const certifications = [
  { id: 1, img: c1, name: "ISO Certified" },
  { id: 2, img: c2, name: "BIS Certified" },
  { id: 3, img: c3, name: "RoHS Compliant" },
  { id: 4, img: c4, name: "Startup India" },
  { id: 5, img: c5, name: "GEM Approved" },
  { id: 6, img: c6, name: "QCI Certified" },
  { id: 7, img: c7, name: "MSME Registered" },
];

// Duplicate list for infinite scrolling
const scrollData = [...certifications, ...certifications];

export default function Certifications() {
  return (
    <section className="w-full py-20 bg-gradient-to-r from-[#006db8] via-[#3aa8ff] to-[#006db8] text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-4xl font-extrabold drop-shadow-lg mb-4">
          Our Certifications
        </h2>

        <p className="text-white/90 max-w-3xl mx-auto mb-14 text-lg">
          Recognized & trusted by India’s top institutions — reflecting our commitment 
          to excellence, innovation, compliance & quality.
        </p>

        {/* Horizontal infinite scroll */}
        <div className="overflow-hidden relative">
          <div
            className="flex gap-10 animate-scroll"
            style={{ width: `${scrollData.length * 180}px` }}
          >
            {scrollData.map((item, index) => (
              <div
                key={index}
                className="min-w-[160px] bg-white/90 backdrop-blur-lg rounded-xl shadow-lg 
                           p-5 flex flex-col items-center justify-center border border-white/40
                           hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 object-contain mb-3"
                />
                <p className="text-sm font-semibold text-[#006db8]">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation CSS */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 25s linear infinite;
          }
        `}
      </style>
    </section>
  );
}
