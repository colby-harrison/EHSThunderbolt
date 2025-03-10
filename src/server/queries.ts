// DB Queries | DO NOT TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING
// if you do not know what is going on in this file without comments
// you should not be messing with this file

import { db, teachers, authors, catagories, posts, eq, sql } from 'astro:db';

import { types } from '@/lib';

type teacherProps = types.teacherCreate;
type authorProps = types.authorCreate;
type catagoryProps = types.catagoryCreate;
type postProps = types.postCreate;

export default {
  // GET operations
  get: {
    all: {
      /**
       * Get all teachers
       * @returns {Promise<import("astro/zod").infer<typeof teachers>>}
       */
      async teachers() {
        return await db.select().from(teachers);
      },
      /**
       * Get all authors
       * @returns {Promise<import("astro/zod").infer<typeof authors>>}
       */
      async authors() {
        return await db.select().from(authors);
      },
      /**
       * Get all catagories
       * @returns {Promise<import("astro/zod").infer<typeof catagories>>}
       */
      async catagories() {
        return await db.select().from(catagories);
      },
      /**
       * Get all posts
       * @returns {Promise<import("astro/zod").infer<typeof posts>>}
       */
      async posts() {
        return await db.select().from(posts);
      },
    },
    byId: {
      /**
       * Get a teacher by id
       * @param {number} id
       * @returns {Promise<import("astro/zod").infer<typeof teachers>>}
       */
      async teacher(id: number) {
        return await db.select().from(teachers).where(eq(teachers.id, id));
      },
      /**
       * @deprecated use clerk directly for any user data instead
       */
      author: {
        /**
         * Get an author by clerkId
         * @deprecated use clerk directly for any user data instead
         * @param {string} id
         * @returns {Promise<import("astro/zod").infer<typeof authors>>}
         */
        async clerkId(id: string) {
          return await db.select().from(authors).where(eq(authors.clerkId, id));
        },
        /**
         * Get an author by thunderboltId
         * @deprecated use clerk directly for any user data instead
         * @param {string} id
         * @returns {Promise<import("astro/zod").infer<typeof authors>>}
         */
        async thunderboltId(id: string) {
          return await db.select().from(authors).where(eq(authors.id, id));
        },
      },
      /**
       * Get a catagory by id
       * @param {string} id
       * @returns {Promise<import("astro/zod").infer<typeof catagories>>}
       */
      async catagory(id: string) {
        return await db.select().from(catagories).where(eq(catagories.id, id));
      },
      /**
       * Get a post by id
       * @param {string} id
       * @returns {Promise<import("astro/zod").infer<typeof posts>>}
       */
      async post(id: string) {
        return await db.select().from(posts).where(eq(posts.id, id));
      },
    },
    /**
     * Get paginated data
     */
    paginated: {
      /**
       * Get paginated teachers
       * @param {number} page
       * @param {number} perPage
       * @returns {Promise<import("astro/zod").infer<typeof teachers>>}
       */
      async teachers(page: number, perPage: number) {
        return await db
          .select()
          .from(teachers)
          .orderBy(teachers.id)
          .offset((page - 1) * perPage)
          .limit(perPage);
      },
      /**
       * Get paginated authors
       * @deprecated use clerk directly for any user data instead
       * @param {number} page
       * @param {number} perPage
       * @returns {Promise<import("astro/zod").infer<typeof authors>>}
       */
      async authors(page: number, perPage: number) {
        return await db
          .select()
          .from(authors)
          .orderBy(authors.id)
          .offset((page - 1) * perPage)
          .limit(perPage);
      },
      /**
       * Get paginated catagories
       * @param {number} page
       * @param {number} perPage
       * @returns {Promise<import("astro/zod").infer<typeof catagories>>}
       */
      async catagories(page: number, perPage: number) {
        return await db
          .select()
          .from(catagories)
          .orderBy(catagories.id)
          .offset((page - 1) * perPage)
          .limit(perPage);
      },
      /**
       * Get paginated posts
       * @param {number} page
       * @param {number} perPage
       * @returns {Promise<import("astro/zod").infer<typeof posts>>}
       */
      async posts(page: number, perPage: number) {
        return await db
          .select()
          .from(posts)
          .orderBy(posts.id)
          .offset((page - 1) * perPage)
          .limit(perPage);
      },
      /**
       * Get the total number of pages for a given table
       */
      totalPages: {
        /**
         * Get the total number of pages for teachers
         * @param {number} perPage
         * @returns {Promise<number>}
         */
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
        /**
         * Get the total number of pages for authors
         * @deprecated use clerk directly for any user data instead
         * @param {number} perPage
         * @returns {Promise<number>}
         */
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
        /**
         * Get the total number of pages for catagories
         * @param {number} perPage
         * @returns {Promise<number>}
         */
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
        /**
         * Get the total number of pages for posts
         * @param {number} perPage
         * @returns {Promise<number>}
         */
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
      /**
       * Get all posts by catagory
       * @param {string} catagoryId
       * @returns {Promise<import("astro/zod").infer<typeof posts>>}
       */
      async posts(catagoryId: string) {
        return await db
          .select()
          .from(posts)
          .where(eq(posts.catagory, catagoryId));
      },
      paginated: {
        /**
         * Get paginated posts by category
         * @param {string} catagoryId
         * @param {number} page
         * @param {number} perPage
         * @returns {Promise<import("astro/zod").infer<typeof posts>>}
         */
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
          /**
           * Get the total number of pages for posts by catagory
           * @param {string} catagoryId
           * @param {number} perPage
           * @returns {Promise<number>}
           */
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
      /**
       * Create a teacher
       * @param {teacherProps} data
       * @returns {Promise<import("astro/zod").infer<typeof teachers>>}
       */
      async create(data: teacherProps) {
        return await db.insert(teachers).values(data);
      },
      /**
       * Update a teacher
       * @param {number} id
       * @param {teacherProps} data
       * @returns {Promise<import("astro/zod").infer<typeof teachers>>}
       */
      async update(id: number, data: teacherProps) {
        return await db.update(teachers).set(data).where(eq(teachers.id, id));
      },
      /**
       * Delete a teacher
       * @param {number} id
       * @returns {Promise<import("astro/zod").infer<typeof teachers>>}
       */
      async delete(id: number) {
        return await db.delete(teachers).where(eq(teachers.id, id));
      },
    },
    authors: {
      /**
       * Create an author
       * @deprecated use clerk directly for any user data instead
       * @param {authorProps} data
       * @returns {Promise<import("astro/zod").infer<typeof authors>>}
       */
      async create(data: authorProps) {
        const finalData: types.author = {
          id: crypto.randomUUID(),
          clerkId: data.clerkId,
          name: data.name,
          admin: data.admin,
        };
        return await db.insert(authors).values(finalData);
      },
      /**
       * Update an author
       * @deprecated use clerk directly for any user data instead
       * @param {string} id
       * @param {authorProps} data
       * @returns {Promise<import("astro/zod").infer<typeof authors>>}
       */
      async update(id: string, data: authorProps) {
        return await db.update(authors).set(data).where(eq(authors.id, id));
      },
      /**
       * Delete an author
       * @deprecated use clerk directly for any user data instead
       * @param {string} id
       * @returns {Promise<import("astro/zod").infer<typeof authors>>}
       */
      async delete(id: string) {
        return await db.delete(authors).where(eq(authors.id, id));
      },
    },
    catagories: {
      /**
       * Create a catagory
       * @param {catagoryProps} data
       * @returns {Promise<import("astro/zod").infer<typeof catagories>>}
       */
      async create(data: catagoryProps) {
        const finalData: types.catagory = {
          id: crypto.randomUUID(),
          name: data.name,
        };
        return await db.insert(catagories).values(finalData);
      },
      /**
       * Update a catagory
       * @param {string} id
       * @param {catagoryProps} data
       * @returns {Promise<import("astro/zod").infer<typeof catagories>>}
       */
      async update(id: string, data: catagoryProps) {
        return await db
          .update(catagories)
          .set(data)
          .where(eq(catagories.id, id));
      },
      /**
       * Delete a catagory
       * @param {string} id
       * @returns {Promise<import("astro/zod").infer<typeof catagories>>}
       */
      async delete(id: string) {
        return await db.delete(catagories).where(eq(catagories.id, id));
      },
    },
    posts: {
      /**
       * Create a post
       * @param {postProps} data
       * @returns {Promise<import("astro/zod").infer<typeof posts>>}
       */
      async create(data: postProps) {
        const finalData: types.post = {
          id: crypto.randomUUID(),
          title: data.title,
          content: data.content,
          author: data.author,
          catagory: data.catagory,
          needsReview: data.needsReview,
          published: data.published,
          date: new Date(),
        };
        return await db.insert(posts).values(finalData);
      },
      /**
       * Update a post
       * @param {string} id
       * @param {postProps} data
       * @returns {Promise<import("astro/zod").infer<typeof posts>>}
       */
      async update(id: string, data: postProps) {
        return await db.update(posts).set(data).where(eq(posts.id, id));
      },
      /**
       * Delete a post
       * @param {string} id
       * @returns {Promise<import("astro/zod").infer<typeof posts>>}
       */
      async delete(id: string) {
        return await db.delete(posts).where(eq(posts.id, id));
      },
    },
  },
};
