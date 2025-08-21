import Link from "next/link";

import { Widgets } from "@/components/widgets";
import { GlobalDataUpdater } from "@/components/GlobalProvider";

export default async function Home() {
  return (
    <main className='container mx-auto grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      <GlobalDataUpdater data={{ showHeader: true, navBarStyle: "floating" }} />
      <Widgets.Common.CategoryNavigation />
    </main>
  );
}
