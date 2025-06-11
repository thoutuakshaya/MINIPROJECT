import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-0">
        
        {/* Left Section */}
        <div className="md:w-1/3">
          <h3 className="text-3xl font-extrabold text-white mb-3">
            Tech Event Management
          </h3>
          <p className="text-gray-400 leading-relaxed max-w-sm">
            Empowering tech enthusiasts, organizers, and experts to connect and create unforgettable events.
          </p>
        </div>

        {/* Middle Section - Navigation */}
        <nav className="md:w-1/3 flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-400">
          <a href="/" className="hover:text-white transition-colors duration-300">Home</a>
          <a href="/faq" className="hover:text-white transition-colors duration-300">FAQs</a>
          {/* <a href="/events" className="hover:text-white transition-colors duration-300">Events</a> */}
          <a href="/contact" className="hover:text-white transition-colors duration-300">Contact</a>
          <a href="/terms" className="hover:text-white transition-colors duration-300">Terms</a>
          <a href="/privacy" className="hover:text-white transition-colors duration-300">Privacy</a>
        </nav>

        {/* Right Section - Socials */}
        <div className="md:w-1/3 flex flex-col items-center md:items-end space-y-4">
          <div className="flex space-x-6 text-gray-400 text-2xl">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-indigo-500 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gray-100 transition-colors duration-300"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a 
              href="mailto:contact@techeventpro.com" 
              className="hover:text-red-400 transition-colors duration-300"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
          </div>
          <p className="text-xs text-gray-500 select-text">
            Made with <span role="img" aria-label="laptop">💻</span> by Batch 12 @ 3rd year CSE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
