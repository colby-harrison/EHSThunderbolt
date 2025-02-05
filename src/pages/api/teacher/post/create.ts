import { type APIRoute } from "astro"
import data from '@/server/queries'
import {types} from '@/lib'


export const POST: APIRoute = async ({ request, redirect, locals }) => {
  const user = await locals.currentUser();
  if (!import.meta.env.DEV) {
    if (!user) {
      return redirect('/?error=action-not-permitted');
    }
  }
  const body = await request.formData()
  if (body.get('formFor') === 'teachers') {
    const name = String(body.get('name'))
    const picture = String(body.get('picture'))
    const job = String(body.get('job'))
    if (name && picture && job) {
      const post: types.teacherCreate = {
        name,
        picture,
        job,
      }
      await data.post.teachers.create(post)
    }
  }
  return redirect(String(body.get('redirectTo')))
}