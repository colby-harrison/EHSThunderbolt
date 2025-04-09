import { NOW, column, defineDb, defineTable, sql } from "astro:db";

const teachers = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		name: column.text(),
		picture: column.text({
			default: "bt0EuG5lPH505nfkSNHmmQCn1kDqg8htKYWxpoiJ9OjyvdaU",
		}),
		job: column.text(),
	},
});

const catagories = defineTable({
	deprecated: true,
	columns: {
		id: column.text({ primaryKey: true, default: sql`UUID()` }),
		name: column.text(),
	},
});

const categories = defineTable({
	columns: {
		id: column.text({ primaryKey: true, default: sql`UUID()` }),
		subcategoryOf: column.text({ optional: true }),
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
		description: column.text({ optional: true }),
		image: column.text({
			default:
				"https://kzekz7a45c.ufs.sh/f/bt0EuG5lPH505nfkSNHmmQCn1kDqg8htKYWxpoiJ9OjyvdaU",
		}),
		content: column.text(),
		author: column.text(),
		category: column.text({ default: "-1" }),
		catagory: column.text({ default: "-1", deprecated: true }),
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

const tbtv = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		title: column.text({ default: "" }),
		url: column.text(),
	},
});

const auditLog = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		table: column.text(),
		action: column.text(),
		user: column.text(),
		admin: column.boolean({ default: false }),
		data: column.text(),
		date: column.date({ default: NOW }),
	},
});

// https://astro.build/db/config
export default defineDb({
	tables: {
		teachers,
		catagories,
		categories,
		authors,
		posts,
		images,
		tbtv,
		auditLog,
	},
});
