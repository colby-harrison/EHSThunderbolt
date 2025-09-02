import { query } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("categories").collect();
  },
});

export const getById = query({
  args: { id: v.id("categories") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getNavbarCategories = query({
  handler: async (ctx) => {
    const navbarCategories = await ctx.db.query("navbarCategories").collect();
    return Promise.all(
      (navbarCategories ?? []).map(async (category, index) => ({
        index,
        category: await ctx.db.get(category.category),
      }))
    );
  },
});
