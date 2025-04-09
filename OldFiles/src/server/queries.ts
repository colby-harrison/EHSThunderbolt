// DB Queries | DO NOT TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING
// if you do not know what is going on in this file without comments
// you should not be messing with this file

import {
	auditLog,
	authors,
	categories,
	db,
	eq,
	images,
	posts,
	sql,
	tbtv,
	teachers,
} from "astro:db";

import type { types } from "@/lib";
import { uploadThing } from "@/lib/uploadthing-server";

type teacherProps = types.teacherCreate;
type authorProps = types.authorCreate;
type categoryProps = types.categoryCreate;
type postProps = types.postCreate;
type imageProps = types.imageCreate;
// type auditLogProps = types.auditLogCreate;

export default {
	// GET operations
	get: {
		all: {
			/**
			 * Get all teachers
			 */
			async teachers() {
				return await db.select().from(teachers);
			},
			/**
			 * Get all authors
			 */
			async authors() {
				return await db.select().from(authors);
			},
			/**
			 * Get all categories
			 */
			async categories() {
				const categoriesDB = await db.select().from(categories);
				categoriesDB.push({
					id: "-1",
					name: "Uncategorized",
					subcategoryOf: null,
				});
				return categoriesDB;
			},
			/**
			 * Get all posts
			 */
			async posts() {
				return await db.select().from(posts);
			},
			/**
			 * Get all images
			 */
			async images() {
				return await db.select().from(images);
			},
			/**
			 * Get all tbtv episodes
			 */
			async tbtv() {
				return await db.select().from(tbtv);
			},
		},
		byId: {
			/**
			 * Get a teacher by id
			 * @param {number} id
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
				 */
				async clerkId(id: string) {
					return await db.select().from(authors).where(eq(authors.clerkId, id));
				},
				/**
				 * Get an author by thunderboltId
				 * @deprecated use clerk directly for any user data instead
				 * @param {string} id
				 */
				async thunderboltId(id: string) {
					return await db.select().from(authors).where(eq(authors.id, id));
				},
			},
			/**
			 * Get a category by id
			 * @param {string} id
			 */
			async category(id: string): Promise<types.category[]> {
				if (id === "-1") {
					return new Promise((resolve) => {
						resolve([
							{
								id: "-1",
								name: "Uncategorized",
							},
						]);
					});
				}
				return await db.select().from(categories).where(eq(categories.id, id));
			},
			/**
			 * Get a post by id
			 * @param {string} id
			 */
			async post(id: string) {
				return await db.select().from(posts).where(eq(posts.id, id));
			},
			/**
			 * Get a image by id
			 * @param {string} id
			 */
			async image(id: string) {
				return await db.select().from(images).where(eq(images.id, id));
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
			 * Get paginated categories | does not include "uncategorized"
			 * @param {number} page
			 * @param {number} perPage
			 */
			async categories(page: number, perPage: number) {
				return await db
					.select()
					.from(categories)
					.orderBy(categories.id)
					.offset((page - 1) * perPage)
					.limit(perPage);
			},
			/**
			 * Get paginated posts
			 * @param {number} page
			 * @param {number} perPage
			 */
			async posts(page: number, perPage: number) {
				return await db
					.select()
					.from(posts)
					.orderBy(posts.id)
					.offset((page - 1) * perPage)
					.limit(perPage);
			},
			async images(page: number, perPage: number) {
				return await db
					.select()
					.from(images)
					.orderBy(images.id)
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
				 */
				async teachers(perPage: number) {
					const count = await db.run(sql`SELECT COUNT(*) FROM teachers`);
					// @ts-expect-error this works, its just being dumb
					const rows: number = count.rows[0]["COUNT(*)"];
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
				 */
				async authors(perPage: number) {
					const count = await db.run(sql`SELECT COUNT(*) FROM authors`);
					// @ts-expect-error this works, its just being dumb
					const rows: number = count.rows[0]["COUNT(*)"];
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
				 * Get the total number of pages for categories | does not include "uncategorized"
				 * @param {number} perPage
				 */
				async categories(perPage: number) {
					const count = await db.run(sql`SELECT COUNT(*) FROM categories`);
					// @ts-expect-error this works, its just being dumb
					const rows: number = count.rows[0]["COUNT(*)"];
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
				 */
				async posts(perPage: number) {
					const count = await db.run(sql`SELECT COUNT(*) FROM posts`);
					// @ts-expect-error this works, its just being dumb
					const rows: number = count.rows[0]["COUNT(*)"];
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
				 * Get the total number of pages for images
				 * @param {number} perPage
				 */
				async images(perPage: number) {
					const count = await db.run(sql`SELECT COUNT(*) FROM images`);
					// @ts-expect-error this works, its just being dumb
					const rows: number = count.rows[0]["COUNT(*)"];
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
		byCategory: {
			/**
			 * Get all posts by category
			 * @param {string} categoryId
			 */
			async posts(categoryId: string) {
				return await db
					.select()
					.from(posts)
					.where(eq(posts.category, categoryId));
			},
			paginated: {
				/**
				 * Get paginated posts by category
				 * @param {string} categoryId
				 * @param {number} page
				 * @param {number} perPage
				 */
				async posts(categoryId: string, page: number, perPage: number) {
					return await db
						.select()
						.from(posts)
						.where(eq(posts.category, categoryId))
						.orderBy(posts.id)
						.offset((page - 1) * perPage)
						.limit(perPage);
				},
				totalPages: {
					/**
					 * Get the total number of pages for posts by category
					 * @param {string} categoryId
					 * @param {number} perPage
					 */
					async posts(categoryId: string, perPage: number) {
						const count = await db.run(
							sql`SELECT COUNT(*) FROM posts WHERE catagory = ${categoryId}`,
						);
						// @ts-expect-error this works, its just being dumb
						const rows: number = count.rows[0]["COUNT(*)"];
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
		byName: {
			/**
			 * Get category by name
			 * @param {string} name
			 */
			async category(name: string): Promise<types.category[]> {
				if (name === "Uncategorized") {
					return new Promise((resolve) => {
						resolve([
							{
								id: "-1",
								name: "Uncategorized",
							},
						]);
					});
				}
				return await db
					.select()
					.from(categories)
					.where(eq(categories.name, name));
			},
		},
	},
	// POST operations
	post: {
		teachers: {
			/**
			 * Create a teacher
			 * @param {teacherProps} data
			 */
			async create(data: teacherProps) {
				await db.insert(teachers).values(data);
			},
			/**
			 * Update a teacher
			 * @param {number} id
			 * @param {teacherProps} data
			 */
			async update(id: number, data: teacherProps) {
				await db.update(teachers).set(data).where(eq(teachers.id, id));
			},
			/**
			 * Delete a teacher
			 * @param {number} id
			 */
			async delete(id: number) {
				await db.delete(teachers).where(eq(teachers.id, id));
			},
		},
		authors: {
			/**
			 * Create an author
			 * @deprecated use clerk directly for any user data instead
			 * @param {authorProps} data
			 */
			async create(data: authorProps) {
				const finalData: types.author = {
					id: crypto.randomUUID(),
					clerkId: data.clerkId,
					name: data.name,
					admin: data.admin,
				};
				await db.insert(authors).values(finalData);
			},
			/**
			 * Update an author
			 * @deprecated use clerk directly for any user data instead
			 * @param {string} id
			 * @param {authorProps} data
			 */
			async update(id: string, data: authorProps) {
				await db.update(authors).set(data).where(eq(authors.id, id));
			},
			/**
			 * Delete an author
			 * @deprecated use clerk directly for any user data instead
			 * @param {string} id
			 */
			async delete(id: string) {
				await db.delete(authors).where(eq(authors.id, id));
			},
		},
		categories: {
			/**
			 * Create a category
			 * @param {categoryProps} data
			 */
			async create(data: categoryProps) {
				const finalData: types.category = {
					id: crypto.randomUUID(),
					name: data.name,
				};
				await db.insert(categories).values(finalData);
			},
			/**
			 * Update a category
			 * @param {string} id
			 * @param {categoryProps} data
			 */
			async update(id: string, data: categoryProps) {
				await db.update(categories).set(data).where(eq(categories.id, id));
			},
			/**
			 * Delete a category
			 * @param {string} id
			 */
			async delete(id: string) {
				await db.delete(categories).where(eq(categories.id, id));
			},
		},
		posts: {
			/**
			 * Create a post
			 * @param {postProps} data
			 */
			async create(data: postProps) {
				const finalData: types.post = {
					id: crypto.randomUUID(),
					title: data.title,
					description: data.description,
					content: data.content,
					author: data.author,
					category: data.category,
					catagory: data.category,
					needsReview: data.needsReview,
					published: data.published,
					image: data.image,
					date: new Date(),
				};
				// @ts-expect-error it work
				await db.insert(posts).values(finalData);
			},
			/**
			 * Update a post
			 * @param {string} id
			 * @param {postProps} data
			 */
			async update(id: string, data: postProps) {
				await db.update(posts).set(data).where(eq(posts.id, id));
			},
			/**
			 * Delete a post
			 * @param {string} id
			 */
			async delete(id: string) {
				await db.delete(posts).where(eq(posts.id, id));
			},
		},
		images: {
			/**
			 * Create an image
			 * @param {imageProps} data
			 */
			async create(data: imageProps) {
				const unixTime = Math.floor(Date.now() / 1000);
				const finalFileName = `${crypto.randomUUID()}-${unixTime}-${data.fileName}`;
				const imageURL = await uploadThing({
					name: finalFileName,
					data: data.fileBuffer,
				});
				const finalData: types.image = {
					id: crypto.randomUUID(),
					fullUrl: imageURL,
					size: data.size,
					type: data.type,
					author: data.author,
				};
				await db.insert(images).values(finalData);
				return imageURL;
			},
			/**
			 * Delete an image
			 * @param {string} id
			 */
			async delete(id: string) {
				await db.delete(images).where(eq(images.id, id));
			},
		},
	},
	audit: {
		log: {
			teachers: {
				/**
				 * Create an audit log for a teacher
				 * @param {string} user User ID of the user who created the entry
				 * @param {boolean} admin Is the user an admin?
				 * @param {types.teacher} data Teacher Data
				 */
				async create(user: string, admin: boolean, data: types.teacher) {
					const formattedData: types.auditLogCreate = {
						table: "teachers",
						action: "create",
						user: user,
						admin: admin,
						data: JSON.stringify(data),
					};
					await db.insert(auditLog).values(formattedData);
				},
				async delete(user: string, admin: boolean, data: types.teacher) {
					const formattedData: types.auditLogCreate = {
						table: "teachers",
						action: "delete",
						user: user,
						admin: admin,
						data: JSON.stringify(data),
					};
					await db.insert(auditLog).values(formattedData);
				},
				async update(
					user: string,
					admin: boolean,
					before: types.teacher,
					after: types.teacher,
				) {
					const formattedData: types.auditLogCreate = {
						table: "teachers",
						action: "update",
						user: user,
						admin: admin,
						data: JSON.stringify({
							before: before,
							after: after,
						}),
					};
					await db.insert(auditLog).values(formattedData);
				},
			},
			categories: {
				async create(user: string, admin: boolean, data: types.category) {
					const formattedData: types.auditLogCreate = {
						table: "categories",
						action: "create",
						user: user,
						admin: admin,
						data: JSON.stringify(data),
					};
					await db.insert(auditLog).values(formattedData);
				},
				async delete(user: string, admin: boolean, data: types.category) {
					const formattedData: types.auditLogCreate = {
						table: "categories",
						action: "delete",
						user: user,
						admin: admin,
						data: JSON.stringify(data),
					};
					await db.insert(auditLog).values(formattedData);
				},
			},
			posts: {
				async create(user: string, admin: boolean, data: types.post) {
					const formattedData: types.auditLogCreate = {
						table: "posts",
						action: "create",
						user: user,
						admin: admin,
						data: JSON.stringify(data),
					};
					await db.insert(auditLog).values(formattedData);
				},
				async delete(user: string, admin: boolean, data: types.post) {
					const formattedData: types.auditLogCreate = {
						table: "posts",
						action: "delete",
						user: user,
						admin: admin,
						data: JSON.stringify(data),
					};
					await db.insert(auditLog).values(formattedData);
				},
				async update(
					user: string,
					admin: boolean,
					before: types.post,
					after: types.post,
				) {
					const formattedData: types.auditLogCreate = {
						table: "posts",
						action: "update",
						user: user,
						admin: admin,
						data: JSON.stringify({
							before: before,
							after: after,
						}),
					};
					await db.insert(auditLog).values(formattedData);
				},
			},
			images: {
				async create(user: string, admin: boolean, data: types.image) {
					const formattedData: types.auditLogCreate = {
						table: "images",
						action: "create",
						user: user,
						admin: admin,
						data: JSON.stringify(data),
					};
					await db.insert(auditLog).values(formattedData);
				},
				async delete(user: string, admin: boolean, data: types.image) {
					const formattedData: types.auditLogCreate = {
						table: "images",
						action: "delete",
						user: user,
						admin: admin,
						data: JSON.stringify(data),
					};
					await db.insert(auditLog).values(formattedData);
				},
			},
			tbtv: {
				async create(user: string, admin: boolean, data: types.tbtv) {
					const formattedData: types.auditLogCreate = {
						table: "tbtv",
						action: "create",
						user: user,
						admin: admin,
						data: JSON.stringify(data),
					};
					await db.insert(auditLog).values(formattedData);
				},
				async delete(user: string, admin: boolean, data: types.tbtv) {
					const formattedData: types.auditLogCreate = {
						table: "tbtv",
						action: "delete",
						user: user,
						admin: admin,
						data: JSON.stringify(data),
					};
					await db.insert(auditLog).values(formattedData);
				},
			},
		},
		get: {
			all: {
				/**
				 * Get all teachers Audit Logs
				 */
				async teachers() {
					return await db
						.select()
						.from(auditLog)
						.where(eq(auditLog.table, "teachers"));
				},
				/**
				 * Get all categories Audit Logs
				 */
				async categories() {
					return await db
						.select()
						.from(auditLog)
						.where(eq(auditLog.table, "categories"));
				},
				/**
				 * Get all posts Audit Logs
				 */
				async posts() {
					return await db
						.select()
						.from(auditLog)
						.where(eq(auditLog.table, "posts"));
				},
				/**
				 * Get all images Audit Logs
				 */
				async images() {
					return await db
						.select()
						.from(auditLog)
						.where(eq(auditLog.table, "images"));
				},
				/**
				 * Get all tbtv Audit Logs
				 */
				async tbtv() {
					return await db
						.select()
						.from(auditLog)
						.where(eq(auditLog.table, "tbtv"));
				},
			},
			async fullDump() {
				return await db.select().from(auditLog);
			},
			async recentFive() {
				return await db.select().from(auditLog).orderBy(auditLog.id).limit(5);
			},
		},
	},
};
