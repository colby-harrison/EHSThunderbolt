"use client";

import { HeaderBtn } from "@/components/site/header/header-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/react";
import Link from "next/link";

export default function NavigationWidget() {
	const [categories] = api.navbarCategory.getAll.useSuspenseQuery();
	const [categoryList] = api.category.getAll.useSuspenseQuery();
	return (
		<>
			{!categories ? (
				<div className="hidden h-full grid-cols-7 gap-2 p-2 lg:grid">
					<div>Loading...</div>
					<div />
					<div />
					<div />
					<div />
					<HeaderBtn text="2025 Grads" href="/grads" />
					<HeaderBtn
						text="Offical School Site"
						href="https://east.laramie1.org"
					/>
				</div>
			) : (
				<div className="hidden h-full grid-cols-7 gap-2 p-2 lg:grid">
					{categories.map((category, index) => (
						<>
							{category.categoryId !== -1 ? (
								<HeaderBtn
									text={
										categoryList.find((c) => c.id === category.categoryId)?.name!
									}
									href={`/category/${category.categoryId}`}
									key={index}
								/>
							) : (
								<div key={index} />
							)}
						</>
					))}
					<HeaderBtn text="2025 Grads" href="/grads" />
					<HeaderBtn
						text="Offical School Site"
						href="https://east.laramie1.org"
					/>
				</div>
			)}
		</>
	);
}
