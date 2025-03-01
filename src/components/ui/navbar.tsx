import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between">
      {/* Hamburger Menu Button - Rounded Square */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 bg-white rounded-lg shadow-lg flex items-center justify-center w-12 h-12"
      >
        <Menu size={28} className="text-black" />
      </button>

      {/* EHS Logo - Circular with Black Background */}
      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center ml-auto">
        <img src="/assets/EHS.Logo.png" alt="EHS Logo" className="w-8 h-8 rounded-full" />
      </div>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={isOpen ? { x: 0, opacity: 1 } : { x: -300, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-64 h-full bg-black text-white p-6 shadow-lg"
      >
        {/* Close Button - Small & Floating */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 bg-gray-800 text-white p-1 rounded-full hover:bg-gray-600 transition"
        >
          <X size={20} />
        </button>

        <nav className="mt-10">
          <ul className="space-y-4">
            <li><a href="/news" className="text-white hover:text-gray-300">News</a></li>
            <li><a href="/sports" className="text-white hover:text-gray-300">Sports</a></li>
            <li><a href="/student-life" className="text-white hover:text-gray-300">Student Life</a></li>
          </ul>
        </nav>
      </motion.div>
    </div>
  );
}
