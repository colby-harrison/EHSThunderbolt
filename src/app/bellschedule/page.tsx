import { Widgets } from "@/components/widgets";

export default async function Category() {
  return (
    <main className='container mx-auto grid grid-cols-1 gap-4 py-4 md:grid-cols-2'>
      <Widgets.BellSchedule.Table />
      <Widgets.BellSchedule.Calendar />
    </main>
  );
}
