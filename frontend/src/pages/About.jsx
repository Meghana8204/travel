import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaGlobe, FaHeart, FaAward, FaMapMarkerAlt, FaCamera, FaStar, FaMountain, FaUtensils, FaCalendarAlt, FaHiking, FaLeaf, FaGem } from 'react-icons/fa';
import { useTheme } from '../Compoents/ThemeContext';
import Navbar from '../Compoents/Navbar';
import Footer from '../Compoents/Footer';
import hampi from '../assets/Hampi-temple.jpg';
import mysore from '../assets/Mysore-place.jpg';
import kundamundi from '../assets/Kundamundi.jpg';
import waterfall from '../assets/Waterfall.jpg';

const Counter = ({ end, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="text-center">
      <h2 className="text-6xl font-bold text-cyan-400">{count}</h2>
      <p className="text-gray-300 text-lg mt-2">{label}</p>
    </div>
  );
};

const About = () => {
  const { darkMode } = useTheme();

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <>
      <Navbar />
      <div className={`min-h-screen overflow-hidden mt-0 pt-15 ${darkMode ? 'bg-linear-to-br from-gray-900 via-slate-800 to-black text-white' : 'bg-green-50 text-gray-900'}`}>
        {/* Hero Section */}
        <motion.section
          className="relative py-20 px-4 text-center overflow-hidden "
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              About Travels Karnataka
            </motion.h1>
            <motion.p
              className={`text-xl md:text-2xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              variants={fadeInUp}
            >
              Your gateway to the enchanting world of Karnataka - where heritage meets adventure, and every journey tells a story.
            </motion.p>
          </div>
        </motion.section>

        {/* About Us Section */}
        <motion.section
          className={`py-20 px-4 ${darkMode ? 'bg-slate-900/50' : 'bg-gray-200/50'}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className={`text-4xl md:text-5xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-900'}`}
              variants={fadeInUp}
            >
              Who We Are
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeInUp}>
                <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Travels Karnataka is a premier travel company dedicated to showcasing the rich cultural heritage, breathtaking landscapes, and vibrant traditions of Karnataka. Founded with a passion for exploration, we curate unforgettable experiences that connect travelers with the soul of this diverse state.
                </p>
                <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  From the ancient temples of Hampi to the serene backwaters of Kerala-inspired regions, our expert guides and personalized itineraries ensure every trip is a seamless blend of adventure, culture, and relaxation.
                </p>
              </motion.div>
              <motion.div
                className="relative"
                variants={scaleIn}
              >
                <div className="bg-linear-to-br from-cyan-600 to-blue-600 rounded-2xl p-8 text-center shadow-2xl">
                  <FaGlobe className="text-6xl text-white mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Global Reach</h3>
                  <p className={` ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Serving travelers from around the world</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Mission & Vision */}
        <motion.section
          className={`py-20 px-4 ${darkMode ? 'bg-black' : 'bg-gray-100'}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className={`text-4xl md:text-5xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-900'}`}
              variants={fadeInUp}
            >
              Our Mission & Vision
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                className={`rounded-2xl p-8 backdrop-blur-lg border ${darkMode ? 'bg-slate-800/60 border-slate-600/50' : 'bg-white border-gray-300'}`}
                variants={fadeInUp}
              >
                <FaHeart className="text-5xl text-pink-400 mb-6" />
                <h3 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Our Mission</h3>
                <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  To provide authentic, sustainable travel experiences that celebrate Karnataka's heritage while promoting responsible tourism and cultural preservation.
                </p>
              </motion.div>
              <motion.div
                className={`rounded-2xl p-8 backdrop-blur-lg border ${darkMode ? 'bg-slate-800/60 border-slate-600/50' : 'bg-white border-gray-300'}`}
                variants={fadeInUp}
              >
                <FaAward className="text-5xl text-yellow-400 mb-6" />
                <h3 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Our Vision</h3>
                <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  To be Karnataka's leading travel brand, inspiring global travelers to explore and appreciate the state's unique blend of history, nature, and culture.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Counter Section */}
        <motion.section
          className={`py-20 px-4 ${darkMode ? 'bg-black' : 'bg-gray-100'}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className={`text-4xl md:text-5xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-900'}`}
              variants={fadeInUp}
            >
              Our Achievements
            </motion.h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-16">
              <motion.div variants={scaleIn}>
                <Counter end={378} label="Tour has done successfully" />
              </motion.div>
              <motion.div variants={scaleIn}>
                <Counter end={30} label="Yearly tour arrange" />
              </motion.div>
              <motion.div variants={scaleIn}>
                <Counter end={800} label="Happy Clients" />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          className={`py-20 px-4 ${darkMode ? 'bg-black' : 'bg-gray-100'}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className={`text-4xl md:text-5xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-900'}`}
              variants={fadeInUp}
            >
              Meet Our Team
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Ronit Raj',
                  role: 'Founder & CEO',
                  desc: 'Passionate explorer with 15+ years in Karnataka tourism.',
                  avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=150&q=80'
                },
                {
                  name: 'Bijay Shah',
                  role: 'Head of Operations',
                  desc: 'Expert in crafting seamless travel experiences.',
                  avatar: 'https://images.unsplash.com/photo-1654110455429-cf322b40a906?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600&fit=crop&w=150&q=80'
                },
                {
                  name: 'Likhith ih',
                  role: 'Lead Guide',
                  desc: 'Cultural historian specializing in Karnataka heritage.',
                  avatar: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=150&q=80'
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  className={`rounded-2xl p-8 text-center backdrop-blur-lg border ${darkMode ? 'bg-slate-800/60 border-slate-600/50' : 'bg-white border-gray-300'}`}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden">
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{member.name}</h3>
                  <p className="text-cyan-400 mb-4">{member.role}</p>
                  <p className={` ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{member.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Popular Places Section */}
        <motion.section
          className={`py-20 px-4 ${darkMode ? 'bg-black' : 'bg-gray-100'}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className={`text-4xl md:text-5xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-900'}`}
              variants={fadeInUp}
            >
              Popular Places in Karnataka
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Hampi', image: hampi, desc: 'Ancient temples & ruins' },
                { name: 'Mysore', image: mysore, desc: 'Palace & royal heritage' },
                { name: 'Kundamundi', image: kundamundi, desc: 'Hill station retreat' },
                { name: 'Waterfalls', image: waterfall, desc: 'Natural cascades' },
              ].map((place, index) => (
                <motion.div
                  key={index}
                  className="relative overflow-hidden rounded-2xl group cursor-pointer bg-gray-900/80 backdrop-blur-lg border border-gray-700/50"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">{place.name}</h3>
                    <p className="text-sm text-gray-300 drop-shadow-sm">{place.desc}</p>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className={`py-20 px-4 text-center ${darkMode ? 'bg-linear-to-br from-slate-900 via-gray-900 to-black' : 'bg-linear-to-br from-gray-200 via-slate-300 to-white'}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              Ready to Discover Karnataka?
            </motion.h2>
            <motion.p
              className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              variants={fadeInUp}
            >
              Join us on a journey of a lifetime. Explore, experience, and create memories that last forever.
            </motion.p>
            <motion.button
              className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Adventure
            </motion.button>
          </div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
};

export default About;
