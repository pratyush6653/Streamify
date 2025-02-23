import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#002244] to-[#004080] p-3 shadow-lg w-full fixed top-0 z-50">
      <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto">
        {/* Logo or Brand Name */}
        <Link
          to="/"
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#30cfd0] to-[#560db0] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#ff0077] hover:to-[#ff9900] transition-all duration-300"
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
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
          >
            Home
          </Link>
          <Link
            to="/play-video"
            className="text-white hover:text-blue-500 block md:inline-block mt-2 md:mt-0 px-3 py-1 rounded-lg hover:bg-[#003366] transition-all duration-300"
          >
            Play Video
          </Link>
          <Link
            to="/upload"
            className="text-white hover:text-blue-500 block md:inline-block mt-2 md:mt-0 px-3 py-1 rounded-lg hover:bg-[#003366] transition-all duration-300"
          >
            Upload
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;