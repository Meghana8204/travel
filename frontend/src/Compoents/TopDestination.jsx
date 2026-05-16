import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { HiClipboardList } from "react-icons/hi";
import { RiShieldCheckLine } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";


const features = [
  {
    icon: <HiClipboardList className="text-blue-600 w-8 h-8" />,
    title: "Customizable Package.",
  },
  {
    icon: <FaPhoneAlt className="text-green-600 w-8 h-8" />,
    title: "24/7 Support",
  },
  {
    icon: <RiShieldCheckLine className="text-cyan-600 w-8 h-8" />,
    title: "Trusted by Thousands",
  },
  {
    icon: <FaUserTie className="text-blue-700 w-8 h-8" />,
    title: "Local Expertise",
  },
];

const TopDestination = () => {
  return (
    <section className="bg-green-50 dark:bg-gray-900 py-16 px-6 text-center relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Tag */}
        <div className="inline-block bg-white text-gray-900 dark:bg-gray-800 dark:text-white px-4 py-1 rounded-full shadow-sm mb-4 text-sm font-medium">
          Best Agency Ever!
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          We’re Locked Top Destination
        </h2>

        {/* Subheading */}
        <p className="text-gray-600 dark:text-gray-300 mb-12">
          A curated list of the most popular travel packages based on different
          destinations.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl px-6 py-6 shadow-sm hover:shadow-md transition"
            >
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-full">
                {item.icon}
              </div>
              <h3 className="text-gray-900 dark:text-white font-semibold text-lg">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Rating Section */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-1 text-green-500">
            <span className="text-xl">★★★★★</span>
          </div>
          <p>
            5.0 Rating out of 5.0 based on{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              24,000
            </span>{" "}
            reviews
          </p>
          <span className="text-3xl text-green-600">★</span>
        </div>
      </div>
    </section>
  );
};

export default TopDestination;
