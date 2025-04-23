"use client";

import dynamic from "next/dynamic";

export const TeacherWidget = dynamic(
  () => import("../../teachers/teachers-card"),
  { ssr: false }
);