import React from "react";

const topStories = [
  {
    title: "School Board Approves New STEM Program",
    description: "Exciting developments in education as the school board greenlights a new STEM curriculum...",
    image: "/images/stem-program.jpg",
    link: "#",
  },
  {
    title: "EHS Debate Team Wins State Championship",
    description: "The EHS Debate Team has emerged victorious, securing the state title after a thrilling final round...",
    image: "/images/debate-team.jpg",
    link: "#",
  },
  {
    title: "Spring Musical Tickets Now on Sale",
    description: "Get your tickets for the much-anticipated spring musical before they sell out...",
    image: "/images/spring-musical.jpg",
    link: "#",
  },
];

const TopStories = () => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Top Stories</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topStories.map((story, index) => (
          <a
            key={index}
            href={story.link}
            className="block bg-gray-100 p-4 rounded-lg hover:shadow-lg transition"
          >
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-3">{story.title}</h3>
            <p className="text-gray-700 mt-2">{story.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default TopStories;