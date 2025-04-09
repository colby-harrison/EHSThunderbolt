import db from "@astrojs/db";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import clerk from "@clerk/astro";
// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), react(), clerk(), db()],
	output: "server",
	// this is only used for the dev server.
	// tools like cloudflare tunnels don't
	// like working without this.
	vite: {
		server: {
			allowedHosts: true,
		},
	},

	adapter: vercel(),
});
