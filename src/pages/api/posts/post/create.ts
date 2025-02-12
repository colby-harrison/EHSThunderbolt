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
    const imageFile = body.get('image') as File | null;
    if (title && content && author && catagory && needsReview && published) {
      let image: string =
        'https://kzekz7a45c.ufs.sh/f/bt0EuG5lPH505nfkSNHmmQCn1kDqg8htKYWxpoiJ9OjyvdaU';
      if (imageFile) {
        const arrayBuffer = await imageFile.arrayBuffer();
        image = await data.post.images.create({
          fileName: imageFile.name,
          fileBuffer: arrayBuffer,
          size: imageFile.size,
          type: imageFile.type,
          author,
        });
      }
      const post: types.postCreate = {
        title,
        content,
        author,
        catagory,
        needsReview,
        published,
        image,
      };
      await data.post.posts.create(post);
    } else {
      console.log('error');
    }
  }
  return redirect(String(body.get('redirectTo')));
};
