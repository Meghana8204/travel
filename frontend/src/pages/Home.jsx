import Navbar from '../Compoents/Navbar.jsx';
import Footer from '../Compoents/Footer.jsx';
import BestAgency from '../Compoents/BestAgency.jsx';
import Card from '../Compoents/Card.jsx';
import HeroSection from '../Compoents/HeroSection.jsx';
import { useTheme } from '../Compoents/ThemeContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, toApiAssetUrl } from '../config/api';

const Home = () => {
  const { darkMode } = useTheme();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasDestinations, setHasDestinations] = useState(false);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/destinations`);
        const fetchedDestinations = response.data.destinations || [];
        const popularDestinations = fetchedDestinations.filter(dest => dest.popular);

        setHasDestinations(fetchedDestinations.length > 0);
        setDestinations(
          popularDestinations.length > 0
            ? popularDestinations
            : fetchedDestinations.slice(0, 3),
        );
      } catch (error) {
        console.error('Error fetching destinations:', error);
        // Fallback to hardcoded data if API fails
        setDestinations([
          {
            _id: 'fallback-1',
            img: '/assets/Hampi-temple.jpg',
            location: 'Hampi, Karnataka',
            title: 'Ancient Hampi Ruins',
            desc: 'Explore the UNESCO World Heritage site with ancient temples and ruins.',
            rating: '4.8',
            reviews: '(125 reviews)',
            duration: '2 Days',
            price: '₹8,500'
          },
          {
            _id: 'fallback-2',
            img: '/assets/Mysore-place.jpg',
            location: 'Mysore, Karnataka',
            title: 'Royal Mysore Tour',
            desc: 'Visit the magnificent Mysore Palace and experience royal heritage.',
            rating: '4.7',
            reviews: '(98 reviews)',
            duration: '3 Days',
            price: '₹12,000'
          },
          {
            _id: 'fallback-3',
            img: '/assets/Kundamundi.jpg',
            location: 'Kundamundi, Karnataka',
            title: 'Hill Station Retreat',
            desc: 'Relax in the serene hills with breathtaking views and fresh air.',
            rating: '4.6',
            reviews: '(75 reviews)',
            duration: '2 Days',
            price: '₹6,500'
          }
        ]);
        setHasDestinations(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const sampleCards = destinations.map(dest => ({
    img: toApiAssetUrl(dest.image),
    location: `${dest.name}, Karnataka - ${dest.landscape}`,
    title: dest.name,
    desc: dest.description ? dest.description.replace(/<[^>]*>/g, '') : '', // Strip HTML tags and handle undefined
    rating: dest.rating ? dest.rating.toString() : '0',
    reviews: '(0 reviews)', // Assuming no reviews field in model
    duration: dest.duration,
    price: `₹${dest.price}`
  }));

  return (
    <>
      <Navbar />
      <HeroSection />
      <BestAgency />
      
      {/* Top Picks Section */}
      <div className={`py-16 px-6 md:px-12 transition-colors duration-500 ${darkMode ? 'bg-gray-900' : 'bg-green-50'}`}>
        <h2 className={`text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-tight ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Top Pick Packages
        </h2>
        
        {loading ? (
          <p className="text-center text-lg">Loading destinations...</p>
        ) : hasDestinations ? (
          <Card cardsData={sampleCards} cardClassName={`transition-transform duration-300 hover:scale-105 shadow-xl rounded-2xl ${darkMode ? 'bg-gray-800/80 hover:bg-gray-700/80' : 'bg-white/80 hover:bg-green-100/80'}`} />
        ) : (
          <p className={`text-center text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            No destinations available yet. Add destinations from the admin panel.
          </p>
        )}
      </div>
      
      <Footer />
    </>
  );
}

export default Home;
