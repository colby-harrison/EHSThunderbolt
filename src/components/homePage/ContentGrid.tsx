import React from "react";
import Trending from "./Trending";
import LatestStories from "./LatestStories";
import SportsScores from "./SportsScores";
import StudentHighlights from "./StudentHighlights";

const ContentGrid = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* Trending News */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <Trending />
      </div>

      {/* Latest Stories */}
      <div className="col-span-1 md:col-span-1">
        <LatestStories />
      </div>

      {/* Sports Scores */}
      <div className="col-span-1 md:col-span-1">
        <SportsScores />
      </div>

      {/* Student Highlights */}
      <div className="col-span-1 md:col-span-2 lg:col-span-1">
        <StudentHighlights />
      </div>
    </section>
  );
};

export default ContentGrid;