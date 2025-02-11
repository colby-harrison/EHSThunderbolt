import RTE from '@/components/TextEditor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { types } from '@/lib';
import { CategoriesCombobox } from './CategoriesCombo';
import { useStore } from '@nanostores/react';
import { $authStore } from '@clerk/astro/client';
import React from 'react';

interface FormProps {
  categories: types.catagory[];
}

export default function Form({ categories }: FormProps) {
  const { userId } = useStore($authStore)
  const [image, setImage] = React.useState('');
  return (
    <form action="/api/posts/post/create" method="POST">
      <input type="hidden" value={userId!} name="author" />
      <input type="hidden" name="redirectTo" value="/staff" />
      <Card>
        <CardHeader>
          <CardTitle>New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row flex-wrap gap-2 py-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input type="text" name="title" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="catagory">Category</Label>
              <CategoriesCombobox categories={categories} />
            </div>
            <div className="flex flex-col gap-2">
              {
                image &&
                <img src={image} alt={image} className="w-full h-auto" />
              }
              <Label htmlFor="image">Image</Label>
              <Input type='file' name='image' accept='.jpg, .jpeg, .png, .gif, .webp' value={image} onChange={(value) => setImage(value.target.value)} />
            </div>
          </div>
          <RTE />
        </CardContent>
        <CardFooter>
          <Button type="submit">Create</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
