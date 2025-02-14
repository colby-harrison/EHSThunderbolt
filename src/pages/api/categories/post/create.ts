import { type APIRoute } from 'astro';
import data from '@/server/queries';
import { types } from '@/lib';

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const user = await locals.currentUser();
  if (!import.meta.env.DEV) {
    if (!user) {
      return redirect('/?error=action-not-permitted');
    }
    if (!user.publicMetadata.isAdmin) {
      return redirect('/?error=action-not-permitted');
    }
  }
  const body = await request.formData();
  if (body.get('formFor') === 'categories') {
    const name = String(body.get('name'));
    if (name) {
      const category: types.categoryCreate = {
        name,
      };
      await data.post.categories.create(category);
    }
  }
  return redirect(String(body.get('redirectTo')));
};
