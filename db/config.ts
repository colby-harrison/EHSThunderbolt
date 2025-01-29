import { defineDb, defineTable, column, sql, NOW } from 'astro:db';

const teachers = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    picture: column.text({ default: '/CheyenneEast.png' }),
    job: column.text(),
  },
});

const catagories = defineTable({
  columns: {
    id: column.text({ primaryKey: true, default: sql`UUID()` }),
    name: column.text(),
  },
});

const authors = defineTable({
  columns: {
    id: column.text({ primaryKey: true, default: sql`UUID()` }),
    clerkId: column.text(),
    name: column.text(),
    admin: column.boolean({ default: false }),
  },
});

const posts = defineTable({
  columns: {
    id: column.text({ primaryKey: true, default: sql`UUID()` }),
    title: column.text(),
    content: column.text(),
    author: column.text({ references: () => authors.columns.id }),
    catagory: column.text({ references: () => catagories.columns.id }),
    needsReview: column.boolean({ default: true }),
    published: column.boolean({ default: false }),
    date: column.date({ default: NOW }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    teachers,
    catagories,
    authors,
    posts,
  },
});
