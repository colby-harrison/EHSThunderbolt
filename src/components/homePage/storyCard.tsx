import React, { useState } from 'react';

export interface StoryProps {
  title: string;
  summary: string;
  date?: string;
}

const StoryCard: React.FC<StoryProps> = ({ title, summary, date }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-4 border border-gray-200 dark:border-[#333] rounded shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{title}</h3>
        {date && <span className="text-sm text-gray-500">{date}</span>}
      </div>
      <p className="mt-2 text-sm">
        {expanded 
          ? summary 
          : summary.length > 100 
            ? summary.substring(0, 100) + '...' 
            : summary}
      </p>
      <div className="mt-2 text-blue-500 text-sm">
        {expanded ? 'Show less' : 'Read more'}
      </div>
    </div>
  );
};

export default StoryCard;
