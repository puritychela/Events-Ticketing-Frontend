// components/MainNavbar.tsx
import { Link } from "react-router-dom";
import { FaHome, FaInfo, FaPhone, FaCalendarAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const MainNavbar = () => {
  return (
    <nav className="w-full bg-gray-800 text-white shadow-md">
      <div className="navbar px-4 max-w-full flex justify-between">
        <Link to="/" className="text-xl font-bold flex items-center gap-2 hover:text-blue-400">
          🎫 QuickBook Events
        </Link>
        <div className="hidden md:flex items-center gap-4">
          <Link to="/" className="hover:text-blue-400 flex items-center gap-1">
            <FaHome className="text-green-400" /> Home
          </Link>
          <Link to="/events" className="hover:text-blue-400 flex items-center gap-1">
            <FaCalendarAlt className="text-green-400" /> Events
          </Link>
          <Link to="/about" className="hover:text-blue-400 flex items-center gap-1">
            <FaInfo className="text-green-400" /> About
          </Link>
          <Link to="/contact" className="hover:text-blue-400 flex items-center gap-1">
            <FaPhone className="text-green-400" /> Contact
          </Link>
          <Link to="/login" className="hover:text-blue-400 flex items-center gap-1">
            <FaSignInAlt className="text-green-400" /> Login
          </Link>
          <Link to="/register" className="hover:text-blue-400 flex items-center gap-1">
            <FaUserPlus className="text-green-400" /> Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
