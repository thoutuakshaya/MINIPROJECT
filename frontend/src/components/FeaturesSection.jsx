import React from 'react';
import { Link } from 'react-router-dom';

const roles = [
  {
    title: "Organizer",
    icon: "🗂️",
    points: [
      "Create and manage tech events",
      "Track bookings, share links",
      "Monitor engagement metrics",
    ],
    color: "indigo",
  },
  {
    title: "Expert",
    icon: "🎤",
    points: [
      "List your expertise, get hired",
      "Set prices and manage availability",
      "Build your reputation",
    ],
    color: "indigo",
  },
  {
    title: "Attendee",
    icon: "🎟️",
    points: [
      "Register & participate in events",
      "Earn certificates",
      "Rate experts and events",
    ],
    color: "indigo",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-white text-gray-900">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold">What You Can Do</h2>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Explore powerful features tailored for your role in our platform.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {roles.map(({ title, icon, points, color }) => (
          <div
            key={title}
            className="group bg-gray-50 rounded-xl p-6 sm:p-7 shadow-md hover:shadow-xl transition duration-300 flex flex-col h-full"
          >
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${color}-100 text-${color}-600 mb-4 text-2xl`}
            >
              {icon}
            </div>
            <h3 className={`text-xl font-semibold mb-4 text-${color}-800 group-hover:text-${color}-600 transition-colors duration-300`}>
              {title}
            </h3>
            <ul className="space-y-2 text-left text-gray-700 list-disc list-inside text-sm leading-relaxed flex-1">
              {points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <Link to="/login" className={`mt-6 inline-block bg-${color}-600 text-white text-sm px-5 py-2 rounded-full shadow hover:bg-${color}-700 transition duration-300`}>
              Explore Features
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
