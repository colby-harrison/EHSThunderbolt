import React, { useState, useEffect, useRef } from 'react';

export interface Slide {
  image: string;
  alt: string;
  heading: string;
  subheading: string;
}

interface CarouselProps {
  slides: Slide[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start auto-slide
  const startAutoSlide = () => {
    stopAutoSlide(); // Clear any existing interval
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
  };

  // Stop auto-slide
  const stopAutoSlide = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      stopAutoSlide();
    };
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div
      className="relative aspect-video overflow-hidden rounded shadow"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
          {/* Dark opaque overlay bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <h3 className="text-lg font-bold">{slide.heading}</h3>
            <p className="text-sm">{slide.subheading}</p>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
      >
        &larr;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
      >
        &rarr;
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-gray-600' : 'bg-gray-400'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
