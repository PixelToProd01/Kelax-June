import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "What is Kelax?",
      answer:
        "Kelax provides high-performance servers, workstations, and IT solutions designed to power India's digital infrastructure.",
    },
    {
      question: "Which products does Kelax offer?",
      answer:
        "We offer servers, storage systems, workstations, networking equipment, and custom IT solutions.",
    },
    {
      question: "Does Kelax provide full technical support?",
      answer:
        "Yes, our team of trained engineers provides complete installation, configuration, and post-deployment support.",
    },
    {
      question: "Can I request a custom server build?",
      answer:
        "Absolutely. We design and deliver custom-configured servers based on your performance and workload needs.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-12" data-aos="zoom-out">
      <h2 className="text-4xl md:text-5xl text-center">
        <span className="drop-shadow-md">Frequently</span>{" "}
        <span className="text-[#006db8] drop-shadow-md">Asked Questions</span>
      </h2>

      <div className="max-w-7xl mx-auto px-6 md:px-20 text-center mt-8">
      <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto leading-relaxed text-gray-400">
        Find clear answers to the most common questions about our products,
        services, and support.
      </p>
      </div>

      <div className="space-y-4 mt-12">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-xl p-4 cursor-pointer transition hover:shadow"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
            </div>

            {openIndex === index && (
              <p className="mt-3 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
