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
	if (body.get("formFor") === "update") {
		const name = String(body.get("name"));
		const picture = String(body.get("picture"));
		const job = String(body.get("job"));
		const id = Number(body.get("id"));
		if (name && picture && job) {
			const post: types.teacherCreate = {
				name,
				picture,
				job,
			};
			await data.post.teachers.update(id, post);
		}
	}
	return redirect(String(body.get("redirectTo")));
};
