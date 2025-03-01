const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          {/* Left Section: Site Info */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold">Thunderbolt News</h2>
            <p className="text-sm text-gray-400">
              Bringing you the latest news from EHS.
            </p>
          </div>
  
          {/* Center Section: Navigation Links */}
          <nav className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-white">News</a>
            <a href="#" className="text-gray-300 hover:text-white">Sports</a>
            <a href="#" className="text-gray-300 hover:text-white">Student Life</a>
            <a href="#" className="text-gray-300 hover:text-white">Clubs</a>
            <a href="#" className="text-gray-300 hover:text-white">Community</a>
          </nav>
  
          {/* Right Section: Copyright */}
          <div className="text-sm text-gray-400 mt-4 md:mt-0">
            © {new Date().getFullYear()} Thunderbolt News. All rights reserved.
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;