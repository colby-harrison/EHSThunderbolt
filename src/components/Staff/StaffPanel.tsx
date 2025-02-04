// src/components/staff/StaffPanel.tsx
import React, { useState } from 'react';

type ActionType = 'addStory' | 'updateStory' | 'addScore' | 'updateScore';

interface Story {
  title: string;
  summary: string;
  date: string;
}

interface Score {
  game: string;
  score: string;
}

const StaffPanel: React.FC = () => {
  // Login state
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Dashboard state for selected action
  const [selectedAction, setSelectedAction] = useState<ActionType | null>(null);

  // Local data storage for testing with proper types
  const [stories, setStories] = useState<Story[]>([]);
  const [scores, setScores] = useState<Score[]>([]);

  // Handle login form submission
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // For testing, use hardcoded credentials: username: "admin", password: "password"
    if (username === 'admin' && password === 'password') {
      setLoggedIn(true);
      setMessage('');
    } else {
      setMessage('Invalid credentials');
    }
  };

  // Handle add story form submission
  const handleStorySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const summary = formData.get('summary') as string;
    const date = formData.get('date') as string;
    const newStory: Story = { title, summary, date };
    const updatedStories = [...stories, newStory];
    setStories(updatedStories);
    setMessage('Story added locally!');
    localStorage.setItem('stories', JSON.stringify(updatedStories));
    event.currentTarget.reset();
  };

  // Handle add score form submission
  const handleScoreSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const game = formData.get('game') as string;
    const score = formData.get('score') as string;
    const newScore: Score = { game, score };
    setScores([...scores, newScore]);
    setMessage('Score added locally!');
    event.currentTarget.reset();
  };

  if (!loggedIn) {
    return (
      <div className="p-4 max-w-md mx-auto bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Staff Login</h2>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-900 dark:text-gray-100">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="border border-gray-300 dark:border-gray-700 p-2 w-full rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-900 dark:text-gray-100">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border border-gray-300 dark:border-gray-700 p-2 w-full rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Log In
          </button>
        </form>
      </div>
    );
  }

  if (selectedAction === null) {
    return (
      <div className="p-4 max-w-md mx-auto bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Staff Dashboard</h2>
        {message && <p className="mb-4 text-green-500">{message}</p>}
        <div className="space-y-4">
          <button onClick={() => setSelectedAction('addStory')} className="bg-blue-500 text-white p-2 rounded w-full">
            Add Story
          </button>
          <button onClick={() => setSelectedAction('updateStory')} className="bg-blue-500 text-white p-2 rounded w-full">
            Update Story
          </button>
          <button onClick={() => setSelectedAction('addScore')} className="bg-blue-500 text-white p-2 rounded w-full">
            Add Score
          </button>
          <button onClick={() => setSelectedAction('updateScore')} className="bg-blue-500 text-white p-2 rounded w-full">
            Update Score
          </button>
        </div>
      </div>
    );
  }

  if (selectedAction === 'addStory') {
    return (
      <div className="p-4 max-w-md mx-auto bg-white dark:bg-gray-800 rounded shadow">
        <button onClick={() => setSelectedAction(null)} className="mb-4 text-blue-500">
          &larr; Back to Dashboard
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Add Story</h2>
        <form onSubmit={handleStorySubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-900 dark:text-gray-100">Title:</label>
            <input type="text" name="title" className="border border-gray-300 dark:border-gray-700 p-2 w-full rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required />
          </div>
          <div>
            <label className="block mb-1 text-gray-900 dark:text-gray-100">Summary:</label>
            <textarea name="summary" className="border border-gray-300 dark:border-gray-700 p-2 w-full rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required></textarea>
          </div>
          <div>
            <label className="block mb-1 text-gray-900 dark:text-gray-100">Date:</label>
            <input type="date" name="date" className="border border-gray-300 dark:border-gray-700 p-2 w-full rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required />
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
            Submit Story
          </button>
        </form>
      </div>
    );
  }

  if (selectedAction === 'addScore') {
    return (
      <div className="p-4 max-w-md mx-auto bg-white dark:bg-gray-800 rounded shadow">
        <button onClick={() => setSelectedAction(null)} className="mb-4 text-blue-500">
          &larr; Back to Dashboard
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Add Score</h2>
        <form onSubmit={handleScoreSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-900 dark:text-gray-100">Game:</label>
            <input type="text" name="game" className="border border-gray-300 dark:border-gray-700 p-2 w-full rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required />
          </div>
          <div>
            <label className="block mb-1 text-gray-900 dark:text-gray-100">Score:</label>
            <input type="text" name="score" className="border border-gray-300 dark:border-gray-700 p-2 w-full rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required />
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
            Submit Score
          </button>
        </form>
      </div>
    );
  }

  if (selectedAction === 'updateStory' || selectedAction === 'updateScore') {
    return (
      <div className="p-4 max-w-md mx-auto bg-white dark:bg-gray-800 rounded shadow">
        <button onClick={() => setSelectedAction(null)} className="mb-4 text-blue-500">
          &larr; Back to Dashboard
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {selectedAction === 'updateStory' ? 'Update Story' : 'Update Score'}
        </h2>
        <p className="text-gray-500 dark:text-gray-300">Update functionality coming soon.</p>
      </div>
    );
  }

  return null;
};

export default StaffPanel;
