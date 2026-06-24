// src/pages/Home.jsx

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Hero from "../sections/Hero";
import About from "../sections/About";
import Services from "../sections/Services";
import FAQ from "../sections/FAQ";
import CTA from "../sections/CTA";
import Clients from "../sections/Clients";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Certifications from "../sections/Certifications";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800, // 2-second smooth animation
      offset: 250, // element screen par barely aate hi animate hoga
    });
  }, []);

  // -----   Favicon Title  ----------
  useEffect(() => {
    document.title = "Kelax - Home";
  });

  return (
    <div className="w-full overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Certifications />
        <Services />
        <Clients />
        <FAQ />
        <CTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
