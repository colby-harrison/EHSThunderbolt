"use client";

import dynamic from "next/dynamic";

export const Card = dynamic(
	() => import("../../teachers/teachers-card"),
	{ ssr: false },
);
