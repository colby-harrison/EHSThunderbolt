import type { APIRoute } from 'astro';
import data from '@/server/queries';
import type { types } from '@/lib';

// eslint-disable-next-line
export const POST: APIRoute = async ({ params, request, locals }) => {
  const { userId } = locals.auth();

  if (!userId) {
    return new Response('Error: No signed in user', { status: 401 });
  }

  const teacherData = await request.formData();
  const teacherObject: types.teacher = {
    id: Number(teacherData.get('id')),
    name: String(teacherData.get('name')),
    picture: String(teacherData.get('picture')),
    job: String(teacherData.get('job')),
  };
  await data.post.teachers.update(teacherObject.id, teacherObject);

  return new Response('Success', { status: 200 });
};
