import React from "react";
import { FiCheck } from "react-icons/fi";

// Images import
import m1 from "../../../assets/solutions/industry/hpc.jpg";
import m2 from "../../../assets/solutions/industry/secure_data.jpg";
import m3 from "../../../assets/solutions/industry/visualization.jpg";
import m4 from "../../../assets/solutions/industry/disaster_recovery.jpg";
import m5 from "../../../assets/solutions/industry/network.png";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function EducationAcademic() {
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
            Financial Services
          </h1>

          <p className="text-lg md:text-xl opacity-90 mt-5 leading-relaxed">
            Kelax server and workstation solutions offer a comprehensive range
            of features and capabilities specifically designed to meet the
            unique requirements of the Financial Services industry. Our
            solutions provide the performance, scalability, security, and
            reliability necessary for financial institutions to manage their
            critical data, applications, and transactions with confidence.
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
            High-Performance Computing and Data Processing
          </h3>
        </div>

        {/* CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            High-Performance Computing &
            <span className="text-[#007cd6]"> Data Processing</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax solutions offer powerful processing capabilities and
            high-speed storage options, enabling financial institutions to
            handle complex financial calculations, risk analysis, and real-time
            data processing. Our servers and workstations are equipped with
            advanced processors, ample memory, and fast storage technologies to
            ensure optimal performance and reduced processing times.
          </p>
        </div>
      </section>

      {/* ---------------- BLOCK 2 (reverse) ---------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-2 gap-16 items-center">
        {/* CONTENT */}
        <div className="order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            Data Security &<span className="text-[#007cd6]"> Compliance</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax recognizes the importance of data security in the financial
            sector. Our solutions incorporate robust security features to
            protect sensitive financial information, ensuring compliance with
            industry regulations such as PCI-DSS. Encryption, access controls,
            and secure authentication mechanisms are implemented to safeguard
            financial data from unauthorized access or breaches.
          </p>
        </div>

        {/* IMAGE */}
        <div className="order-1 md:order-2">
          <div className="w-full h-80 md:h-96 overflow-hidden rounded-3xl shadow-lg">
            <img src={m2} className="w-full h-full object-cover" alt="" />
          </div>
          <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
            Data Security and Compliance
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
            Virtualization and Consolidation
          </h3>
        </div>

        {/* CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            Virtualization &
            <span className="text-[#007cd6]"> Consolidation</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax solutions support virtualization technologies, allowing
            financial institutions to consolidate their IT infrastructure,
            reduce costs, and improve resource utilization. By virtualizing
            servers and workstations, financial organizations can streamline
            application deployment, enhance system availability, and simplify IT
            management.
          </p>
        </div>
      </section>

      {/* ---------------- BLOCK 4 (reverse) ---------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-2 gap-16 items-center">
        {/* CONTENT */}
        <div className="order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            Disaster Recovery &
            <span className="text-[#007cd6]"> Business Continuity</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax servers and workstations enable financial institutions to
            implement robust disaster recovery and business continuity
            strategies. Our solutions offer features such as data replication,
            failover capabilities, and backup solutions, ensuring minimal
            downtime and data loss in the event of a disaster or system failure.
          </p>
        </div>

        {/* IMAGE */}
        <div className="order-1 md:order-2">
          <div className="w-full h-80 md:h-96 overflow-hidden rounded-3xl shadow-lg">
            <img src={m4} className="w-full h-full object-cover" alt="" />
          </div>
          <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
            Disaster Recovery and Business Continuity
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
            High Availability and Redundancy
          </h3>
        </div>

        {/* CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            High Availability &
            <span className="text-[#007cd6]"> Redundancy</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax solutions provide high availability and redundancy options to
            ensure continuous operation and data accessibility for critical
            financial systems. Dual-controller configurations, hot-swappable
            components, and RAID technologies ensure fault tolerance and system
            reliability, minimizing the risk of disruptions to financial
            services.
          </p>
        </div>
      </section>

      {/* HEADER */}
      <div className="relative max-w-7xl mx-auto text-center animate-fadeIn py-24 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          <span className="text-[#006db8]">Use</span>{" "}
          <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
            Cases
          </span>
        </h1>

        <p className="mt-5 text-gray-600 text-lg max-w-3xl mx-auto">
          Kelax server and workstation solutions offer comprehensive features
          and capabilities specifically designed to meet the unique requirements
          of the Education and Academic sector.
        </p>

        {/* Divider */}
        <div className="mt-8 h-[3px] w-36 mx-auto bg-[#006db8] rounded-full animate-pulse" />
      </div>

      {/* GLASS SECTION */}
      <div className="relative px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Card 1 */}
        <div
          className="
          group p-10 rounded-3xl bg-white/40 backdrop-blur-xl
          border border-white/80 shadow-xl hover:shadow-2xl
          transition-all duration-500 hover:-translate-y-2
          hover:bg-white/60 relative overflow-hidden
        "
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#006db8]/20 rounded-full blur-3xl group-hover:blur-[70px] transition-all" />
          <h2 className="text-3xl font-bold text-[#006db8] mb-4">
            Trading and Risk Analysis
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Kelax solutions are ideal for financial institutions engaged in
            trading and risk analysis activities. Our high-performance computing
            capabilities enable real-time market data analysis, algorithmic
            trading, and risk modeling.
          </p>
        </div>

        {/* Card 2 */}
        <div
          className="
          group p-10 rounded-3xl bg-white/40 backdrop-blur-xl
          border border-white/80 shadow-xl hover:shadow-2xl
          transition-all duration-500 hover:-translate-y-2
          hover:bg-white/60 relative overflow-hidden
        "
        >
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#0099e6]/20 rounded-full blur-3xl group-hover:blur-[70px] transition-all" />
          <h2 className="text-3xl font-bold text-[#006db8] mb-4">
            Transaction Processing
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Financial organizations heavily rely on efficient and secure
            transaction processing. Kelax solutions ensure the performance and
            reliability necessary to handle high volumes of transactions while
            maintaining data integrity and security.
          </p>
        </div>

        {/* Card 3 */}
        <div
          className="
          group p-10 rounded-3xl bg-white/40 backdrop-blur-xl
          border border-white/80 shadow-xl hover:shadow-2xl
          transition-all duration-500 hover:-translate-y-2
          hover:bg-white/60 relative overflow-hidden
        "
        >
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#0099e6]/20 rounded-full blur-3xl group-hover:blur-[70px] transition-all" />
          <h2 className="text-3xl font-bold text-[#006db8] mb-4">
            Compliance and Reporting
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Kelax servers and workstations support financial compliance and
            reporting requirements by providing robust data storage, processing,
            and retrieval capabilities. Our solutions facilitate the collection,
            analysis, and reporting of financial data to meet regulatory
            compliance standards and support auditing processes.
          </p>
        </div>

        {/* Card 4 */}
        <div
          className="
          group p-10 rounded-3xl bg-white/40 backdrop-blur-xl
          border border-white/80 shadow-xl hover:shadow-2xl
          transition-all duration-500 hover:-translate-y-2
          hover:bg-white/60 relative overflow-hidden
        "
        >
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#0099e6]/20 rounded-full blur-3xl group-hover:blur-[70px] transition-all" />
          <h2 className="text-3xl font-bold text-[#006db8] mb-4">
            Data Analytics and Business Intelligence
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Financial institutions can leverage Kelax solutions to extract
            actionable insights from vast amounts of financial data. Our
            high-performance computing capabilities enable sophisticated data
            analytics, predictive modeling, and business intelligence
            applications, empowering organizations to make data-driven
            decisions.
          </p>
        </div>

        {/* Card 5 */}
        <div
          className="
          group p-10 rounded-3xl bg-white/40 backdrop-blur-xl
          border border-white/80 shadow-xl hover:shadow-2xl
          transition-all duration-500 hover:-translate-y-2
          hover:bg-white/60 relative overflow-hidden
        "
        >
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#0099e6]/20 rounded-full blur-3xl group-hover:blur-[70px] transition-all" />
          <h2 className="text-3xl font-bold text-[#006db8] mb-4">
            Private Banking and Wealth Management
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Kelax solutions provide secure and efficient platforms for private
            banking and wealth management operations. Integrated applications
            and secure access controls enable the management of client
            portfolios, investment tracking, and financial planning, ensuring
            confidentiality and data privacy.
          </p>
        </div>
      </div>

      {/* ---------------- FINAL PARAGRAPH ---------------- */}
      <section className="max-w-5xl mx-auto px-6 mt-20 text-center">
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12">
          At Kelax, we understand the critical nature of the financial services
          industry and the need for reliable, secure, and high-performance IT
          infrastructure. Our server and workstation solutions are designed to
          meet these requirements, offering advanced features, scalability, and
          flexibility. Our experienced team of experts will work closely with
          your organization to design, implement, and support a tailored
          solution that meets your specific needs and regulatory requirements.
          Please contact us for further discussions or to schedule a
          demonstration of our solutions. We look forward to the opportunity to
          serve your organization's IT needs.
        </p>
      </section>
    </div>
    <Footer />
    </>
  );
}
