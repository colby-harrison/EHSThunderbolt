import Link from "next/link";

import { HydrateClient, api } from "@/trpc/server";

import { Widgets } from "@/components/widgets";

export default async function Home() {
	return (
		<HydrateClient>
			<main className="container mx-auto grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				<Widgets.Common.CategoryNavigation />
			</main>
		</HydrateClient>
	);
}
