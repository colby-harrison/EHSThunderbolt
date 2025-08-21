"use client";
import { DashboardDataUpdater } from "@/components/DashboardProvider";
import { GlobalDataUpdater } from "@/components/GlobalProvider";
import { Loading } from "@/components/site/loading";
import { useQuery } from "convex/react";
import { api } from "convex@/_generated/api";
import CardComponent from "@/components/site/dashboard/@admin/bellschedule/card";

export default function AdminPage() {
  const user = useQuery(api.users.currentUser);
  if (!user) {
    return <Loading />;
  }
  const bellSchedule = useQuery(api.bellschedule.getAll);
  if (!bellSchedule) {
    return <Loading />;
  }
  return (
    <div className='gap-4'>
      <GlobalDataUpdater data={{ loading: false, navBarStyle: "brick" }} />
      <DashboardDataUpdater
        data={{ dashboardName: "Admin", subpage: "Bell Schedule" }}
      />
      <CardComponent user={user} />
    </div>
  );
}