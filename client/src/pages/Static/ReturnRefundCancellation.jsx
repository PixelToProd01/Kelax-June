import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import React from "react";

const ReturnRefundCancellation = () => {
  return (
    <>
      <Navbar />

      <div className="w-full bg-gray-50 py-10 px-4 md:px-10 mt-20">
        <div className="max-w-5xl mx-auto p-6 md:p-10">

          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Return, Refund & Cancellation Policy
          </h1>

          <p className="text-gray-600 mb-4">
            <strong>Kelax Solutions Pvt. Ltd.</strong> (“Kelax”, “we”, “our”, “us”) designs,
            manufactures, and supplies enterprise-grade servers, workstations, and related
            hardware solutions. Due to the custom-built and made-to-order nature of our
            products, returns, refunds, and cancellations are governed by the policy
            outlined below.
          </p>

          {/* Order Cancellation */}
          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
            1. Order Cancellation
          </h2>

          <p className="text-gray-600 mb-4">
            Once a Purchase Order (PO) is accepted by Kelax, the order cannot be
            cancelled under any circumstances.
          </p>

          <p className="text-gray-600 mb-3">This applies to:</p>

          <ul className="list-disc ml-6 text-gray-600 mb-4">
            <li>Standard configurations</li>
            <li>Customized systems</li>
            <li>Bulk or project orders</li>
          </ul>

          <p className="text-gray-600 mb-4">
            Customers are advised to verify specifications, compatibility, and
            requirements before placing and confirming the purchase order.
          </p>

          {/* Returns */}
          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
            2. Returns
          </h2>

          <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700">
            No Returns for Non-Defective Products
          </h3>

          <p className="text-gray-600 mb-4">
            Kelax products are assembled and tested according to confirmed
            specifications. Returns are not accepted for the following:
          </p>

          <ul className="list-disc ml-6 text-gray-600 mb-4">
            <li>Change of mind</li>
            <li>Incorrect configuration ordered by the customer</li>
            <li>Compatibility or performance expectations not validated before ordering</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700">
            Eligible Returns – DOA / Manufacturing Defect
          </h3>

          <p className="text-gray-600 mb-3">
            A return or replacement may be considered only in the following cases:
          </p>

          <ul className="list-disc ml-6 text-gray-600 mb-4">
            <li>Dead on Arrival (DOA) – product does not power on or function at first use</li>
            <li>Manufacturing defect confirmed by Kelax technical support</li>
          </ul>

          <p className="text-gray-600 mb-3 font-semibold">Conditions:</p>

          <ul className="list-disc ml-6 text-gray-600 mb-4">
            <li>Issue must be reported within <strong>7 calendar days</strong> from delivery</li>
            <li>Product must be unused, unaltered, and in original condition</li>
            <li>Original packaging, serial numbers, and labels must be intact</li>
          </ul>

          <p className="text-gray-600 mb-4">
            Kelax reserves the right to inspect and validate the issue before
            approving any return.
          </p>

          {/* DOA Replacement */}
          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
            3. DOA Replacement Process
          </h2>

          <ul className="list-disc ml-6 text-gray-600 mb-4">
            <li>
              Replacement will be initiated only after the defective material is
              received at Kelax premises.
            </li>
            <li>
              Returned material will undergo technical inspection and validation.
            </li>
            <li>
              Upon confirmation of DOA or manufacturing defect, Kelax will provide:
            </li>
          </ul>

          <ul className="list-disc ml-10 text-gray-600 mb-4">
            <li>Replacement of the defective component, or</li>
            <li>Replacement of the complete system, at Kelax’s discretion</li>
          </ul>

          <p className="text-gray-600 mb-4">
            Replacement timelines depend on validation results, component
            availability, and logistics.
          </p>

          {/* Refunds */}
          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
            4. Refunds
          </h2>

          <p className="text-gray-600 mb-4">
            Refunds are not standard practice for Kelax products.
          </p>

          <p className="text-gray-600 mb-3">
            A refund may be considered only if:
          </p>

          <ul className="list-disc ml-6 text-gray-600 mb-4">
            <li>Replacement or repair is not technically feasible</li>
            <li>The issue cannot be resolved within a reasonable timeframe</li>
            <li>Explicit approval is provided in writing by Kelax management</li>
          </ul>

          <p className="text-gray-600 mb-4">
            If approved:
          </p>

          <ul className="list-disc ml-6 text-gray-600 mb-4">
            <li>Refunds will be processed through the original payment method</li>
            <li>Customization, logistics, and handling charges are non-refundable</li>
          </ul>

          {/* Warranty vs Returns */}
          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
            5. Warranty vs Returns
          </h2>

          <ul className="list-disc ml-6 text-gray-600 mb-4">
            <li>Returns and refunds are separate from warranty services.</li>
            <li>Issues identified after acceptance are handled under the Kelax Warranty Policy.</li>
            <li>Warranty covers repair or part replacement, not return or refund.</li>
          </ul>

          {/* Exclusions */}
          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
            6. Exclusions
          </h2>

          <p className="text-gray-600 mb-3">
            Kelax shall not be responsible for return, replacement, or refund in
            cases involving:
          </p>

          <ul className="list-disc ml-6 text-gray-600 mb-4">
            <li>Physical damage after delivery</li>
            <li>Improper power conditions or site environment issues</li>
            <li>Unauthorized hardware, firmware, or BIOS modifications</li>
            <li>Third-party software or operating system issues</li>
            <li>Misuse or operation outside recommended specifications</li>
          </ul>

          {/* Policy Updates */}
          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
            7. Policy Updates
          </h2>

          <p className="text-gray-600 mb-4">
            Kelax reserves the right to amend or update this policy at any time
            without prior notice. The version published on the official Kelax
            website shall be considered final and binding.
          </p>

          {/* Contact */}
          <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
            8. Contact Information
          </h2>

          <p className="text-gray-600 mb-4">
            For DOA, replacement, or policy-related queries, please contact:
          </p>

          <p className="text-gray-700 font-semibold">
            Kelax Solutions Pvt. Ltd.
          </p>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default ReturnRefundCancellation;