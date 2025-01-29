// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import db from "@astrojs/db";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), db()],
  output: "server",

  vite: {
    server: {
      allowedHosts: true,
    },
  },

  adapter: vercel(),
});