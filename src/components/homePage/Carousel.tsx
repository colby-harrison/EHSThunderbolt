import { useState, useEffect } from "react";

const carouselItems = [
  {
    title: "Big Announcement: School Expanding Facilities!",
    image: "/images/school-expansion.jpg",
    link: "#",
  },
  {
    title: "EHS Football Team Advances to Finals!",
    image: "/images/football-finals.jpg",
    link: "#",
  },
  {
    title: "New Tech Club Launching This Semester!",
    image: "/images/tech-club.jpg",
    link: "#",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden rounded-lg shadow-lg">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselItems.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="min-w-full flex flex-col items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <p className="text-center mt-2 text-lg font-semibold">{item.title}</p>
          </a>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() =>
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
          )
        }
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
      >
        ◀
      </button>
      <button
        onClick={() =>
          setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length)
        }
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
      >
        ▶
      </button>
    </section>
  );
};

export default Carousel;