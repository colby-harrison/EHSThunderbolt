import { DashboardDataUpdater } from "@/components/DashboardProvider";
import { Sidebar } from "@/components/site/dashboard/@admin/sidebar";
import { TitleBar } from "@/components/site/dashboard/@admin/titlebar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='h-full w-full flex flex-row'>
      <DashboardDataUpdater data={{ dashboardName: "Admin" }} />
      {/* Sidebar */}
      <Sidebar />
      <div className='flex-col w-full'>
        {/* Title Bar */}
        <TitleBar />
        {/* Page */}
        <div className="p-4 overflow-y-auto h-[calc(100dvh-6rem)]">{children}</div>
      </div>
    </div>
  );
}
