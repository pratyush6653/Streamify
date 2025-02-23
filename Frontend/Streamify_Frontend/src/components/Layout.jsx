import Navbar from './Navbar'; // Import the Navbar component

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-16"> {/* Add padding-top to account for the fixed navbar */}
        {children}
      </main>

      {/* Footer (Optional) */}
      <footer className="bg-[#002244] text-white text-center p-4">
        &copy; 2023 Streamify. All rights reserved.
      </footer>
    </div>
  );
}

export default Layout;