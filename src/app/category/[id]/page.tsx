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
  const category = await api.category.getById({ id });
  if (!category) return NextResponse.rewrite("/404");
  return (
    <HydrateClient>
      <main className='container mx-auto grid grid-cols-1 gap-4 py-2 sm:grid-cols-2 md:grid-cols-3'>
        <Widgets.Common.CategoryNavigationWidget />
        <div>
          <h1 className='text-4xl font-bold'>{category.name}</h1>
        </div>
      </main>
    </HydrateClient>
  );
}
