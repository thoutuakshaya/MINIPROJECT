import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorks from './components/HowItWorks';
import Categories from './components/Categories';
import Stats from './components/Stats';
import EventsSection from './components/EventsSection';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import FAQ from './components/FAQ';

function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* pt-16 to offset Navbar height, space-y-16 between sections */}
      <HeroSection />
      <Hero />
      <Categories />
      <AboutSection />
      <Stats />
      <FeaturesSection />
      <HowItWorks />
      <EventsSection />
      <Testimonials />
      <CallToAction />
    </main>
  );
}


const App = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/faq" element={<FAQ />} />
        {/* Add other routes here */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
