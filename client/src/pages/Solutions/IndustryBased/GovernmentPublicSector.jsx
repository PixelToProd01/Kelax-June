import React from "react";
import { FiCheck } from "react-icons/fi";

// Images import
import m1 from "../../../assets/solutions/industry/high_performance_computer.jpg";
import m2 from "../../../assets/solutions/industry/infra.jpg";
import m3 from "../../../assets/solutions/industry/security_risk.png";
import m4 from "../../../assets/solutions/industry/network.png";
import m5 from "../../../assets/solutions/industry/visualization.jpg";
import m6 from "../../../assets/solutions/industry/data_center.jpg";
import m7 from "../../../assets/solutions/industry/data_storage.jpg";
import m8 from "../../../assets/solutions/industry/data_processing.jpg";
import m9 from "../../../assets/solutions/industry/collaborative.png";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function GovernmentPublicSector() {
  return (
    <>
    <Navbar />
    <div className="bg-[#f5f8fc] mt-16">
      {/* ---------------- HERO ---------------- */}
      <div className="relative overflow-hidden py-20 px-6 md:px-12">
        {/* Background Gradient + Shapes */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#001f3f] via-[#003b73] to-[#006db8] opacity-90"></div>

        {/* Abstract Blur Elements */}
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-[#00a4ff] rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

        {/* Content */}
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
            Government & Public Sector
          </h1>

          <p className="text-lg md:text-xl opacity-90 mt-5 leading-relaxed">
            Kelax server and workstation solutions offer a comprehensive range
            of features and capabilities specifically tailored to meet the
            unique requirements of the Government and Public Sector industry.
            Our solutions are designed to provide high-performance computing,
            advanced security features, scalability, and reliability, enabling
            government organizations to effectively manage their critical
            workloads and data.
          </p>

          {/* Glow Line */}
          <div className="w-32 h-1 bg-gradient-to-r from-[#00a4ff] to-[#4cc9ff] mx-auto mt-6 rounded-full shadow-xl"></div>
        </div>
      </div>

      {/* ---------------- BLOCK 1 ---------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-24 grid md:grid-cols-2 gap-16 items-center">
        {/* IMAGE */}
        <div className="relative">
          <div className="w-full h-80 md:h-96 overflow-hidden rounded-3xl shadow-lg">
            <img src={m1} className="w-full h-full object-cover" alt="" />
          </div>

          <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
            High-Performance Computing (HPC)
          </h3>
        </div>

        {/* CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            High-Performance Computing
            <span className="text-[#007cd6]"> (HPC)</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax server and workstation solutions are optimized for HPC
            workloads, providing the computational power required for
            data-intensive tasks such as scientific research, simulation, and
            modeling. With support for powerful processors, high-speed memory,
            and advanced GPU capabilities, our solutions deliver exceptional
            performance and enable faster processing of complex calculations.
          </p>
        </div>
      </section>

      {/* ---------------- BLOCK 2 (reverse) ---------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-2 gap-16 items-center">
        {/* CONTENT */}
        <div className="order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            Hyper-Converged Infrastructure
            <span className="text-[#007cd6]"> (HCI)</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax offers HCI solutions that integrate compute, storage, and
            networking resources into a single, easy-to-manage platform. This
            allows government organizations to simplify their IT infrastructure,
            reduce complexity, and improve resource utilization. Our HCI
            solutions provide centralized management and automation,
            streamlining administrative tasks and enhancing operational
            efficiency. This is particularly beneficial for government agencies
            with limited IT resources.
          </p>
        </div>

        {/* IMAGE */}
        <div className="order-1 md:order-2">
          <div className="w-full h-80 md:h-96 overflow-hidden rounded-3xl shadow-lg">
            <img src={m2} className="w-full h-full object-cover" alt="" />
          </div>
          <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
            Hyper-Converged Infrastructure(HCI)
          </h3>
        </div>
      </section>

      {/* ---------------- BLOCK 3 ---------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-2 gap-16 items-center">
        {/* IMAGE */}
        <div className="relative">
          <div className="w-full h-80 md:h-96 overflow-hidden rounded-3xl shadow-lg">
            <img src={m3} className="w-full h-full object-cover" alt="" />
          </div>

          <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
            Enhanced Security Features
          </h3>
        </div>

        {/* CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            Enhanced Security
            <span className="text-[#007cd6]"> Features</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax servers and workstations incorporate advanced security
            features to safeguard sensitive government data and protect against
            cyber threats. Hardware-level security measures, such as Trusted
            Platform Module (TPM) and secure boot, ensure the integrity of the
            system and protect against unauthorized access. Kelax solutions also
            support encryption technologies, ensuring data confidentiality
            during transmission and storage, and compliance with government
            regulations.
          </p>
        </div>
      </section>

      {/* ---------------- BLOCK 4 (reverse) ---------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-2 gap-16 items-center">
        {/* CONTENT */}
        <div className="order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            Scalability and
            <span className="text-[#007cd6]"> Flexibility</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax provides scalable storage solutions tailored to the media and
            entertainment industry's data-intensive workflows. Our server
            configurations offer high-capacity storage arrays with features like
            RAID protection, high-speed data transfer, and seamless scalability.
            This ensures that media professionals can store, access, and manage
            their vast libraries of video, audio, and image assets efficiently.
          </p>
        </div>

        {/* IMAGE */}
        <div className="order-1 md:order-2">
          <div className="w-full h-80 md:h-96 overflow-hidden rounded-3xl shadow-lg">
            <img src={m4} className="w-full h-full object-cover" alt="" />
          </div>
          <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
            Scalability and Flexibility
          </h3>
        </div>
      </section>

      {/* ---------------- BLOCK 5 ---------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-24 grid md:grid-cols-2 gap-16 items-center">
        {/* IMAGE */}
        <div className="relative">
          <div className="w-full h-80 md:h-96 overflow-hidden rounded-3xl shadow-lg">
            <img src={m5} className="w-full h-full object-cover" alt="" />
          </div>

          <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
            Cloud Integration & Virtualization
          </h3>
        </div>

        {/* CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            Cloud Integration &
            <span className="text-[#007cd6]"> Virtualization</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax solutions support virtualization technologies, enabling
            government agencies to consolidate their IT resources, improve
            resource utilization, and reduce operational costs. By leveraging
            virtualization, government organizations can create isolated
            environments, enhance application availability, and streamline
            software deployment and management. Kelax solutions also provide
            integration with cloud platforms, allowing government agencies to
            leverage the benefits of cloud computing, such as scalability,
            flexibility, and cost-efficiency.
          </p>
        </div>
      </section>

      {/* ---------------- BLOCK 6 (reverse) ---------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-2 gap-16 items-center">
        {/* CONTENT */}
        <div className="order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            Data Center Consolidation
            <span className="text-[#007cd6]"> Consolidation</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Government organizations often have multiple data centers spread
            across different locations. Kelax solutions facilitate data center
            consolidation, enabling efficient resource utilization and reducing
            overall infrastructure costs. By consolidating their IT
            infrastructure, government agencies can centralize management,
            improve data accessibility, and enhance disaster recovery
            capabilities.
          </p>
        </div>

        {/* IMAGE */}
        <div className="order-1 md:order-2">
          <div className="w-full h-80 md:h-96 overflow-hidden rounded-3xl shadow-lg">
            <img src={m6} className="w-full h-full object-cover" alt="" />
          </div>
          <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
            Data Center Consolidation
          </h3>
        </div>
      </section>

      {/* ---------------- BLOCK 7 ---------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-24 grid md:grid-cols-2 gap-16 items-center">
        {/* IMAGE */}
        <div className="relative">
          <div className="w-full h-80 md:h-96 overflow-hidden rounded-3xl shadow-lg">
            <img src={m7} className="w-full h-full object-cover" alt="" />
          </div>

          <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
            Secure Data Storage and Management
          </h3>
        </div>

        {/* CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            Secure Data Storage &
            <span className="text-[#007cd6]"> Management</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax servers and workstations offer robust data storage and
            management capabilities for government agencies that handle
            sensitive information. This includes secure file storage, access
            control, and encryption features to ensure data integrity and
            confidentiality.
          </p>
        </div>
      </section>

      {/* ---------------- BLOCK 8 (reverse) ---------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-2 gap-16 items-center">
        {/* CONTENT */}
        <div className="order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            Geospatial Data
            <span className="text-[#007cd6]"> Processing</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Many government agencies rely on geospatial data for urban planning,
            environmental monitoring, and disaster management. Kelax solutions
            provide the computational power and storage capacity needed to
            process and analyze large-scale geospatial datasets efficiently.
          </p>
        </div>

        {/* IMAGE */}
        <div className="order-1 md:order-2">
          <div className="w-full h-80 md:h-96 overflow-hidden rounded-3xl shadow-lg">
            <img src={m8} className="w-full h-full object-cover" alt="" />
          </div>
          <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
            Geospatial Data Processing
          </h3>
        </div>
      </section>

      {/* ---------------- BLOCK 9 ---------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-24 grid md:grid-cols-2 gap-16 items-center">
        {/* IMAGE */}
        <div className="relative">
          <div className="w-full h-80 md:h-96 overflow-hidden rounded-3xl shadow-lg">
            <img src={m9} className="w-full h-full object-cover" alt="" />
          </div>

          <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
            Collaborative Workspaces
          </h3>
        </div>

        {/* CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            Collaborative
            <span className="text-[#007cd6]"> Workspaces</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Government departments often require collaborative work environments
            for team collaboration and information sharing. Kelax solutions
            support virtual desktop infrastructure (VDI) and remote access
            technologies, enabling secure and efficient remote work
            capabilities. We understand the critical nature of the Government
            and Public Sector industry and the need for reliable, scalable, and
            secure IT infrastructure. Kelax server and workstation solutions are
            designed to meet these requirements, offering high-performance
            computing, advanced security features, scalability, and flexibility.
            Our experienced team of experts will work closely with your
            organization to design, implement, and support a solution that
            aligns with your specific needs and objectives.
          </p>
        </div>
      </section>

      {/* ---------------- FINAL PARAGRAPH ---------------- */}
      <section className="max-w-5xl mx-auto px-6 mt-20 text-center">
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12">
          By choosing Kelax, government agencies can benefit from cutting-edge
          technology, enhanced productivity, and peace of mind knowing that
          their data and workloads are protected and efficiently managed. Please
          feel free to contact us for further discussions or to schedule a
          demonstration of our solutions. We look forward to the opportunity to
          serve your organization's IT needs.
        </p>
      </section>
    </div>
    <Footer />
    </>
  );
}
