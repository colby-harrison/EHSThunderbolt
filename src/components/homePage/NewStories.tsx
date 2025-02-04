// src/components/homePage/NewStories.tsx
import React, { useEffect, useState } from 'react';
import StoryCard from 'src/components/homePage/storyCard';

export interface Story {
  title: string;
  summary: string;
  date: string;
}

const NewStories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('stories');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Story[];
        // Sort stories by date descending (newest first)
        parsed.sort((firstStory, secondStory) => {
          return new Date(secondStory.date).getTime() - new Date(firstStory.date).getTime();
        });
        setStories(parsed.slice(0, 3));
      } catch (error) {
        console.error('Error parsing stored stories', error);
      }
    }
  }, []);

  if (stories.length === 0) {
    return <p>No new stories.</p>;
  }

  return (
    <div className="space-y-3">
      {stories.map((story, index) => (
        <div key={index}>
          <StoryCard {...story} />
        </div>
      ))}
    </div>
  );
};

export default NewStories;