import Link from "next/link";

import { HydrateClient, api } from "@/trpc/server";

import { Widgets } from "@/components/widgets";

export default async function Category() {
  return (
    <HydrateClient>
      <main className='container mx-auto grid grid-cols-1 gap-4 py-2 md:grid-cols-2'>
        <Widgets.BellSchedule.Table />
        <Widgets.BellSchedule.Calendar />
      </main>
    </HydrateClient>
  );
}
