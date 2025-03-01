import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Slide {
  image: string;
}

const slides: Slide[] = [
  { image: "src/assets/homePage/breast-cancer-central.jpg" },
];

export default function Hero({ title, subtitle, buttonText, buttonLink }: { title: string; subtitle?: string; buttonText?: string; buttonLink?: string; }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[85vh] flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Auto-Rotating Image Carousel */}
      <div className="absolute inset-0 w-full h-full">
        <img src={slides[currentSlide].image} alt="Hero Background" className="w-full h-full object-cover transition-opacity duration-1000" />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Text */}
      <motion.h1
        className="text-7xl font-extrabold leading-tight text-white drop-shadow-lg z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {title}
      </motion.h1>
      {subtitle && <p className="text-2xl mt-4 text-gray-300 z-10">{subtitle}</p>}
      {buttonText && buttonLink && (
        <motion.a
          href={buttonLink}
          className="mt-6 px-10 py-4 bg-white text-black rounded-full text-lg font-medium hover:scale-105 transition-transform duration-300 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {buttonText}
        </motion.a>
      )}
    </section>
  );
}
