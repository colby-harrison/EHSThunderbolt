"use client";

import dynamic from "next/dynamic";

export const Carousel = dynamic(
  () => import("../../category/carousel"),
  { ssr: false },
);