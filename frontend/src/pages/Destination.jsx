import React, { useState, useEffect } from 'react'
import Sidebar from '../Compoents/Sidebar'
import Card from '../Compoents/Card'
import { useTheme } from '../Compoents/ThemeContext';
import Navbar from '../Compoents/Navbar';
import axios from 'axios';
import { API_BASE_URL, toApiAssetUrl } from '../config/api';
import { Link } from 'react-router-dom';

function Destination() {
  const [selectedFilters, setSelectedFilters] = useState({ category: "All", cost: null, days: null, landscape: null });
  const { darkMode } = useTheme();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/destinations`);
        const fetchedDestinations = response.data.destinations.map(dest => {
          // Compute costRange based on price
          let costRange;
          if (dest.price < 500) {
            costRange = "Under ₹500";
          } else if (dest.price >= 500 && dest.price <= 700) {
            costRange = "₹500-₹700";
          } else {
            costRange = "Over ₹700";
          }

          // Compute daysRange based on duration
          // Assuming duration is like "3 Nights - 9 Days", extract the days
          const daysMatch = dest.duration.match(/(\d+)\s*Days?/i);
          const days = daysMatch ? parseInt(daysMatch[1]) : 0;
          let daysRange;
          if (days <= 5) {
            daysRange = "1-5 Days";
          } else if (days >= 6 && days <= 10) {
            daysRange = "6-10 Days";
          } else {
            daysRange = "11+ Days";
          }

          const cleanDesc = dest.description.replace(/<[^>]*>/g, ''); // Strip HTML tags

          return {
            _id: dest._id,
            img: toApiAssetUrl(dest.image),
            location: `${dest.name}, India`,
            title: dest.name,
            desc: cleanDesc,
            rating: dest.rating.toString(),
            reviews: "(0)",
            duration: dest.duration,
            price: `₹${dest.price}`,
            category: dest.landscape,
            costRange,
            daysRange
          };
        });
        setDestinations(fetchedDestinations);
      } catch (error) {
        console.error('Error fetching destinations:', error);
        // Fallback to hardcoded data if API fails
        setDestinations([
          {
            img: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a2FybmF0YWthfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=80",
            location: "Karnataka, India",
            title: "Every Life Matters",
            desc: "We provide daily meals and run food drives to ensure child or elder in our community goes to bed.",
            rating: "5.00",
            reviews: "(334)",
            duration: "3 Nights - 9 Days",
            price: "₹589.00",
            category: "Heritage",
            costRange: "₹500-₹700",
            daysRange: "6-10 Days"
          },
          {
            img: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
            location: "Mumbai, India",
            title: "Urban Adventures",
            desc: "Explore the vibrant city life with guided tours and cultural experiences.",
            rating: "4.80",
            reviews: "(256)",
            duration: "5 Nights - 6 Days",
            price: "₹450.00",
            category: "City",
            costRange: "Under ₹500",
            daysRange: "1-5 Days"
          },
          {
            img: "https://images.unsplash.com/photo-1642516864726-a243f416fc00?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGdvYXxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=700&q=80",
            location: "Goa, India",
            title: "Beach Paradise",
            desc: "Relax on pristine beaches and enjoy water sports in this tropical haven.",
            rating: "4.90",
            reviews: "(412)",
            duration: "7 Nights - 8 Days",
            price: "₹650.00",
            category: "Beach",
            costRange: "₹500-₹700",
            daysRange: "6-10 Days"
          },
          {
            img: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFpcHVyfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=80",
            location: "Jaipur, India",
            title: "Royal Heritage",
            desc: "Discover the palaces and forts of Rajasthan with expert historians.",
            rating: "4.70",
            reviews: "(198)",
            duration: "6 Nights - 7 Days",
            price: "₹520.00",
            category: "Heritage",
            costRange: "₹500-₹700",
            daysRange: "6-10 Days"
          },
          {
            img: "https://plus.unsplash.com/premium_photo-1697729438401-fcb4ff66d9a8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2VyYWxhfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=80",
            location: "Kerala, India",
            title: "Backwater Bliss",
            desc: "Cruise through serene backwaters and experience the lush greenery of Kerala.",
            rating: "4.85",
            reviews: "(289)",
            duration: "6 Nights - 7 Days",
            price: "₹580.00",
            category: "Beach",
            costRange: "₹500-₹700",
            daysRange: "6-10 Days"
          },
          {
            img: "https://plus.unsplash.com/premium_photo-1697729690458-2d64ca777c04?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGltYWNoYWwlMjBwcmFkZXNofGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=80",
            location: "Himachal Pradesh, India",
            title: "Mountain Escape",
            desc: "Trek through the Himalayas and enjoy the fresh mountain air.",
            rating: "4.75",
            reviews: "(345)",
            duration: "9 Nights - 10 Days",
            price: "₹720.00",
            category: "Mountain",
            costRange: "Over ₹700",
            daysRange: "6-10 Days"
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const filteredDestinations = destinations.filter(dest => {
    if (selectedFilters.cost && dest.costRange !== selectedFilters.cost) return false;
    if (selectedFilters.days && dest.daysRange !== selectedFilters.days) return false;
    if (selectedFilters.landscape && dest.category !== selectedFilters.landscape) return false;
    return true;
  });

  return (
    <>
    <Navbar/>
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-green-50 text-gray-900'} `}>
      <Sidebar selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      <div className="p-8 pt-20 ml-55 ">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">Explore Destinations</h1>
        {loading ? (
          <p className="text-center text-lg">Loading destinations...</p>
        ) : filteredDestinations.length === 0 ? (
          <div className="text-center">
            <p className="text-lg">
              No destinations available yet.
            </p>
            <Link
              to="/admin/destinations"
              className="mt-4 inline-block rounded-full bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700"
            >
              Add destinations
            </Link>
          </div>
        ) : (
          <Card cardsData={filteredDestinations} />
        )}
      </div>
    </div>
    </>
  )
}

export default Destination
