import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { kv } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const kvRouter = createTRPCRouter({
  getByKey: publicProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ input, ctx }) => {
      const getCachedResult = unstable_cache(
        async () =>
          ctx.db.query.kv.findFirst({
            where(fields, operators) {
              return operators.eq(fields.key, input.key);
            },
          }),
        [`kv-${input.key}`],
        {
          revalidate: 60 * 60 * 24 * 365, // 1 year
        },
      );
      return await getCachedResult();
    }),
  getByKeyNoCache: publicProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.query.kv.findFirst({
        where(fields, operators) {
          return operators.eq(fields.key, input.key);
        },
      });
    }),
});
