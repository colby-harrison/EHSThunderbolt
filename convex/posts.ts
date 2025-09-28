import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const listUnderReview = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_published", (q) => q.eq("published", "NR"))
      .paginate(args.paginationOpts);
  },
});

export const UnderReview = query({
  handler: async (ctx) => {
    return (await ctx.db
      .query("posts")
      .withIndex("by_published", (q) => q.eq("published", "NR"))
      .collect()).length;
  },
});

export const newPost = mutation({
  args: {
    title: v.string(),
    excerpt: v.string(),
    image: v.string(),
    content: v.bytes(),
    author: v.id("users"),
    category: v.id("categories"),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("posts", {
      title: args.title,
      excerpt: args.excerpt,
      image: args.image,
      content: args.content,
      author: args.author,
      category: args.category,
      published: "NR",
      date: args.date,
    });
  },
});