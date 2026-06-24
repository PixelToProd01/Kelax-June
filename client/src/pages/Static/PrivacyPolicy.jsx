import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
    <Navbar />
    <div className="w-full bg-gray-50 py-10 px-4 md:px-10 mt-16">
      <div className="max-w-5xl mx-auto p-6 md:p-10">
        
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-4">
          Your privacy is important to us. It is KELAX' policy to respect your privacy 
          and comply with any applicable law and regulation regarding any personal 
          information we may collect about you, including across our website and 
          other sites we own and operate.
        </p>

        <p className="text-gray-600 mb-4">
          This policy is effective as of <strong>1 April  2026</strong> and was last 
          updated on <strong>1 April  2026</strong>.
        </p>

        {/* SECTION: Information We Collect */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          Information We Collect
        </h2>
        <p className="text-gray-600 mb-4">
          Information we collect includes both information you knowingly provide and 
          any information automatically sent by your devices.
        </p>

        {/* Log Data */}
        <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700">
          Log Data
        </h3>
        <p className="text-gray-600 mb-4">
          When you visit our website, our servers may automatically log standard 
          data including IP address, browser type, pages visited, time spent, and 
          technical details related to any errors encountered.
        </p>

        {/* Personal Information */}
        <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700">
          Personal Information
        </h3>
        <ul className="list-disc ml-6 text-gray-600 mb-4">
          <li>Name</li>
          <li>Email</li>
          <li>Social media profiles</li>
        </ul>

        {/* Legitimate Purpose */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          Legitimate Reasons for Processing
        </h2>
        <p className="text-gray-600 mb-4">
          We only collect and use your personal information when necessary to 
          provide our services.
        </p>

        {/* Collection and Use */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          Collection and Use of Information
        </h2>
        <ul className="list-disc ml-6 text-gray-600 mb-4">
          <li>Sign up to receive updates</li>
          <li>Access content via mobile or browser</li>
          <li>Contact us via email or social media</li>
          <li>Interact with us on social media</li>
          <li>Analytics, marketing, and site improvement</li>
          <li>Internal administrative purposes</li>
        </ul>

        {/* Security */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          Security of Your Personal Information
        </h2>
        <p className="text-gray-600 mb-4">
          We protect your information from unauthorized access, disclosure, and misuse. 
          However, no electronic storage method is 100% secure.
        </p>

        {/* Data Retention */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          How Long We Keep Your Personal Information
        </h2>
        <p className="text-gray-600 mb-4">
          We retain your information only as long as needed or required by law.
        </p>

        {/* Children */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          Children’s Privacy
        </h2>
        <p className="text-gray-600 mb-4">
          We do not collect personal information from children under 13.
        </p>

        {/* Third Parties */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          Disclosure to Third Parties
        </h2>
        <p className="text-gray-600 mb-4">
          We may disclose personal information to service providers, partners, employees, 
          legal authorities, and parties assisting with marketing and analytics.
        </p>

        {/* International Transfers */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          International Transfers of Personal Information
        </h2>
        <p className="text-gray-600 mb-4">
          Your information may be transferred to countries where our partners operate.
        </p>

        {/* Your Rights */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          Your Rights & Control
        </h2>
        <ul className="list-disc ml-6 text-gray-600 mb-4">
          <li>Right to withhold personal information</li>
          <li>Right to request details of stored data</li>
          <li>Right to correct inaccurate information</li>
          <li>Right to withdraw from direct marketing</li>
          <li>Right to complain about data misuse</li>
        </ul>

        {/* Cookies */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          Use of Cookies
        </h2>
        <p className="text-gray-600 mb-4">
          We use cookies to understand how you use our website and improve your experience.
        </p>

        {/* External Links */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          Limits of Our Policy
        </h2>
        <p className="text-gray-600 mb-4">
          External websites linked from our site are not governed by our privacy policy.
        </p>

        {/* Updates */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          Changes to This Policy
        </h2>
        <p className="text-gray-600 mb-4">
          We may update this policy to reflect changes in practices or regulatory needs.
        </p>

        {/* Contact */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          Contact Us
        </h2>
        <p className="text-gray-600 mb-4">
          For any questions or concerns, contact:
          <br />
          <strong>KELAX Support Team</strong>
          <br />
          Email: info@kelax.in
        </p>

      </div>
    </div>
    <Footer />
    </>
  );
};

export default PrivacyPolicy;
