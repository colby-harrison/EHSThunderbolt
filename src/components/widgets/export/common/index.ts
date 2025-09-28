"use client";

import dynamic from "next/dynamic";

export const CategoryNavigation = dynamic(
  () => import("../../common/navigation-categories"),
  { ssr: false }
);

export const HeaderNavbar = dynamic(
  () => import("../../common/navigation-navbar"),
  { ssr: false }
);

export const AppSidebar = dynamic(() => import("../../common/app-sidebar"), {
  ssr: false,
});

export const TBTVBanner = dynamic(() => import("../../common/tbtv-banner"), {
  ssr: false,
});

export const LegacySubpageButton = dynamic(
  () => import("../../common/legacy-subpage-button"),
  { ssr: false }
);

export const GetDate = dynamic(() => import("../../common/time"), {
  ssr: false,
});
