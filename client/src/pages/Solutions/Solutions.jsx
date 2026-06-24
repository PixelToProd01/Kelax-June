import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Solutions() {
  const navigate = useNavigate();

  // ⬅️ NEW: URL Params
  const [params, setParams] = useSearchParams();

  // Get tab from URL else default = industry
  const defaultTab = params.get("tab") || "industry";

  // Use defaultTab instead of fixed "industry"
  const [activeTab, setActiveTab] = useState(defaultTab);

  // When tab changes → update URL also
  const changeTab = (tab) => {
    setActiveTab(tab);
    setParams({ tab });
  };

  // ---------------------- DATA SETS ----------------------
  const industryData = [
    {
      title: "Media & Entertainment",
      desc: "Unlock creativity and streamline workflows with Kelax's server and workstation solutions designed for media production, video editing, animation, and content creation. Experience high-performance systems that handle the demands of rendering, real-time editing, and collaborative workflows.",
      path: "/solutions/industry/media-entertainment",
    },
    {
      title: "Security & Surveillance",
      desc: "Safeguard critical data and enhance surveillance operations with Kelax's robust server and workstation solutions. Our reliable systems provide high-capacity storage, efficient video processing, and secure data management, supporting the needs of security and surveillance applications.",
      path: "/solutions/industry/security-surveillance",
    },
    {
      title: "Government & Public Sector",
      desc: "Kelax offers server and workstation solutions specifically designed for government agencies and the public sector. These solutions prioritize data security, compliance, and performance to meet the demanding requirements of government projects, e-governance, and citizen services.",
      path: "/solutions/industry/government-public-sector",
    },
    {
      title: "Education & Academic",
      desc: "Kelax provides server and workstation solutions tailored to the needs of educational institutions and academic research. From powerful HPC systems for scientific computations to virtualization platforms for collaborative learning, our solutions empower educators and researchers to drive innovation and knowledge-sharing.",
      path: "/solutions/industry/education-academic",
    },
    {
      title: "Financial Services",
      desc: "Ensure the security, performance, and reliability required in the financial services industry with Kelax's server and workstation solutions. From high-speed transaction processing to data analytics and risk management, our solutions enable seamless operations and data integrity for financial institutions.",
      path: "/solutions/industry/financial-services",
    },
  ];

  const applicationData = [
    {
      title: "HPC (High-Performance Computing)",
      desc: "Kelax's HPC solutions deliver immense computational power for scientific simulations, engineering analysis, and data-intensive tasks. Harness the potential of parallel processing and accelerated computing to accelerate research, product development, and time-to-market.",
      path: "/solutions/application/high-performance-computing",
    },
    {
      title: "Backup & Restore",
      desc: "Protect your critical data with Kelax's backup and restore solutions. Our robust server and workstation configurations offer efficient data backup, disaster recovery, and data replication capabilities, ensuring business continuity and data integrity.",
      path: "/solutions/application/backup-restore",
    },
    {
      title: "Database",
      desc: "Kelax's database solutions provide optimized performance, scalability, and reliability for database management systems. Experience faster query processing, improved data integrity, and efficient data storage with our server and workstation configurations tailored for database applications.",
      path: "/solutions/application/database",
    },
    {
      title: "Virtualization",
      desc: "Streamline resource utilization and enhance scalability with Kelax's virtualization solutions. Our server and workstation configurations support leading virtualization platforms, enabling efficient resource allocation, simplified management, and increased flexibility for virtualized environments.",
      path: "/solutions/application/virtualization",
    },
    {
      title: "VDI (Virtual Desktop Infrastructure)",
      desc: "Kelax's VDI solutions offer secure and centralized desktop management, enabling organizations to deliver virtual desktops to end-users efficiently. Experience enhanced mobility, data security, and simplified administration with our VDI-focused server and workstation solutions.",
      path: "/solutions/application/virtual-desktop-infrastructure",
    },
    {
      title: "Cloud Integrated Solutions",
      desc: "Kelax's cloud-integrated solutions provide seamless integration with cloud platforms, enabling organizations to leverage the benefits of hybrid or multi-cloud architectures. Experience scalable computing power, flexible storage options, and seamless data transfer between on-premises infrastructure and the cloud.",
      path: "/solutions/application/cloud-integrated",
    },
  ];

  const caseStudyData = [
    {
      title: "coming soon...",
      desc: "AI Compute case studies are coming soon — showcasing real-world performance, scalability, and industry impact.",
      path: "/solutions/case-study/ai-compute",
    },
  ];

  const activeData =
    activeTab === "industry"
      ? industryData
      : activeTab === "application"
      ? applicationData
      : caseStudyData;

  // -----   Favicon Title  ----------
  useEffect(() => {
    document.title = "Kelax - Solutions";
  });

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-20 py-20 bg-[#f7fafe] mt-10">
        {/* ---------------------- HEADING ---------------------- */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-[#006db8] to-[#00a4ff] text-transparent bg-clip-text">
              Our Premium Solutions
            </span>
          </h1>

          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Tailored, scalable and high-performance solutions for every industry
            and application.
          </p>
        </div>

        {/* ---------------------- TABS ---------------------- */}
        <div className="flex justify-center mt-12 relative w-fit mx-auto">
          <div className="flex bg-white shadow-lg border rounded-xl">
            {[
              { id: "industry", label: "Industry Based" },
              { id: "application", label: "Application Based" },
              { id: "case", label: "Case Studies" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => changeTab(tab.id)}
                className={`
                px-6 cursor-pointer md:px-10 py-3 font-semibold text-sm md:text-base transition  
                ${
                  activeTab === tab.id
                    ? "text-[#006db8]"
                    : "text-gray-500 hover:text-gray-700"
                }
              `}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="h-[3px] bg-[#006db8] rounded-full mt-2"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ---------------------- CARDS ---------------------- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {activeData.map((item, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-xl shadow-xl border rounded-2xl p-6 transition transform hover:-translate-y-2 hover:shadow-2xl"
            >
              <h3 className="text-xl font-semibold text-[#006db8]">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-3 leading-relaxed">{item.desc}</p>

              <button
                onClick={() => navigate(item.path)}
                className="flex cursor-pointer items-center gap-2 mt-5 text-[#006db8] font-semibold group-hover:gap-3 transition-all"
              >
                Learn More <FiArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
