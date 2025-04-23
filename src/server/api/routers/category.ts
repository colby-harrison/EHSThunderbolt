import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { categories } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const categoryRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx }) => {
		const getCachedResult = unstable_cache(
			async () => ctx.db.select().from(categories),
			["all-categories"],
			{
				revalidate: 60 * 60 * 24 * 7, // 1 week
			},
		);
		return await getCachedResult();
	}),
	getById: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ input, ctx }) => {
			const getCachedResult = unstable_cache(
				async () =>
					ctx.db.query.categories.findFirst({
						where(fields, operators) {
							return operators.eq(fields.id, input.id);
						},
					}),
				[`category-${input.id}`],
				{
					revalidate: 60 * 60 * 24 * 365, // 1 year
				},
			);
			return await getCachedResult();
		}),
});
