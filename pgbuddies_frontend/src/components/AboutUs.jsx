import React from "react";

const AboutUs = () => {
  return (
    <div className="mt-16 text-center px-16">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-black mb-8 flex items-center justify-center">
        <span className="mr-4 border-t-4 border-[#7502ab] w-32"></span>
        About us
        <span className="ml-4 border-t-4 border-[#7502ab] w-32"></span>
      </h2>

      {/* About Us Content */}
      <div className="bg-gray-300 rounded-3xl py-16 px-8 mx-auto max-w-5xl">
        <p className="text-lg text-black">
          PG Buddies is dedicated to helping individuals find their perfect
          paying guest accommodations. With a user-friendly interface and a
          robust database of listings, we ensure that you get the best options
          tailored to your preferences. Our team is committed to providing a
          seamless experience and excellent customer service.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
