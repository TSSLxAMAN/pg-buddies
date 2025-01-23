import React from "react";

const OurServices = () => {
  return (
    <div className="mt-20 text-center px-16">
      {/* Title */}
      <h2 className="text-5xl font-extrabold text-black mb-12 flex items-center justify-center">
        <span className="mr-4 border-t-4 border-[#4b006e] w-52"></span>
        Our Services
        <span className="ml-4 border-t-4 border-[#4b006e] w-52"></span>
      </h2>

      {/* Layout */}
      <div className="flex items-center justify-center gap-16">
        {/* Left Services */}
        <div className="space-y-12">
          <div className="bg-[#af6cce] text-white py-6 px-10 rounded-lg translate-x-[-40px] text-2xl">
            Service 1
          </div>
          <div className="bg-[#af6cce] text-white py-6 px-10 rounded-lg translate-x-[-120px] text-2xl">
            Service 2
          </div>
          <div className="bg-[#af6cce] text-white py-6 px-10 rounded-lg translate-x-[-40px] text-2xl">
            Service 3
          </div>
        </div>

        {/* Mobile Image */}
        <div>
          <img
            src="/path-to-your-mobile-image.png"
            alt="Mobile"
            className="w-64 h-auto"
          />
        </div>

        {/* Right Services */}
        <div className="space-y-12">
          <div className="bg-[#af6cce] text-white py-6 px-10 rounded-lg translate-x-[40px] text-2xl">
            Service 4
          </div>
          <div className="bg-[#af6cce] text-white py-6 px-10 rounded-lg translate-x-[120px] text-2xl">
            Service 5
          </div>
          <div className="bg-[#af6cce] text-white py-6 px-10 rounded-lg translate-x-[40px] text-2xl">
            Service 6
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
