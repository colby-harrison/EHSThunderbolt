import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { posts } from "@/server/db/schema";
import { unstable_cache } from "next/cache";
import { desc, eq } from "drizzle-orm";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const getCachedResult = unstable_cache(
      async () => ctx.db.select().from(posts),
      ["all-posts"],
      {
        revalidate: 60 * 60, // 1 hour
      }
    );
    return await getCachedResult();
  }),
  getRecent: publicProcedure
    .input(z.object({ limit: z.number().default(10) }))
    .query(async ({ ctx, input }) => {
      const getCachedResult = unstable_cache(
        async () =>
          ctx.db
            .select()
            .from(posts)
            .orderBy(desc(posts.date))
            .limit(input.limit),
        [`recent-${input.limit}-posts`],
        {
          revalidate: 60 * 60, // 1 hour
        }
      );
      return await getCachedResult();
    }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const getCachedResult = unstable_cache(
        async () =>
          ctx.db.query.posts.findFirst({
            where(fields, operators) {
              return operators.eq(fields.id, input.id);
            },
          }),
        [`post-${input.id}`],
        {
          revalidate: 60 * 60 * 24 * 365, // 1 year
        }
      );
      return await getCachedResult();
    }),
  getRecentByCategory: publicProcedure
    .input(z.object({ categoryId: z.number(), limit: z.number().default(10) }))
    .query(async ({ input, ctx }) => {
      const getCachedResult = unstable_cache(
        async () =>
          ctx.db
            .select()
            .from(posts)
            .where(eq(posts.category, input.categoryId))
            .orderBy(desc(posts.date))
            .limit(input.limit),
        [`recent-${input.categoryId}-${input.limit}-posts`],
        {
          revalidate: 60 * 60, // 1 hour
        }
      );
      return await getCachedResult();
    }),
  getsitemappage: publicProcedure
    .input(z.object({ page: z.number().default(1) }))
    .query(async ({ input, ctx }) => {
      const getCachedResult = unstable_cache(
        async () =>
          ctx.db
            .select()
            .from(posts)
            .orderBy(desc(posts.date))
            .limit(100)
            .offset((input.page - 1) * 10),
        [`sitemap-${input.page}-posts`],
        {
          revalidate: 60 * 60 * 24, // 1 day
        }
      );
      return await getCachedResult();
    }),
  getcount: publicProcedure.query(async ({ ctx }) => {
    const getCachedResult = unstable_cache(
      async () => ctx.db.$count(posts),
      ["posts-count"],
      {
        revalidate: 60 * 60 * 24, // 1 day
      }
    );
    return await getCachedResult();
  }),
});
