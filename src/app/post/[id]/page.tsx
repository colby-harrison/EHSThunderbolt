import Link from "next/link";

import { api } from "convex@/_generated/api";
import { fetchQuery } from "convex/nextjs";

import { Widgets } from "@/components/widgets";
import { NextResponse } from "next/server";
import type { Id } from "convex@/_generated/dataModel";
import { decompress } from "@/lib/pako";
import { mdxToReact } from "@/lib/mdx.server";
import { MetadataDataUpdater, type MetadataData } from "@/components/PostMetadataProvider";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await fetchQuery(api.posts.getById, { id: id as Id<"posts"> });
  if (!post) {
    NextResponse.rewrite("/404");
    return <div>Post not found</div>;
  }
  const rawContent = decompress({ arrayBuffer: new Uint8Array(post.content) });
  const Content = await mdxToReact(rawContent);
  const metadata: MetadataData = {
    legacy: false,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    author: post.author,
    categories: post.category,
    coverImage: post.image,
  }
  return (
    <main className=''>
      <MetadataDataUpdater data={metadata} />
      <div className='prose'>{Content}</div>
    </main>
  );
}
