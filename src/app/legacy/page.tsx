import Link from "next/link";

import { Widgets } from "@/components/widgets";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import * as Card from "@/components/ui/card";

export default async function Home() {
  return (
    <main className='container mx-auto grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      <Card.Card className='w-full h-full col-span-2'>
        <Card.CardHeader>
          <Card.CardTitle>Legacy Posts</Card.CardTitle>
        </Card.CardHeader>
        <Card.CardContent>
          These are posts migrated from the old ehsthunderbolt.com website.
        </Card.CardContent>
      </Card.Card>
      <Alert variant='destructive' className='col-span-2'>
        <AlertTitle>Notice</AlertTitle>
        <AlertDescription>
          Please note that legacy Posts may be broken or missing content.
        </AlertDescription>
      </Alert>
      <Widgets.Common.LegacySubpageButton path='/legacy/2015' title='2015' />
      <Widgets.Common.LegacySubpageButton path='/legacy/2016' title='2016' />
      <Widgets.Common.LegacySubpageButton path='/legacy/2017' title='2017' />
      <Widgets.Common.LegacySubpageButton path='/legacy/2018' title='2018' />
      <Widgets.Common.LegacySubpageButton path='/legacy/2019' title='2019' />
      <Widgets.Common.LegacySubpageButton path='/legacy/2020' title='2020' />
      <Widgets.Common.LegacySubpageButton path='/legacy/2021' title='2021' />
      <Widgets.Common.LegacySubpageButton path='/legacy/2022' title='2022' />
      <Widgets.Common.LegacySubpageButton path='/legacy/2023' title='2023' />
      <Widgets.Common.LegacySubpageButton path='/legacy/2024' title='2024' />
      <Widgets.Common.LegacySubpageButton path='/legacy/2025' title='2025' />
    </main>
  );
}
