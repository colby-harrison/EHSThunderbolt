import Link from "next/link";

import { HydrateClient, api } from "@/trpc/server";

import { Widgets } from "@/components/widgets";
import { NextResponse } from "next/server";

export default async function Category({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await api.category.getById({ id: parseInt(id) });
  if (!category) return NextResponse.rewrite("/404");
  return (
    <HydrateClient>
      <main className='container mx-auto grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:grid-cols-3'>
        <div>
          <h1 className="prose-h1">{category.name}</h1>
        </div>
        <Widgets.Category.Carousel categoryId={category.id} />
      </main>
    </HydrateClient>
  );
}
