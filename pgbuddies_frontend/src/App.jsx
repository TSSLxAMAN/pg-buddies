import { useState } from "react";
import "./App.css";

// Import components
import Hero from "./components/Hero";
import StatsSection from "./components/StatsSection";
import OurServices from "./components/OurServices";
import StepsToFindPG from "./components/StepsToFindPG";
import CitiesCarousel from "./components/CitiesCarousel";
import InmatesReviewCarousel from "./components/InmatesReviewCarousel";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <div className="mt-12">
        <StatsSection />
      </div>

      {/* Our Services Section */}
      <div className="mt-20">
        <OurServices />
      </div>

      {/* Steps to Find PG Section */}
      <div className="mt-20">
        <StepsToFindPG />
      </div>

      {/* Cities Carousel */}
      <div className="mt-20">
        <CitiesCarousel />
      </div>

      {/* Our Inmates Review */}
      <div className="mt-20">
        <InmatesReviewCarousel />
      </div>

      {/* About Us Section */}
      <div className="mt-20">
        <AboutUs />
      </div>

      {/* Footer */}
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}

export default App;
