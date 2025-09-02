"use client";
import { Header } from "@/components/site/header/header";
import { Navbar } from "@/components/site/navbar";
// Start of imports
import { SidebarProvider } from "@/components/ui/sidebar";
import { Widgets } from "@/components/widgets";
import type React from "react";
import { Footer } from "./footer/footer";
import { useGlobalData } from "../GlobalProvider";
import { usePathname } from "next/navigation";
import { BlinkBlur } from "react-loading-indicators";
import { cn } from "@/lib/utils";
// import Progress from "./progressbar";
// End of imports

export function Layout({ children }: { children: React.ReactNode }) {
  const { globalData } = useGlobalData();
  const pathname = usePathname();
  if (globalData.loading) {
    return (
      <main className="flex flex-col justify-center items-center w-full h-dvh gap-4">
        <BlinkBlur color="#62C6F2" size="large"/>
        <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight 2xl:text-5xl text-[#215476] text-center">EHS Thunderbolt – Where News Hits Like Thunder</h1>
        <p className="prose-p text-[#215476]">Loading, Please Wait...</p>
        <div className="hidden">
          {children}
        </div>
      </main>
    );
  }
  return (
    <SidebarProvider>
      {/* <Progress /> */}
      <main className='h-full w-full'>
        <Navbar style={globalData.navBarStyle!} />
        <Widgets.Common.AppSidebar />
        <div className={cn(globalData.navBarStyle !== "none" ? 'min-h-[calc(100dvh-3rem)]' : 'min-h-dvh', pathname.startsWith("/dashboard") || globalData.navBarStyle === "none" ? "p-0" : "p-2" )}>
          {globalData.showHeader &&
            !pathname.startsWith("/dashboard") &&
            !pathname.startsWith("/auth") && <Header />}
          {children}
        </div>
        {
          !pathname.startsWith('/auth') && !pathname.startsWith("/dashboard") && globalData.navBarStyle !== "none" && <Footer />
        }
      </main>
    </SidebarProvider>
  );
}
