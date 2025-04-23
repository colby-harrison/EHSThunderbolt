// Temporarily disabled

"use client";
// Start of imports
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
// End of imports

// WordPressApiResponse type | DO NOT TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING
// if you do not know what is going on in this section without comments
// you should not be messing with this section
// This section will be removed in the future
type WordPressApiResponse = {
	id: number;
	date: Date;
	date_gmt: Date;
	guid: { rendered: string };
	modified: string;
	modified_gmt: string;
	slug: string;
	status: string;
	type: string;
	link: string;
	title: { rendered: string };
	content: { rendered: string; protected: boolean };
	excerpt: { rendered: string; protected: boolean };
	author: number;
	featured_media: number;
	comment_status: string;
	ping_status: string;
	sticky: boolean;
	template: string;
	format: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	meta: Record<string, any>;
	categories: number[];
	tags: number[];
	class_list?: string[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	_links: Record<string, { href: string; [key: string]: any }[]>;
};
// End of WordPressApiResponse type | DO NOT TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING
// if you do not know what is going on in this section without comments
// you should not be messing with this section

export function LatestPostsBar() {
	// see if the site is on a mobile device using the useIsMobile hook
	const mobile = useIsMobile();
	// Start of tempData fetching | DO NOT TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING
	// if you do not know what is going on in this section without comments
	// you should not be messing with this section
	// This section will be removed in the future
	const [tempData, setTempData] = useState<WordPressApiResponse[] | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				"https://ehsthunderbolt.com/wp-json/wp/v2/posts",
			);
			const data: WordPressApiResponse[] = await response.json();
			setTempData(data);
		};
		fetchData();
	}, []);
	// End of tempData fetching | DO NOT TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING
	// if you do not know what is going on in this section without comments
	// you should not be messing with this section

	// if the site is on a mobile device, do not return anything,
	// this is here to make the site look nicer on mobile devices
	// without this, the white arrow will likely take up the whole
	// section, making it look weird
	if (mobile) {
		return null;
	}
	return (
		<>
			<div className="relative flex flex-row items-center py-2">
				{tempData === null ? (
					<h1 className="text-2xl">Loading...</h1>
				) : (
					<>
						<div
							className={
								"relative z-10 bg-arrow-right-bottom p-1 pr-10 text-ehs-black"
							}
						>
							<h1 className="whitespace-nowrap bg-ehs-white font-bold text-2xl">
								Latest posts
							</h1>
						</div>
						<div className="relative z-0 w-full overflow-hidden">
							<motion.div
								className="flex flex-row gap-2 whitespace-nowrap"
								// eslint-disable-next-line id-length
								initial={{ x: "100%" }}
								// eslint-disable-next-line id-length
								animate={{ x: "-400%" }}
								transition={{
									repeat: Number.POSITIVE_INFINITY,
									duration: 7.5 * tempData.length, // Adjust this for the speed of scrolling
									ease: "linear",
								}}
							>
								{tempData.map((post, index) => (
									<div key={index}>
										<a
											href={post.link}
											className="rounded p-2 font-bold text-xs hover:bg-ehs-gray/50 md:text-xl"
										>
											{post.title.rendered.replaceAll("&#8217;", "'")} |{" "}
											{post.date_gmt.toString().split("T")[0]}
										</a>
									</div>
								))}
							</motion.div>
						</div>
					</>
				)}
			</div>
		</>
	);
}
