import React from "react";

interface Article {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface CategorySectionProps {
  title: string;
}

const categoryArticles: Record<string, Article[]> = {
  Sports: [
    {
      title: "Varsity Basketball Team Wins!",
      description: "The varsity basketball team secured a thrilling victory...",
      image: "/images/basketball.jpg",
      link: "#",
    },
    {
      title: "Track & Field Team Sets New Records!",
      description: "Several athletes set new school records this weekend...",
      image: "/images/track.jpg",
      link: "#",
    },
  ],
  "Student Life": [
    {
      title: "Student Government Hosts Charity Event",
      description: "The annual charity drive raised thousands for local causes...",
      image: "/images/charity.jpg",
      link: "#",
    },
    {
      title: "New Cafeteria Menu Unveiled",
      description: "Students can now enjoy a wider selection of healthy meals...",
      image: "/images/cafeteria.jpg",
      link: "#",
    },
  ],
  Clubs: [
    {
      title: "Drama Club Prepares for Spring Performance",
      description: "Rehearsals are in full swing for this year’s big production...",
      image: "/images/drama.jpg",
      link: "#",
    },
    {
      title: "Robotics Club Competes in State Championship",
      description: "The robotics team is gearing up for a major competition...",
      image: "/images/robotics.jpg",
      link: "#",
    },
  ],
  Community: [
    {
      title: "Local Businesses Partner with School Programs",
      description: "A new initiative aims to bridge students with professionals...",
      image: "/images/community.jpg",
      link: "#",
    },
    {
      title: "Volunteer Opportunities Available for Students",
      description: "Many local organizations are seeking student volunteers...",
      image: "/images/volunteer.jpg",
      link: "#",
    },
  ],
};

const CategorySection: React.FC<CategorySectionProps> = ({ title }) => {
  const articles = categoryArticles[title] || [];

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <a
              key={index}
              href={article.link}
              className="block bg-gray-100 p-4 rounded-lg hover:shadow-lg transition"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-3">{article.title}</h3>
              <p className="text-gray-700 mt-2">{article.description}</p>
            </a>
          ))
        ) : (
          <p className="text-gray-600">No articles available in this category.</p>
        )}
      </div>
    </section>
  );
};

export default CategorySection;