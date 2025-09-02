import { getAuthUserId } from "@convex-dev/auth/server";
import { action, internalMutation, mutation, query } from "./_generated/server";
import { containsBadWord } from "./common_utils";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { paginationOptsValidator } from "convex/server";

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});

export const currentUserRole = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    const user = await ctx.db.get(userId);
    if (user === null) {
      return null;
    }
    return user.role;
  },
});

export const editNameMutation = mutation({
  args: {
    userID: v.id("users"),
    name: v.string(),
    reviewNeeded: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userID, {
      name: args.name,
      reviewed: args.reviewNeeded,
      image: `https://api.dicebear.com/9.x/rings/svg?seed=${Array.from(
        new Uint8Array(
          await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(
              args.userID + "-" + crypto.randomUUID() + "-" + args.name
            )
          )
        )
      )
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(
          ""
        )}&ringFive=full,eighth,half,quarter&ringFour=half,quarter,full,eighth&ringOne=half,quarter,full,eighth&ringThree=half,quarter,full,eighth&ringTwo=half,quarter,full,eighth`,
    });
  },
});

export const editName = action({
  args: {
    userID: v.id("users"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const reviewNeeded = !(await containsBadWord(args.name));
    await ctx.runMutation(api.users.editNameMutation, {
      userID: args.userID,
      name: args.name,
      reviewNeeded: reviewNeeded,
    });
  },
});

export const editRole = mutation({
  args: {
    userID: v.id("users"),
    role: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userID, { role: args.role });
  },
});

export const usersUnderReview = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    const user = await ctx.db.get(userId);
    if (user === null) {
      return null;
    }
    if (user.role != "admin") {
      return null;
    }
    const users = await ctx.db
      .query("users")
      .withIndex("reviewed", (q) => q.eq("reviewed", false))
      .collect();
    if (users.length === 0) {
      return null;
    }
    return users.length;
  },
});

export const deleteEmailFromAccounts = internalMutation({
  args: { email: v.string(), Id: v.id("users") },
  handler: async (ctx, args) => {
    const [users, authAccounts] = await Promise.all([
      ctx.db.get(args.Id),
      ctx.db
        .query("authAccounts")
        .withIndex("userId", (q) => q.eq("userId", args.Id))
        .collect(),
    ]);
    console.log(
      await Promise.all([
        ctx.db.patch(users?._id!, { email: undefined, role: "locked" }),
        authAccounts.map(
          async (u) =>
            await ctx.db.patch(u._id, {
              emailVerified: undefined,
              provider: "LockedAccount",
              providerAccountId: `LockedAccount-${crypto.randomUUID()}`,
            })
        ),
      ])
    );
  },
});

export const list = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const edit = mutation({
  args: {
    ID: v.id("users"),
    name: v.string(),
    role: v.string(),
    reviewed: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.ID, {
      name: args.name,
      role: args.role,
      reviewed: args.reviewed,
    });
  },
});

export const editReviewStatus = mutation({
  args: { ID: v.id("users"), reviewed: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.ID, { reviewed: args.reviewed });
  },
});
