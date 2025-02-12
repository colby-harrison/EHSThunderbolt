import { type APIRoute } from 'astro';
import data from '@/server/queries';

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const user = await locals.currentUser();
  if (!import.meta.env.DEV) {
    if (!user) {
      return redirect('/?error=action-not-permitted');
    }
  }
  const body = await request.formData();
  if (body.get('formFor') === 'delete') {
    const id = Number(body.get('id'));
    if (id) {
      await data.post.teachers.delete(id);
    }
  }
  return redirect(String(body.get('redirectTo')));
};
