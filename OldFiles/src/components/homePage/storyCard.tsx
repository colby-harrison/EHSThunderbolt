import type React from "react";
import { useState } from "react";

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
			className="cursor-pointer rounded border border-gray-200 p-4 shadow transition hover:bg-gray-50 dark:border-[#333] dark:hover:bg-gray-700"
		>
			<div className="flex items-center justify-between">
				<h3 className="font-bold text-lg">{title}</h3>
				{date && <span className="text-gray-500 text-sm">{date}</span>}
			</div>
			<p className="mt-2 text-sm">
				{expanded
					? summary
					: summary.length > 100
						? `${summary.substring(0, 100)}...`
						: summary}
			</p>
			<div className="mt-2 text-blue-500 text-sm">
				{expanded ? "Show less" : "Read more"}
			</div>
		</div>
	);
};

export default StoryCard;
