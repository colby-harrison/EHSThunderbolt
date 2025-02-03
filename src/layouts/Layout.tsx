// React Layout | This is the main *REACT* layout for the site;
// you will likely never need to edit this file
// but if you do, This will be well documented

// Start of imports
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import React from 'react';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header/Header';
// import Progress from "./progressbar";
// End of imports

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* <Progress /> */}
      <main className="w-full h-full">
        <Navbar />
        <div className="h-[calc(100vh-3rem)]">
          <AppSidebar />
          <div className="w-full h-full px-2 pb-2 overflow-y-scroll">
            <Header />
            {children}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
