"use server";

import { api } from "convex@/_generated/api";
import { fetchMutation } from "convex/nextjs";
import type { Id } from "convex@/_generated/dataModel";
import { compress } from "@/lib/pako";

export interface NewPostProps {
  title: string;
  excerpt: string;
  image: string;
  content: string;
  category: Id<"categories">;
  author: Id<"users">;
  date: Date;
}

export default async function NewPost({
  title,
  excerpt,
  image,
  content,
  category,
  author,
  date,
}: NewPostProps) {
  const contentBuffer = compress({ text: content }).buffer;
  await fetchMutation(api.posts.newPost, {
    title,
    excerpt,
    image,
    content: contentBuffer,
    category,
    author,
    date: date.toISOString(),
  });
}
