import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Resources = () => {
  const caseStudies = [
    {
      tag: "Government",
      customer: "State Education Dept, UP",
      challenge: "18 legacy servers, high maintenance cost",
      result: "2 Kelax Servers • ₹14L Saved • 99.9% Uptime",
    },
    {
      tag: "Enterprise",
      customer: "Manufacturing Company",
      challenge: "Server sprawl, poor VM performance",
      result: "40 VMs on 3 Hosts • 99.95% Uptime",
    },
    {
      tag: "SMB",
      customer: "Retail Chain, Delhi",
      challenge: "No IT team, scattered hardware",
      result: "1 Kelax Server • 8 VMs • 60% Cost Reduction",
    },
  ];

  const blogs = [
    {
      title:
        "What To Look For When Buying A Server For Virtualization In India",
      audience: "All",
      read: "5 Min Read",
    },
    {
      title: "On-Premises vs Cloud: What Makes Sense For Indian SMBs In 2025",
      audience: "SMB",
      read: "6 Min Read",
    },
    {
      title: "Understanding ECC Memory And Why It Matters For Your Server",
      audience: "Technical",
      read: "4 Min Read",
    },
    {
      title:
        "GeM Procurement Guide For IT Hardware: Step-by-Step For Govt Buyers",
      audience: "Government",
      read: "8 Min Read",
    },
    {
      title: "How Much RAM Do You Really Need For A VDI Setup?",
      audience: "Enterprise / IT",
      read: "5 Min Read",
    },
    {
      title: "NVMe vs SAS vs SATA: Choosing Storage For Your Workload",
      audience: "Technical",
      read: "4 Min Read",
    },
  ];

  const tools = [
    {
      title: "Server Configurator",
      desc: "Pick CPU, RAM and Storage to generate a complete BOM.",
      btn: "Configure Now",
    },
    {
      title: "TCO Calculator",
      desc: "Compare Kelax servers with replacing legacy infrastructure annually.",
      btn: "Calculate Savings",
    },
    {
      title: "Sizing Guide",
      desc: "Enter workload requirements and get recommended Kelax models.",
      btn: "Find My Server",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="bg-[#f5f8fc] mt-16">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden py-24 px-6">
          <div className="absolute inset-0 bg-gradient-to-br from-[#001f3f] via-[#003b73] to-[#006db8]" />

          <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-400 opacity-20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 opacity-20 blur-3xl rounded-full" />

          <div className="relative max-w-5xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-extrabold">Resources</h1>

            <p className="mt-6 text-lg md:text-xl opacity-90 leading-relaxed">
              Datasheets, case studies, blog articles, and tools — everything
              you need to evaluate, deploy and get the most from your Kelax
              server infrastructure.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button className="bg-white text-[#006db8] px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
                Browse Resources
              </button>

              <button className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#006db8] transition">
                Contact Expert
              </button>
            </div>
          </div>
        </section>

        {/* FILTER TABS */}
        {/* <section className="max-w-7xl mx-auto px-6 mt-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              "All",
              "Datasheets",
              "Case Studies",
              "Blog",
              "Tools",
              "Videos",
            ].map((item) => (
              <button
                key={item}
                className="px-6 py-3 bg-white rounded-full shadow-md hover:bg-[#006db8] hover:text-white transition font-medium"
              >
                {item}
              </button>
            ))}
          </div>
        </section> */}

        {/* FEATURED RESOURCE */}
        {/* <section className="max-w-7xl mx-auto px-6 mt-16">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2">
            <div className="bg-gradient-to-br from-[#003c66] to-[#006db8] min-h-[300px]" />

            <div className="p-10 flex flex-col justify-center">
              <span className="text-[#006db8] font-semibold">
                FEATURED RESOURCE
              </span>

              <h2 className="text-4xl font-bold text-gray-800 mt-3">
                Kelax Server Deployment Guide
              </h2>

              <p className="text-gray-600 mt-5 leading-relaxed">
                Learn server sizing, virtualization deployment,
                storage planning and infrastructure best practices.
              </p>

              <button className="mt-6 w-fit bg-[#006db8] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#005999]">
                Download PDF
              </button>
            </div>
          </div>
        </section> */}

        {/* CASE STUDIES */}
        <section className="max-w-7xl mx-auto px-6 mt-24">
          <h2 className="text-4xl font-bold text-[#003c66]">
            Customer Success Stories
          </h2>

          <p className="text-gray-600 mt-3 text-lg">
            Real-world outcomes achieved using Kelax infrastructure.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {caseStudies.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition"
              >
                <span className="bg-blue-100 text-[#006db8] px-4 py-2 rounded-full text-sm font-semibold">
                  {item.tag}
                </span>

                <h3 className="text-2xl font-bold text-gray-800 mt-6">
                  {item.customer}
                </h3>

                <p className="text-gray-600 mt-4">
                  <strong>Challenge:</strong>
                  <br />
                  {item.challenge}
                </p>

                <p className="text-gray-700 mt-5 font-medium">{item.result}</p>

                {/* <button className="mt-6 text-[#006db8] font-semibold">
                  Read Case Study →
                </button> */}
              </div>
            ))}
          </div>
        </section>

        {/* BLOGS */}
        {/* <section className="max-w-7xl mx-auto px-6 mt-24">
          <h2 className="text-4xl font-bold text-[#003c66]">
            Blog & Knowledge Base
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition"
              >
                <h3 className="text-xl font-bold text-gray-800 leading-snug">
                  {blog.title}
                </h3>

                <div className="flex justify-between mt-6 text-sm">
                  <span className="bg-blue-100 text-[#006db8] px-3 py-1 rounded-full">
                    {blog.audience}
                  </span>

                  <span className="text-gray-500">{blog.read}</span>
                </div>

                <button className="mt-6 text-[#006db8] font-semibold">
                  Read Article →
                </button>
              </div>
            ))}
          </div>
        </section> */}

        {/* TOOLS */}
        <section className="max-w-7xl mx-auto px-6 mt-24">
          <h2 className="text-4xl font-bold text-[#003c66]">
            Infrastructure Planning Tools
          </h2>

          <div className="grid lg:grid-cols-3 gap-8 mt-12">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#003c66] to-[#006db8] text-white rounded-3xl p-8 shadow-xl"
              >
                <h3 className="text-2xl font-bold">{tool.title}</h3>

                <p className="mt-4 opacity-90 leading-relaxed">{tool.desc}</p>

                <button className="mt-8 bg-white text-[#006db8] px-5 py-2 rounded-xl font-semibold">
                  {tool.btn}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="bg-gradient-to-r from-[#003c66] to-[#006db8] rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold">
              Need Help Choosing The Right Server?
            </h2>

            <p className="mt-5 text-lg opacity-90 max-w-3xl mx-auto">
              Talk to a Kelax infrastructure specialist and get recommendations
              tailored to your workloads, virtualization needs and future growth
              plans.
            </p>

            {/* <button className="mt-8 bg-white text-[#006db8] px-8 py-3 rounded-full font-bold hover:scale-105 transition">
              Contact Sales
            </button> */}

            <div className="grid sm:grid-cols-2 gap-4 mt-12">
              <div className="bg-white rounded-2xl p-4 shadow-sm border">
                <p className="text-sm text-gray-500 mb-1">Email Support</p>

                <a
                  href="mailto:info@kelax.in"
                  className="font-semibold text-[#006db8]"
                >
                  info@kelax.in
                </a>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border">
                <p className="text-sm text-gray-500 mb-1">Call Us</p>

                <a
                  href="tel:9654094331"
                  className="font-semibold text-[#006db8]"
                >
                  +91 9654094331
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Resources;
