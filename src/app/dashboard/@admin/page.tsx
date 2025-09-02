"use client";
import { DashboardDataUpdater } from "@/components/DashboardProvider";
import { GlobalDataUpdater } from "@/components/GlobalProvider";
import { Loading } from "@/components/site/loading";
import { useQuery } from "convex/react";
import { api } from "convex@/_generated/api";

export default function AdminPage() {
  const user = useQuery(api.users.currentUser);
  if (!user) {
    return <Loading />;
  }
  return (
    <div className='container mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      <GlobalDataUpdater data={{ loading: false, navBarStyle: "brick"  }} />
      <DashboardDataUpdater data={{ dashboardName: "Admin", subpage: "Home" }} />
      <div className='col-span-2'>
        <h1 className='prose-h1'>Dashboard</h1>
        <p className='prose-p'>
          This is the dashboard. Hello, {user.name}! You are an Admin!
        </p>
      </div>
    </div>
  );
}
