import React from 'react';
import { CheckCircle } from 'lucide-react';

const features = [
  {
    title: 'For Organizers',
    points: [
      'Create and manage technical events like webinars and workshops',
      'Book industry experts and manage their responses',
      'Share event pages and monitor attendee engagement',
    ],
  },
  {
    title: 'For Experts (Vendors)',
    points: [
      'List your technical expertise and availability',
      'Accept or reject bookings with full control',
      'Track reviews, session history, and earnings',
    ],
  },
  {
    title: 'For Attendees',
    points: [
      'Browse and register for events that interest you',
      'Receive participation certificates automatically',
      'Manage your personal profile and event history',
    ],
  },
  {
    title: 'For Admins',
    points: [
      'Approve expert registrations and oversee events',
      'Handle user queries and monitor system activity',
      'Full control over user, booking, and event data',
    ],
  },
];

const LearnMore = () => {
  return (
    <section className="bg-white text-gray-800 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center">
          Learn More About Our Platform
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
          A powerful and flexible event management platform for organizers, experts, and attendees in the tech community.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((role, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
              <h2 className="text-xl font-semibold text-blue-700 mb-4">{role.title}</h2>
              <ul className="space-y-3">
                {role.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="/login"
            className="inline-block bg-blue-600 text-white text-lg font-medium px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default LearnMore;
