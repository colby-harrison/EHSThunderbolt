import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  realtimekv: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),
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
    content: v.string(),
    author: v.string(),
    category: v.id("categories"),
    needsReview: v.boolean(),
    published: v.boolean(),
    date: v.string(),
  }).index("by_category", ["category"]),
  allowedEmails: defineTable({
    email: v.string(),
  }),
});