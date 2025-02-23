import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-[#002244] p-4 shadow-lg w-full fixed top-0 z-50 overflow-hidden">
      <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto">
        {/* Logo or Brand Name */}
        <Link
          to="/"
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#30cfd0] to-[#560db0] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#ff0077] hover:to-[#ff9900] transition-all duration-300 pl-4"
        >
          Streamify
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-500">
            Home
          </Link>
          <Link to="/play-video" className="text-white hover:text-blue-500">
            Play Video
          </Link>
          <Link to="/upload" className="text-white hover:text-blue-500">
            Upload
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;