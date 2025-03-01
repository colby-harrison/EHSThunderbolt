import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-50">
      {/* Logo */}
      <div className="text-2xl font-bold">Thunderbolt</div>
      
      {/* Hamburger Icon */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 text-lg">
        <a href="#" className="hover:text-blue-500">News</a>
        <a href="#" className="hover:text-blue-500">Sports</a>
        <a href="#" className="hover:text-blue-500">Student Life</a>
        <a href="#" className="hover:text-blue-500">Clubs</a>
      </nav>

      {/* Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}></div>
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-5 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform`}
      >
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4">
          <X size={24} />
        </button>
        <nav className="flex flex-col gap-4 mt-10 text-lg">
          <a href="#" className="hover:text-blue-500">News</a>
          <a href="#" className="hover:text-blue-500">Sports</a>
          <a href="#" className="hover:text-blue-500">Student Life</a>
          <a href="#" className="hover:text-blue-500">Clubs</a>
        </nav>
      </aside>
    </header>
  );
};

export default Header;
