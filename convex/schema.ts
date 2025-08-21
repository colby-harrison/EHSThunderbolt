import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  authAccounts: authTables.authAccounts.index("userId", ["userId"]),
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    role: v.optional(v.string()),
    reviewed: v.optional(v.boolean()),
  })
    .index("email", ["email"])
    .index("reviewed", ["reviewed"]),
  kv: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),
  categories: defineTable({
    subcategoryOf: v.union(v.id("categories"), v.null()),
    name: v.string(),
  }).index("by_name", ["name"]),
  navbarCategories: defineTable({
    placement: v.number(),
    category: v.id("categories"),
  }).index("by_placement", ["placement"]),
  images: defineTable({
    fullUrl: v.string(),
    size: v.number(),
    type: v.string(),
    author: v.string(),
  }).index("by_author", ["author"]),
  tbtvLegacy: defineTable({
    title: v.string(),
    url: v.string(),
    date: v.string(),
  }),
  teachers: defineTable({
    name: v.string(),
    picture: v.string(),
    job: v.string(),
  }),
  posts: defineTable({
    title: v.string(),
    excerpt: v.string(),
    image: v.string(),
    content: v.bytes(),
    author: v.string(),
    category: v.id("categories"),
    needsReview: v.boolean(),
    published: v.boolean(),
    date: v.string(),
  }).index("by_category", ["category"]),
  allowedEmails: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    userID: v.optional(v.id("users")),
  }).index("by_email", ["email"]),
  bellScheduleTab: defineTable({
    name: v.string(),
  }),
  bellScheduleLine: defineTable({
    tab: v.id("bellScheduleTab"),
    period: v.string(),
    periodLine2: v.string(),
    time: v.string(),
    timeLine2: v.string(),
  }).index("by_tab", ["tab"]),
  files: defineTable({
    uuid: v.string(),
    key: v.string(),
    fullUrl: v.string(),
    type: v.string(),
    UploadedBy: v.id("users"),
  }),
  sportsScores: defineTable({
    sport: v.string(),
    date: v.string(),
    tbirdScore: v.number(),
    opponent: v.string(),
    opponentScore: v.number(),
  }),
});
