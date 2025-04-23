"use client";

import dynamic from "next/dynamic";

export const CategoryNavigationWidget = dynamic(
  () => import("../../common/navigation-categories"),
  { ssr: false }
);

export const HeaderNavbarWidget = dynamic(
  () => import("../../common/navigation-navbar"),
  { ssr: false }
);

export const AppSidebar = dynamic(
  () => import("../../common/app-sidebar"),
  { ssr: false }
)