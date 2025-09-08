import { paginationOptsValidator } from "convex/server";
import { action, internalQuery, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api, internal } from "./_generated/api";

export const isAllowedEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const emails = await ctx.db.query("allowedEmails").collect();
    return emails.some((email) => email.email === args.email);
  },
});

export const internalIsAllowedEmail = internalQuery({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const emails = await ctx.db.query("allowedEmails").collect();
    return emails.some((email) => email.email === args.email);
  },
});

export const list = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("allowedEmails")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const deleteEmail = mutation({
  args: { ID: v.id("allowedEmails") },
  handler: async (ctx, args) => {
    const email = await ctx.db.get(args.ID);
    await ctx.db.delete(args.ID);
    if (email) {
      await ctx.runMutation(internal.users.deleteEmailFromAccounts, {
        email: email?.email!,
        Id: email?.userID!,
      });
    }
  },
});

export const addEmail = mutation({
  args: { email: v.string(), name: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("allowedEmails", {
      email: args.email,
      name: args.name,
    });
  },
});

export const addUID = mutation({
  args: { ID: v.id("allowedEmails"), UID: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.ID, { userID: args.UID });
  },
});

export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("allowedEmails")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

export const addUIDAction = action({
  args: { UID: v.id("users"), email: v.string() },
  handler: async (ctx, args) => {
    const allowedemail = await ctx.runQuery(api.allowedemail.getByEmail, {
      email: args.email,
    });
    await ctx.runMutation(api.allowedemail.addUID, {
      UID: args.UID,
      ID: allowedemail?._id!,
    });
  },
});
