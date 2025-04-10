import Link from "next/link";

import { HydrateClient, api } from "@/trpc/server";

import { NavigationWidget as CategoryNavigationWidget } from "@/components/widgets/common/navigation-categories";

export default async function Home() {
	return (
		<HydrateClient>
			<main className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 py-2 container mx-auto">
				<CategoryNavigationWidget />
			</main>
		</HydrateClient>
	);
}
