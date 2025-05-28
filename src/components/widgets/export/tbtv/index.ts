"use client";

import dynamic from "next/dynamic";

export const Live = dynamic(() => import("../../tbtv/live"), { ssr: false });