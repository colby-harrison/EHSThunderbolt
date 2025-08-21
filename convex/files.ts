import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    uuid: v.string(),
    key: v.string(),
    fullUrl: v.string(),
    type: v.string(),
    UploadedBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("files", args);
  },
});