"use client";

import dynamic from "next/dynamic";

export const RTE = dynamic(
	() => import("../../form/code-editor"),
	{ ssr: false },
);