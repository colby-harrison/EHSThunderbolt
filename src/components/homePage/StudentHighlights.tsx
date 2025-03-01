import React from "react";

const studentHighlights = [
  {
    name: "Alex Johnson",
    achievement: "Won 1st place in the State Science Fair",
    image: "/images/alex.jpg",
  },
  {
    name: "Samantha Lee",
    achievement: "Broke the school record for the 100m sprint",
    image: "/images/samantha.jpg",
  },
  {
    name: "Michael Chen",
    achievement: "Debate team captain won the regional championship",
    image: "/images/michael.jpg",
  },
];

const StudentHighlights = () => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Student Highlights</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studentHighlights.map((student, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition">
            <img
              src={student.image}
              alt={student.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-3">{student.name}</h3>
            <p className="text-gray-700 mt-1">{student.achievement}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudentHighlights;