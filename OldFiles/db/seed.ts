import { categories, db } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(categories).values([
		{
			name: "test",
		},
		{
			name: "test2",
		},
	]);
}
