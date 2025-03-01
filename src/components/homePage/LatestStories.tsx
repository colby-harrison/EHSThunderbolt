const latestStories = [
    {
      title: "New Club Launches This Semester!",
      author: "Jane Doe",
      date: "February 25, 2025",
      description: "A new club has been formed to bring students together...",
      image: "/images/club.jpg",
      link: "#",
    },
    {
      title: "Students Excel in Science Fair!",
      author: "John Smith",
      date: "February 20, 2025",
      description: "This year's science fair saw impressive projects...",
      image: "/images/science.jpg",
      link: "#",
    },
    {
      title: "School Implements New Policies",
      author: "Emily Johnson",
      date: "February 18, 2025",
      description: "The administration has introduced new policies to...",
      image: "/images/policies.jpg",
      link: "#",
    },
  ];
  
  const LatestStories = () => {
    return (
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Latest Stories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestStories.map((story, index) => (
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
              <p className="text-sm text-gray-600">{story.author} • {story.date}</p>
              <p className="text-gray-700 mt-2">{story.description}</p>
            </a>
          ))}
        </div>
      </section>
    );
  };
  
  export default LatestStories;