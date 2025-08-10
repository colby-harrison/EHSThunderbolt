"use client";
import { DashboardDataUpdater } from "@/components/DashboardProvider";
import { GlobalDataUpdater } from "@/components/GlobalProvider";
import { AllowedEmailsTable } from "@/components/site/dashboard/@admin/allowedemails/table";
import { Loading } from "@/components/site/loading";
import { useQuery } from "convex/react";
import { api } from "convex@/_generated/api";

export default function AdminPage() {
  const user = useQuery(api.users.currentUser);
  if (!user) {
    return <Loading />;
  }
  return (
    <div className='gap-4 '>
      <GlobalDataUpdater data={{ loading: false, navBarStyle: "brick"  }} />
      <DashboardDataUpdater data={{ dashboardName: "Admin", subpage: "Allowed Emails" }} />
      <AllowedEmailsTable />
    </div>
  );
}
