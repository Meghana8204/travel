// import { MapPin, Star } from "lucide-react";
import { FiMapPin, FiStar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTheme } from './ThemeContext';

const Card = ({ cardsData = [], cardClassName = '' }) => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const handleExploreClick = (card) => {
    navigate('/package-details', { state: { cardData: card } });
  };

  return (
    <div className="ml-10" >

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-20 p-4 mx-auto pl-auto max-w-7xl ">
        {cardsData && cardsData.map((card, index) => (
          <div
            key={index}
            className={`${cardClassName} ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-green-50 border-gray-100'} rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-xs mx-auto`}
          >
            {/* Image */}
            <img
              className="w-full h-40 object-cover"
              src={card.img}
              alt="Card image"
            />

            {/* Content */}
            <div className="p-6 space-y-3">
              {/* Location */}
              <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <FiMapPin className="w-4 h-4 mr-1 text-blue-500" />
                <span>{card.location}</span>
              </div>

              {/* Title */}
              <h2 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {card.title}
              </h2>

              {/* Description */}
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {(() => {
                  const words = card.desc.split(' ');
                  return words.length > 20 ? words.slice(0, 20).join(' ') + '...' : card.desc;
                })()}
              </p>

              {/* Rating + Duration */}
              <div className={`flex items-center justify-between text-sm pt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="flex items-center">
                  <FiStar className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {card.rating}
                  </span>
                  {/* <span className="ml-1 text-gray-400">{card.reviews}</span> */}
                </div>
                <span>{card.duration} days</span>
              </div>

              {/* Price + Button */}
              <div className={`flex items-center justify-between pt-3 border-t ${darkMode ? 'border-gray-600' : 'border-gray-100'}`}>
                <div>
                  <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {card.price}
                  </p>
                  <p className="text-xs text-gray-400">/ Per Person</p>
                </div>
                <button
                  onClick={() => handleExploreClick(card)}
                  className="text-blue-600 font-medium hover:text-blue-800 flex items-center gap-1"
                >
                  EXPLORE MORE →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
