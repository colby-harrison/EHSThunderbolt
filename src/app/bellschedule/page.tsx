import Link from "next/link";

import { HydrateClient, api } from "@/trpc/server";

import { Widgets } from "@/components/widgets";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function Category() {
  return (
    <HydrateClient>
      <main className='container mx-auto grid grid-cols-1 gap-4 py-4 md:grid-cols-2'>
        <Alert variant={"destructive"} className="col-span-2">
          <AlertTitle>Notice</AlertTitle>
          <AlertDescription>The bell has been ringing roughly a minute early, please account for this.</AlertDescription>
        </Alert>
        <Widgets.BellSchedule.Table />
        <Widgets.BellSchedule.Calendar />
      </main>
    </HydrateClient>
  );
}
