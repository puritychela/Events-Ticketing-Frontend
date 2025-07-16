import React, { useState } from "react";
import heroMain from "../../assets/hero.jpeg";
import image1 from "../../assets/images-1.jpeg";
import image2 from "../../assets/images-2.jpeg";
import image3 from "../../assets/images-3.jpeg";
import images from "../../assets/images.jpeg";

interface HeroSectionProps {
  onSearch: (value: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="w-screen min-h-screen bg-gray-700 flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-12 py-12 overflow-hidden">
      {/* Left Side: Text Content */}
      <div className="flex-1 max-w-xl text-left">
        <h1 className="text-5xl md:text-6xl font-bold text-blue-700 mb-6 leading-tight">
          Discover & Book Events
        </h1>
        <p className="text-lg text-blue-600 mb-8">
          Explore upcoming concerts, conferences, and festivals. Book your spot today and
          enjoy a seamless experience.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full sm:w-72 text-gray-700"
          />
          <button className="btn btn-primary w-full sm:w-auto" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* Right Side: Images */}
      <div className="flex-1 flex flex-col items-center mt-12 md:mt-0">
        <img
          src={heroMain}
          alt="Main Event"
          className="w-full max-w-lg h-auto object-cover rounded-lg shadow-lg mb-4"
        />
        <div className="flex flex-wrap justify-center gap-4">
          {[image1, image2, image3, images].map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Extra ${idx + 1}`}
              className="w-28 h-28 object-cover rounded-md shadow-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
