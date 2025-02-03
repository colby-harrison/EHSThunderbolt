import { Button } from '../ui/button';

interface DeleteBtnProps {
  table: 'catagories' | 'authors' | 'posts' | 'teachers';
  id: string | number;
}

export default function DeleteBtn({ table, id }: DeleteBtnProps) {
  return (
    <form method="POST">
      <input type="hidden" name="table" value={table} />
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="formFor" value="delete" />
      <Button type="submit" variant={'destructive'}>
        Delete
      </Button>
    </form>
  );
}
