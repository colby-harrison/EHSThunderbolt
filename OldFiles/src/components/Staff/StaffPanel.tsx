// src/components/staff/StaffPanel.tsx
import type React from "react";
import { useState } from "react";

type ActionType = "addStory" | "updateStory" | "addScore" | "updateScore";

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
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	// Dashboard state for selected action
	const [selectedAction, setSelectedAction] = useState<ActionType | null>(null);

	// Local data storage for testing with proper types
	const [stories, setStories] = useState<Story[]>([]);
	const [scores, setScores] = useState<Score[]>([]);

	// Handle login form submission
	const handleLogin = (event: React.FormEvent) => {
		event.preventDefault();
		// For testing, use hardcoded credentials: username: "admin", password: "password"
		if (username === "admin" && password === "password") {
			setLoggedIn(true);
			setMessage("");
		} else {
			setMessage("Invalid credentials");
		}
	};

	// Handle add story form submission
	const handleStorySubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const title = formData.get("title") as string;
		const summary = formData.get("summary") as string;
		const date = formData.get("date") as string;
		const newStory: Story = { title, summary, date };
		const updatedStories = [...stories, newStory];
		setStories(updatedStories);
		setMessage("Story added locally!");
		localStorage.setItem("stories", JSON.stringify(updatedStories));
		event.currentTarget.reset();
	};

	// Handle add score form submission
	const handleScoreSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const game = formData.get("game") as string;
		const score = formData.get("score") as string;
		const newScore: Score = { game, score };
		setScores([...scores, newScore]);
		setMessage("Score added locally!");
		event.currentTarget.reset();
	};

	if (!loggedIn) {
		return (
			<div className="mx-auto max-w-md rounded bg-white p-4 shadow dark:bg-gray-800">
				<h2 className="mb-4 font-bold text-2xl text-gray-900 dark:text-gray-100">
					Staff Login
				</h2>
				{message && <p className="mb-4 text-red-500">{message}</p>}
				<form onSubmit={handleLogin} className="space-y-4">
					<div>
						<label className="mb-1 block text-gray-900 dark:text-gray-100">
							Username:
						</label>
						<input
							type="text"
							value={username}
							onChange={(event) => setUsername(event.target.value)}
							className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
							required
						/>
					</div>
					<div>
						<label className="mb-1 block text-gray-900 dark:text-gray-100">
							Password:
						</label>
						<input
							type="password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full rounded bg-blue-500 p-2 text-white"
					>
						Log In
					</button>
				</form>
			</div>
		);
	}

	if (selectedAction === null) {
		return (
			<div className="mx-auto max-w-md rounded bg-white p-4 shadow dark:bg-gray-800">
				<h2 className="mb-4 font-bold text-2xl text-gray-900 dark:text-gray-100">
					Staff Dashboard
				</h2>
				{message && <p className="mb-4 text-green-500">{message}</p>}
				<div className="space-y-4">
					<button
						onClick={() => setSelectedAction("addStory")}
						className="w-full rounded bg-blue-500 p-2 text-white"
					>
						Add Story
					</button>
					<button
						onClick={() => setSelectedAction("updateStory")}
						className="w-full rounded bg-blue-500 p-2 text-white"
					>
						Update Story
					</button>
					<button
						onClick={() => setSelectedAction("addScore")}
						className="w-full rounded bg-blue-500 p-2 text-white"
					>
						Add Score
					</button>
					<button
						onClick={() => setSelectedAction("updateScore")}
						className="w-full rounded bg-blue-500 p-2 text-white"
					>
						Update Score
					</button>
				</div>
			</div>
		);
	}

	if (selectedAction === "addStory") {
		return (
			<div className="mx-auto max-w-md rounded bg-white p-4 shadow dark:bg-gray-800">
				<button
					onClick={() => setSelectedAction(null)}
					className="mb-4 text-blue-500"
				>
					&larr; Back to Dashboard
				</button>
				<h2 className="mb-4 font-bold text-2xl text-gray-900 dark:text-gray-100">
					Add Story
				</h2>
				<form onSubmit={handleStorySubmit} className="space-y-4">
					<div>
						<label className="mb-1 block text-gray-900 dark:text-gray-100">
							Title:
						</label>
						<input
							type="text"
							name="title"
							className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
							required
						/>
					</div>
					<div>
						<label className="mb-1 block text-gray-900 dark:text-gray-100">
							Summary:
						</label>
						<textarea
							name="summary"
							className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
							required
						></textarea>
					</div>
					<div>
						<label className="mb-1 block text-gray-900 dark:text-gray-100">
							Date:
						</label>
						<input
							type="date"
							name="date"
							className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full rounded bg-green-500 p-2 text-white"
					>
						Submit Story
					</button>
				</form>
			</div>
		);
	}

	if (selectedAction === "addScore") {
		return (
			<div className="mx-auto max-w-md rounded bg-white p-4 shadow dark:bg-gray-800">
				<button
					onClick={() => setSelectedAction(null)}
					className="mb-4 text-blue-500"
				>
					&larr; Back to Dashboard
				</button>
				<h2 className="mb-4 font-bold text-2xl text-gray-900 dark:text-gray-100">
					Add Score
				</h2>
				<form onSubmit={handleScoreSubmit} className="space-y-4">
					<div>
						<label className="mb-1 block text-gray-900 dark:text-gray-100">
							Game:
						</label>
						<input
							type="text"
							name="game"
							className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
							required
						/>
					</div>
					<div>
						<label className="mb-1 block text-gray-900 dark:text-gray-100">
							Score:
						</label>
						<input
							type="text"
							name="score"
							className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full rounded bg-green-500 p-2 text-white"
					>
						Submit Score
					</button>
				</form>
			</div>
		);
	}

	if (selectedAction === "updateStory" || selectedAction === "updateScore") {
		return (
			<div className="mx-auto max-w-md rounded bg-white p-4 shadow dark:bg-gray-800">
				<button
					onClick={() => setSelectedAction(null)}
					className="mb-4 text-blue-500"
				>
					&larr; Back to Dashboard
				</button>
				<h2 className="mb-4 font-bold text-2xl text-gray-900 dark:text-gray-100">
					{selectedAction === "updateStory" ? "Update Story" : "Update Score"}
				</h2>
				<p className="text-gray-500 dark:text-gray-300">
					Update functionality coming soon.
				</p>
			</div>
		);
	}

	return null;
};

export default StaffPanel;
