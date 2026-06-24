import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import React from "react";

const TermsAndConditions = () => {
  return (
    <>
    <Navbar />
    <div className="max-w-5xl mx-auto px-6 py-10 text-gray-800 leading-relaxed mt-16">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Terms of Service
      </h1>

      <p>
        These Terms of Service govern your use of the website located at
        <strong> https://kelax.in </strong> and any related services
        provided by <strong>KELAX</strong>.
      </p>

      <p className="mt-4">
        By accessing https://kelax.in, you agree to abide by these Terms of
        Service and to comply with all applicable laws and regulations. If you
        do not agree with these Terms of Service, you are prohibited from using
        or accessing this website or using any other services provided by
        KELAX.
      </p>

      <p className="mt-4">
        We, <strong>KELAX</strong>, reserve the right to review and amend any of
        these Terms of Service at our sole discretion. Upon doing so, we will
        update this page. Any changes to these Terms of Service will take effect
        immediately from the date of publication.
      </p>

      <p className="mt-4">
        These Terms of Service were last updated on{" "}
        <strong>1 April 2026</strong>.
      </p>

      {/* Section Title */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Limitations of Use</h2>

      <p>By using this website, you warrant that you will not:</p>

      <ul className="list-disc ml-6 mt-3 space-y-2">
        <li>
          modify, copy, prepare derivative works of, decompile, or reverse
          engineer any materials and software contained on this website;
        </li>
        <li>
          remove any copyright or other proprietary notations from any materials
          and software on this website;
        </li>
        <li>
          transfer the materials to another person or “mirror” the materials on
          any other server;
        </li>
        <li>
          knowingly or negligently use this website in a way that disrupts our
          services or networks;
        </li>
        <li>
          use this website to transmit or publish unlawful, obscene, fraudulent,
          or indecent material;
        </li>
        <li>
          violate any applicable laws or regulations;
        </li>
        <li>
          use this website to send unauthorized advertising or spam;
        </li>
        <li>
          harvest or collect user data without consent;
        </li>
        <li>
          use this website in a way that infringes on privacy or intellectual
          property rights of others.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Intellectual Property
      </h2>

      <p>
        The intellectual property in the materials contained in this website are
        owned by or licensed to <strong>KELAX</strong> and are protected by
        applicable copyright and trademark law.
      </p>

      <p className="mt-3">
        We grant users permission to download one copy of the materials for
        personal, non-commercial transitory use. This is a license grant, not a
        transfer of title, and it automatically terminates if you violate any
        restrictions or conditions.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Liability</h2>

      <p>
        Our website and the materials on our website are provided on an “as is”
        basis. To the extent permitted by law, KELAX makes no warranties,
        expressed or implied, and hereby disclaims all warranties including
        implied warranties of merchantability, fitness for a particular purpose,
        non-infringement, or other rights violations.
      </p>

      <p className="mt-3">
        In no event shall <strong>KELAX</strong> or its suppliers be liable for
        any consequential loss, including loss of profit, revenue, business,
        data, goodwill, or reputation, even if notified of the possibility of
        such damage.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Accuracy of Materials</h2>

      <p>
        The materials on our website are for general information only. KELAX
        does not warrant the accuracy, results, or reliability of these
        materials or any linked resources.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Links</h2>

      <p>
        KELAX is not responsible for the content of any linked websites. The
        inclusion of a link does not imply endorsement or approval. Use of any
        linked site is at your own risk.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Right to Terminate</h2>

      <p>
        We may suspend or terminate your access to our website immediately upon
        written notice for any breach of these Terms of Service.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Severance</h2>

      <p>
        Any invalid or unenforceable part of these Terms of Service is severed,
        and the remainder continues in full force.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Governing Law</h2>

      <p>
        These Terms of Service are governed by and interpreted in accordance
        with the laws of the <strong>United States</strong>. You irrevocably
        submit to the exclusive jurisdiction of the courts in that location.
      </p>
    </div>
    <Footer />
    </>
  );
};

export default TermsAndConditions;
