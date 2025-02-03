import data from '@/server/queries';
import { types } from '@/lib';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Form from './Forms';
import DeleteBtn from './DeleteBtn';
import { Suspense } from 'react';

const categoriesInputs: types.FormInput[] = [
  {
    name: 'Name',
    type: 'text',
    placeholder: 'Category Name',
    required: true,
  },
];

export default async function CategoriesCard() {
  const allCategories = await data.get.all.catagories();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row gap-2">
        <div className=" basis-1/2">
          <Form method="POST" formFor="categories" inputs={categoriesInputs} />
        </div>
        <div className="flex flex-col gap-2 overflow-y-scroll basis-1/2">
          <Suspense fallback={<div>Loading...</div>}>
            {allCategories.map((category) => (
              <div
                className="flex flex-row gap-2 justify-between"
                key={category.id}
              >
                <div className="w-full">{category.name}</div>
                <DeleteBtn table="catagories" id={category.id} />
              </div>
            ))}
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
