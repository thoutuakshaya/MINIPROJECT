import React from 'react';
import { FaUserPlus, FaCalendarAlt, FaHandshake, FaCertificate } from 'react-icons/fa';

const steps = [
  {
    title: "Sign Up & Choose Role",
    icon: <FaUserPlus className="text-indigo-600 text-4xl mb-4" />,
  },
  {
    title: "Create or Explore Events",
    icon: <FaCalendarAlt className="text-indigo-600 text-4xl mb-4" />,
  },
  {
    title: "Book / Accept Experts or Join",
    icon: <FaHandshake className="text-indigo-600 text-4xl mb-4" />,
  },
  {
    title: "Host or Learn & Download Certificates",
    icon: <FaCertificate className="text-indigo-600 text-4xl mb-4" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-12">
        How It Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center flex flex-col items-center"
          >
            {step.icon}
            <p className="text-gray-800 font-medium">{step.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
