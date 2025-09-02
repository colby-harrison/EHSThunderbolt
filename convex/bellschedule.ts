import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const tab = await ctx.db.query("bellScheduleTab").collect();
    const lines = await ctx.db.query("bellScheduleLine").collect();
    return tab.map((v, index) => {
      return {
        ...v,
        schedule: lines.filter((l) => l.tab === v._id),
      };
    });
  },
});

export const getLinesByTab = query({
  args: { tab: v.id("bellScheduleTab") },
  handler: async (ctx, args) => {
    const lines = await ctx.db
      .query("bellScheduleLine")
      .withIndex("by_tab", (q) => q.eq("tab", args.tab))
      .collect();
    return lines;
  },
});

export const createTab = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("bellScheduleTab", {
      name: args.name,
    });
  },
});

export const createLine = mutation({
  args: {
    tab: v.id("bellScheduleTab"),
    period: v.string(),
    periodLine2: v.string(),
    time: v.string(),
    timeLine2: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("bellScheduleLine", {
      tab: args.tab,
      period: args.period,
      periodLine2: args.periodLine2,
      time: args.time,
      timeLine2: args.timeLine2,
    });
  },
});

export const updateLine = mutation({
  args: {
    id: v.id("bellScheduleLine"),
    tab: v.optional(v.id("bellScheduleTab")),
    period: v.optional(v.string()),
    periodLine2: v.optional(v.string()),
    time: v.optional(v.string()),
    timeLine2: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(args.id, updates);
  },
});

export const del = mutation({
  args: { id: v.id("bellScheduleTab") },
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("bellScheduleLine")
      .withIndex("by_tab", (q) => q.eq("tab", args.id))
      .collect();
    for (const row of rows) {
      await ctx.db.delete(row._id);
    }
    await ctx.db.delete(args.id);
  },
});

export const delLine = mutation({
  args: { id: v.id("bellScheduleLine") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
