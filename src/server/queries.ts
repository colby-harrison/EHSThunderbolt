import { db, teachers, authors, catagories, posts, eq, sql } from 'astro:db';

type teacherProps = {
  id: number;
  name: string;
  picture: string;
  job: string;
};

type authorProps = {
  id: string;
  clerkId: string;
  name: string;
  admin: boolean;
};

type catagoryProps = {
  id: string;
  name: string;
};

type postProps = {
  id: string;
  title: string;
  content: string;
  author: string;
  catagory: string;
  needsReview: boolean;
  published: boolean;
  date: Date;
};

export default {
  // GET operations
  get: {
    all: {
      async teachers() {
        return await db.select().from(teachers);
      },
      async authors() {
        return await db.select().from(authors);
      },
      async catagories() {
        return await db.select().from(catagories);
      },
      async posts() {
        return await db.select().from(posts);
      },
    },
    byId: {
      async teacher(id: number) {
        return await db.select().from(teachers).where(eq(teachers.id, id));
      },
      async author(id: string) {
        return await db.select().from(authors).where(eq(authors.id, id));
      },
      async catagory(id: string) {
        return await db.select().from(catagories).where(eq(catagories.id, id));
      },
      async post(id: string) {
        return await db.select().from(posts).where(eq(posts.id, id));
      },
    },
    paginated: {
      async teachers(page: number, perPage: number) {
        return await db
          .select()
          .from(teachers)
          .orderBy(teachers.id)
          .offset((page - 1) * perPage)
          .limit(perPage);
      },
      async authors(page: number, perPage: number) {
        return await db
          .select()
          .from(authors)
          .orderBy(authors.id)
          .offset((page - 1) * perPage)
          .limit(perPage);
      },
      async catagories(page: number, perPage: number) {
        return await db
          .select()
          .from(catagories)
          .orderBy(catagories.id)
          .offset((page - 1) * perPage)
          .limit(perPage);
      },
      async posts(page: number, perPage: number) {
        return await db
          .select()
          .from(posts)
          .orderBy(posts.id)
          .offset((page - 1) * perPage)
          .limit(perPage);
      },
      totalPages: {
        async teachers(perPage: number) {
          const count = await db.run(sql`SELECT COUNT(*) FROM teachers`);
          // @ts-expect-error this works, its just being dumb
          const rows: number = count.rows[0]['COUNT(*)'];
          const pagestemp = rows / perPage;
          if (
            pagestemp !== 0 &&
            pagestemp !== null &&
            pagestemp !== undefined &&
            !Number.isNaN(pagestemp)
          ) {
            return Math.ceil(pagestemp);
          } else {
            return 0;
          }
        },
        async authors(perPage: number) {
          const count = await db.run(sql`SELECT COUNT(*) FROM authors`);
          // @ts-expect-error this works, its just being dumb
          const rows: number = count.rows[0]['COUNT(*)'];
          const pagestemp = rows / perPage;
          if (
            pagestemp !== 0 &&
            pagestemp !== null &&
            pagestemp !== undefined &&
            !Number.isNaN(pagestemp)
          ) {
            return Math.ceil(pagestemp);
          } else {
            return 0;
          }
        },
        async catagories(perPage: number) {
          const count = await db.run(sql`SELECT COUNT(*) FROM catagories`);
          // @ts-expect-error this works, its just being dumb
          const rows: number = count.rows[0]['COUNT(*)'];
          const pagestemp = rows / perPage;
          if (
            pagestemp !== 0 &&
            pagestemp !== null &&
            pagestemp !== undefined &&
            !Number.isNaN(pagestemp)
          ) {
            return Math.ceil(pagestemp);
          } else {
            return 0;
          }
        },
        async posts(perPage: number) {
          const count = await db.run(sql`SELECT COUNT(*) FROM posts`);
          // @ts-expect-error this works, its just being dumb
          const rows: number = count.rows[0]['COUNT(*)'];
          const pagestemp = rows / perPage;
          if (
            pagestemp !== 0 &&
            pagestemp !== null &&
            pagestemp !== undefined &&
            !Number.isNaN(pagestemp)
          ) {
            return Math.ceil(pagestemp);
          } else {
            return 0;
          }
        },
      },
    },
    byCatagory: {
      async posts(catagoryId: string) {
        return await db
          .select()
          .from(posts)
          .where(eq(posts.catagory, catagoryId));
      },
      paginated: {
        async posts(catagoryId: string, page: number, perPage: number) {
          return await db
            .select()
            .from(posts)
            .where(eq(posts.catagory, catagoryId))
            .orderBy(posts.id)
            .offset((page - 1) * perPage)
            .limit(perPage);
        },
        totalPages: {
          async posts(catagoryId: string, perPage: number) {
            const count = await db.run(
              sql`SELECT COUNT(*) FROM posts WHERE catagory = ${catagoryId}`,
            );
            // @ts-expect-error this works, its just being dumb
            const rows: number = count.rows[0]['COUNT(*)'];
            const pagestemp = rows / perPage;
            if (
              pagestemp !== 0 &&
              pagestemp !== null &&
              pagestemp !== undefined &&
              !Number.isNaN(pagestemp)
            ) {
              return Math.ceil(pagestemp);
            } else {
              return 0;
            }
          },
        },
      },
    },
  },
  // POST operations
  post: {
    teachers: {
      async create(data: teacherProps) {
        return await db.insert(teachers).values(data);
      },
      async update(id: number, data: teacherProps) {
        return await db.update(teachers).set(data).where(eq(teachers.id, id));
      },
      async delete(id: number) {
        return await db.delete(teachers).where(eq(teachers.id, id));
      },
    },
    authors: {
      async create(data: authorProps) {
        return await db.insert(authors).values(data);
      },
      async update(id: string, data: authorProps) {
        return await db.update(authors).set(data).where(eq(authors.id, id));
      },
      async delete(id: string) {
        return await db.delete(authors).where(eq(authors.id, id));
      },
    },
    catagories: {
      async create(data: catagoryProps) {
        return await db.insert(catagories).values(data);
      },
      async update(id: string, data: catagoryProps) {
        return await db
          .update(catagories)
          .set(data)
          .where(eq(catagories.id, id));
      },
      async delete(id: string) {
        return await db.delete(catagories).where(eq(catagories.id, id));
      },
    },
    posts: {
      async create(data: postProps) {
        return await db.insert(posts).values(data);
      },
      async update(id: string, data: postProps) {
        return await db.update(posts).set(data).where(eq(posts.id, id));
      },
      async delete(id: string) {
        return await db.delete(posts).where(eq(posts.id, id));
      },
    },
  },
};
