import React from "react";

const StepsToFindPG = () => {
  return (
    <div className="mt-16 text-center px-16">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-black mb-12 flex items-center justify-center">
        <span className="mr-4 border-t-4 border-[#4b006e] w-32"></span>
        Simple steps to find your PG
        <span className="ml-4 border-t-4 border-[#4b006e] w-32"></span>
      </h2>

      {/* Layout */}
      <div className="flex justify-between items-start">
        {/* Steps Section */}
        <div className="relative flex-1">
          {/* Thicker and Wider Vertical Line */}
          <div className="absolute left-[50%] transform -translate-x-1/2 h-full w-4 bg-[#4b006e] rounded-full"></div>

          {/* Step 1 */}
          <div className="flex flex-col items-start mb-8 translate-x-[190px]">
            <p className="text-lg font-bold text-black mb-2">Step 1 :</p>
            <div className="bg-[#c0c0c0] text-black py-6 px-6 rounded-lg w-64">
              Explore PGs
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-end mb-8 translate-x-[-190px]">
            <p className="text-lg font-bold text-black mb-2">Step 2 :</p>
            <div className="bg-[#c0c0c0] text-black py-6 px-6 rounded-lg w-64">
              Shortlist Your Options
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-start translate-x-[190px]">
            <p className="text-lg font-bold text-black mb-2">Step 3 :</p>
            <div className="bg-[#c0c0c0] text-black py-6 px-6 rounded-lg w-64">
              Finalize Your PG
            </div>
          </div>
        </div>

        {/* Placeholder Image */}
        <div className="flex-1 max-w-[40%]">
          <div className="bg-gray-300 w-full h-[350px] rounded-[25px]"></div>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-12 flex items-center gap-8">
        <h3 className="text-2xl font-bold text-black whitespace-nowrap ml-48">Find your Perfect fit</h3>
        <div className="flex gap-6">
          <button className="bg-gray-300 py-3 px-8 text-lg rounded-full">AC</button>
          <button className="bg-gray-300 py-3 px-8 text-lg rounded-full">WIFI</button>
          <button className="bg-gray-300 py-3 px-8 text-lg rounded-full">Balcony</button>
          <button className="bg-gray-300 py-3 px-8 text-lg rounded-full">Mess</button>
        </div>
      </div>
    </div>
  );
};

export default StepsToFindPG;
