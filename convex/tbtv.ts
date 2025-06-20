import { query } from "./_generated/server";
import { v } from "convex/values";

export const getall = query({
  handler: async (ctx) => {
    return await ctx.db.query("tbtvLegacy").collect();
  },
});

