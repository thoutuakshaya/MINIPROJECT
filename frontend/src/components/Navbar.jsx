import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle 'dark' class on <html> for Tailwind dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white text-black dark:bg-gray-900 dark:text-white shadow-md sticky top-0 z-50">
     <div className="flex items-center gap-2 text-2xl font-extrabold tracking-wide text-gray-800 dark:text-white cursor-pointer">
        <img src="/favicon.png" alt="Logo" className="w-8 h-8" />
        Tech Event Management
      </div>

      <ul className="flex items-center gap-8 text-sm font-medium">
        <li>
          <Link to="/" className="hover:text-blue-500 dark:hover:text-yellow-300 transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-blue-500 dark:hover:text-yellow-300 transition">
            About
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-blue-500 dark:hover:text-yellow-300 transition">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="hover:text-blue-500 dark:hover:text-yellow-300 transition">
            Register
          </Link>
        </li>
        {/* <li> */}
          {/* <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Dark Mode"
            className="text-xl px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? '🌞' : '🌙'}
          </button> */}
        {/* </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
