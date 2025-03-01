import { useState, useEffect } from "react";

const trendingStories = [
  {
    title: "Breaking: Major School Event Announced!",
    image: "/images/event.jpg",
    link: "#",
  },
  {
    title: "Sports Team Wins Championship!",
    image: "/images/sports.jpg",
    link: "#",
  },
  {
    title: "Student Council Election Results Are In!",
    image: "/images/election.jpg",
    link: "#",
  },
];

const Trending = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingStories.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden rounded-lg shadow-md">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {trendingStories.map((story, index) => (
          <a
            key={index}
            href={story.link}
            className="min-w-full flex flex-col items-center"
          >
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <p className="text-center mt-2 text-lg font-semibold">
              {story.title}
            </p>
          </a>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() =>
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? trendingStories.length - 1 : prevIndex - 1
          )
        }
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
      >
        ◀
      </button>
      <button
        onClick={() =>
          setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingStories.length)
        }
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
      >
        ▶
      </button>
    </section>
  );
};

export default Trending;