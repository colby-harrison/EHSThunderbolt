import { sql } from "drizzle-orm";
import { index, sqliteTableCreator } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => `${name}`);

export const categories = createTable(
  "categories",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    subcategoryOf: d.text(),
    name: d.text().notNull(),
    createdAt: d
      .text()
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
  }),
  (t) => [index("name_idx").on(t.name)]
);

export const images = createTable(
  "images",
  (d) => ({
    id: d.text().primaryKey(),
    fullUrl: d.text().notNull(),
    size: d.integer().notNull(),
    type: d.text().notNull(),
    author: d.text().notNull(),
  }),
  (t) => [index("author_idx").on(t.author)]
);

export const tbtv = createTable("tbtv", (d) => ({
  id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  title: d.text().default("").notNull(),
  url: d.text().notNull(),
}));

export const auditLog = createTable(
  "auditLog",
  (d) => ({
    id: d.integer().primaryKey({ autoIncrement: true }),
    table: d.text().notNull(),
    action: d.text().notNull(),
    user: d.text().notNull(),
    admin: d
      .integer()
      .default(sql`(FALSE)`)
      .notNull(),
    data: d.text().notNull(),
    date: d
      .text()
      .default(sql`(CURRENT_TIMESTAMP)`)
      .notNull(),
  }),
  (t) => [index("table_idx").on(t.table)]
);

export const teachers = createTable("teachers", (d) => ({
  id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  name: d.text(),
  picture: d.text().default("bt0EuG5lPH505nfkSNHmmQCn1kDqg8htKYWxpoiJ9OjyvdaU"),
  job: d.text(),
}));

export const posts = createTable("posts", (d) => ({
  id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  title: d.text().notNull(),
  description: d.text(),
  image: d
    .text()
    .default("bt0EuG5lPH505nfkSNHmmQCn1kDqg8htKYWxpoiJ9OjyvdaU")
    .notNull(),
  content: d.text().notNull(),
  author: d.text().notNull(),
  category: d.integer({ mode: "number" }).default(-1).notNull(),
  needsReview: d
    .integer()
    .default(sql`(TRUE)`)
    .notNull(),
  published: d
    .integer()
    .default(sql`(FALSE)`)
    .notNull(),
  date: d
    .text()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
}));

export const navbarCategories = createTable("navbarCategories", (d) => ({
  id: d.integer().primaryKey({ autoIncrement: true }),
  categoryId: d.integer({ mode: "number" }).default(-1),
}));

export const kv = createTable(
  "kv",
  (d) => ({
    key: d.text().primaryKey(),
    value: d.text().notNull(),
  }),
  (t) => [index("key_idx").on(t.key)]
);
