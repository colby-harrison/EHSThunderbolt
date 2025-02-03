import data from '@/server/queries';
import { types } from '@/lib';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Form from './forms';
import DeleteBtn from './DeleteBtn';

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
      <CardHeader><CardTitle>Categories</CardTitle></CardHeader>
      <CardContent className="flex flex-row gap-2">
        <Form method="POST" formFor="categories" inputs={categoriesInputs} />
        <div className="flex flex-col gap-2 overflow-y-scroll">
          {allCategories.map((category) => (
            <div className="flex flex-row gap-2">
              <div className="w-full">{category.name}</div>
              <DeleteBtn table="catagories" id={category.id} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
