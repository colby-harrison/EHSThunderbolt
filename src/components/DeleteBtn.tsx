import { Button } from './ui/button';

interface DeleteBtnProps {
  table: 'catagories' | 'authors' | 'posts' | 'teachers';
  id: string | number;
  action?: string;
  redirectTo?: string;
}

export default function DeleteBtn({
  table,
  id,
  action,
  redirectTo,
}: DeleteBtnProps) {
  return (
    <form method="POST" action={action}>
      <input type="hidden" name="table" value={table} />
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="formFor" value="delete" />
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <Button type="submit" variant={'destructive'}>
        Delete
      </Button>
    </form>
  );
}
