  import React, { useState } from "react";
  import { useTheme } from "./ThemeContext";

  const mainCategories = [
    { name: "All", icon: "🌟", sub: null },
    { name: "Cost", icon: "💰", sub: ["Under ₹500", "₹500-₹700", "Over ₹700"] },
    { name: "Days", icon: "📅", sub: ["1-5 Days", "6-10 Days", "11+ Days"] },
    { name: "Landscape", icon: "🏞️", sub: ["Beach", "Mountain", "Heritage", "City"] }
  ];

  const Sidebar = ({ selectedFilters, setSelectedFilters }) => {
    const { darkMode } = useTheme();
    const [expanded, setExpanded] = useState(null);
    const isHovered = true;

    const handleMainClick = (category) => {
      if (category.name === "All") {
        setSelectedFilters({ category: "All", cost: null, days: null, landscape: null });
        setExpanded(null);
      } else {
        setExpanded(expanded === category.name ? null : category.name);
      }
    };

    const handleSubClick = (main, sub) => {
      setSelectedFilters({ ...selectedFilters, [main.toLowerCase()]: sub });
    };

    const handleRemoveFilter = (key) => {
      setSelectedFilters({ ...selectedFilters, [key]: null });
    };

    return (
      <div
        className={`fixed left-0 top-16 h-svh ${
          darkMode
            ? 'bg-linear-to-b from-slate-900 via-gray-800 to-slate-900 border-r border-slate-700'
            : 'bg-linear-to-b from-white via-gray-50 to-white border-r border-gray-200'
        } p-6 shadow-2xl transition-all duration-500 ease-in-out overflow-y-auto backdrop-blur-sm w-72`}
      >
        {/* Sidebar Header */}
        <div className="mb-8 text-center">
          <div
            className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
              darkMode ? 'bg-linear-to-br from-indigo-600 to-purple-600' : 'bg-linear-to-br from-indigo-500 to-blue-500'
            } shadow-lg mb-3`}
          >
            <span className="text-xl">🎯</span>
          </div>
          {isHovered && (
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} tracking-wide`}>
              Filters
            </h3>
          )}
        </div>

        {/* Main Categories */}
        <ul className="space-y-4">
          {mainCategories.map((category, index) => (
            <li
              key={category.name}
              className={`transition-all duration-500 ease-out ${
                isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: isHovered ? `${index * 100}ms` : '0ms'
              }}
            >
              <button
                onClick={() => handleMainClick(category)}
                className={`group w-full px-5 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-between relative overflow-hidden ${
                  selectedFilters.category === category.name || (category.name !== "All" && selectedFilters[category.name.toLowerCase()])
                    ? `bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-2xl ring-2 ring-indigo-300`
                    : `${
                        darkMode
                          ? 'bg-linear-to-r from-gray-700 to-gray-800 text-gray-300 hover:from-gray-600 hover:to-gray-700 hover:text-white'
                          : 'bg-linear-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 hover:text-gray-900'
                      }`
                }`}
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                <div className="flex items-center justify-center gap-4 relative z-10 min-h-10">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${
                    selectedFilters.category === category.name || (category.name !== "All" && selectedFilters[category.name.toLowerCase()])
                      ? 'bg-white/20'
                      : darkMode ? 'bg-gray-600' : 'bg-gray-300'
                  } transition-colors duration-300`}>
                    <span className="text-xl">{category.icon}</span>
                  </div>
                  {isHovered && (
                    <span className="font-semibold text-base flex-1 text-left">{category.name}</span>
                  )}
                </div>

                {category.sub && isHovered && (
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 ${
                    expanded === category.name ? 'bg-white/20 rotate-180' : 'bg-transparent'
                  }`}>
                    <span className="text-sm">▼</span>
                  </div>
                )}
              </button>

              {/* Sub Categories (Accordion style) */}
              {expanded === category.name && category.sub && isHovered && (
                <div className="mt-4 ml-8 space-y-3 animate-slide-down">
                  {category.sub.map((sub, subIndex) => (
                    <button
                      key={sub}
                      onClick={() => handleSubClick(category.name, sub)}
                      className={`group w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden ${
                        selectedFilters[category.name.toLowerCase()] === sub
                          ? "bg-linear-to-r from-indigo-400 to-blue-500 text-white shadow-xl ring-2 ring-indigo-200"
                          : `${
                              darkMode
                                ? 'bg-linear-to-r from-gray-600 to-gray-700 text-gray-300 hover:from-gray-500 hover:to-gray-600 hover:text-white'
                                : 'bg-linear-to-r from-gray-200 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-400'
                            }`
                      }`}
                      style={{ animationDelay: `${subIndex * 50}ms` }}
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                      <span className="relative z-10">{sub}</span>
                    </button>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Active Filters Indicator */}
        {isHovered && (
          <div className="mt-8 p-4 rounded-xl bg-linear-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border border-indigo-200 dark:border-gray-600">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Active Filters:</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(selectedFilters).map(([key, value]) => (
                value && key !== 'category' && (
                  <div
                    key={key}
                    onClick={() => handleRemoveFilter(key)}
                    className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-xs font-medium cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors flex items-center gap-1"
                  >
                    {key}: {value}
                    <span className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200">×</span>
                  </div>
                )
              ))}
              {Object.values(selectedFilters).every(v => !v || v === 'All') && (
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                  All Destinations
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Sidebar;
