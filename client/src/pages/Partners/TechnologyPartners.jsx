import React from "react";
import { ArrowRight } from "lucide-react";

import c1 from "../../assets/technology/intel.png";
import c2 from "../../assets/technology/microsoft.png";
import c3 from "../../assets/technology/vmware.png";
import c4 from "../../assets/technology/redhat.png";
import c5 from "../../assets/technology/nvmexpress.png";
import c6 from "../../assets/technology/pciexpress.png";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";

const technology = [
  {
    id: 1,
    img: c1,
    name: "Intel",
  },
  {
    id: 2,
    img: c2,
    name: "Microsoft",
  },
  {
    id: 3,
    img: c3,
    name: "VMware",
  },
  { id: 4, img: c4, name: "RedHat" },
  {
    id: 5,
    img: c5,
    name: "NCMExpress",
  },
  {
    id: 6,
    img: c6,
    name: "PCIExpress",
  },
];

// Duplicate list for infinite scrolling
const scrollData = [...technology, ...technology];

export default function TechnologyPartners() {
  return (
    <div className="w-full bg-white text-gray-800 mt-20">
      <Navbar />
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-br from-[#001f3f] via-[#003b73] to-[#006db8] text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Welcome to Kelax Tech Partners
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl mt-3 opacity-90">
          Are you looking to expand your horizons in the tech industry? Look no
          further. At Kelax, we value partnerships, and your success is our
          success. Our Channel Partner program is tailored to empower you with
          the tools and resources you need to grow your business.
        </p>
      </section>

      <section className="w-full py-20 bg-gradient-to-r from-[#a9c4db] via-[#3f8cc6] to-[#b3cce4] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Heading */}
          <h2 className="text-4xl font-extrabold drop-shadow-lg mb-4">
            Unlocking Innovation with Industry Giants
          </h2>

          <p className="text-white/90 max-w-3xl mx-auto mb-14 text-lg">
            At Kelax, we believe in the power of collaboration. That's why we've
            partnered with some of the biggest names in technology to bring you
            cutting-edge server and workstation solutions.
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
                  <p className="text-sm font-semibold text-[#006db8]">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Four Icon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24 max-w-7xl mx-auto px-6">
          {/* Card 1 */}
          <div className="bg-[#598eaf] p-8 rounded-xl text-center shadow-lg border-white/40 hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <div className="flex justify-center mb-4">
              <img src={c1} alt="Intel" className="w-14 h-14 object-contain" />
            </div>

            <p className="text-gray-200 text-sm">
              We leverage Intel's latest innovations to provide you with servers
              and workstations that are not only powerful but also
              energy-efficient, reducing your operational costs.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#598eaf] p-8 rounded-xl text-center shadow-lg border-white/40 hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <div className="flex justify-center mb-4">
              <img
                src={c2}
                alt="Microsoft"
                className="w-14 h-14 object-contain"
              />
            </div>

            <p className="text-gray-200 text-sm">
              Our alliance with Microsoft ensures that our products are fully
              compatible with Azure and Windows Server environments, giving you
              seamless integration and enhanced performance.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#598eaf] p-8 rounded-xl text-center shadow-lg border-white/40 hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <div className="flex justify-center mb-4">
              <img src={c3} alt="VMware" className="w-14 h-14 object-contain" />
            </div>

            <p className="text-gray-200 text-sm">
              With our partnership with VMware, you can virtualize your
              infrastructure effortlessly, optimizing resource utilization and
              simplifying management.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#598eaf] p-8 rounded-xl text-center shadow-lg border-white/40 hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <div className="flex justify-center mb-4">
              <img src={c4} alt="RedHat" className="w-14 h-14 object-contain" />
            </div>

            <p className="text-gray-200 text-sm">Content not Found 404</p>
          </div>

          {/* Card 5 */}
          <div className="bg-[#598eaf] p-8 rounded-xl text-center shadow-lg border-white/40 hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <div className="flex justify-center mb-4">
              <img
                src={c5}
                alt="NCMExpress"
                className="w-14 h-14 object-contain"
              />
            </div>

            <p className="text-gray-200 text-sm">
              Our collaboration with NVM Express guarantees lightning-fast data
              access, so you can stay ahead in the data-driven world.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-[#598eaf] p-8 rounded-xl text-center shadow-lg border-white/40 hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <div className="flex justify-center mb-4">
              <img
                src={c6}
                alt="PCIExpress"
                className="w-14 h-14 object-contain"
              />
            </div>

            <p className="text-gray-200 text-sm">
              Through our alliance with PCI Express, we offer high-speed
              connectivity options, ensuring that your data flows smoothly.
            </p>
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
      <Footer />
    </div>
  );
}