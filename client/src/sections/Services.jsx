import React from "react";
import { Server, Cpu } from "lucide-react";
import { FiClock } from "react-icons/fi";

const services = [
  {
    icon: <Server size={28} className="text-purple-600" />,
    title: "High-Performance Servers",
    description:
      "Robust servers designed for maximum uptime and performance for businesses of all sizes.",
  },
  {
    icon: <Cpu size={28} className="text-purple-600" />,
    title: "Workstations",
    description:
      "Powerful workstations optimized for software development, design, and data processing.",
  },
  {
    icon: <FiClock size={28} className="text-purple-600" />,
    title: "Coming Soon...",
    description:
      "High-performance, secure and scalable data storage solutions are on the way.",
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full py-20 bg-gray-50" data-aos="fade-left">
      <div className="max-w-7xl mx-auto px-6 md:px-20 text-center">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold">
          <span className="drop-shadow-md">What</span>{" "}
          <span className="text-[#006db8] drop-shadow-md">We Offer</span>
        </h2>

        <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto leading-relaxed">
          Empowering businesses with high-performance servers, powerful
          workstations, and secure IT infrastructure tailored for modern digital
          demands.
        </p>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 item-center"> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:scale-105 transition transform"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
