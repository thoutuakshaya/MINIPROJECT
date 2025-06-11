// components/AboutSection.jsx
import React from 'react';

const features = [
  { icon: "🔄", title: "Centralized event planning", description: "Seamlessly organize and coordinate all your tech events in one place." },
  { icon: "🤝", title: "Expert knowledge sharing", description: "Connect with industry leaders and access exclusive insights." },
  { icon: "🧑‍💻", title: "Engaged participant experience", description: "Interactive tools to keep attendees involved and inspired." },
  { icon: "🔐", title: "Admin oversight & insights", description: "Gain deep analytics and control with powerful admin features." },
];

const AboutSection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-white to-blue-50 text-gray-800">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-6">Why Choose Our Platform?</h2>
        <p className="text-lg max-w-3xl mx-auto mb-14 text-gray-600">
          We bridge the gap between organizers, industry experts, and tech enthusiasts through powerful collaboration tools, real-time tracking, and smart automation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {features.map(({ icon, title, description }) => (
            <div
              key={title}
              className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-default"
            >
              <div className="text-4xl">{icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
