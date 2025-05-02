import { postsRouter } from "@/server/api/routers/posts";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { categoryRouter } from "./routers/category";
import { navbarCategoryRouter } from "./routers/navbarcategory";
import { teacherRouter } from "./routers/teacher";
import { kvRouter } from "./routers/kv";
import { TBTVRouter } from "./routers/tbtv";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	posts: postsRouter,
	category: categoryRouter,
	navbarCategory: navbarCategoryRouter,
	teacher: teacherRouter,
	kv: kvRouter,
	tbtv: TBTVRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
