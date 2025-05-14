import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { kv, tbtv } from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const TBTVRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(async ({ input, ctx }) => {
      const getCachedResult = unstable_cache(
        async () =>
          ctx.db.select().from(tbtv),
        [`all-tbtv-urls`],
        {
          revalidate: 60 * 60, // 1 hour
        },
      );
      return await getCachedResult();
    }),
});
