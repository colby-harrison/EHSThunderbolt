// Header

import artboard from "@/assets/Artboard-1-2.png";
// Start of imports
import { useIsMobile } from "@/hooks/use-mobile";
import HeaderBtn from "./HeaderBtn";
import LatestPostsBar from "./LatestPostsBar";
// End of imports

export default function Header() {
	// see if the site is on a mobile device using the useIsMobile hook
	const mobile = useIsMobile();
	return (
		<header className="w-full bg-ehs-blue text-ehs-white">
			<img src={artboard.src} alt="" className="h-full w-full" />
			<LatestPostsBar />
			{/* This removes home page navbar on mobile devices */}
			{/* This is here to make the site look nicer on mobile devices */}
			{!mobile && (
				<div className="flex h-full flex-row justify-between gap-2 p-2">
					<HeaderBtn text="Community" href="/community" />
					<HeaderBtn text="2025 Grads" href="/grads" />
					<HeaderBtn text="Student Life" href="/studentlife" />
					<HeaderBtn text="Clubs and Activities" href="/clubsandactivities" />
					<HeaderBtn text="Sports" href="/sports" />
					<HeaderBtn text="News" href="/news" />
					<HeaderBtn
						text="Offical School Site"
						href="https://east.laramie1.org"
					/>
				</div>
			)}
		</header>
	);
}
