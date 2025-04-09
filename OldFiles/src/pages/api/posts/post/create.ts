import type { types } from "@/lib";
import data from "@/server/queries";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect, locals }) => {
	const user = await locals.currentUser();
	if (!import.meta.env.DEV) {
		if (!user) {
			return redirect("/?error=action-not-permitted");
		}
	}
	const body = await request.formData();
	if (body.get("formFor") === "posts") {
		const title = String(body.get("title"));
		const description = String(body.get("description"));
		const content = String(body.get("content"));
		const author = String(body.get("author"));
		const category = String(body.get("category"));
		const needsReview = Boolean(body.get("needsReview"));
		const published = Boolean(body.get("published"));
		const imageFile = body.get("image") as File | null;
		if (
			title &&
			content &&
			author &&
			category &&
			needsReview &&
			published &&
			description
		) {
			let image =
				"https://kzekz7a45c.ufs.sh/f/bt0EuG5lPH505nfkSNHmmQCn1kDqg8htKYWxpoiJ9OjyvdaU";
			if (imageFile) {
				const arrayBuffer = await imageFile.arrayBuffer();
				image = await data.post.images.create({
					fileName: imageFile.name,
					fileBuffer: arrayBuffer,
					size: imageFile.size,
					type: imageFile.type,
					author,
				});
			}
			const post: types.postCreateFinal = {
				title,
				description,
				content,
				author,
				category,
				catagory: category,
				needsReview,
				published,
				image,
			};
			await data.post.posts.create(post);
		} else {
			console.log("error");
		}
	}
	return redirect(String(body.get("redirectTo")));
};
