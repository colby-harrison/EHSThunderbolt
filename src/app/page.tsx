import Link from "next/link";

import { HydrateClient, api } from "@/trpc/server";

import { Widgets } from "@/components/widgets";

export default async function Home() {
  return (
    <HydrateClient>
      <main className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 py-2 container mx-auto'>
        <Widgets.Common.CategoryNavigationWidget />
      </main>
    </HydrateClient>
  );
}
