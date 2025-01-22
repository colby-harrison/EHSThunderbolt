import { db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	const authors = [
		{ name: 'John Doe', clerkId: 'johndoe@example.com', id: "1" },
		{ name: 'Jane Doe', clerkId: 'janedoe@example.com', id: "2" },
	];
	const tags = [
		{ name: 'sports', id: "1", posts: "1" },
		{ name: 'studentlife', id: "2", posts: "0" },
	]
	const posts = [
		{ headline: 'First post', secondaryHeadline: 'This is the first post', authorId: "1", content: 'This is the first post', tag: "1", id: "1", published: true, reviewed: false, createdAt: new Date() },
}
