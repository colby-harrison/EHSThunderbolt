"use client";

import dynamic from "next/dynamic";

export const Header = dynamic(
	() => import("../../post/header"),
	{ ssr: false },
);

export const PostButton = dynamic(
	() => import("../../post/post-button"),
	{ ssr: false },
);

export const CodeBlock = dynamic(
	() => import("../../post/code-block"),
	{ ssr: false },
);