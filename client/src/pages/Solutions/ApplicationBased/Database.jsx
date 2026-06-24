import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

// Images import
import m1 from "../../../assets/solutions/application/high_performance_computer.jpg";
import m2 from "../../../assets/solutions/application/server_room.jpg";
import m3 from "../../../assets/solutions/application/secure_data.jpg";
import m4 from "../../../assets/solutions/application/computer_memory.jpg";
import m5 from "../../../assets/solutions/application/harddrive.jpg";

export default function Database() {
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
            Kelax Database Solutions with VedaVault (VV) Series
          </h1>

          <p className="text-lg md:text-xl opacity-90 mt-5 leading-relaxed">
            At Kelax, we recognize the critical role databases play in modern
            businesses, driving data-driven decisions and powering applications.
            Our cutting-edge VedaVault (VV) Series servers and workstations are
            purpose-built to deliver exceptional performance, scalability, and
            reliability for a wide range of database applications. From
            small-scale databases to large-scale enterprise deployments, Kelax
            offers Make in India database solutions that empower your business
            to excel.
          </p>

          {/* Glow Line */}
          <div className="w-32 h-1 bg-gradient-to-r from-[#00a4ff] to-[#4cc9ff] mx-auto mt-6 rounded-full shadow-xl"></div>
        </div>
      </div>

      <section>
        <section>
          <div className="mt-12 max-w-6xl mx-auto px-6 md:px-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600">
              The Kelax Advantage for Database Applications
            </h2>
          </div>
        </section>

        {/* ---------------- BLOCK 1 ---------------- */}

        <section className="max-w-7xl mx-auto px-6 mt-14 grid md:grid-cols-2 gap-16 items-center">
          {/* IMAGE */}
          <div className="relative">
            <div className="w-full h-80 md:h-76 overflow-hidden rounded-3xl shadow-lg">
              <img src={m1} className="w-full h-full object-cover" alt="" />
            </div>

            <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
              Unmatched Performance
            </h3>
          </div>

          {/* CONTENT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
              Unmatched
              <span className="text-[#007cd6]"> Performance</span>
            </h2>

            <p className="text-gray-600 mt-5 leading-relaxed text-lg">
              Kelax VedaVault (VV) Series is equipped with powerful AMD and
              Intel processors, featuring up to 128 cores for AMD and 56 cores
              for Intel in each node. With such high-performance computing
              capabilities, our servers can handle complex database workloads
              with ease, ensuring optimal response times and seamless user
              experiences.
            </p>
          </div>
        </section>

        {/* ---------------- BLOCK 2 (reverse) ---------------- */}
        <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-2 gap-16 items-center">
          {/* CONTENT */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
              Scalability to Support{" "}
              <span className="text-[#007cd6]"> Growing Data</span>
            </h2>

            <p className="text-gray-600 mt-5 leading-relaxed text-lg">
              As your database requirements expand with business growth, Kelax
              VedaVault (VV) Series provides the scalability you need. Our
              servers offer flexible configurations, allowing you to add more
              nodes or storage capacity as your database demands increase.
            </p>
          </div>

          {/* IMAGE */}
          <div className="order-1 md:order-2">
            <div className="w-full h-80 md:h-76 overflow-hidden rounded-3xl shadow-lg">
              <img src={m2} className="w-full h-full object-cover" alt="" />
            </div>
            <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
              Scalability to Support Growing Data
            </h3>
          </div>
        </section>

        {/* ---------------- BLOCK 3 ---------------- */}
        <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-2 gap-16 items-center">
          {/* IMAGE */}
          <div className="relative">
            <div className="w-full h-80 md:h-76 overflow-hidden rounded-3xl shadow-lg">
              <img src={m3} className="w-full h-full object-cover" alt="" />
            </div>

            <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
              Redundancy and Data Protection
            </h3>
          </div>

          {/* CONTENT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
              Redundancy &
              <span className="text-[#007cd6]"> Data Protection</span>
            </h2>

            <p className="text-gray-600 mt-5 leading-relaxed text-lg">
              Data integrity is paramount in database management. Kelax
              VedaVault (VV) Series incorporates redundancy and data protection
              mechanisms to ensure your database remains highly available,
              protecting your critical information from hardware failures.
            </p>
          </div>
        </section>

        {/* ---------------- BLOCK 4 (reverse) ---------------- */}
        <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-2 gap-16 items-center">
          {/* CONTENT */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
              Optimal Resource
              <span className="text-[#007cd6]"> Utilization</span>
            </h2>

            <p className="text-gray-600 mt-5 leading-relaxed text-lg">
              Kelax servers are designed to optimize resource utilization in
              database environments. Advanced memory configurations, storage
              technologies, and intelligent power management help maximize the
              efficiency of your database infrastructure.
            </p>
          </div>

          {/* IMAGE */}
          <div className="order-1 md:order-2">
            <div className="w-full h-80 md:h-76 overflow-hidden rounded-3xl shadow-lg">
              <img src={m4} className="w-full h-full object-cover" alt="" />
            </div>
            <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
              Optimal Resource Utilization
            </h3>
          </div>
        </section>

        {/* ---------------- BLOCK 5 ---------------- */}
        <section className="max-w-7xl mx-auto px-6 mt-24 grid md:grid-cols-2 gap-16 items-center">
          {/* IMAGE */}
          <div className="relative">
            <div className="w-full h-80 md:h-76 overflow-hidden rounded-3xl shadow-lg">
              <img src={m5} className="w-full h-full object-cover" alt="" />
            </div>

            <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
              Versatile Storage Options
            </h3>
          </div>

          {/* CONTENT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
              Versatile Storage
              <span className="text-[#007cd6]"> Options</span>
            </h2>

            <p className="text-gray-600 mt-5 leading-relaxed text-lg">
              Kelax VedaVault (VV) Series supports various storage options,
              including high-speed SSDs and large-capacity HDDs. This
              flexibility allows you to configure storage tiers based on your
              specific database workload, balancing performance and
              cost-effectiveness.
            </p>
          </div>
        </section>
      </section>

      {/* Use Cases */}
      <section>
        <div className="mt-12 max-w-6xl mx-auto px-6 md:px-1">
          <h2 className="text-3xl md:text-4xl font-bold text-[#006db8]">
            Use Cases
          </h2>
        </div>
      </section>

      <section>
        {/* GLASS SECTION */}
        <div className="relative px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-10 mt-12 mb-8">
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
              Online Transaction Processing (OLTP)
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Kelax VedaVault (VV) Series excels in OLTP scenarios, where
              real-time transactional databases demand fast response times and
              high concurrency. Whether it's an e-commerce platform or a banking
              application, our servers provide the robust performance needed for
              seamless transactions.
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
              Data Warehousing and Analytics
            </h2>
            <p className="text-gray-700 leading-relaxed">
              For data warehousing and analytics workloads, Kelax servers
              deliver the computing power required to process large volumes of
              data quickly. Accelerate decision-making and derive valuable
              insights from your data with our VedaVault (VV) Series solutions.
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
              Big Data and NoSQL Databases
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Managing and processing big data requires powerful computing
              resources. Kelax VedaVault (VV) Series supports Big Data and NoSQL
              databases, enabling you to harness the full potential of your data
              analytics initiatives.
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
              Database Virtualization
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Kelax servers are ideal for database virtualization deployments,
              consolidating multiple database instances onto a single,
              high-performance platform. Benefit from enhanced resource
              utilization and simplified management.
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
              Enterprise Resource Planning (ERP)
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Running ERP systems smoothly demands robust hardware. Kelax
              VedaVault (VV) Series ensures that your ERP databases operate
              efficiently, supporting streamlined business processes and
              enhancing productivity.
            </p>
          </div>
        </div>
      </section>
      <div className="relative mt-12 max-w-6xl mx-auto overflow-hidden px-6 md:px-1 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#006db8]">
          Unlock Your Database Potential with Kelax
        </h2>

        <p className="text-gray-700 text-lg md:text-xl mt-4 leading-relaxed">
          Kelax VedaVault (VV) Series, proudly manufactured in India, is your
          trusted partner for empowering your database infrastructure.
          Experience the unmatched performance, scalability, and reliability of
          our servers, optimized to meet the demands of your database
          applications. Upgrade your data management capabilities with Kelax and
          stay ahead in the data-driven era. Explore Kelax Database Solutions
          today. Reach out to our experts to discuss your database requirements,
          tailor a solution to your needs, and discover how Kelax can elevate
          your database performance. Let's work together to unleash the full
          potential of your data-driven applications.
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
}
