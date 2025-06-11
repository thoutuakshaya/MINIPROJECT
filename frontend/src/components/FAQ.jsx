import React, { useState } from 'react';

const faqs = [
  {
    question: 'Who can host events on this platform?',
    answer: 'Organizers registered on our platform can create and manage tech events such as webinars, workshops, and hackathons.',
  },
  {
    question: 'How do experts participate?',
    answer: 'Experts can register, list their services, and accept bookings to provide sessions during events.',
  },
  {
    question: 'Can I attend events without registering?',
    answer: 'You need to create an account to register and attend events to ensure a seamless experience and access to certificates.',
  },
  {
    question: 'How do I get certificates for attended events?',
    answer: 'Certificates are available for download from your profile once you complete attendance requirements.',
  },
  {
    question: 'Is my personal information safe?',
    answer: 'Yes, we use industry-standard security practices to protect your data as explained in our Privacy Policy.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map(({ question, answer }, index) => (
          <div key={index} className="border border-gray-300 rounded-md">
            <button
              className="w-full flex justify-between items-center p-4 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => toggle(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-semibold text-gray-900">{question}</span>
              <svg
                className={`w-5 h-5 text-indigo-600 transition-transform ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div id={`faq-answer-${index}`} className="p-4 pt-0 text-gray-700 border-t border-gray-300">
                {answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
