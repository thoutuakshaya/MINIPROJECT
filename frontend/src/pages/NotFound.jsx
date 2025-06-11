// src/pages/NotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../assets/animations/NotFound.json';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white relative px-4">
      {/* Top-left positioned Go Back button */}
      <button
        onClick={handleGoBack}
        className="absolute top-6 right-6 px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md shadow-md hover:bg-indigo-700 hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
      >
        ← Go Back
      </button>

      <section className="text-center">
        <div className="overflow-hidden flex items-center justify-center">
          <Lottie
            animationData={animationData}
            loop
            aria-label="Page not found animation"
            className="w-[700px] h-[700px] object-contain"
          />
        </div>
      </section>
    </main>
  );
};

export default NotFound;
