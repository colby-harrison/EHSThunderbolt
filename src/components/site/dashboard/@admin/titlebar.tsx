"use client";
import { useDashboardData } from "@/components/DashboardProvider";

export function TitleBar() {
  const data = useDashboardData();
  return (
    <div className='h-12 w-full border-b border-sidebar-border bg-sidebar text-sidebar-foreground flex items-center px-2'>
      <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">
        {data.dashboardData.dashboardName} | {data.dashboardData.subpage}
      </h1>
    </div>
  );
}
