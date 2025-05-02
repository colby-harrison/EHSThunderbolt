import { query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("realtimekv").collect();
  },
});

export const getByKey = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.query("realtimekv").filter((q) => q.eq(q.field("key"), args.key)).first();
  },
});