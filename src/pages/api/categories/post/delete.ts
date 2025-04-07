import { type APIRoute } from 'astro';
import data from '@/server/queries';

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
  if (body.get('formFor') === 'delete') {
    const id = String(body.get('id'));
    if (id) {
      const posts = await data.get.byCategory.posts(id);
      posts.forEach(
        async (post) =>
          await data.post.posts.update(post.id, {
            title: post.title,
            description: post.description,
            content: post.content,
            author: post.author,
            category: '-1',
            needsReview: post.needsReview,
            published: post.published,
            image: post.image,
          }),
      );
      await data.post.categories.delete(id);
    }
  }
  return redirect(String(body.get('redirectTo')));
};
