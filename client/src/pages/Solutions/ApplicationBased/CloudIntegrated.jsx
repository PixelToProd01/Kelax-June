import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

// Images import
import m1 from "../../../assets/solutions/application/cloud_platforms.jpg";
import m2 from "../../../assets/solutions/application/cloud_security.png";
import m3 from "../../../assets/solutions/application/server_room.jpg";
import m4 from "../../../assets/solutions/application/cloud_cources.png";
import m5 from "../../../assets/solutions/application/cloud3.jpg";

export default function CloudIntegrated() {
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
            Kelax Virtual Desktop Infrastructure (VDI) Solutions
          </h1>

          <p className="text-lg md:text-xl opacity-90 mt-5 leading-relaxed">
            At Kelax, we recognise the growing significance of Virtual Desktop
            Infrastructure (VDI) in modern workplaces. VDI empowers businesses
            with flexible, secure, and efficient desktop delivery, transforming
            the way organizations manage and access desktops and applications.
            Our VedaVault (VV) Series servers and workstations, proudly made in
            India, are designed to optimize VDI deployments and enhance user
            experiences.
          </p>

          {/* Glow Line */}
          <div className="w-32 h-1 bg-gradient-to-r from-[#00a4ff] to-[#4cc9ff] mx-auto mt-6 rounded-full shadow-xl"></div>
        </div>
      </div>

      <section>
        <section>
          <div className="mt-12 max-w-6xl mx-auto px-6 md:px-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600">
              The Kelax Advantage for Virtual Desktop Infrastructure (VDI)
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
              VDI-Certified and Compliant
            </h3>
          </div>

          {/* CONTENT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
              VDI-Certified &<span className="text-[#007cd6]"> Compliant</span>
            </h2>

            <p className="text-gray-600 mt-5 leading-relaxed text-lg">
              Kelax VedaVault (VV) Series is certified and compliant with
              leading Virtual Desktop Infrastructure (VDI) OEMs such as VMware
              Horizon, Citrix Virtual Apps and Desktops, and Microsoft Remote
              Desktop Services (RDS). Our servers are fine-tuned to deliver
              optimal performance for VDI workloads.
            </p>
          </div>
        </section>

        {/* ---------------- BLOCK 2 (reverse) ---------------- */}
        <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-2 gap-16 items-center">
          {/* CONTENT */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
              Enhanced User
              <span className="text-[#007cd6]"> Experience</span>
            </h2>

            <p className="text-gray-600 mt-5 leading-relaxed text-lg">
              Kelax VedaVault (VV) Series servers are equipped with powerful
              processors, ample memory, and high-performance storage, ensuring a
              seamless and responsive user experience for virtual desktops and
              applications.
            </p>
          </div>

          {/* IMAGE */}
          <div className="order-1 md:order-2">
            <div className="w-full h-80 md:h-76 overflow-hidden rounded-3xl shadow-lg">
              <img src={m2} className="w-full h-full object-cover" alt="" />
            </div>
            <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
              Enhanced User Experience
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
              Scalability to Support Growing Demands
            </h3>
          </div>

          {/* CONTENT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
              Scalability to Support
              <span className="text-[#007cd6]"> Growing Demands</span>
            </h2>

            <p className="text-gray-600 mt-5 leading-relaxed text-lg">
              As your workforce expands, Kelax VedaVault (VV) Series provides
              the scalability required to accommodate increasing VDI workloads.
              Easily add more nodes to your VDI infrastructure without
              compromising performance.
            </p>
          </div>
        </section>

        {/* ---------------- BLOCK 4 (reverse) ---------------- */}
        <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-2 gap-16 items-center">
          {/* CONTENT */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
              Data Security &<span className="text-[#007cd6]"> Privacy</span>
            </h2>

            <p className="text-gray-600 mt-5 leading-relaxed text-lg">
              Kelax understands the importance of data security in VDI
              environments. Our servers are built with robust security features,
              ensuring the confidentiality and integrity of sensitive data.
            </p>
          </div>

          {/* IMAGE */}
          <div className="order-1 md:order-2">
            <div className="w-full h-80 md:h-76 overflow-hidden rounded-3xl shadow-lg">
              <img src={m4} className="w-full h-full object-cover" alt="" />
            </div>
            <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
              Data Security and Privacy
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
              Simplified Desktop Management
            </h3>
          </div>

          {/* CONTENT */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
              Simplified Desktop
              <span className="text-[#007cd6]"> Management</span>
            </h2>

            <p className="text-gray-600 mt-5 leading-relaxed text-lg">
              Kelax VedaVault (VV) Series simplifies desktop management through
              centralised control and streamlined deployment. Efficiently
              deliver and manage virtual desktops, reducing IT overhead.
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
              Remote Workforce Enablement
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Empower your remote workforce with Kelax VedaVault (VV) Series VDI
              solutions. Enable secure access to corporate resources from
              anywhere, facilitating flexible work arrangements.
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
              BYOD (Bring Your Own Device)
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Support BYOD policies effortlessly with Kelax VDI solutions.
              Employees can access virtual desktops and applications from their
              personal devices while maintaining data security.
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
              Software Testing and Development
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Streamline software testing and development processes with Kelax
              VDI solutions. Provision virtual desktops quickly for testing,
              coding, and debugging purposes.
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
              Content Creation and Multimedia Editing
            </h2>
            <p className="text-gray-700 leading-relaxed">
              For content creators and multimedia professionals, Kelax VedaVault
              (VV) Series delivers the performance needed to handle
              resource-intensive tasks with ease.
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
              Educational Institutions and E-Learning
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Enhance e-learning experiences in educational institutions with
              Kelax VDI solutions. Provide students and educators with secure,
              consistent access to educational resources.
            </p>
          </div>
        </div>
      </section>
      <div className="relative mt-12 max-w-6xl mx-auto overflow-hidden px-6 md:px-1 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#006db8]">
          Transforming Workspaces with Kelax VDI Solutions
        </h2>

        <p className="text-gray-700 text-lg md:text-xl mt-4 leading-relaxed">
          Unlock the full potential of Virtual Desktop Infrastructure with Kelax
          VedaVault (VV) Series. Our VDI-certified servers provide the
          foundation for a flexible, secure, and efficient desktop delivery
          infrastructure. Embrace the future of work with Kelax, your trusted
          Make in India partner for VDI solutions. Discover Kelax Virtual
          Desktop Infrastructure (VDI) Solutions today. Reach out to our experts
          to explore how our VedaVault (VV) Series can revolutionise your
          desktop management, enhance productivity, and empower your workforce.
          Experience the difference of VDI with Kelax.
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
}

