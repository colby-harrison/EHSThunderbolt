import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { teachers } from "@/server/db/schema";
import { unstable_cache } from "next/cache";

export const teacherRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ ctx }) => {
		const getCachedResult = unstable_cache(
			async () => ctx.db.select().from(teachers),
			["all-teachers"],
			{
				revalidate: 60 * 60 * 24 * 7, // 1 week
			},
		);
		return await getCachedResult();
	}),
});
