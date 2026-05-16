import React, { useState, useEffect } from 'react';
import {
  FaBars, FaTimes, FaSun, FaMoon,
  FaUser, FaChevronDown, FaSignOutAlt
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (token) {
      axios
        .get(`${API_BASE_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data))
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div>
      <header
        className={`${isScrolled
            ? darkMode
              ? 'bg-black/80 backdrop-blur-md shadow-lg'
              : 'bg-green-50/80 backdrop-blur-md shadow-lg'
            : 'bg-transparent'}
          ${darkMode ? 'text-white' : 'text-black'}
          fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
      >
        <div
          className="container mx-auto flex items-center justify-between h-20 px-4"
          onClick={() => setIsDropdownOpen(false)}
        >
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3">
            <img className="h-12 w-auto" src="/Navbar-bg-logo.png" alt="logo" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex">
            <ul className="flex items-center space-x-8">
              {[
                { name: 'Home', path: '/home' },
                { name: 'About', path: '/about' },
                { name: 'Destination', path: '/destination' },
                { name: 'Booking Status', path: '/booking-status' }
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`text-lg font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}
                      hover:text-lime-400 transition-colors duration-300 relative group px-3 py-2 rounded-md hover:bg-lime-400/10`}
                  >
                    <span>{item.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="hidden md:block text-yellow-400 text-2xl focus:outline-none mr-4"
            aria-label="Toggle theme"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Profile Dropdown */}
          {isLoggedIn ? (
            <div className="hidden md:block relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                className={`flex items-center space-x-2 ${
                  darkMode
                    ? 'bg-linear-to-r from-gray-800 to-gray-900 text-white'
                    : 'bg-linear-to-r from-gray-100 to-gray-200 text-gray-800'
                } font-semibold px-4 py-2 rounded-full shadow-md hover:scale-105 transition-all duration-300`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    darkMode
                      ? 'bg-linear-to-r from-lime-400 to-green-500 text-black'
                      : 'bg-linear-to-r from-lime-500 to-green-600 text-white'
                  }`}
                >
                  {user?.name ? user.name.charAt(0).toUpperCase() : <FaUser />}
                </div>
                <FaChevronDown
                  className={`transform transition-transform duration-300 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="absolute right-0 mt-3 w-64 z-50"
                  >
                    {/* Arrow Pointer */}
                    <div
                      className={`absolute right-6 -top-2 w-4 h-4 rotate-45 ${
                        darkMode
                          ? 'bg-gray-900 border-t border-l border-gray-700'
                          : 'bg-white border-t border-l border-gray-200'
                      }`}
                    ></div>

                    {/* Dropdown Box */}
                    <div
                      className={`rounded-2xl shadow-2xl py- border backdrop-blur-xl ${
                        darkMode
                          ? 'bg-gray-900/90 border-gray-700 text-white'
                          : 'bg-white/90 border-gray-200 text-gray-800'
                      }`}
                    >
                      <div
                        className={`px-5 py-3 rounded-t-2xl ${
                          darkMode
                            ? 'bg-gray-800/70 border-b border-gray-700'
                            : 'bg-gray-100/70 border-b border-gray-200'
                        }`}
                      >
                        <p className="text-sm font-semibold">
                          {user?.name || user?.username || 'Guest User'}
                        </p>
                        <p
                          className={`text-xs mt-1 px-2 py-1 inline-block rounded ${
                            darkMode
                              ? 'bg-gray-700 text-gray-300'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {user?.email || 'guest@email.com'}
                        </p>
                      </div>

                      <button
                        onClick={handleLogout}
                        className={`w-full text-left flex items-center gap-2 px-5 py-3 text-sm transition-all duration-300 rounded-b-2xl ${
                          darkMode
                            ? 'text-red-400 hover:bg-gray-800 hover:text-red-500'
                            : 'text-red-500 hover:bg-gray-100'
                        }`}
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="hidden md:block bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Login
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
