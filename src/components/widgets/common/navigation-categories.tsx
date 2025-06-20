"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "convex/react";
import { api } from "convex@/_generated/api";
import Link from "next/link";

export default function NavigationWidget() {
	const categories = useQuery(api.categories.getAll);
	if (!categories)
		return (
			<div className="w-full rounded-lg border border-sidebar-border bg-sidebar text-sidebar-foreground shadow-xl h-80">
				<div className="border-sidebar-border border-b-2 p-4 shadow-xl">
					<h2 className="font-bold text-xl">Categories</h2>
				</div>
				<ScrollArea className="h-full w-auto">
					<div className="p-4">
						<span>
							<div className="text-sm">Loading...</div>
							<Separator className="my-2" />
						</span>
					</div>
				</ScrollArea>
			</div>
		);
	return (
		<div className="w-full rounded-lg border border-sidebar-border bg-sidebar text-sidebar-foreground shadow-xl h-80">
			<div className="border-sidebar-border border-b-2 p-4 shadow-xl">
				<h2 className="font-bold text-xl">Categories</h2>
			</div>
			<ScrollArea className="h-full w-auto">
				<div className="p-4">
					{categories?.map((category) => (
						<span key={category._id}>
							<div className="text-sm" key={category._id}>
								<Link href={`/category/${category._id}`} className="prose-a">
									{category.name}
								</Link>
							</div>
							<Separator className="my-2" />
						</span>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
