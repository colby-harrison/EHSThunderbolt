import Link from "next/link";

import { HydrateClient, api } from "@/trpc/server";

import { Widgets } from "@/components/widgets";

export default async function Home() {
  const rawData = await api.teacher.getAll();
  const teachers = rawData.sort((a, b) => a.job!.localeCompare(b.job!));
  return (
    <HydrateClient>
      <main className=' grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-2 py-2 container mx-auto'>
        {
          teachers.map((teacher, index) => (
            <div key={index}>
              <Widgets.Teacher.TeacherWidget teacher={teacher} />
            </div>
          ))
        }
      </main>
    </HydrateClient>
  );
}
