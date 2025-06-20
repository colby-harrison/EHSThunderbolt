import Link from "next/link";

import { api } from "convex@/_generated/api";
import { fetchQuery } from "convex/nextjs";

import { Widgets } from "@/components/widgets";
import { NextResponse } from "next/server";
import type { Id } from "convex@/_generated/dataModel";

export default async function Category({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await fetchQuery(api.categories.getById, { id: id as Id<"categories">});
  if (!category) return NextResponse.rewrite("/404");
  return (
    <main className='container mx-auto grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:grid-cols-3'>
      <div>
        <h1 className='prose-h1'>{category.name}</h1>
      </div>
      <Widgets.Category.Carousel categoryId={category._id} />
    </main>
  );
}
