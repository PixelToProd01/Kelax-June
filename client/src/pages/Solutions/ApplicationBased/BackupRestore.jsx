import React from "react";

// Images import
import m1 from "../../../assets/solutions/application/console.jpg";
import m2 from "../../../assets/solutions/application/high_performance_computer.jpg";
import m3 from "../../../assets/solutions/application/network.png";
import m4 from "../../../assets/solutions/application/data_storage.jpg";
import m5 from "../../../assets/solutions/application/console.jpg";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function BackupRestore() {
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
              Backup and Restore Solutions with Kelax VedaVault (VV) Series
            </h1>

            <p className="text-lg md:text-xl opacity-90 mt-5 leading-relaxed">
              At Kelax, we understand the critical importance of data protection
              and business continuity. That's why we offer cutting-edge Backup
              and Restore Solutions powered by our advanced VedaVault (VV)
              Series servers and storage. Whether you're a small business, a
              large enterprise, or anything in between, our Make in India
              initiative brings you a comprehensive, reliable, and scalable
              backup solution tailored to meet your unique needs.
            </p>

            {/* Glow Line */}
            <div className="w-32 h-1 bg-gradient-to-r from-[#00a4ff] to-[#4cc9ff] mx-auto mt-6 rounded-full shadow-xl"></div>
          </div>
        </div>

        <section>
          <section>
            <div className="mt-12 max-w-6xl mx-auto px-6 md:px-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-600">
                The Kelax Advantage for Backup Applications
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
                Unparalleled Reliability
              </h3>
            </div>

            {/* CONTENT */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
                Unparalleled
                <span className="text-[#007cd6]"> Reliability</span>
              </h2>

              <p className="text-gray-600 mt-5 leading-relaxed text-lg">
                Kelax VedaVault (VV) Series servers and storage are engineered
                to deliver unparalleled reliability. Our robust hardware design,
                along with redundant components and advanced fault tolerance
                mechanisms, ensures that your backup data remains secure and
                available whenever you need it.
              </p>
            </div>
          </section>

          {/* ---------------- BLOCK 2 (reverse) ---------------- */}
          <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-2 gap-16 items-center">
            {/* CONTENT */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
                Performance &<span className="text-[#007cd6]"> Speed</span>
              </h2>

              <p className="text-gray-600 mt-5 leading-relaxed text-lg">
                Backup operations can be time-consuming, especially as data
                volumes grow. Kelax VedaVault (VV) Series leverages cutting-edge
                processors and high-speed storage interfaces to optimize backup
                performance, reducing backup windows and enhancing overall
                productivity.
              </p>
            </div>

            {/* IMAGE */}
            <div className="order-1 md:order-2">
              <div className="w-full h-80 md:h-76 overflow-hidden rounded-3xl shadow-lg">
                <img src={m2} className="w-full h-full object-cover" alt="" />
              </div>
              <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
                Speed and Performance
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
                Scalability for Future Growth
              </h3>
            </div>

            {/* CONTENT */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
                Scalability for Future
                <span className="text-[#007cd6]"> Growth</span>
              </h2>

              <p className="text-gray-600 mt-5 leading-relaxed text-lg">
                As your business evolves, so will your data needs. Kelax
                VedaVault (VV) Series provides the scalability you require to
                accommodate expanding data storage and backup requirements,
                saving you from frequent hardware upgrades and costly
                migrations.
              </p>
            </div>
          </section>

          {/* ---------------- BLOCK 4 (reverse) ---------------- */}
          <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-2 gap-16 items-center">
            {/* CONTENT */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
                Data Deduplication &
                <span className="text-[#007cd6]"> Compression</span>
              </h2>

              <p className="text-gray-600 mt-5 leading-relaxed text-lg">
                To optimize storage utilization, Kelax VedaVault (VV) Series
                includes advanced data deduplication and compression
                technologies. This ensures that only unique data blocks are
                stored, reducing storage space requirements without compromising
                data integrity.
              </p>
            </div>

            {/* IMAGE */}
            <div className="order-1 md:order-2">
              <div className="w-full h-80 md:h-76 overflow-hidden rounded-3xl shadow-lg">
                <img src={m4} className="w-full h-full object-cover" alt="" />
              </div>
              <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
                Data Deduplication and Compression
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
                Unified Management Console
              </h3>
            </div>

            {/* CONTENT */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
                Unified Management
                <span className="text-[#007cd6]"> Console</span>
              </h2>

              <p className="text-gray-600 mt-5 leading-relaxed text-lg">
                Kelax offers a unified management console that simplifies backup
                operations across your entire infrastructure. From scheduling
                backups to monitoring data integrity, our user-friendly
                interface puts you in full control of your backup and restore
                processes.
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
                Disaster Recovery and Business Continuity
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Kelax Backup and Restore Solutions are tailored to support
                comprehensive disaster recovery strategies. Whether you need to
                recover a single file or an entire system, our solutions offer
                quick and reliable data restoration, minimizing downtime and
                ensuring business continuity.
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
                Data Archiving and Compliance
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Regulatory compliance and data retention requirements demand
                efficient data archiving solutions. Kelax VedaVault (VV) Series
                provides secure and compliant data archiving, ensuring that your
                organization meets industry-specific regulatory standards.
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
                Virtualized Environments
              </h2>
              <p className="text-gray-700 leading-relaxed">
                For businesses with virtualized environments, Kelax Backup and
                Restore Solutions integrate seamlessly with popular
                virtualization platforms. Whether you use VMware, Hyper-V, or
                other virtualization technologies, we've got you covered.
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
                Hybrid Cloud Backup
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Kelax enables seamless integration with popular cloud storage
                providers, allowing you to implement a hybrid backup approach.
                Store backup copies locally for quick recovery and replicate
                critical data to the cloud for off-site redundancy.
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
                Ransomware Protection
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Ransomware attacks continue to pose a significant threat to
                businesses worldwide. Kelax Backup and Restore Solutions include
                features like immutable backups and early detection mechanisms,
                adding an extra layer of protection against ransomware threats.
              </p>
            </div>
          </div>
        </section>
        <div className="relative mt-12 max-w-6xl mx-auto overflow-hidden px-6 md:px-1 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#006db8]">
            Experience Kelax Backup Excellence
          </h2>

          <p className="text-gray-700 text-lg md:text-xl mt-4 leading-relaxed">
            Kelax VedaVault (VV) Series, proudly made in India, delivers
            industry-leading backup and restore solutions that safeguard your
            valuable data and empower your business. Trust our robust
            infrastructure, unmatched performance, and innovative features to
            ensure data availability and protect your organization from
            unexpected data loss. Unlock the potential of Kelax Backup and
            Restore Solutions for your business. Contact our experts to discuss
            your backup needs, explore tailored solutions, and experience the
            peace of mind that comes with top-tier data protection. Together,
            we'll create a future-proof backup strategy to secure your data and
            drive your success.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
