import { Button } from '@/components/ui/button';

export function EditButton({ id }: { id: string }) {
  return (
    <Button
      variant="outline"
      onClick={() => (window.location.href = `/staff/post/edit/${id}`)}
    >
      Edit
    </Button>
  );
}
