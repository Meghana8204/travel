import React from 'react';
import { motion } from 'framer-motion';
import EarthAnimation from '../Compoents/Three/EarthAnimation';
import { FaPlane, FaMapMarkerAlt, FaCamera, FaStar, FaMountain, FaUtensils, FaCalendarAlt, FaHiking, FaLeaf, FaGem } from 'react-icons/fa';
import hampi from '../assets/Hampi-temple.jpg';
import mysore from '../assets/Mysore-place.jpg';
import kundamundi from '../assets/Kundamundi.jpg';
import waterfall from '../assets/Waterfall.jpg';
import { Link } from 'react-router-dom';
import { FaArrowDown } from 'react-icons/fa';

const LandingPage = () => {
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
      <div className="min-h-screen bg-linear-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden">
        {/* Hero Section */}
        <motion.section
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {/* Earth Animation Background */}
          <div className="absolute inset-0 z-0">
            <EarthAnimation />
          </div>

          <div className="relative z-10 text-center px-4">
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 bg-linear-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              Explore Karnataka
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Discover the magic of Karnataka - from ancient temples to pristine beaches, your adventure awaits.
            </motion.p>
            <motion.button
              className="bg-linear-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to='/login'>Start Your Journey</Link>
            </motion.button>
          </div>
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaArrowDown className="text-4xl text-yellow-400" />
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="py-20 px-4 bg-linear-to-br from-gray-900 via-slate-800 to-black text-white relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Subtle animated particles */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-3 h-3 bg-purple-400 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-400 rounded-full opacity-40 animate-ping"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-indigo-400 rounded-full opacity-25 animate-pulse"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-16 text-white drop-shadow-lg"
              variants={fadeInUp}
            >
              Why Choose Travels Karnataka?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaPlane className="text-5xl text-blue-300" />,
                  title: 'Seamless Travel',
                  desc: 'Easy bookings and hassle-free journeys with our expert guides',
                  gradient: 'from-blue-600 to-cyan-600',
                  bgColor: 'bg-slate-800/60'
                },
                {
                  icon: <FaCamera className="text-5xl text-purple-300" />,
                  title: 'Unforgettable Memories',
                  desc: 'Capture moments in breathtaking locations across Karnataka',
                  gradient: 'from-purple-600 to-pink-600',
                  bgColor: 'bg-slate-800/60'
                },
                {
                  icon: <FaStar className="text-5xl text-yellow-300" />,
                  title: 'Top-Rated Experiences',
                  desc: 'Trusted by thousands of travelers worldwide',
                  gradient: 'from-yellow-600 to-orange-600',
                  bgColor: 'bg-slate-800/60'
                },
                {
                  icon: <FaMountain className="text-5xl text-green-300" />,
                  title: 'Diverse Landscapes',
                  desc: 'From Western Ghats to coastal beaches, explore varied terrains',
                  gradient: 'from-green-600 to-emerald-600',
                  bgColor: 'bg-slate-800/60'
                },
                {
                  icon: <FaUtensils className="text-5xl text-red-300" />,
                  title: 'Culinary Delights',
                  desc: 'Savor authentic Karnataka cuisine and local specialties',
                  gradient: 'from-red-600 to-pink-600',
                  bgColor: 'bg-slate-800/60'
                },
                {
                  icon: <FaCalendarAlt className="text-5xl text-indigo-300" />,
                  title: 'Festivals & Culture',
                  desc: 'Experience vibrant festivals and rich cultural heritage',
                  gradient: 'from-indigo-600 to-purple-600',
                  bgColor: 'bg-slate-800/60'
                },
                {
                  icon: <FaHiking className="text-5xl text-emerald-300" />,
                  title: 'Adventure Activities',
                  desc: 'Trekking, wildlife safaris, and thrilling outdoor experiences',
                  gradient: 'from-emerald-600 to-cyan-600',
                  bgColor: 'bg-slate-800/60'
                },
                {
                  icon: <FaLeaf className="text-5xl text-lime-300" />,
                  title: 'Eco-Friendly Travel',
                  desc: 'Sustainable tourism with minimal environmental impact',
                  gradient: 'from-lime-600 to-green-600',
                  bgColor: 'bg-slate-800/60'
                },
                {
                  icon: <FaGem className="text-5xl text-amber-300" />,
                  title: 'Heritage Sites',
                  desc: 'UNESCO World Heritage sites and ancient monuments',
                  gradient: 'from-amber-600 to-yellow-600',
                  bgColor: 'bg-slate-800/60'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className={`relative ${feature.bgColor} rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-500 border border-slate-600/50 overflow-hidden group backdrop-blur-lg`}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}></div>

                  {/* Icon with subtle glow */}
                  <div className="relative mb-6">
                    <div className="inline-block p-4 rounded-full bg-slate-700/50 group-hover:bg-slate-600/50 transition-colors duration-300 shadow-lg group-hover:shadow-xl backdrop-blur-sm">
                      {feature.icon}
                    </div>
                    <div className={`absolute inset-0 rounded-full bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-25 blur-xl transition-opacity duration-500`}></div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-gray-100 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                    {feature.desc}
                  </p>

                  {/* Decorative element */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Destinations Preview */}
        <motion.section
          className="py-20 px-4 bg-black text-white relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Star-like particles */}
          <div className="absolute inset-0">
            <div className="absolute top-16 left-16 w-10 h-10 bg-white rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute bottom-16 right-16 w-20 h-20 bg-cyan-400 rounded-full opacity-40 animate-bounce"></div>
            <div className="absolute top-1/3 right-1/3 w-10 h-10 bg-purple-400 rounded-full opacity-50 animate-ping"></div>
            <div className="absolute bottom-1/3 left-1/3 w-10 h-10 bg-blue-400 rounded-full opacity-70 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-pink-400 rounded-full opacity-30 animate-bounce"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-16 text-white drop-shadow-lg"
              variants={fadeInUp}
            >
              Popular Destinations
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Hampi', image: hampi, desc: 'Ancient temples & ruins' },
                { name: 'Mysore', image: mysore, desc: 'Palace & royal heritage' },
                { name: 'Kundamundi', image: kundamundi, desc: 'Hill station retreat' },
                { name: 'Waterfalls', image: waterfall, desc: 'Natural cascades' },
              ].map((dest, index) => (
                <motion.div
                  key={index}
                  className="relative overflow-hidden rounded-2xl group cursor-pointer bg-gray-900/80 backdrop-blur-lg border border-gray-700/50"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">{dest.name}</h3>
                    <p className="text-sm text-gray-300 drop-shadow-sm">{dest.desc}</p>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="py-20 px-4 text-center bg-linear-to-br from-slate-900 via-gray-900 to-black text-white relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          {/* Floating orbs */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-4 h-4 bg-emerald-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-6 h-6 bg-teal-400 rounded-full opacity-15 animate-bounce"></div>
            <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-cyan-400 rounded-full opacity-25 animate-ping"></div>
            <div className="absolute bottom-1/3 right-1/4 w-5 h-5 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg"
              variants={fadeInUp}
            >
              Ready to Explore?
            </motion.h2>
            <motion.p
              className="text-xl mb-8 text-gray-300 drop-shadow-sm"
              variants={fadeInUp}
            >
              Join thousands of travelers who have discovered the wonders of Karnataka.
            </motion.p>
            <motion.button
              className="bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to='/login'> Book Your Trip Now</Link>
            </motion.button>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="py-4 px-4 text-center bg-black text-gray-400 border-t border-gray-800">
          <div className="max-w-6xl mx-auto flex justify-center items-center space-x-6">
            <p className="text-lg">&copy; 2025 Travels Karnataka. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors duration-300">
                <FaMapMarkerAlt className="inline text-xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors duration-300">
                <FaCamera className="inline text-xl" />
              </a>
              <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors duration-300">
                <FaStar className="inline text-xl" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
