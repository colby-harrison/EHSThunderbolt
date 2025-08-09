import { GlobalDataUpdater } from "@/components/GlobalProvider";
import { DashboardContent } from "@/components/site/dashboard/dashboard-main-layout";
import { Suspense } from "react";

export default function Layout({
  newUser,
  writer,
  admin,
}: {
  newUser: React.ReactNode;
  writer: React.ReactNode;
  admin: React.ReactNode;
}) {
  return <DashboardContent newUser={newUser} writer={writer} admin={admin} />;
}
