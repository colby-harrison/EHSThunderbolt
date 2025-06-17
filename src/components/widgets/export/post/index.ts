"use client";

import dynamic from "next/dynamic";

export const Header = dynamic(
	() => import("../../post/header"),
	{ ssr: false },
);