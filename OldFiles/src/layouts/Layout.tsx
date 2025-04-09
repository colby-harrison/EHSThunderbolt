// React Layout | This is the main *REACT* layout for the site;
// you will likely never need to edit this file
// but if you do, This will be well documented

import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header/Header";
import Navbar from "@/components/site/navbar";
// Start of imports
import { SidebarProvider } from "@/components/ui/sidebar";
import type React from "react";
// import Progress from "./progressbar";
// End of imports

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			{/* <Progress /> */}
			<main className="h-full w-full">
				<Navbar />
				<div className="h-[calc(100vh-3rem)]">
					<AppSidebar />
					<div className="h-full w-full overflow-y-scroll px-2 pb-2">
						<Header />
						{children}
					</div>
				</div>
			</main>
		</SidebarProvider>
	);
}
