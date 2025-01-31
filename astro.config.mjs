// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import clerk from "@clerk/astro";
import db from "@astrojs/db";
import vercel from "@astrojs/vercel";

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
