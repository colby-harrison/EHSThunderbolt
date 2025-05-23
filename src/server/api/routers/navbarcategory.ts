import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { categories, navbarCategories } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const navbarCategoryRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx }) => {
		const getCachedResult = unstable_cache(
			async () => ctx.db.select().from(navbarCategories),
			["navbar-categories"],
			{
				revalidate: 60 * 60 * 24 * 7, // 1 week
			},
		);
		const result = await getCachedResult();
		return result;
	}),
	updateById: publicProcedure
		.input(
			z.object({
				id: z.number(),
				categoryId: z.number(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			await ctx.db
				.update(navbarCategories)
				.set({ categoryId: input.categoryId })
				.where(eq(navbarCategories.id, input.id));
		}),
});
