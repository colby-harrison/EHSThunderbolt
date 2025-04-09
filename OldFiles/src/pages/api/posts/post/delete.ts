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
	if (body.get("formFor") === "delete") {
		const id = String(body.get("id"));
		if (id) {
			await data.post.posts.delete(id);
		}
	}
	return redirect(String(body.get("redirectTo")));
};
