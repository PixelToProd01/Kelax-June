import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import virtualizationImg from "../../../assets/solutions/application/vdi2.jpg";

const Virtualization = () => {
  return (
    <>
      <Navbar />
      <div className="mt-20">
        <div className="relative overflow-hidden py-24 px-6 md:px-12">
          <div className="absolute inset-0 bg-gradient-to-br from-[#001f3f] via-[#003b73] to-[#006db8]"></div>

          <div className="absolute -top-10 left-0 w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-20"></div>

          <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-400 rounded-full blur-3xl opacity-20"></div>

          <div className="relative max-w-5xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Your Kelax Server.
              <br />
              Your Virtual Data Center.
            </h1>

            <p className="mt-6 text-lg md:text-xl opacity-90 leading-relaxed">
              Turn a single Kelax server into a powerful virtualization host —
              running multiple workloads, reducing hardware sprawl, and
              delivering enterprise-grade agility at a fraction of the cost.
            </p>

            <div className="w-40 h-1 bg-white mx-auto mt-8 rounded-full"></div>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src={virtualizationImg}
                alt=""
                className="rounded-3xl shadow-xl"
              />
            </div>

            <div>
              <h2 className="text-4xl font-bold text-[#003c66]">
                How It Works
              </h2>

              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Kelax servers are built with high core-count processors, large
                memory capacity and enterprise storage options, making them
                ideal virtualization hosts.
              </p>

              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Deploy your preferred hypervisor and consolidate your entire
                infrastructure onto one reliable platform.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-20">
          <h2 className="text-center text-4xl font-bold text-[#003c66] mb-12">
            Compatible Hypervisors
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "VMware ESXi",
              "Microsoft Hyper-V",
              "Proxmox VE",
              "KVM / oVirt",
            ].map((item) => (
              <div
                key={item}
                className="bg-white rounded-3xl shadow-lg p-8 text-center font-semibold text-gray-700 hover:-translate-y-2 transition"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-24">
          <h2 className="text-4xl font-bold text-[#003c66] mb-10">
            What You Can Run on a Kelax Virtualization Server
          </h2>

          <div className="overflow-x-auto bg-white rounded-3xl shadow-lg">
            <table className="w-full min-w-[800px]">
              <thead className="bg-[#006db8] text-white">
                <tr>
                  <th className="p-4 text-left">Virtual Workload</th>
                  <th className="p-4 text-left">Example</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="p-4">Application Servers</td>
                  <td className="p-4">ERP, CRM, Business Apps</td>
                </tr>

                <tr>
                  <td className="p-4">Web & Database Servers</td>
                  <td className="p-4">Apache, Nginx, MySQL</td>
                </tr>

                <tr>
                  <td className="p-4">Virtual Desktops</td>
                  <td className="p-4">Remote Employee Desktops</td>
                </tr>

                <tr>
                  <td className="p-4">Dev & Test Environments</td>
                  <td className="p-4">Sandbox Infrastructure</td>
                </tr>

                <tr>
                  <td className="p-4">Domain Controllers</td>
                  <td className="p-4">Active Directory & File Servers</td>
                </tr>

                <tr>
                  <td className="p-4">Backup & DR Nodes</td>
                  <td className="p-4">Secondary Failover VMs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Government */}

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-3xl font-bold text-[#006db8] mb-4">
                Government & PSU
              </h3>

              <h4 className="font-semibold text-xl mb-4">
                On-Premises. Sovereign. Compliant.
              </h4>

              <ul className="space-y-3 text-gray-600">
                <li>✓ Data never leaves your premises</li>
                <li>✓ Air-gapped deployments</li>
                <li>✓ GeM registered</li>
                <li>✓ NIC & STQC aligned</li>
                <li>✓ Make in India hardware</li>
              </ul>

              <p className="mt-5 font-medium text-[#006db8]">
                Typical Setup: 10–20 VMs
              </p>
            </div>

            {/* Enterprise */}

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-3xl font-bold text-[#006db8] mb-4">
                Enterprise
              </h3>

              <h4 className="font-semibold text-xl mb-4">
                Consolidate. Scale. Perform.
              </h4>

              <ul className="space-y-3 text-gray-600">
                <li>✓ High VM Density</li>
                <li>✓ Live Migration</li>
                <li>✓ HA Clustering</li>
                <li>✓ Lower Power Usage</li>
                <li>✓ Single Vendor Support</li>
              </ul>

              <p className="mt-5 font-medium text-[#006db8]">
                Typical Setup: 20–50 Servers Consolidated
              </p>
            </div>

            {/* SMB */}

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-3xl font-bold text-[#006db8] mb-4">SMB</h3>

              <h4 className="font-semibold text-xl mb-4">
                One Server. Your Entire IT.
              </h4>

              <ul className="space-y-3 text-gray-600">
                <li>✓ Start Small</li>
                <li>✓ Easy Management</li>
                <li>✓ Lower Electricity Cost</li>
                <li>✓ Built-in Redundancy</li>
                <li>✓ Local Kelax Support</li>
              </ul>

              <p className="mt-5 font-medium text-[#006db8]">
                Typical Setup: 4–8 VMs
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-24">
          <h2 className="text-4xl font-bold text-[#003c66] mb-10">
            Kelax Servers Built For Virtualization
          </h2>

          <div className="overflow-x-auto bg-white rounded-3xl shadow-lg">
            <table className="w-full min-w-[900px]">
              <thead className="bg-[#006db8] text-white">
                <tr>
                  <th className="p-4 text-left">Specification Advantage</th>

                  <th className="p-4 text-left">Virtualization Benefit</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="p-4">Multi-Core Processors</td>
                  <td className="p-4">Run More VMs Simultaneously</td>
                </tr>

                <tr>
                  <td className="p-4">Large RAM Capacity</td>
                  <td className="p-4">Higher VM Density</td>
                </tr>

                <tr>
                  <td className="p-4">NVMe / SAS / SATA</td>
                  <td className="p-4">Fast VM Storage I/O</td>
                </tr>

                <tr>
                  <td className="p-4">ECC Memory</td>
                  <td className="p-4">Maximum Stability</td>
                </tr>

                <tr>
                  <td className="p-4">Redundant PSU</td>
                  <td className="p-4">Maximum Uptime</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Virtualization;
