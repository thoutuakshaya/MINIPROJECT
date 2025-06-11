import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../assets/animations/Home.json';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 12,
    },
  },
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const HeroSection = () => {
  const lottieRef = useRef();

  useEffect(() => {
    lottieRef.current?.play();
  }, []);

  return (
    <section className="min-h-[80vh] bg-white flex flex-col md:flex-row items-center">

      {/* 🔵 Left Animation Panel */}
      <div className="w-full md:w-1/3 flex items-center justify-center p-6">
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={true}
          autoplay={false}
          className="w-full h-auto"
        />
      </div>

      {/* 🔵 Right Content Panel */}
      <motion.div
        className="w-full md:w-2/3 flex items-center justify-center p-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="text-center max-w-2xl">
          <motion.h1
  variants={fadeUp}
  className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6"
>
  Your All-in-One Solution for{' '}
  <span className="block text-[#EB4D4B]">Tech Event Management</span>
</motion.h1>

<motion.p
  variants={fadeUp}
  className="text-sm sm:text-base md:text-lg text-gray-600 mb-10 leading-relaxed"
>
  Plan, host, and engage in immersive webinars, hackathons, and expert-led sessions — all from one seamless platform.
</motion.p>

<motion.div variants={zoomIn} className="flex flex-col sm:flex-row justify-center items-center gap-4">
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link to="/login">
      <button className="bg-[#EB4D4B] text-white text-xs sm:text-sm px-5 py-2.5 rounded-full font-semibold shadow-md hover:bg-[#e43b3b] transition">
        🎉 Host an Event
      </button>
    </Link>
  </motion.div>

  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link to="/login">
      <button className="bg-[#FF6B6B] text-white text-xs sm:text-sm px-5 py-2.5 rounded-full font-semibold shadow-md hover:bg-[#ff4d4d] transition">
        🎙️ Join as an Expert
      </button>
    </Link>
  </motion.div>

  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link to="/login">
      <button className="bg-gray-200 text-gray-900 text-xs sm:text-sm px-5 py-2.5 rounded-full font-medium hover:bg-gray-300 transition">
        🔍 Attend an Event
      </button>
    </Link>
  </motion.div>
</motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
