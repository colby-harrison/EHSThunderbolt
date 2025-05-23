// Header

import artboard from "@/assets/UTF-8Artboard 5.png";
import { Widgets } from "@/components/widgets";
// Start of imports
import { useIsMobile } from "@/hooks/use-mobile";
import { Suspense } from "react";
// End of imports

export function Header() {
	// see if the site is on a mobile device using the useIsMobile hook
	const mobile = useIsMobile();
	return (
		<header className="w-full bg-header text-ehs-white rounded-xl">
			<img
				src={artboard.src}
				alt="EHS Thunderbolt WordMark"
				className="h-full w-3/4 drop-shadow-2xl mx-auto"
			/>
			<Widgets.Common.TBTVBanner />
			{/* <LatestPostsBar /> */}
			{/* This removes home page navbar on mobile devices */}
			{/* This is here to make the site look nicer on mobile devices */}
			{!mobile && <Widgets.Common.HeaderNavbar />}
		</header>
	);
}
