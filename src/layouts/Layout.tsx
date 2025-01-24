import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import React from "react";
import Navbar from "@/components/Navbar";
// import Progress from "./progressbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(() => {
    const savedOpenState = sessionStorage.getItem("main-sidebarOpen");
    return savedOpenState ? JSON.parse(savedOpenState) : true;
  });
  React.useEffect(() => {
    sessionStorage.setItem("main-sidebarOpen", JSON.stringify(open));
  }, [open]);
  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      {/* <Progress /> */}
      <main className='w-full h-full'>
        <Navbar />
        <div className='h-[calc(100vh-3rem)] flex flex-row'>
        <AppSidebar />
        {children}</div>
      </main>
    </SidebarProvider>
  );
}