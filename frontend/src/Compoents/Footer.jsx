import React from "react";
import { FaFacebook } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6';
import { AiOutlineYoutube } from 'react-icons/ai';
import { FiPhoneCall } from 'react-icons/fi';
import { AiOutlineMail } from 'react-icons/ai';
import { FiMapPin } from 'react-icons/fi';
import { IoLogoGooglePlaystore } from 'react-icons/io5';
import { FaAppStore } from 'react-icons/fa';
import { useTheme } from './ThemeContext';

export default function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer className={`${darkMode ? 'bg-gray-900' : 'bg-violet-900'} pt-9`}>
      <div className="mx-auto w-full max-w-[1166px] px-4 xl:px-0">
        <div className="flex flex-col justify-between sm:px-[18px] md:flex-row md:px-10">
          {/* LEFT SECTION */}
          <div className="md:w-[316px]">
            <h1 className="text-white font-extrabold text-[24px]">
              <span className="text-rose-600"><img src="Navbar-bg-logo.png" alt="CompanyLogo" /></span>
            </h1>
            <p className="mt-[18px] text-[15px] font-normal text-white/80">
            Discover and book your dream trips effortlessly with Travels Karnataka — flights, hotels, and adventures all in one place.
            Your journey to unforgettable experiences starts here! ✈️🌍
            </p>

            {/* SOCIAL ICONS */}
            <div className="mt-[18px] flex gap-4 text-2xl">
                <FaFacebook/>
                <FaInstagram/>
                <FaLinkedinIn/>
                <FaXTwitter/>
                <AiOutlineYoutube/>
            </div>
          </div>

          {/* MIDDLE SECTION - CONTACT INFO */}
          <div className="md:w-[316px] mt-6 md:mt-0 text-2xl">
            {/* Phone */}
            <div className="mt-[23px] flex">
              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full">
               <FiPhoneCall/>
              </div>
              <div className="ml-[18px]">
                <a
                  href="tel:+911800123444"
                  className="text-[14px] font-medium text-white"
                >
                  +91 1800123444
                </a>
                <p className="text-[12px] font-medium text-white">
                  Support Number
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="mt-[23px] flex">
              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full ">
              <AiOutlineMail/>
              </div>
              <div className="ml-[18px]">
                <a
                  href="mailto:help@lorem.com"
                  className="text-[14px] font-medium text-white"
                >
                  help@gmail.com
                </a>
                <p className="text-[12px] font-medium text-white">
                  Support Email
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="mt-[23px] flex">
              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full">
               <FiMapPin/>
              </div>
              <div className="ml-[18px]">
                <p className="text-[14px] font-medium text-white">
                  Bengaluru, Karnataka, India, 560079
                </p>
                <p className="text-[12px] font-medium text-white">Address</p>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="mt-6 flex w-full flex-col justify-between text-white sm:flex-row md:mt-0 md:max-w-[341px]">
            <div>
              <p className="text-[18px] font-medium leading-normal">Pages</p>
              <ul>
                {[
                    { name: "Home", href: "/home" },
                    { name: "Booking", href: "/booking" },
                    { name: "Contact", href: "/contact" },
                    { name: "Plans and pricing", href: "/plans-and-pricing" },
                    { name: "Terms and conditions", href: "/terms-and-conditions" },
                    { name: "Privacy policy", href: "/privacy-policy" },
                  ].map((link, i) => (
                    <li key={i} className="mt-[15px]">
                      <a
                        className="hover:text-white/80 text-[15px] font-normal hover:font-semibold"
                        href={link.href}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            {/* App Store Buttons */}
            <div className="mt-6 flex flex-col gap-4 sm:mt-0">
              <p className="text-[18px] font-medium">Download the app</p>
              <div className="flex gap-4 sm:flex-col text-xl text-yellow-600">
                <a
                  target="_blank"
                  rel="playstore"
                  href="https://play.google.com/store"
                >
               <span> <IoLogoGooglePlaystore/><p>Play Store</p></span>
                </a>
                <a
                  target="_blank"
                  rel="Appstore"
                  href="https://www.apple.com/app-store/"
                >
                 <span><FaAppStore/>App Store</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="mt-[30px] text-white" />

        {/* COPYRIGHT */}
        <div className="flex items-center justify-center pb-8 pt-[9px] md:py-8">
          <p className="text-[10px] font-normal text-white md:text-[12px]">
            © Copyright 2024, All Rights Reserved by Travels Karnataka WEBSITES. PVT. LTD
          </p>
        </div>
      </div>
    </footer>
  );
}
