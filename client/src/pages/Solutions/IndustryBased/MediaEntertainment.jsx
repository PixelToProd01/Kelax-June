import React from "react";
import { FiCheck } from "react-icons/fi";

// Images import
import m1 from "../../../assets/solutions/industry/video_editing.jpg";
import m2 from "../../../assets/solutions/industry/server_room.jpg";
import m3 from "../../../assets/solutions/industry/visual_effects.jpg";
import m4 from "../../../assets/solutions/industry/collaborative.png";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function MediaEntertainment() {
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
            Media & Entertainment Solutions
          </h1>

          <p className="text-lg md:text-xl opacity-90 mt-5 leading-relaxed">
            At Kelax, we understand the unique demands of the media and
            entertainment industry, where creativity, collaboration, and
            efficient workflows are crucial. Our server and workstation
            solutions are specifically designed to empower professionals in this
            industry, providing the performance, storage capacity, and
            reliability needed to bring artistic visions to life. Here are the
            detailed solutions and use cases that Kelax offers for the Media and
            Entertainment industry.
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
            Powerful Workstations for Video Editing and Post-Production
          </h3>
        </div>

        {/* CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            Powerful Workstations for Video Editing &
            <span className="text-[#007cd6]"> Post-Production</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax offers high-performance workstations equipped with the latest
            processors, powerful graphics cards, and fast memory configurations.
            These workstations excel in video editing, color grading, and
            post-production tasks, enabling seamless playback, real-time
            editing, and efficient rendering. Professionals can work with
            high-resolution footage, complex effects, and multiple layers
            without sacrificing performance or productivity.
          </p>

          <div className="mt-6 ">
            {[
              "Video editing for films, TV shows, commercials, and music videos",
              "Color grading and correction to achieve the desired visual aesthetics",
              "Compositing and visual effects (VFX) creation for immersive digital environments",
              "Audio editing and sound design for enhanced storytelling",
              "3D modeling and animation for character development and special effects",
            ].map((item, i) => (
              <p key={i} className="flex items-center gap-3 text-gray-700">
                <FiCheck className="text-[#007cd6]" /> {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- BLOCK 2 (reverse) ---------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-2 gap-16 items-center">
        {/* CONTENT */}
        <div className="order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
             Scalable Storage Solutions for
            <span className="text-[#007cd6]"> Media Assets</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax provides scalable storage solutions tailored to the media and 
            entertainment industry's data-intensive workflows. Our server 
            configurations offer high-capacity storage arrays with features like 
            RAID protection, high-speed data transfer, and seamless scalability. 
            This ensures that media professionals can store, access, and manage 
            their vast libraries of video, audio, and image assets efficiently.
          </p>

          <div className="mt-6 ">
            {[
              "Centralized media asset management and archival",
              "Collaborative editing and project sharing across teams",
              "High-resolution content storage and retrieval",
              "Seamless integration with media asset management (MAM) and digital asset management (DAM) systems",
              "Efficient data backup and disaster recovery for critical media assets",
            ].map((item, i) => (
              <p key={i} className="flex items-center gap-3 text-gray-700">
                <FiCheck className="text-[#007cd6]" /> {item}
              </p>
            ))}
          </div>
        </div>

        {/* IMAGE */}
        <div className="order-1 md:order-2">
          <div className="w-full h-80 md:h-96 overflow-hidden rounded-3xl shadow-lg">
            <img src={m2} className="w-full h-full object-cover" alt="" />
          </div>
          <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
            Scalable Storage Solutions for Media Assets
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
            High-Performance Rendering and Animation
          </h3>
        </div>

        {/* CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            High-Performance Rendering &
            <span className="text-[#007cd6]">
              {" "}
              Animation
            </span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax's server solutions are optimized for rendering and animation workflows 
            in the media and entertainment industry. With powerful processors and scalable 
            computing power, our servers can handle complex rendering tasks, accelerating 
            the production of high-quality visuals. These solutions enable artists and 
            studios to reduce rendering times, iterate faster, and meet tight production deadlines.
          </p>

          <div className="mt-6 ">
            {[
              "3D rendering for films, animations, and visual effects",
              "Real-time rendering and virtual production",
              "Architectural visualization and walkthroughs",
              "Game development and cinematic",
              "High-quality pre-visualization for film and TV production",
            ].map((item, i) => (
              <p key={i} className="flex items-center gap-3 text-gray-700">
                <FiCheck className="text-[#007cd6]" /> {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- BLOCK 4 (reverse) ---------------- */}
      <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-2 gap-16 items-center">
        {/* CONTENT */}
        <div className="order-2 md:order-1">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            Collaborative Workflows &
            <span className="text-[#007cd6]"> Remote Access</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax recognizes the importance of collaboration in the media 
            and entertainment industry. Our server and workstation solutions 
            facilitate seamless collaboration among creative teams, whether 
            they are working in the same location or remotely. Features like 
            high-speed networking, remote access capabilities, and cloud 
            integration enable real-time collaboration, project sharing, 
            and review processes.
          </p>

          <div className="mt-6 ">
            {[
              "Remote editing and review sessions with clients or collaborators",
              "Multi-user collaboration on large-scale projects",
              "Secure content sharing and distribution",
              "Live streaming and broadcasting workflows",
              "Virtual set design and production",
            ].map((item, i) => (
              <p key={i} className="flex items-center gap-3 text-gray-700">
                <FiCheck className="text-[#007cd6]" /> {item}
              </p>
            ))}
          </div>
        </div>

        {/* IMAGE */}
        <div className="order-1 md:order-2">
          <div className="w-full h-80 md:h-96 overflow-hidden rounded-3xl shadow-lg">
            <img src={m4} className="w-full h-full object-cover" alt="" />
          </div>
          <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
            Collaborative Workflows and Remote Access
          </h3>
        </div>
      </section>

      {/* ---------------- FINAL PARAGRAPH ---------------- */}
      <section className="max-w-5xl mx-auto px-6 mt-20 text-center"> 
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12">
          Kelax's server and workstation solutions for the media and entertainment 
          industry provide the performance, storage capacity, and collaborative 
          capabilities required to meet the unique challenges of this dynamic industry. 
          Whether you are a filmmaker, video editor, animator, or VFX artist, Kelax's 
          solutions empower you to unleash your creativity, streamline your workflows, 
          and bring your artistic visions to life with exceptional efficiency and quality. 
          Contact us today to explore how Kelax can elevate your media and entertainment 
          operations to new heights.
        </p>
      </section>
    </div>
    <Footer />
     </>
  );
}
