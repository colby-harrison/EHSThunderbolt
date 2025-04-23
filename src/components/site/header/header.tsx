// Header

import artboard from "@/assets/Artboard-1-2.png";
// Start of imports
import { useIsMobile } from "@/hooks/use-mobile";
import { Widgets } from "@/components/widgets";
import { Suspense } from "react";
// End of imports

export function Header() {
  // see if the site is on a mobile device using the useIsMobile hook
  const mobile = useIsMobile();
  return (
    <header className='w-full bg-ehs-blue text-ehs-white'>
      <img src={artboard.src} alt='' className='h-full w-full' />
      {/* <LatestPostsBar /> */}
      {/* This removes home page navbar on mobile devices */}
      {/* This is here to make the site look nicer on mobile devices */}
      {!mobile && <Widgets.Common.HeaderNavbarWidget />}
    </header>
  );
}
