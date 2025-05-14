import Link from "next/link";

import { HydrateClient, api } from "@/trpc/server";

import { Widgets } from "@/components/widgets";

export default async function Teachers() {
	const rawData = await api.teacher.getAll();
	const teachers = rawData.sort((a, b) => a.job!.localeCompare(b.job!));
	return (
		<HydrateClient>
			<main className=" container mx-auto grid grid-cols-2 gap-2 py-2 md:grid-cols-4 lg:grid-cols-6">
				{teachers.map((teacher, index) => (
					<div key={index}>
						<Widgets.Teacher.Card teacher={teacher} />
					</div>
				))}
			</main>
		</HydrateClient>
	);
}
