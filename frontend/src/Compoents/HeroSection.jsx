import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useTheme } from './ThemeContext';
import { Link } from "react-router-dom";

import hampi from "../assets/Hampi-temple.jpg";
import kundamundi from "../assets/Kundamundi.jpg";
import mysore from "../assets/Mysore-place.jpg";
import chariot from "../assets/Stone-Chariot-Hampi-heritage-land.jpg";
import waterfall from "../assets/Waterfall.jpg";

const images = [hampi, kundamundi, mysore, chariot, waterfall];
const MotionLink = motion.create(Link);

function HeroSection() {
  const { darkMode } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${darkMode ? 'bg-black text-white' : 'bg-green-50 text-black'}`}>
      {/* Backgrounds with smooth fade */}
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className={`absolute inset-0 ${darkMode ? 'bg-linear-to-b from-black/70 via-black/40 to-black/90' : 'bg-linear-to-b  via-white/40 '} backdrop-blur-[1px]`}></div>

      {/* Floating glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-pink-500/10 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full animate-pulse"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6">
        <motion.h1
          className="text-5xl md:text-8xl font-extrabold tracking-wide leading-tight drop-shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
        >
          Discover{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-pink-500">
            Karnataka
          </span>
        </motion.h1>

        <motion.p
          className={`text-xl md:text-3xl mt-6 font-light tracking-wide ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          One State, Many Worlds — Where Tradition Meets Adventure
        </motion.p>

        <motion.div
          className="mx-auto mt-8 w-32 h-1 bg-linear-to-r from-pink-500 to-blue-600 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 1 }}
        />

        {/* Buttons */}
        <motion.div
          className="flex justify-center gap-5 mt-10 flex-wrap"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <MotionLink
            to="/destination"
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(0,0,255,0.5)" }}
            className="px-8 py-3 rounded-full bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold flex items-center gap-2 shadow-md hover:shadow-cyan-400/50 transition-all"
          >
            Explore Now <FaArrowRight />
          </MotionLink>

          <MotionLink
            to="/destination"
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(255,255,255,0.3)" }}
            className="px-8 py-3 rounded-full border border-gray-300/40 backdrop-blur-md bg-white/10 text-white font-semibold hover:bg-white/20 transition-all"
          >
            Plan Your Trip
          </MotionLink>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 text-sm tracking-wider flex flex-col items-center gap-2 ${darkMode ? 'text-white' : 'text-black'}`}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="opacity-80">Scroll Down</span>
        <div className={`w-0.5 h-8 bg-linear-to-b rounded-full ${darkMode ? 'from-white/60 to-transparent' : 'from-black/60 to-transparent'}`}></div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
