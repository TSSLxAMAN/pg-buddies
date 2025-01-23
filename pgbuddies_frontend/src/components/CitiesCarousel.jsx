import React, { useEffect, useRef } from "react";

const CitiesCarousel = () => {
  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Pune",
    "Hyderabad",
    "Ahmedabad",
    "Jaipur",
    "Surat",
    "Lucknow",
    "Indore",
    "Nagpur",
    "Bhopal",
    "Patna",
    "Vadodara",
    "Ludhiana",
    "Agra",
    "Nashik",
    "Faridabad",
  ];

  const carouselRef = useRef(null);

  // Auto-scroll logic for infinite loop with smoother transitions
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (carouselRef.current) {
        const scrollAmount = carouselRef.current.scrollLeft + 100; // Reduced scroll step for smoother effect
        carouselRef.current.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });

        // Loop back to the start when it reaches the end
        if (
          carouselRef.current.scrollLeft + carouselRef.current.clientWidth >=
          carouselRef.current.scrollWidth
        ) {
          carouselRef.current.scrollTo({ left: 0 });
        }
      }
    }, 50); // Lower interval for smoother continuous scroll

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="mt-16 text-center">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-black mb-8 flex items-center justify-center">
        <span className="mr-4 border-t-4 border-black w-32"></span>
        Cities we are available in
        <span className="ml-4 border-t-4 border-black w-32"></span>
      </h2>

      {/* Carousel Wrapper with Full-Width Background */}
      <div className="bg-[#4b006e]">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto space-x-2 scrollbar-hide"
        >
          {cities.map((city, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-[#7502ab] text-white px-6 py-4 text-lg font-bold"
            >
              {city}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitiesCarousel;
