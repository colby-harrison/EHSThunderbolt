// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import db from '@astrojs/db';
import mdx from '@astrojs/mdx';
import clerk from '@clerk/astro';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), db(), mdx()],
  adapter: cloudflare(),
  output: 'server',
});