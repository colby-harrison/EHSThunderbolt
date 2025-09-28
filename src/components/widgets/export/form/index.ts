"use client";

import dynamic from "next/dynamic";

export const RTE = dynamic(
	() => import("../../form/code-editor"),
	{ ssr: false },
);

export const FormBuilder = dynamic(
	() => import("../../form/form-builder/index"),
	{ ssr: false },
);