"use client";

import dynamic from "next/dynamic";

export const Table = dynamic(
	() => import("../../bellschedule/table"),
	{ ssr: false },
);

export const Calendar = dynamic(
  () => import("../../bellschedule/calendar"),
  {ssr: false}
)

export const TableProse = dynamic(
  () => import("../../bellschedule/table-prose"),
  {ssr: false}
)

export const CalendarProse = dynamic(
  () => import("../../bellschedule/calendar-prose"),
  {ssr: false}
)