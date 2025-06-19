"use client";
import { Header } from "@/components/site/header/header";
import { Navbar } from "@/components/site/navbar";
// Start of imports
import { SidebarProvider } from "@/components/ui/sidebar";
import { Widgets } from "@/components/widgets";
import type React from "react";
import { Footer } from "./footer/footer";
import { useGlobalData } from "../GlobalProvider";
// import Progress from "./progressbar";
// End of imports

export function Layout({ children }: { children: React.ReactNode }) {
  const { globalData } = useGlobalData();
  if (!globalData.showHeader) return null;
  return (
    <SidebarProvider>
      {/* <Progress /> */}
      <main className='h-full w-full'>
        <Navbar />
        <Widgets.Common.AppSidebar />
        <div className='px-2 pb-2 min-h-[calc(100dvh-3rem)]'>
          <Header />
          {children}
        </div>
        <Footer />
      </main>
    </SidebarProvider>
  );
}
