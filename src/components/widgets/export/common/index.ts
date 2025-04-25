"use client";

import dynamic from "next/dynamic";

export const CategoryNavigation = dynamic(
	() => import("../../common/navigation-categories"),
	{ ssr: false },
);

export const HeaderNavbar = dynamic(
	() => import("../../common/navigation-navbar"),
	{ ssr: false },
);

export const AppSidebar = dynamic(() => import("../../common/app-sidebar"), {
	ssr: false,
});
