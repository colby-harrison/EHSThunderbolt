import { defineDb, defineTable, column } from 'astro:db';

const teachers = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    picture: column.text(),
    job: column.text(),
  },
});
// https://astro.build/db/config
export default defineDb({
  tables: {
    teachers,
  },
});
