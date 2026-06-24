import { useEffect, useRef } from "react";

import c1 from '../assets/home/clients/bpcl.png';
import c2 from '../assets/home/clients/cdac.png';
import c3 from '../assets/home/clients/csb.webp';
import c4 from '../assets/home/clients/dhfw.jpg';
import c5 from '../assets/home/clients/dsir.png';
import c6 from '../assets/home/clients/ecsh.jpg';
import c7 from '../assets/home/clients/imd.jpg';
import c8 from '../assets/home/clients/Indian_Air_Force.png';
import c9 from '../assets/home/clients/ipr.png';
import c10 from '../assets/home/clients/isro.png';

export default function Clients() {
  const scrollRef = useRef(null);


const logos = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10];


  // Infinite Scroll Logic
  useEffect(() => {
    const scrollContainer = scrollRef.current;

    let scrollAmount = 0;
    function scrollLogos() {
      if (!scrollContainer) return;
      scrollAmount += 1;
      scrollContainer.scrollLeft = scrollAmount;

      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }
      requestAnimationFrame(scrollLogos);
    }
    scrollLogos();
  }, []);

  return (
    <section className="bg-gradient-to-b from-[#002350] via-[#004a85] to-[#006db8] py-20 text-white" data-aos="fade-right">

      {/* Heading */}
      <h2 className="text-center text-4xl font-bold mb-6">Our Clients</h2>

      {/* Description */}
      <p className="max-w-4xl mx-auto text-center text-gray-200 leading-relaxed mb-12 px-4">
        Kelax places clients at the core of our mission. With strong dedication, 
        we deliver reliable and customized IT infrastructure solutions. 
        Our long-term partnerships and successful deployments reflect the trust 
        our customers have in us across industries & government institutions.
      </p>

      {/* LOGOS — Infinite Scroll */}
      <div className="relative w-full max-w-5xl mx-auto overflow-hidden py-4">
        <div
          ref={scrollRef}
          className="flex gap-10 whitespace-nowrap overflow-hidden"
        >
          {/* Duplicate logos for infinite loop */}
          {[...logos, ...logos].map((src, i) => (
            <img
              key={i}
              src={src}
              className="w-20 h-20 md:w-24 md:h-24 object-contain bg-white p-3 rounded-xl shadow-md"
            />
          ))}
        </div>
      </div>

      {/* Four Icon Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-7xl mx-auto px-6">

        {/* Card 1 */}
        <div className="bg-[#2d69c7] p-8 rounded-xl text-center shadow-lg">
          <div className="text-4xl mb-4">🌟</div>
          <h3 className="font-semibold text-lg mb-2">Exceptional Quality Assurance</h3>
          <p className="text-gray-200 text-sm">
            Every Kelax system goes through 72-hour stress testing ensuring 
            performance, reliability, and stability.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#2d69c7] p-8 rounded-xl text-center shadow-lg">
          <div className="text-4xl mb-4">🤝</div>
          <h3 className="font-semibold text-lg mb-2">Customer-First Approach</h3>
          <p className="text-gray-200 text-sm">
            We build systems only to match your needs with honest guidance 
            & tailored solutions.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#2d69c7] p-8 rounded-xl text-center shadow-lg">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="font-semibold text-lg mb-2">Instant Start — No Setup</h3>
          <p className="text-gray-200 text-sm">
            Pre-configured with latest drivers. Just plug in and start working instantly.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-[#2d69c7] p-8 rounded-xl text-center shadow-lg">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="font-semibold text-lg mb-2">Future-Ready Expandability</h3>
          <p className="text-gray-200 text-sm">
            Upgrade anytime with standard architectures while keeping warranty safe.
          </p>
        </div>

      </div>
    </section>
  );
}
