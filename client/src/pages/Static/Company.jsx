import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const Company = () => {
  const values = [
    {
      title: "Innovation",
      desc: "We continuously innovate to deliver modern server and infrastructure solutions that help organizations scale confidently.",
    },
    {
      title: "Reliability",
      desc: "Every Kelax server is engineered for uptime, performance, and long-term operational stability.",
    },
    {
      title: "Customer First",
      desc: "Our customers are at the center of every decision, from product design to support delivery.",
    },
    {
      title: "Trust & Transparency",
      desc: "We believe in long-term relationships built on transparency, accountability, and service excellence.",
    },
  ];

  const milestones = [
    {
      year: "2024",
      title: "Kelax Founded",
      desc: "Started with a vision to build reliable server infrastructure solutions in India.",
    },
    {
      year: "2025",
      title: "Enterprise Expansion",
      desc: "Expanded into enterprise-grade server and storage solutions for growing organizations.",
    },
    {
      year: "2026",
      title: "Government Sector Growth",
      desc: "Strengthened presence across government and public sector deployments.",
    },
    {
      year: "2027",
      title: "In Future Storage Sector Growth",
      desc: "Introduced virtualization-ready server platforms for modern workloads.",
    },
  ];

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="bg-[#f5f8fc] mt-16">
        {/* HERO */}
        <section className="relative overflow-hidden py-24 px-6">
          <div className="absolute inset-0 bg-gradient-to-br from-[#001f3f] via-[#003b73] to-[#006db8]"></div>

          <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl opacity-20"></div>

          <div className="relative max-w-6xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Building The Future Of
              <span className="block text-cyan-300">Server Infrastructure</span>
            </h1>

            <p className="max-w-3xl mx-auto mt-8 text-lg md:text-xl opacity-90 leading-relaxed">
              Kelax delivers enterprise-grade servers, virtualization platforms,
              and infrastructure solutions designed for businesses, government
              organizations, and data centers across India.
            </p>

            <div className="w-32 h-1 bg-white mx-auto mt-8 rounded-full"></div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#003c66]">About Kelax</h2>

              <p className="text-gray-700 mt-6 leading-relaxed text-lg">
                Kelax is an Indian technology company focused on delivering
                high-performance server infrastructure solutions for modern
                enterprises, government organizations, educational institutions,
                and growing businesses.
              </p>

              <p className="text-gray-700 mt-4 leading-relaxed text-lg">
                Our portfolio includes rack servers, tower servers,
                virtualization-ready platforms, storage solutions, and
                enterprise infrastructure designed to help organizations build
                reliable, secure, and scalable IT environments.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-10">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-4xl font-bold text-[#006db8]">100%</h3>
                  <p className="text-gray-600 mt-2">Customer Focused</p>
                </div>

                <div>
                  <h3 className="text-4xl font-bold text-[#006db8]">24×7</h3>
                  <p className="text-gray-600 mt-2">Support Readiness</p>
                </div>

                <div>
                  <h3 className="text-4xl font-bold text-[#006db8]">99.9%</h3>
                  <p className="text-gray-600 mt-2">
                    Infrastructure Reliability
                  </p>
                </div>

                <div>
                  <h3 className="text-4xl font-bold text-[#006db8]">
                    PAN India
                  </h3>
                  <p className="text-gray-600 mt-2">Coverage</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION + VISION */}
        <section className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-lg">
              <h3 className="text-3xl font-bold text-[#003c66] mb-4">
                Our Mission
              </h3>

              <p className="text-gray-700 leading-relaxed">
                To empower organizations with reliable, scalable, and
                high-performance infrastructure solutions that accelerate
                digital transformation and business growth.
              </p>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-lg">
              <h3 className="text-3xl font-bold text-[#003c66] mb-4">
                Our Vision
              </h3>

              <p className="text-gray-700 leading-relaxed">
                To become a trusted global infrastructure technology brand
                recognized for innovation, reliability, and customer success.
              </p>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#003c66]">
              Our Core Values
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-[#006db8] mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MAKE IN INDIA */}
        <section className="py-20 bg-gradient-to-r from-[#003c66] to-[#006db8]">
          <div className="max-w-6xl mx-auto px-6 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold">
              Proudly Supporting Make In India
            </h2>

            <p className="mt-6 text-lg opacity-90 leading-relaxed max-w-4xl mx-auto">
              Kelax is committed to strengthening India's technology ecosystem
              by delivering enterprise infrastructure solutions that help
              organizations build secure, reliable, and future-ready digital
              environments.
            </p>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#003c66]">Our Journey</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8 border-t-4 border-[#006db8]"
              >
                <span className="text-[#006db8] text-3xl font-bold">
                  {item.year}
                </span>

                <h3 className="text-xl font-bold text-gray-800 mt-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24 px-6">
          <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-12 text-center">
            <h2 className="text-4xl font-bold text-[#003c66]">
              Partner With Kelax
            </h2>

            <p className="text-gray-600 mt-5 text-lg max-w-3xl mx-auto">
              Whether you're building a virtualization cluster, deploying
              enterprise applications, or modernizing your infrastructure, Kelax
              is ready to support your journey.
            </p>

            {/* <button className="mt-8 px-8 py-4 rounded-xl bg-[#006db8] text-white font-semibold hover:bg-[#00589a] transition">
              Contact Our Team
            </button> */}
            <button
              className="bg-[#006db9] text-white w-full cursor-pointer py-3 mt-10 rounded-lg hover:bg-[#005a98] font-medium text-[16px] mt-1"
              // onClick={() => Navigation("/register")}
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Company;
