import { db, catagories } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(catagories).values([
    {
      name: 'test',
    },
    {
      name: 'test2',
    },
  ]);
}
