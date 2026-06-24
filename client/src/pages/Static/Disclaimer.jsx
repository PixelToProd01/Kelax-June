import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import React from "react";

const Disclaimer = () => {
  return (
    <>
    <Navbar />
    <div className="w-full bg-gray-50 py-10 px-4 md:px-10 mt-16">
      <div className="max-w-5xl mx-auto p-6 md:p-10">

        <h1 className="text-3xl font-bold mb-6 text-gray-800">Disclaimer</h1>

        <p className="text-gray-600 mb-4">
          The following disclaimer applies to the website and brand named 
          <strong> Kelax</strong>, which is owned and manufactured by 
          <strong> Furious Computer Solutions Pvt Ltd</strong>.
        </p>

        {/* Ownership */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          Ownership
        </h2>
        <p className="text-gray-600 mb-4">
          Kelax is a registered trademark owned by Furious Computer Solutions Pvt Ltd. 
          The brand name, logo, and all associated intellectual property rights belong 
          to Furious Computer Solutions Pvt Ltd.
        </p>

        {/* Accuracy */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          Accuracy of Information
        </h2>
        <p className="text-gray-600 mb-4">
          We strive to ensure the accuracy and timeliness of the information provided 
          on the Kelax website. However, we do not guarantee the completeness, accuracy,
          or reliability of the information, including product specifications, pricing,
          and availability. All content is subject to change without prior notice.
        </p>

        {/* Product Representation */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          Product Representation
        </h2>
        <p className="text-gray-600 mb-4">
          The images, descriptions, and specifications of Kelax products displayed on 
          the website are for informational purposes only. Actual products may vary in 
          appearance, features, or packaging.
        </p>

        {/* Third-Party Links */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          Third-Party Links
        </h2>
        <p className="text-gray-600 mb-4">
          The Kelax website may contain links to third-party websites for additional 
          information or user convenience. We do not endorse, control, or take 
          responsibility for the content, privacy policies, or practices of these 
          third-party websites.
        </p>

        {/* Liability */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          Limitation of Liability
        </h2>
        <p className="text-gray-600 mb-4">
          Furious Computer Solutions Pvt Ltd and its affiliates shall not be liable 
          for any direct, indirect, incidental, consequential, or punitive damages 
          arising from the use or inability to use the Kelax website or any information 
          contained within it. We are not responsible for any loss or damage to data, 
          hardware, software, or other materials resulting from the use of the website.
        </p>

        {/* Endorsement */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          Endorsement
        </h2>
        <p className="text-gray-600 mb-4">
          Reference to any third-party products, services, or organizations on the 
          Kelax website does not constitute an endorsement or recommendation by 
          Furious Computer Solutions Pvt Ltd.
        </p>

        {/* IP Rights */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          Intellectual Property Rights
        </h2>
        <p className="text-gray-600 mb-4">
          All intellectual property rights, including copyrights and trademarks, 
          related to the Kelax brand and website content, belong to 
          Furious Computer Solutions Pvt Ltd. Unauthorized use, reproduction, 
          or distribution of any materials from the website is strictly prohibited.
        </p>

        {/* Policy Change */}
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
          Updates to This Disclaimer
        </h2>
        <p className="text-gray-600 mb-4">
          Furious Computer Solutions Pvt Ltd reserves the right to modify or update 
          this disclaimer at any time without prior notice. Users are encouraged to 
          review this page periodically to stay informed about any changes.
        </p>

        {/* Final Note */}
        <p className="text-gray-600 mt-6">
          By accessing and using the Kelax website, you acknowledge and agree to 
          comply with the terms stated in this disclaimer. If you have any questions 
          or concerns regarding this disclaimer, please contact us.
        </p>

      </div>
    </div>
    <Footer />
    </>
  );
};

export default Disclaimer;
 