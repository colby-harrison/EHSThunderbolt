/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { type NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/cdn/ut/:id", // proxy UploadThing files (unblocks images when on school devices)
        destination: process.env.NODE_ENV === "production" ? "https://kzekz7a45c.ufs.sh/f/:id" : "https://ntpz9gsoci.ufs.sh/f/:id",
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
