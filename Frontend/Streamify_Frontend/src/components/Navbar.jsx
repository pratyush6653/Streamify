import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current location

  // Function to close the mobile menu and reset the page to the top
  const handleLinkClick = (path) => {
    setIsOpen(false); // Close the mobile menu
    if (location.pathname !== path) {
      // Only scroll to the top if navigating to a new route
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-gradient-to-r from-[#002244] to-[#004080] p-3 shadow-lg w-full fixed top-0 z-50">
      <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto">
        {/* Logo or Brand Name */}
        <Link
          to="/"
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#30cfd0] to-[#560db0] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#ff0077] hover:to-[#ff9900] transition-all duration-300"
          onClick={() => handleLinkClick('/')} // Close menu and reset page when logo is clicked
        >
          Streamify
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Always show the hamburger icon (three horizontal lines) */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`md:flex space-x-4 ${isOpen ? 'block' : 'hidden'} md:block transition-all duration-300`}
        >
          <Link
            to="/"
            className="text-white hover:text-blue-500 block md:inline-block mt-2 md:mt-0 px-3 py-1 rounded-lg hover:bg-[#003366] transition-all duration-300"
            onClick={() => handleLinkClick('/')} // Close menu and reset page when Home is clicked
          >
            Home
          </Link>
          <Link
            to="/play-video"
            className="text-white hover:text-blue-500 block md:inline-block mt-2 md:mt-0 px-3 py-1 rounded-lg hover:bg-[#003366] transition-all duration-300"
            onClick={() => handleLinkClick('/play-video')} // Close menu and reset page when Play Video is clicked
          >
            Play Video
          </Link>
          <Link
            to="/upload"
            className="text-white hover:text-blue-500 block md:inline-block mt-2 md:mt-0 px-3 py-1 rounded-lg hover:bg-[#003366] transition-all duration-300"
            onClick={() => handleLinkClick('/upload')} // Close menu and reset page when Upload is clicked
          >
            Upload
          </Link>
          {/* Add Sign In and Sign Up links if needed */}
          <Link
            to="/signin"
            className="text-white hover:text-blue-500 block md:inline-block mt-2 md:mt-0 px-3 py-1 rounded-lg hover:bg-[#003366] transition-all duration-300"
            onClick={() => handleLinkClick('/signin')}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="text-white hover:text-blue-500 block md:inline-block mt-2 md:mt-0 px-3 py-1 rounded-lg hover:bg-[#003366] transition-all duration-300"
            onClick={() => handleLinkClick('/signup')}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
