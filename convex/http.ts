import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

auth.addHttpRoutes(http);

http.route({
  path: "/emailCheck",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const email = new URL(request.url).searchParams.get("email");
    if (!email) {
      return new Response(JSON.stringify({ error: "Missing email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const allowed = await ctx.runQuery(
      internal.allowedemail.internalIsAllowedEmail,
      { email }
    );

    return new Response(JSON.stringify({ allowed }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
});

export default http;
