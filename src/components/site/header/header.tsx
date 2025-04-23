// Header

import artboard from "@/assets/ThunderBolt.png";
import { Widgets } from "@/components/widgets";
// Start of imports
import { useIsMobile } from "@/hooks/use-mobile";
import { Suspense } from "react";
// End of imports

export function Header() {
	// see if the site is on a mobile device using the useIsMobile hook
	const mobile = useIsMobile();
	return (
		<header className="w-full bg-header text-ehs-white">
			<img
				src={artboard.src}
				alt=""
				className="h-full w-full drop-shadow-2xl"
			/>
			{/* <LatestPostsBar /> */}
			{/* This removes home page navbar on mobile devices */}
			{/* This is here to make the site look nicer on mobile devices */}
			{!mobile && <Widgets.Common.HeaderNavbarWidget />}
		</header>
	);
}
