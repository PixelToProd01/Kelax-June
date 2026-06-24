import React from "react";

// Images import
import m1 from "../../../assets/solutions/application/science_research.jpg";
import m2 from "../../../assets/solutions/application/engineering.jpg";
import m3 from "../../../assets/solutions/application/finance.jpg";
import m4 from "../../../assets/solutions/application/genomics.jpg";
import m5 from "../../../assets/solutions/application/ai.jpg";
import m6 from "../../../assets/solutions/application/climate_change.jpg";
import m7 from "../../../assets/solutions/application/software_tools.jpg";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function HPC() {
  const examples = [
    {
      title: "Cosmic Evolution Research",
      description:
        "A leading research institution utilizes Kelax HPC solutions to simulate the universe's early stages, unveiling insights into the Big Bang theory and cosmic evolution.",
    },
    {
      title: "Aerodynamic Simulations",
      description:
        "A renowned aircraft manufacturer leverages Kelax HPC for aerodynamic simulations, enhancing aircraft performance and fuel efficiency.",
    },
    {
      title: "Financial Risk Modeling",
      description:
        "A financial institution employs Kelax HPC for real-time risk assessment, optimizing investment strategies and minimizing potential financial vulnerabilities.",
    },
    {
      title: "Genomics & DNA Analysis",
      description:
        "In genomics research, Kelax HPC expedites DNA sequencing and analysis, driving advancements in personalized medicine and disease diagnosis.",
    },
    {
      title: "AI & NLP Development",
      description:
        "An AI startup employs Kelax HPC for natural language processing, revolutionizing chatbot development and virtual assistants.",
    },
  ];

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
              High-Performance Computing (HPC)
            </h1>

            <p className="text-lg md:text-xl opacity-90 mt-5 leading-relaxed">
              In today's data-driven world, High-Performance Computing (HPC) has
              emerged as a game-changer, revolutionizing industries by
              empowering researchers, scientists, and engineers to tackle
              complex computational challenges with unmatched speed and
              efficiency. HPC enables organizations to perform intricate
              simulations, data analysis, and modeling, paving the way for
              groundbreaking innovations across various domains.
            </p>

            {/* Glow Line */}
            <div className="w-32 h-1 bg-gradient-to-r from-[#00a4ff] to-[#4cc9ff] mx-auto mt-6 rounded-full shadow-xl"></div>
          </div>
        </div>

        {/* Use Cases */}
        <section>
          <div className="relative mt-12 max-w-6xl mx-auto overflow-hidden px-6 md:px-1">
            <h2 className="text-3xl md:text-4xl font-bold text-[#006db8]">
              Kelax's Commitment to HPC Excellence
            </h2>

            <p className="text-gray-700 text-lg md:text-xl mt-4 leading-relaxed">
              At Kelax, we are driven by a passion for technological
              advancement, and our Make In India initiative fuels our dedication
              to providing cutting-edge solutions to our customers. Our
              High-Performance Computing solutions under the VedaVault (VV)
              series epitomize the pinnacle of computational power and
              scalability, enabling organizations to unlock new frontiers in
              research, development, and data analysis.
            </p>
          </div>
          <section>
            <div className="mt-12 max-w-6xl mx-auto px-6 md:px-1">
              <h2 className="text-3xl md:text-4xl font-bold text-[#006db8]">
                Use Cases
              </h2>

              <p className="text-gray-700 text-lg md:text-xl mt-4 leading-relaxed">
                Kelax's VedaVault HPC solutions cater to a diverse range of
                applications, driving progress and breakthroughs in critical
                areas:
              </p>
            </div>
          </section>

          {/* GLASS SECTION */}
          <div className="relative px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-10 mt-12">
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
                Scientific Research and Exploration
              </h2>
              <p className="text-gray-700 leading-relaxed">
                From understanding the mysteries of the cosmos to simulating
                natural phenomena, our HPC solutions empower scientific
                endeavors.
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
                Engineering and Design Simulations
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Engineers benefit from accelerated simulations in fields such as
                aerodynamics, structural analysis, and fluid dynamics.
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
                Financial Modeling and Risk Analysis
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our HPC solutions enable faster, data-driven financial modeling
                and risk assessment, optimizing decision-making.
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
                Genomics and Bioinformatics
              </h2>
              <p className="text-gray-700 leading-relaxed">
                HPC accelerates genomic data processing, leading to advancements
                in personalized medicine and genetic research.
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
                Artificial Intelligence and Machine Learning
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Training complex AI and ML models becomes seamless with the
                immense computational power of Kelax HPC solutions.
              </p>
            </div>

            {/* Card 6 */}
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
                Weather Forecasting and Climate Studies
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Enhanced weather prediction models and climate simulations
                contribute to better disaster preparedness.
              </p>
            </div>
          </div>
        </section>

        <section>
          <section>
            <div className="mt-12 max-w-6xl mx-auto px-6 md:px-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-600">
                Kelax's VedaVault Series: Unleashing the Power of HPC
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg md:text-xl mt-4">
                Our VedaVault series represents the epitome of HPC excellence,
                designed to handle the most demanding computational workloads
                with ease. Key features include:
              </p>
            </div>
          </section>

          {/* GLASS SECTION */}
          <div className="relative px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-10 mt-12">
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
                Next-Generation Processors
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Harness the potential of AMD 2 x 128 Core and Intel 2 x 56 Core
                processors in each node for unparalleled performance.
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
                Massive Memory Capacity
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Accommodate extensive datasets and memory-intensive applications
                with generous memory configurations.
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
                Parallel Processing Efficiency
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Advanced parallel processing capabilities boost computational
                efficiency and productivity.
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
                High-Speed Networking
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Facilitate seamless data exchange and collaboration with
                high-speed networking options.
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
                Optimized Cooling Solutions
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our innovative cooling solutions ensure optimal performance
                while maintaining reliability.
              </p>
            </div>
          </div>
        </section>

        <section>
          <section>
            <div className="mt-12 max-w-6xl mx-auto px-6 md:px-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-600">
                Why Choose Kelax for HPC Solutions?
              </h2>
            </div>
          </section>

          {/* GLASS SECTION */}
          <div className="relative px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-10 mt-12">
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
                Expertise and Experience
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our team of seasoned professionals brings decades of experience
                in designing and deploying HPC solutions, ensuring the best
                outcomes for your projects.
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
                Customization and Flexibility
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We understand that each HPC requirement is unique, and our
                solutions are tailored to meet your specific needs and goals.
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
                Proven Track Record
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Kelax's VedaVault series has been successfully tested and
                implemented in various HPC projects, earning the trust of
                leading organizations.
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
                Performance and Scalability
              </h2>
              <p className="text-gray-700 leading-relaxed">
                From small research labs to large-scale supercomputing centers,
                our HPC solutions offer unmatched performance and scalability to
                accommodate your evolving needs.
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
                Reliability and Timely Support
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Kelax is committed to providing top-notch support and timely
                service, ensuring your HPC infrastructure runs flawlessly and
                meets your expectations.
              </p>
            </div>
          </div>
        </section>

        <section>
          <section>
            <div className="mt-12 max-w-6xl mx-auto px-6 md:px-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-600">
                Experience the Power of HPC with Kelax
              </h2>
            </div>
          </section>

          {/* ---------------- BLOCK 1 ---------------- */}

          <section className="max-w-7xl mx-auto px-6 mt-14 grid md:grid-cols-2 gap-16 items-center">
            {/* IMAGE */}
            <div className="relative">
              <div className="w-full h-80 md:h-96 overflow-hidden rounded-3xl shadow-lg">
                <img src={m1} className="w-full h-full object-cover" alt="" />
              </div>

              <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
                Scientific Research and Exploration
              </h3>
            </div>

            {/* CONTENT */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
                Scientific Research &
                <span className="text-[#007cd6]"> Exploration</span>
              </h2>

              <p className="text-gray-600 mt-5 leading-relaxed text-lg">
                From decoding the mysteries of the cosmos to simulating
                intricate natural phenomena, Kelax HPC solutions empower
                scientific researchers to push the boundaries of knowledge.
                Astrophysicists can model the formation of galaxies, while
                climate scientists study climate change and its impact on the
                environment. Our HPC systems expedite data processing, enhancing
                scientific exploration and discovery.
              </p>
            </div>
          </section>

          {/* ---------------- BLOCK 2 (reverse) ---------------- */}
          <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-2 gap-16 items-center">
            {/* CONTENT */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
                Design Simulations &
                <span className="text-[#007cd6]"> Engineering</span>
              </h2>

              <p className="text-gray-600 mt-5 leading-relaxed text-lg">
                Engineering and Design Simulations Engineers across industries
                benefit from accelerated simulations and virtual prototyping
                made possible by Kelax HPC solutions. In the aerospace sector,
                engineers can perform aerodynamics simulations, optimizing
                aircraft designs for fuel efficiency. Structural engineers can
                analyze complex building structures, ensuring safety and
                reliability. Kelax HPC solutions enable engineers to fine-tune
                designs, saving time and resources in the development process.
              </p>
            </div>

            {/* IMAGE */}
            <div className="order-1 md:order-2">
              <div className="w-full h-80 md:h-96 overflow-hidden rounded-3xl shadow-lg">
                <img src={m2} className="w-full h-full object-cover" alt="" />
              </div>
              <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
                Engineering and Design Simulations
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
                Financial Modeling and Risk Analysis
              </h3>
            </div>

            {/* CONTENT */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
                Financial Modeling &
                <span className="text-[#007cd6]"> Risk Analysis</span>
              </h2>

              <p className="text-gray-600 mt-5 leading-relaxed text-lg">
                Financial institutions rely on Kelax HPC solutions for
                data-intensive financial modeling and risk assessment. By
                harnessing the computational power of our HPC systems, analysts
                can quickly analyze vast datasets, leading to data-driven
                investment strategies and risk evaluations. Speedy simulations
                enable accurate scenario analysis and stress testing, empowering
                organizations to make informed decisions in real-time.
              </p>
            </div>
          </section>

          {/* ---------------- BLOCK 4 (reverse) ---------------- */}
          <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-2 gap-16 items-center">
            {/* CONTENT */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
                Genomics &
                <span className="text-[#007cd6]"> Bioinformatics</span>
              </h2>

              <p className="text-gray-600 mt-5 leading-relaxed text-lg">
                Kelax HPC solutions play a pivotal role in advancing genomics
                and bioinformatics research. Scientists can process and analyze
                massive genomic datasets, accelerating genetic research and
                personalized medicine initiatives. HPC aids in DNA sequencing,
                protein folding simulations, and drug discovery, leading to
                breakthroughs in medical science and improved patient outcomes.
              </p>
            </div>

            {/* IMAGE */}
            <div className="order-1 md:order-2">
              <div className="w-full h-80 md:h-96 overflow-hidden rounded-3xl shadow-lg">
                <img src={m4} className="w-full h-full object-cover" alt="" />
              </div>
              <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
                Genomics and Bioinformatics
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
                Artificial Intelligence and Machine Learning
              </h3>
            </div>

            {/* CONTENT */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
                Artificial Intelligence &
                <span className="text-[#007cd6]"> Machine Learning</span>
              </h2>

              <p className="text-gray-600 mt-5 leading-relaxed text-lg">
                Training complex AI and machine learning models demands
                substantial computational resources, and Kelax HPC solutions
                rise to the challenge. Data scientists and researchers can
                tackle intricate AI tasks, such as natural language processing,
                image recognition, and deep learning, with unparalleled speed
                and efficiency. Kelax HPC empowers organizations to deploy AI
                applications that revolutionize various industries.
              </p>
            </div>
          </section>

          {/* ---------------- BLOCK 6 ---------------- */}
          <section className="max-w-7xl mx-auto px-6 mt-28 grid md:grid-cols-2 gap-16 items-center">
            {/* CONTENT */}
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
                Weather Forecasting and Climate Studies &
                <span className="text-[#007cd6]"> Compliance</span>
              </h2>

              <p className="text-gray-600 mt-5 leading-relaxed text-lg">
                In the realm of meteorology and climate research, accurate
                predictions are crucial. Kelax HPC solutions enhance weather
                forecasting models, enabling meteorologists to analyze vast
                weather data sets rapidly. Improved weather predictions
                contribute to better disaster preparedness and management,
                safeguarding lives and property during extreme weather events.
              </p>
            </div>

            {/* IMAGE */}
            <div className="order-1 md:order-2">
              <div className="w-full h-80 md:h-96 overflow-hidden rounded-3xl shadow-lg">
                <img src={m6} className="w-full h-full object-cover" alt="" />
              </div>
              <h3 className="text-center mt-4 text-xl font-semibold text-gray-700">
                Weather Forecasting and Climate Studies
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
                Software and Tools Leveraged
              </h3>
            </div>

            {/* CONTENT */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#003c66] leading-snug">
                Tools Leveraged &
                <span className="text-[#007cd6]"> Software</span>
              </h2>

              <p className="text-gray-600 mt-5 leading-relaxed text-lg">
                Kelax HPC solutions utilize industry-leading software and tools
                to optimize performance and efficiency. Popular software
                packages such as OpenFOAM, ANSYS, GROMACS, and WRF are harnessed
                to execute complex simulations and analyses. Frameworks like
                TensorFlow and PyTorch are utilized for AI and machine learning
                tasks, while bioinformatics researchers utilize BLAST and Bowtie
                for genomic analysis.
              </p>
            </div>
          </section>
        </section>

        {/* ---------------- FINAL PARAGRAPH ---------------- */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-0 text-center">
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
              Real-World Examples
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-14">
              Discover how organizations across industries use{" "}
              <span className="font-semibold text-blue-600">
                Kelax HPC Solutions
              </span>{" "}
              to accelerate innovation, improve efficiency, and unlock
              breakthrough performance.
            </p>

            {/* Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {examples.map((ex, i) => (
                <div
                  key={i}
                  className="bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition duration-300"
                >
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {ex.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {ex.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
