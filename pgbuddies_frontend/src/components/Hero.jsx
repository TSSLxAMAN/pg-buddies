import React from "react";

const Hero = () => {
  return (
    <div className="relative">
      {/* Fixed Translucent Navbar */}
      <nav
        className="fixed top-0 left-0 w-[calc(100%-4rem)] bg-[#d1ceb1]/30 backdrop-blur-lg z-50 mx-8"
        style={{
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <img
              src="/path-to-your-logo.png"
              alt="PG Buddies"
              className="h-8 w-8"
            />
            <h1
              className="text-2xl font-extrabold"
              style={{ color: "#4b006e" }}
            >
              PG BUDDIES
            </h1>
          </div>

          {/* Search Bar */}
          <div className="mx-6">
            <input
              type="text"
              placeholder="Search by location"
              className="w-80 px-4 py-2 bg-white rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4b006e] text-gray-700 placeholder-black"
            />
          </div>

          {/* Individual Button Containers */}
          <div className="flex space-x-4 items-center">
            {/* For PG Owners */}
            <div className="bg-[#4b006e] px-4 py-2 rounded-full">
              <a href="#owners" className="text-white font-semibold">
                For PG Owners
              </a>
            </div>

            {/* Contact Us */}
            <div className="bg-[#4b006e] px-4 py-2 rounded-full">
              <a href="#contact" className="text-white font-semibold">
                Contact Us
              </a>
            </div>

            {/* Login */}
            <div className="bg-[#4b006e] px-4 py-2 rounded-full">
              <a href="#login" className="text-white font-semibold">
                Login
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-screen w-full flex items-center"
        style={{
          backgroundImage: "url('/path-to-your-image.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 pl-16 px-8 text-left">
          {/* Increased font size and moved content to the right */}
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Find your Paying Guest <br /> in your locality.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
