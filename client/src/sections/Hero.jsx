import React from "react";
import Herovid from "../assets/home/Herobg.mp4";
import { useNavigate } from "react-router-dom";


export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center md:mt-10">
      {/* Background Video */}
      <video
        src={Herovid}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl text-white">
        {/* Gradient Indian Flag Title */}
        <h1
          className="text-4xl md:text-6xl font-extrabold mb-4 tracking-wide
    bg-gradient-to-r from-[#FF9933] via-white to-[#138808]
     bg-clip-text drop-shadow-[0_0_18px_rgba(255,255,255,0.5)]"
        >
          Powering the Future of Technology
        </h1>

        {/* Subtitle with soft glow */}
        <p
          className="text-lg md:text-2xl mb-8 opacity-95 
    bg-gradient-to-r from-[#FF9933] via-white to-[#138808]
    text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] animate-pulse"
        >
          Powering India’s Next-Gen Servers, Workstations & Intelligence
          Systems.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="px-10 py-3 rounded-full 
  bg-gradient-to-r from-[#FF9933] via-white to-[#138808]
  text-black font-semibold text-lg
  shadow-[0_0_20px_rgba(255,255,255,0.4)]
  hover:shadow-[0_0_30px_rgba(255,255,255,0.8)]
  transition-all cursor-pointer backdrop-blur-md"
  onClick={() => navigate("/about-us")}
          >
            Get Started
          </button>
        </div>

        {/* Futuristic Line — Indian Flag Style */}
        <div
          className="mt-10 h-[2px] w-40 bg-gradient-to-r 
    from-[#FF9933] via-white to-[#138808] mx-auto animate-pulse rounded-full"
        ></div>

        {/* Bottom Text */}
        <p
          className="mt-6 tracking-wide text-sm md:text-base
    bg-gradient-to-r from-[#FF9933] via-white to-[#138808]
    text-transparent bg-clip-text opacity-95"
        >
          Kelax • High-Performance Engineering • Built for Tomorrow
        </p>
      </div>
    </div>
  );
}
