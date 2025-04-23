"use client";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
// Start of imports
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarSeparator,
} from "@/components/ui/sidebar";
import { api } from "@/trpc/react";
import {
	BellElectric,
	BicepsFlexed,
	Camera,
	ChevronDown,
	Circle,
	Code,
	GraduationCap,
	House,
	Newspaper,
	NotebookPen,
	School,
	ShieldHalf,
	Sparkle,
	SquareActivity,
	Trophy,
	UsersRound,
	Video,
} from "lucide-react";
import Link from "next/link";
import React from "react";
// End of imports

export default function AppSidebar() {
	// Start state saving for collapsibles
	const [sidebar_collapsible_1_open, sidebar_collapsible_1_setOpen] =
		useSidebarState(1);
	const [sidebar_collapsible_2_open, sidebar_collapsible_2_setOpen] =
		useSidebarState(2);
	const [sidebar_collapsible_3_open, sidebar_collapsible_3_setOpen] =
		useSidebarState(3);
	const [sidebar_collapsible_4_open, sidebar_collapsible_4_setOpen] =
		useSidebarState(4);
	// End state saving for collapsibles

	const [categories] = api.navbarCategory.getAll.useSuspenseQuery();
	const [categoryList] = api.category.getAll.useSuspenseQuery();
	return (
		<Sidebar collapsible="offcanvas" variant="floating">
			<SidebarHeader />
			<SidebarContent>
				<Collapsible
					className="group/collapsible"
					open={sidebar_collapsible_1_open}
					onOpenChange={sidebar_collapsible_1_setOpen}
				>
					<SidebarGroup>
						<SidebarGroupLabel asChild>
							<CollapsibleTrigger>
								EHS ThunderBolt
								<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
							</CollapsibleTrigger>
						</SidebarGroupLabel>
						<CollapsibleContent>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<a href="/">
												<House />
												<span>Home</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
									{categories.map((category, index) => (
										<>
											{category.categoryId !== "-1" && (
												<SidebarMenuItem key={index}>
													<SidebarMenuButton asChild>
														<Link href={`/category/${category.categoryId}`}>
															<Circle />
															<span>
																{
																	categoryList.find(
																		(c) => c.id === category.categoryId,
																	)?.name
																}
															</span>
														</Link>
													</SidebarMenuButton>
												</SidebarMenuItem>
											)}
										</>
									))}
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<a href="/grads">
												<GraduationCap />
												<span>2025 Grads</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</CollapsibleContent>
					</SidebarGroup>
				</Collapsible>
				<SidebarSeparator />
				<Collapsible
					className="group/collapsible"
					open={sidebar_collapsible_2_open}
					onOpenChange={sidebar_collapsible_2_setOpen}
				>
					<SidebarGroup>
						<SidebarGroupLabel asChild>
							<CollapsibleTrigger>
								Media
								<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
							</CollapsibleTrigger>
						</SidebarGroupLabel>
						<CollapsibleContent>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<a href="/photos">
												<Camera />
												<span>Photos</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<a href="/tbtv">
												<Video />
												<span>TBTV</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</CollapsibleContent>
					</SidebarGroup>
				</Collapsible>
				<SidebarSeparator />
				<Collapsible
					className="group/collapsible"
					open={sidebar_collapsible_3_open}
					onOpenChange={sidebar_collapsible_3_setOpen}
				>
					<SidebarGroup>
						<SidebarGroupLabel asChild>
							<CollapsibleTrigger>
								School Info
								<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
							</CollapsibleTrigger>
						</SidebarGroupLabel>
						<CollapsibleContent>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<a href="/bellschedule">
												<BellElectric />
												<span>Bell Schedule</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<a href="/flextime">
												<BicepsFlexed />
												<span>Flex Time</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<a href="https://east.laramie1.org">
												<School />
												<span>Offical School Website</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<a href="https://laramie1.org">
												<ShieldHalf />
												<span>LCSD1 Website</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</CollapsibleContent>
					</SidebarGroup>
				</Collapsible>

				<SidebarSeparator />
				<Collapsible
					className="group/collapsible"
					open={sidebar_collapsible_4_open}
					onOpenChange={sidebar_collapsible_4_setOpen}
				>
					<SidebarGroup>
						<SidebarGroupLabel asChild>
							<CollapsibleTrigger>
								School Staff
								<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
							</CollapsibleTrigger>
						</SidebarGroupLabel>
						<CollapsibleContent>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<a href="/thunderboltstaff">
												<Code />
												<span>ThunderBolt Staff</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton asChild>
											<a href="/ehsteachers">
												<UsersRound />
												<span>EHS Teachers</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</CollapsibleContent>
					</SidebarGroup>
				</Collapsible>
			</SidebarContent>
			<SidebarSeparator />
			<SidebarRail />
		</Sidebar>
	);
}

// track sidebar state
function useSidebarState(collapsibleNumber: number) {
	const [isOpen, setIsOpen] = React.useState(true);

	return [isOpen, setIsOpen] as const; // Explicitly return a tuple
}
