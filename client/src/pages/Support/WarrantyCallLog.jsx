import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const WarrantyCallLog = () => {
  const supportFeatures = [
    {
      title: "Certified Engineers",
      icon: "👨‍💻",
      description:
        "Highly skilled and experienced professionals providing expert technical assistance for servers, storage, networking and virtualization environments.",
    },
    {
      title: "Proactive Monitoring",
      icon: "📊",
      description:
        "We proactively identify and resolve potential issues before they impact your business operations.",
    },
    {
      title: "Fast Response",
      icon: "⚡",
      description:
        "Quick response times and efficient troubleshooting ensure minimal downtime for your infrastructure.",
    },
    {
      title: "Customized Solutions",
      icon: "🎯",
      description:
        "Support services tailored specifically to your organization’s infrastructure and business requirements.",
    },
  ];

  return (
    <>
      {" "}
      <Navbar />
      ```
      <div className="bg-[#f5f8fc] mt-16">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden py-24 px-6">
          <div className="absolute inset-0 bg-gradient-to-br from-[#001f3f] via-[#003b73] to-[#006db8]" />

          <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-400 opacity-20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 opacity-20 blur-3xl rounded-full" />

          <div className="relative max-w-6xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold">
              Technical Support & Warranty Assistance
            </h1>

            <p className="mt-6 text-lg md:text-xl opacity-90 leading-relaxed max-w-4xl mx-auto">
              At Kelax, we understand that your business relies on seamless
              technology operations. Our expert support team is available to
              keep your infrastructure running smoothly with rapid response,
              proactive monitoring and dependable service.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button className="bg-white text-[#006db8] px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
                Raise Support Ticket
              </button>

              <button className="border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#006db8] transition">
                Contact Support
              </button>
            </div>
          </div>
        </section>

        {/* SUPPORT PLANS */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#003c66]">
              Support Plans Designed For Your Business
            </h2>

            <p className="text-gray-600 mt-4 text-lg">
              Choose the support level that best fits your operational needs.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* 24/7 */}
            <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100 hover:-translate-y-2 transition">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-700 text-4xl font-bold">
                24/7
              </div>

              <h3 className="text-3xl font-bold text-gray-800 mt-8">
                Mission Critical Support
              </h3>

              <p className="text-gray-600 mt-5 leading-relaxed">
                For businesses where downtime is not an option, our
                round-the-clock mission-critical support ensures your systems
                are monitored and maintained 24 hours a day, 7 days a week.
              </p>

              <ul className="mt-8 space-y-3 text-gray-700">
                <li>✓ 24×7 Coverage</li>
                <li>✓ Critical Incident Response</li>
                <li>✓ Remote Troubleshooting</li>
                <li>✓ Priority Escalation</li>
                <li>✓ Maximum Uptime Assurance</li>
              </ul>
            </div>

            {/* 8/5 */}
            <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100 hover:-translate-y-2 transition">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 text-[#006db8] text-4xl font-bold">
                8/5
              </div>

              <h3 className="text-3xl font-bold text-gray-800 mt-8">
                Next Business Day Support
              </h3>

              <p className="text-gray-600 mt-5 leading-relaxed">
                Designed for organizations operating during standard business
                hours. Our expert engineers provide prompt assistance and issue
                resolution by the next business day.
              </p>

              <ul className="mt-8 space-y-3 text-gray-700">
                <li>✓ Business Hour Support</li>
                <li>✓ Expert Assistance</li>
                <li>✓ Next Business Day Resolution</li>
                <li>✓ Cost Effective Support</li>
                <li>✓ Dedicated Support Team</li>
              </ul>
            </div>
          </div>
        </section>

        {/* WHY KELAX */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#003c66]">
              What Sets Kelax Support Apart?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportFeatures.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-2 transition"
              >
                <div className="text-5xl">{item.icon}</div>

                <h3 className="text-xl font-bold text-gray-800 mt-5">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-4 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SUPPORT PROCESS */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <h2 className="text-4xl font-bold text-center text-[#003c66] mb-14">
            How Support Works
          </h2>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              "Contact Support",
              "Issue Diagnosis",
              "Remote Assistance",
              "Resolution & Follow-up",
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-lg p-8">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#006db8] text-white flex items-center justify-center font-bold text-xl">
                  {index + 1}
                </div>

                <h3 className="mt-5 font-semibold text-gray-800">{step}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="bg-gradient-to-r from-[#003c66] to-[#006db8] rounded-3xl p-12 text-white text-center">
            <h2 className="text-4xl font-bold">Need Immediate Assistance?</h2>

            <p className="mt-5 text-lg opacity-90 max-w-3xl mx-auto">
              Our support specialists are available to assist with warranty
              claims, technical troubleshooting, deployment guidance and
              mission-critical incidents.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <p className="text-sm uppercase tracking-wider opacity-80">
                  Technical Support Number
                </p>

                <h3 className="text-3xl font-bold mt-2">+91 9355854953</h3>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <p className="text-sm uppercase tracking-wider opacity-80">
                  Support Email
                </p>

                <h3 className="text-2xl font-bold mt-2 break-all">
                  support@kelax.in
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <h2 className="text-4xl font-bold text-[#003c66]">
              Your Infrastructure. Our Responsibility.
            </h2>

            <p className="mt-5 text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              When you partner with Kelax, you're not just getting technical
              support — you're gaining a trusted ally dedicated to keeping your
              technology running smoothly so you can focus on growing your
              business.
            </p>

            <button className="mt-8 bg-[#006db8] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#005999] transition">
              Talk To Support Team
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default WarrantyCallLog;
