import { type APIRoute } from 'astro';
import data from '@/server/queries';
import { types } from '@/lib';

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const user = await locals.currentUser();
  if (!import.meta.env.DEV) {
    if (!user) {
      return redirect('/?error=action-not-permitted');
    }
  }
  const body = await request.formData();
  if (body.get('formFor') === 'posts') {
    const title = String(body.get('title'));
    const content = String(body.get('content'));
    const author = String(body.get('author'));
    const catagory = String(body.get('catagory'));
    const needsReview = Boolean(body.get('needsReview'));
    const published = Boolean(body.get('published'));
    if (title && content && author && catagory && needsReview && published) {
      const post: types.postCreate = {
        title,
        content,
        author,
        catagory,
        needsReview,
        published,
      };
      await data.post.posts.create(post);
    }
  }
  return redirect(String(body.get('redirectTo')));
};
