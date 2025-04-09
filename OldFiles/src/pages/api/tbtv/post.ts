import { db, eq, tbtv } from "astro:db";
import data from "@/server/queries";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect, locals }) => {
	const user = await locals.currentUser();
	if (!user) {
		return redirect("/?error=action-not-permitted");
	}
	const isAdmin = user.publicMetadata.isAdmin as boolean;
	const userId = user.id;
	const body = await request.formData();
	if (body.get("formFor") === "create") {
		const url = String(body.get("url"));
		const title = String(body.get("title"));
		if (url && title) {
			await db.insert(tbtv).values({
				title: title,
				url: url,
			});
			const postData = await db.select().from(tbtv).where(eq(tbtv.url, url));
			await data.audit.log.tbtv.create(userId, isAdmin, {
				id: postData[0].id,
				title: postData[0].title,
				url: postData[0].url,
			});
		}
	}
	if (body.get("formFor") === "delete") {
		const id = String(body.get("id"));
		const tbtvData = await db.select().from(tbtv).where(eq(tbtv.id, id));
		if (id && tbtvData[0]) {
			await db.delete(tbtv).where(eq(tbtv.id, id));
			await data.audit.log.tbtv.delete(userId, isAdmin, {
				id: id!,
				title: tbtvData[0].title,
				url: tbtvData[0].url,
			});
		}
	}
	return redirect(String(body.get("redirectTo")));
};
