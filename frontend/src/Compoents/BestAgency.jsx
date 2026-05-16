import React from "react";
import { FaRegStar } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { useTheme } from "./ThemeContext";
import { motion } from "framer-motion";

export default function BestAgency() {
  const { darkMode } = useTheme();

  // Variants for image container with stagger
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Star variants for sequential animation
  const starVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300 } }
  };

  return (
    <section
      className={`${
        darkMode ? "bg-gray-900" : "bg-green-50"
      } py-16 px-6 md:px-20 lg:px-32 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden`}
    >
      {/* Left Content */}
      <motion.div
        className="md:w-1/2 space-y-6"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2
          className={`text-4xl md:text-5xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Why We’re Best Agency
        </h2>

        <h3
          className={`text-2xl font-semibold ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Welcome to{" "}
          <motion.span
            className="text-blue-600 inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Travels Karnataka Agency
          </motion.span>{" "}
          – Your Gateway to Unforgettable Journeys!
        </h3>

        <p
          className={`leading-relaxed ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Travels Karnataka Agency is a trusted name in the travel industry,
          offering seamless travel planning, personalized itineraries, and
          unforgettable adventures. With years of experience and a network of
          global partners, we ensure a hassle-free and memorable journey for
          every traveler.
        </p>

        <motion.a
          href="#"
          className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.3 }}
        >
          About More Travel Karnataka <FiExternalLink size={16} />
        </motion.a>

        {/* Rating Box */}
        <motion.div
          className={`flex items-center gap-8 mt-6 rounded-2xl p-4 shadow-sm w-fit ${
            darkMode ? "bg-gray-800 text-white" : "bg-gray-400/40"
          }`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}
        >
          {/* Tripadvisor */}
          <div className="flex items-center gap-3 border-r pr-6">
            <div className="text-2xl font-semibold">4.6</div>
            <div>
              <div className="flex items-center gap-1 text-black-600 font-semibold">
                <span>Tripadvisor</span>
              </div>
              <motion.div
                className="flex text-green-500"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1 }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    variants={starVariants}
                    whileHover={{ scale: 1.2, rotate: 15 }}
                  >
                    <FaRegStar size={12} fill="green" stroke="green" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Trustpilot */}
          <div className="flex items-center gap-3">
            <div className="text-2xl font-semibold">4.5</div>
            <div>
              <div className="flex items-center gap-1 text-black-600 font-semibold">
                <span>Trustpilot</span>
              </div>
              <motion.div
                className="flex text-green-500"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    variants={starVariants}
                    whileHover={{ scale: 1.2, rotate: -15 }}
                  >
                    <FaRegStar size={12} fill="green" stroke="green" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Images with Stagger */}
      <motion.div
        className="md:w-1/2 grid grid-cols-2 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.img
          src="/Images/Bird.avif"
          alt="Sky adventure"
          className="rounded-2xl shadow-lg w-full h-[200px] object-cover"
          variants={imageVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        <motion.img
          src="/Images/Temple.avif"
          alt="Temple"
          className="rounded-2xl shadow-lg w-full h-[200px] object-cover"
          variants={imageVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        <motion.img
          src="/Images/Boating.avif"
          alt="Boating"
          className="rounded-2xl shadow-lg w-full h-[200px] object-cover col-span-2"
          variants={imageVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </section>
  );
}
