// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import db from "@astrojs/db";
import mdx from "@astrojs/mdx";
// import clerk from "@clerk/astro";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://ehsthunderbolt.org",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    db(),
    mdx(),
    // clerk(),
  ],
  adapter: cloudflare(),
  output: "static",
});
