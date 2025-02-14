import { defineDb, defineTable, column, sql, NOW } from 'astro:db';

const teachers = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    picture: column.text({
      default: 'bt0EuG5lPH505nfkSNHmmQCn1kDqg8htKYWxpoiJ9OjyvdaU',
    }),
    job: column.text(),
  },
});

const categories = defineTable({
  columns: {
    id: column.text({ primaryKey: true, default: sql`UUID()` }),
    name: column.text(),
  },
});

const authors = defineTable({
  deprecated: true,
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
    image: column.text({
      default: 'https://kzekz7a45c.ufs.sh/f/bt0EuG5lPH505nfkSNHmmQCn1kDqg8htKYWxpoiJ9OjyvdaU',
    }),
    content: column.text(),
    author: column.text(),
    category: column.text({ references: () => categories.columns.id }),
    needsReview: column.boolean({ default: true }),
    published: column.boolean({ default: false }),
    date: column.date({ default: NOW }),
  },
});

const images = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    fullUrl: column.text(),
    size: column.number(),
    type: column.text(),
    author: column.text(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    teachers,
    categories,
    authors,
    posts,
    images,
  },
});
