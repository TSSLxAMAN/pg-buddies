import React from "react";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-[#4b006e] to-[#7502ab] text-white py-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        {/* Contact Us Section */}
        <div className="flex flex-col">
          <h3 className="text-3xl font-extrabold mb-6 border-b-4 border-white pb-2">
            Contact Us
          </h3>
          <p className="text-lg leading-relaxed">
            PG Buddies, <br />
            123 Main Street, <br />
            Anytown, India <br />
            <span className="font-semibold">Email:</span> info@pgbuddies.com <br />
            <span className="font-semibold">Phone:</span> +91 98765 43210
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col">
          <h3 className="text-3xl font-extrabold mb-6 border-b-4 border-white pb-2">
            Quick Links
          </h3>
          <ul className="space-y-4">
            <li>
              <a
                href="#services"
                className="text-lg font-medium hover:text-gray-200 transition"
              >
                Our Services
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-lg font-medium hover:text-gray-200 transition"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#reviews"
                className="text-lg font-medium hover:text-gray-200 transition"
              >
                Reviews
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-lg font-medium hover:text-gray-200 transition"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Get in Touch Section */}
        <div className="flex flex-col">
          <h3 className="text-3xl font-extrabold mb-6 border-b-4 border-white pb-2">
            Get in Touch
          </h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Search by location"
              className="w-3/4 px-4 py-3 text-black rounded-full mx-auto focus:outline-none focus:ring-4 focus:ring-[#4b006e] transition"
            />
            <button className="w-3/4 px-4 py-3 text-lg font-bold bg-white text-[#4b006e] rounded-full hover:bg-gray-200 transition mx-auto">
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 text-center border-t border-gray-500 pt-6">
        <p className="text-sm text-gray-300">
          &copy; {new Date().getFullYear()} PG Buddies. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
