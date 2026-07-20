import { useEffect, useRef } from "react";
import {
  FaFlask,
  FaShieldAlt,
  FaAtom,
  FaCloudSun,
  FaBolt,
  FaHeartbeat,
  FaGraduationCap,
  FaBroadcastTower,
  FaUniversity,
} from "react-icons/fa";

// import c1 from '../assets/home/clients/bpcl.png';
// import c2 from '../assets/home/clients/cdac.png';
// import c3 from '../assets/home/clients/csb.webp';
// import c4 from '../assets/home/clients/dhfw.jpg';
// import c5 from '../assets/home/clients/dsir.png';
// import c6 from '../assets/home/clients/ecsh.jpg';
// import c7 from '../assets/home/clients/imd.jpg';
// import c8 from '../assets/home/clients/Indian_Air_Force.png';
// import c9 from '../assets/home/clients/ipr.png';
// import c10 from '../assets/home/clients/isro.png';

export default function Clients() {
  const scrollRef = useRef(null);

  // const logos = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10];

  // Infinite Scroll Logic
  useEffect(() => {
    const scrollContainer = scrollRef.current;

    let scrollAmount = 0;
    function scrollLogos() {
      if (!scrollContainer) return;
      scrollAmount += 1;
      scrollContainer.scrollLeft = scrollAmount;

      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }
      requestAnimationFrame(scrollLogos);
    }
    scrollLogos();
  }, []);

  return (
    <section
      className="bg-gradient-to-b from-[#002350] via-[#004a85] to-[#006db8] py-20 text-white"
      data-aos="fade-right"
    >
      {/* Heading */}
      <h2 className="text-center text-4xl font-bold mb-6">Sector We Serve Our Clients</h2>

      {/* Description */}
      <p className="max-w-4xl mx-auto text-center text-gray-200 leading-relaxed mb-12 px-4">
        Kelax places clients at the core of our mission. With strong dedication,
        we deliver reliable and customized IT infrastructure solutions. Our
        long-term partnerships and successful deployments reflect the trust our
        customers have in us across industries & government institutions.
      </p>

      {/* LOGOS — Infinite Scroll */}
      {/* <div className="relative w-full max-w-5xl mx-auto overflow-hidden py-4">
        <div
          ref={scrollRef}
          className="flex gap-10 whitespace-nowrap overflow-hidden"
        >
          {[...logos, ...logos].map((src, i) => (
            <img
              key={i}
              src={src}
              className="w-20 h-20 md:w-24 md:h-24 object-contain bg-white p-3 rounded-xl shadow-md"
            />
          ))}
        </div>
      </div> */}

      {/*  Show Our Clients */}

      {/* ================= INDUSTRIES WE SERVE ================= */}

      <section className="py-20 bg-gradient-to-b from-white to-[#f5f9fd]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}

          {/* <div className="text-center max-w-3xl mx-auto">

            <h2 className="mt-5 text-4xl md:text-5xl font-bold text-gray-900">
              Trusted Across
              <span className="text-[#006db8]"> Critical Industries</span>
            </h2>

            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              Kelax servers power mission-critical workloads across government,
              research institutions, healthcare, education, enterprise, media
              and other demanding environments.
            </p>
          </div> */}

          {/* Cards */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {/* Card */}

            <div className="group bg-white rounded-3xl shadow-lg p-8 border hover:border-[#006db8] hover:shadow-2xl transition duration-500">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-[#006db8] text-3xl group-hover:scale-110 transition">
                <FaFlask />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-800">
                Research
              </h3>

              <p className="mt-3 text-gray-600 leading-relaxed">
                High-performance computing infrastructure for scientific
                research, laboratories and innovation centers.
              </p>
            </div>

            {/* Card */}

            <div className="group bg-white rounded-3xl shadow-lg p-8 border hover:border-[#006db8] hover:shadow-2xl transition duration-500">
              <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 text-3xl group-hover:scale-110 transition">
                <FaShieldAlt />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-800">
                Defence & Aerospace
              </h3>

              <p className="mt-3 text-gray-600 leading-relaxed">
                Secure and reliable computing platforms for defence
                applications, aerospace workloads and mission-critical
                operations.
              </p>
            </div>

            {/* Card */}

            <div className="group bg-white rounded-3xl shadow-lg p-8 border hover:border-[#006db8] hover:shadow-2xl transition duration-500">
              <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center text-yellow-600 text-3xl group-hover:scale-110 transition">
                <FaAtom />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-800">
                Nuclear Research
              </h3>

              <p className="mt-3 text-gray-600 leading-relaxed">
                Enterprise-grade infrastructure supporting advanced simulations,
                scientific analysis and nuclear research facilities.
              </p>
            </div>

            {/* Card */}

            <div className="group bg-white rounded-3xl shadow-lg p-8 border hover:border-[#006db8] hover:shadow-2xl transition duration-500">
              <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-600 text-3xl group-hover:scale-110 transition">
                <FaCloudSun />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-800">
                Weather Forecasting
              </h3>

              <p className="mt-3 text-gray-600 leading-relaxed">
                Compute-intensive servers for weather prediction, climate
                modelling and environmental data analytics.
              </p>
            </div>

            {/* Card */}

            <div className="group bg-white rounded-3xl shadow-lg p-8 border hover:border-[#006db8] hover:shadow-2xl transition duration-500">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-3xl group-hover:scale-110 transition">
                <FaBolt />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-800">
                Power & Energy
              </h3>

              <p className="mt-3 text-gray-600 leading-relaxed">
                Reliable infrastructure for utilities, power generation,
                monitoring systems and smart grid applications.
              </p>
            </div>

            {/* Card */}

            <div className="group bg-white rounded-3xl shadow-lg p-8 border hover:border-[#006db8] hover:shadow-2xl transition duration-500">
              <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600 text-3xl group-hover:scale-110 transition">
                <FaHeartbeat />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-800">
                Healthcare
              </h3>

              <p className="mt-3 text-gray-600 leading-relaxed">
                Secure servers for hospital information systems, medical
                imaging, patient databases and healthcare analytics.
              </p>
            </div>

            {/* Card */}

            <div className="group bg-white rounded-3xl shadow-lg p-8 border hover:border-[#006db8] hover:shadow-2xl transition duration-500">
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 text-3xl group-hover:scale-110 transition">
                <FaGraduationCap />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-800">
                Education & Research
              </h3>

              <p className="mt-3 text-gray-600 leading-relaxed">
                Digital campuses, universities and research institutes depend on
                Kelax infrastructure for uninterrupted performance.
              </p>
            </div>

            {/* Card */}

            <div className="group bg-white rounded-3xl shadow-lg p-8 border hover:border-[#006db8] hover:shadow-2xl transition duration-500">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 text-3xl group-hover:scale-110 transition">
                <FaBroadcastTower />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-800">
                Media & Broadcasting
              </h3>

              <p className="mt-3 text-gray-600 leading-relaxed">
                High-throughput systems for media production, broadcasting,
                rendering and content delivery.
              </p>
            </div>

            {/* Card */}

            <div className="group bg-white rounded-3xl shadow-lg p-8 border hover:border-[#006db8] hover:shadow-2xl transition duration-500">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl group-hover:scale-110 transition">
                <FaUniversity />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-800">
                Government & Public Sector
              </h3>

              <p className="mt-3 text-gray-600 leading-relaxed">
                Trusted by government departments for secure, scalable and Make
                in India server infrastructure supporting e-Governance
                initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Four Icon Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-7xl mx-auto px-6">
        {/* Card 1 */}
        <div className="bg-[#2d69c7] p-8 rounded-xl text-center shadow-lg">
          <div className="text-4xl mb-4">🌟</div>
          <h3 className="font-semibold text-lg mb-2">
            Exceptional Quality Assurance
          </h3>
          <p className="text-gray-200 text-sm">
            Every Kelax system goes through 72-hour stress testing ensuring
            performance, reliability, and stability.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#2d69c7] p-8 rounded-xl text-center shadow-lg">
          <div className="text-4xl mb-4">🤝</div>
          <h3 className="font-semibold text-lg mb-2">
            Customer-First Approach
          </h3>
          <p className="text-gray-200 text-sm">
            We build systems only to match your needs with honest guidance &
            tailored solutions.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#2d69c7] p-8 rounded-xl text-center shadow-lg">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="font-semibold text-lg mb-2">
            Instant Start — No Setup
          </h3>
          <p className="text-gray-200 text-sm">
            Pre-configured with latest drivers. Just plug in and start working
            instantly.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-[#2d69c7] p-8 rounded-xl text-center shadow-lg">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="font-semibold text-lg mb-2">
            Future-Ready Expandability
          </h3>
          <p className="text-gray-200 text-sm">
            Upgrade anytime with standard architectures while keeping warranty
            safe.
          </p>
        </div>
      </div>
    </section>
  );
}
