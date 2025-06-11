// components/Testimonials.jsx
import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sanjay K.',
    role: 'Event Organizer',
    message:
      'This platform made hosting our hackathons seamless and brought incredible expert collaboration to the table!',
    avatar: 'https://tse4.mm.bing.net/th?id=OIP.XSZAFm-5JI7nriDLwZqRQQHaE7&pid=Api&P=0&h=180',
  },
  {
    id: 2,
    name: 'Priya M.',
    role: 'Tech Speaker',
    message:
      'Getting booked for workshops and webinars was so easy here. The platform’s tools helped me showcase my skills effectively.',
    avatar: 'https://i.pravatar.cc/100?img=32',
  },
  {
    id: 3,
    name: 'Rahul S.',
    role: 'Participant',
    message:
      'Joining live webinars and hackathons has never been smoother. The real-time interaction and networking features are fantastic!',
    avatar: 'https://tse2.mm.bing.net/th?id=OIP.kf9TvsuxepBOhAV4cTHEoAHaHa&pid=Api&P=0&h=180',
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
            <p className="text-gray-700 italic">"{t.message}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
