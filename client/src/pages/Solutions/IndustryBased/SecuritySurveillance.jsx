import React from "react";
import { FiCheck } from "react-icons/fi";

// Images import
import m1 from "../../../assets/solutions/industry/data_storage.jpg";
import m2 from "../../../assets/solutions/industry/secure_data.jpg";
import m3 from "../../../assets/solutions/industry/high_performance_computer.jpg";
import m4 from "../../../assets/solutions/industry/monitoring.jpg";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function SecuritySurveillance() {
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
            Surveillance & Security
          </h1>

          <p className="text-lg md:text-xl opacity-90 mt-5 leading-relaxed">
            Kelax is committed to providing robust server and workstation 
            solutions tailored to the unique needs of the surveillance and 
            security industry. Our solutions are designed to deliver reliable performance, 
            high storage capacity, and advanced security features to ensure the efficient 
            management and analysis of video surveillance data. Here are the detailed 
            solutions and use cases that Kelax offers for the Surveillance and Security industry.
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
            High-Capacity Storage for Video Surveillance Data
          </h3>
        </div>

        {/* CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
            High-Capacity Storage for Video
            <span className="text-[#007cd6]"> Surveillance Data</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax's server configurations offer scalable and high-capacity storage 
            solutions to address the storage demands of video surveillance systems. 
            With support for multiple hard drives and RAID configurations, our 
            servers enable the seamless recording and retention of surveillance footage. 
            This ensures that critical video data is readily accessible for forensic 
            analysis and compliance purposes.
          </p>

          <div className="mt-6 ">
            {[
              "24/7 video surveillance for public areas, buildings, and facilities",
              "Security monitoring for airports, transportation hubs, and critical infrastructure",
              "Surveillance systems for retail stores, banks, and commercial spaces",
              "Video management for casinos, hotels, and entertainment venues",
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
             Secure Video Management 
            <span className="text-[#007cd6]"> Systems (VMS) & Reliable</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax's server and workstation solutions are fully compatible and 
            certified with leading video management systems (VMS) such as 
            Digifort and Wavesys. Our systems provide seamless integration, 
            allowing for efficient video data capture, storage, and management. 
            With the ability to handle multiple camera feeds and support 
            advanced analytics, Kelax's solutions enable effective monitoring 
            and analysis of surveillance footage.
          </p>

          <div className="mt-6 ">
            {[
              "Centralized video management for large-scale surveillance installations",
              "Intelligent video analytics for real-time threat detection and response",
              "Multi-site video monitoring and control",
              "Advanced video search and investigation for forensic analysis",
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
            Reliable and Secure Video Management Systems (VMS)
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
            High-Performance Computing for Video Analytics
          </h3>
        </div>

        {/* CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
             High-Performance Computing for
            <span className="text-[#007cd6]">
              {" "}
              Video Analytics
            </span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax's powerful workstations and server configurations are equipped 
            with high-performance processors and graphics cards, making them ideal 
            for running sophisticated video analytics applications. These solutions 
            enable real-time object detection, facial recognition, license plate recognition, 
            and other advanced video analytics capabilities to enhance security 
            operations and automate surveillance tasks.
          </p>

          <div className="mt-6 ">
            {[
              "People counting and crowd management in public spaces",
              "Intrusion detection and perimeter surveillance",
              "Traffic monitoring and congestion management",
              "Facial recognition for access control and identity verification",
              "Automated alerts and event-triggered actions based on video analytics results",
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
            Secure Remote Access &
            <span className="text-[#007cd6]"> Mobile Monitoring</span>
          </h2>

          <p className="text-gray-600 mt-5 leading-relaxed text-lg">
            Kelax's server and workstation solutions provide secure remote 
            access capabilities, allowing authorized personnel to monitor 
            surveillance systems and review footage remotely. This enables 
            security personnel to respond to incidents and access video 
            feeds from anywhere, enhancing operational efficiency and responsiveness. 
            Mobile monitoring applications enable real-time surveillance on 
            smartphones and tablets, ensuring constant vigilance even on the go.
          </p>

          <div className="mt-6 ">
            {[
              "Remote monitoring of multiple sites from a centralized control center",
              "On-the-go surveillance monitoring for security personnel",
              "Remote access for security management and decision-making",
              "Incident response and real-time situational awareness",
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
            Secure Remote Access and Mobile Monitoring
          </h3>
        </div>
      </section>

      {/* ---------------- FINAL PARAGRAPH ---------------- */}
      <section className="max-w-5xl mx-auto px-6 mt-20 text-center"> 
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12">
          Kelax's server and workstation solutions for the surveillance and security
          industry offer reliable performance, high-capacity storage, and seamless 
          integration with leading VMS platforms. With advanced video analytics capabilities, 
          secure remote access, and compatibility with industry-standard software, Kelax 
          empowers organizations to achieve comprehensive surveillance and security management. 
          Contact us today to discover how Kelax can enhance your surveillance operations and 
          safeguard your assets effectively.
        </p>
      </section>
    </div>
    <Footer />
    </>
  );
}

