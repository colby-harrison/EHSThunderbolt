import { defineDb, defineTable, column } from 'astro:db';

// https://astro.build/db/config
// database schema
export default defineDb({
  tables: {
    posts: defineTable({
      columns: {
        id: column.text({ primaryKey: true, default: crypto.randomUUID() }),
        headline: column.text(),
        secondaryHeadline: column.text(),
        authorId: column.text(),
        content: column.text(),
        tag: column.text(),
        published: column.boolean({ default: false }),
        reviewed: column.boolean({ default: false }),
        createdAt: column.date({ default: new Date() }),
      }
    }),
    authors: defineTable({
      columns: {
        id: column.text({ primaryKey: true, default: crypto.randomUUID() }),
        clerkId: column.text(),
        name: column.text(),
        admin: column.boolean({ default: false }),
      }
    }),
    tags: defineTable({
      columns: {
        id: column.text({ primaryKey: true, default: crypto.randomUUID() }),
        name: column.text(),
        posts: column.text(),
      }
    }),
  }
});