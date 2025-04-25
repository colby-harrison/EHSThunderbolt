"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/react";
import Link from "next/link";

export default function NavigationWidget() {
	const [categories] = api.category.getAll.useSuspenseQuery();
	if (!categories)
		return (
			<div className="w-full max-w-xs rounded-lg border border-sidebar-border bg-sidebar text-sidebar-foreground shadow-xl h-80">
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
		<div className="w-full max-w-xs rounded-lg border border-sidebar-border bg-sidebar text-sidebar-foreground shadow-xl h-80">
			<div className="border-sidebar-border border-b-2 p-4 shadow-xl">
				<h2 className="font-bold text-xl">Categories</h2>
			</div>
			<ScrollArea className="h-full w-auto">
				<div className="p-4">
					{categories?.map((category) => (
						<span key={category.id}>
							<div className="text-sm" key={category.id}>
								<Link href={`/category/${category.id}`} className="prose-a">
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
