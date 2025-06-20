import { query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const realtimekv = await ctx.db.query("realtimekv").collect();
    const kv = await ctx.db.query("kv").collect();
    return [...realtimekv, ...kv];
  },
});

export const getByKey = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const realtimekv = await ctx.db.query("realtimekv").withIndex("by_key", (q) => q.eq("key", args.key)).first();
    const kv = await ctx.db.query("kv").withIndex("by_key", (q) => q.eq("key", args.key)).first();
    return kv ?? realtimekv;
  },
});