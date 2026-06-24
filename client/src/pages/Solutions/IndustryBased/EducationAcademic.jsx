import React from "react";
import { FiCheck } from "react-icons/fi";

// Images import
import m1 from "../../../assets/solutions/industry/visualization.jpg";
import m2 from "../../../assets/solutions/industry/high_performance_computer.jpg";
import m3 from "../../../assets/solutions/industry/collaborative.png";
import m4 from "../../../assets/solutions/industry/secure_data.jpg";
import m5 from "../../../assets/solutions/industry/campus.jpg";
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
            Education & Academic
          </h1>

          <p className="text-lg md:text-xl opacity-90 mt-5 leading-relaxed">
            Kelax server and workstation solutions offer comprehensive features
            and capabilities specifically designed to meet the unique
            requirements of the Education and Academic sector. Our solutions
            provide robust performance, scalability, reliability, and security,
            empowering educational institutions to enhance their teaching and
            learning environments, streamline administrative tasks, and
            facilitate collaboration among students and faculty members.
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
            Virtual Desktop Infrastructure (VDI) and Virtualization
          </h3>
        </div>

        {/* CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            Virtual Desktop Infrastructure
            <span className="text-[#007cd6]"> (VDI) & Virtualization</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax solutions support virtualization technologies, allowing
            educational institutions to create virtualized environments for
            efficient resource utilization and simplified management. VDI
            enables centralized administration of desktops and applications,
            providing students and faculty members with secure access to their
            personalized virtual desktops from any device, anywhere, at any
            time. Virtualization also simplifies software deployment, improves
            application compatibility, and enhances classroom collaboration by
            enabling multiple students to access the same virtualized
            environment simultaneously.
          </p>
        </div>
      </section>

      {/* ---------------- BLOCK 2 (reverse) ---------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-2 gap-16 items-center">
        {/* CONTENT */}
        <div className="order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            High-Performance Computing
            <span className="text-[#007cd6]"> (HPC)</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax servers and workstations offer high-performance capabilities,
            making them suitable for data-intensive tasks in research and
            scientific computing within the education sector. With support for
            powerful processors, ample memory, and advanced GPU capabilities,
            our solutions facilitate faster data processing, modeling,
            simulation, and data analysis, empowering academic institutions to
            conduct cutting-edge research and computational studies.
          </p>
        </div>

        {/* IMAGE */}
        <div className="order-1 md:order-2">
          <div className="w-full h-80 md:h-96 overflow-hidden rounded-3xl shadow-lg">
            <img src={m2} className="w-full h-full object-cover" alt="" />
          </div>
          <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
            High-Performance Computing (HPC)
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
            Collaborative Learning and E-Learning Platforms
          </h3>
        </div>

        {/* CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            Collaborative Learning &
            <span className="text-[#007cd6]"> E-Learning Platforms</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax solutions enable the development of collaborative learning and
            e-learning platforms, providing a dynamic and interactive learning
            environment for students and teachers. Integrated software
            applications and platforms support real-time collaboration, document
            sharing, video conferencing, and multimedia content delivery,
            enhancing the overall learning experience and engagement levels.
          </p>
        </div>
      </section>

      {/* ---------------- BLOCK 4 (reverse) ---------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-2 gap-16 items-center">
        {/* CONTENT */}
        <div className="order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            Secure Data Management &
            <span className="text-[#007cd6]"> Privacy</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax servers and workstations incorporate robust security features
            to protect sensitive student and faculty data, ensuring compliance
            with privacy regulations such as GDPR and FERPA. Data encryption,
            access controls, and user authentication mechanisms safeguard
            student records, research data, and other confidential information,
            preventing unauthorized access and ensuring data integrity.
          </p>
        </div>

        {/* IMAGE */}
        <div className="order-1 md:order-2">
          <div className="w-full h-80 md:h-96 overflow-hidden rounded-3xl shadow-lg">
            <img src={m4} className="w-full h-full object-cover" alt="" />
          </div>
          <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
            Secure Data Management and Privacy
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
            Campus Management and Administration
          </h3>
        </div>

        {/* CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            Campus Management &
            <span className="text-[#007cd6]"> Administration</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax solutions offer comprehensive tools for campus management and
            administration, facilitating efficient management of student
            records, enrollment, grading, scheduling, and other administrative
            tasks. Integrated systems and applications automate administrative
            processes, streamline workflows, and enable seamless communication
            and collaboration among faculty, staff, and students.
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
            Virtual Labs and Simulations
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Kelax solutions enable the creation of virtual labs and simulations,
            providing students with hands-on experiences in science,
            engineering, and other technical disciplines. Virtual labs allow
            students to conduct experiments, practice skills, and analyze
            results in a safe and controlled virtual environment, fostering
            experiential learning.
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
            Learning Management Systems (LMS)
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Kelax solutions integrate with Learning Management Systems,
            providing a centralized platform for course content delivery,
            assignments, assessments, and grading. LMS platforms enable faculty
            members to create interactive course materials, track student
            progress, facilitate online discussions, and provide timely
            feedback, enhancing the learning experience.
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
            Research Computing
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Kelax servers and workstations empower academic researchers with
            powerful computing resources for data-intensive research,
            simulations, and modeling. Researchers can leverage high-performance
            computing capabilities to process large datasets, perform complex
            calculations, and accelerate research outcomes.
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
            Library and Digital Resource Management
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Kelax solutions support digital library and resource management
            systems, enabling efficient cataloging, archiving, and retrieval of
            digital resources. Integrated search capabilities, document
            repositories, and access controls streamline access to educational
            resources, e-books, journals, and other digital materials.
          </p>
        </div>
      </div>

      {/* ---------------- FINAL PARAGRAPH ---------------- */}
      <section className="max-w-5xl mx-auto px-6 mt-20 text-center">
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12">
          We understand the unique challenges and requirements of the Education
          and Academic sector and are committed to providing reliable, scalable,
          and secure IT infrastructure solutions. Kelax server and workstation
          solutions offer advanced features, performance, and flexibility,
          empowering educational institutions to create modern and engaging
          learning environments while improving administrative efficiency. Our
          experienced team of experts will work closely with your organization
          to design, implement, and support a tailored solution that meets your
          specific needs and objectives. Please contact us for further
          discussions or to schedule a demonstration of our solutions. We look
          forward to the opportunity to serve your organization's IT needs.
        </p>
      </section>
    </div>
    <Footer />
    </>
  );
}
