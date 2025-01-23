import React from "react";
import CountUp from "react-countup";

const StatsSection = () => {
  return (
    <div className="mt-8 bg-white">
      <div className="grid grid-cols-3">
        {/* First Box */}
        <div className="bg-[#4b006e] text-white text-center py-8">
          <h1 className="text-3xl font-bold">
            <CountUp start={0} end={1200} duration={2} suffix="+" />
          </h1>
          <p className="text-lg font-medium">Registered PG</p>
        </div>

        {/* Second Box */}
        <div className="bg-[#7e3c9e] text-white text-center py-8">
          <h1 className="text-3xl font-bold">
            <CountUp start={0} end={25} duration={2} suffix="+" />
          </h1>
          <p className="text-lg font-medium">Cities</p>
        </div>

        {/* Third Box */}
        <div className="bg-[#4b006e] text-white text-center py-8">
          <h1 className="text-3xl font-bold">
            <CountUp start={0} end={1000} duration={2} suffix="+" />
          </h1>
          <p className="text-lg font-medium">Happy Inmates</p>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
