import Link from "next/link";

import { Widgets } from "@/components/widgets";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function Category() {
  return (
    <main className='container mx-auto grid grid-cols-1 gap-4 py-4 md:grid-cols-2'>
      <Alert variant={"destructive"} className='col-span-2'>
        <AlertTitle>Notice</AlertTitle>
        <AlertDescription>
          The bell schedule has not yet been updated for the 2025-2026 school year. The calendar has, however, been updated.
        </AlertDescription>
      </Alert>
      <Widgets.BellSchedule.Table />
      <Widgets.BellSchedule.Calendar />
    </main>
  );
}
