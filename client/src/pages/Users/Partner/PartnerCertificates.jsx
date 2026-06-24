import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../App";

const PartnerCertificates = () => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/auth/certificate/download`,
          {
            responseType: "blob",
            withCredentials: true,
          }
        );

        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );

        setPdfUrl(url);

      } catch (error) {
        console.log(error);
      }
    };

    fetchCertificate();
  }, []);

  const handleDownload = async () => {
    if (!pdfUrl) return;

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.setAttribute("download", "certificate.pdf");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 p-10">

      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">

        <h2 className="text-2xl text-white font-semibold mb-6">
          My Certificate
        </h2>

        <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-6">
          {pdfUrl && (
            <iframe
              src={pdfUrl}
              title="Certificate Preview"
              className="w-full h-[500px]"
            />
          )}
        </div>

        <button
          onClick={handleDownload}
          className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer px-6 py-3 rounded-lg"
        >
          Download Certificate
        </button>

      </div>

    </div>
  );
};

export default PartnerCertificates;
