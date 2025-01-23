import React, { useEffect, useRef } from "react";

const InmatesReviewCarousel = () => {
  const reviews = [
    "Amazing experience staying here!",
    "Great facilities and friendly staff.",
    "Highly recommend for students.",
    "Affordable and convenient location.",
    "Clean and spacious rooms.",
    "Felt like home away from home.",
  ];

  const carouselRef = useRef(null);

  // Auto-scroll logic for infinite loop with smooth transitions
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (carouselRef.current) {
        const scrollAmount = carouselRef.current.scrollLeft + 150; // Adjust scroll step
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
    }, 50); // Lower interval for smooth scrolling

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="mt-16 text-center">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-black mb-8 flex items-center justify-center">
        <span className="mr-4 border-t-4 border-[#7502ab] w-32"></span>
        Our Inmates Review
        <span className="ml-4 border-t-4 border-[#7502ab] w-32"></span>
      </h2>

      {/* Carousel Wrapper with Reduced Padding */}
      <div className="bg-[#4b006e] py-6">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto space-x-6 scrollbar-hide"
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-[#7502ab] text-white px-10 py-8 text-xl font-semibold w-96 shadow-lg"
            >
              {review}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InmatesReviewCarousel;
