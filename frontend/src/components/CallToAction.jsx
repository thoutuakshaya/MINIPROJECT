import React, { useRef, useEffect } from 'react';
import animationData from '../assets/animations/CallToAction.json';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const lottieRef = useRef(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  }, []);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };


  return (
    <section className="bg-white py-24 px-6 text-gray-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
        {/* Animation */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            loop
            autoplay
            className="w-72 h-72 md:w-80 md:h-80"
          />
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 text-left">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-snug text-orange-600">
            Plan. Host. Shine. 🌟
          </h2>
          <p className="text-lg text-gray-700 mb-10">
            Create impactful tech events with zero stress. From registrations to reminders — we’ve got your back.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
                  onClick={handleGetStarted}
                  className="bg-red-500 text-white font-semibold px-6 py-3 rounded-full shadow transition duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-red-600 focus:outline-none"
                >
                  Get Started
            </button>
            <button
                  onClick={() => window.location.href = '/learnmore'}
                  className="border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-100 hover:scale-105 font-semibold px-6 py-3 rounded-full transition-all duration-300 ease-in-out"
                >
                  Learn More
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
