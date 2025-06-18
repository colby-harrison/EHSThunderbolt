import { HydrateClient } from "@/trpc/server";
import { Widgets } from "@/components/widgets";

const years = [
  2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
];

interface PostType {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  coverImage?: string;
  author: string;
  excerpt?: string;
  isLegacy?: boolean;
}

export default async function Page({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const { default: postsListUntyped } = await import(
    `@/content/legacy/${year}/posts.ts`
  );
  const postsList = postsListUntyped as string[];
  let posts: PostType[] = [];
  await Promise.all(
    postsList.map(async (post) => {
      const { frontmatter } = await import(
        `@/content/legacy/${year}/${post}/index.md`
      );
      posts.push({
        slug: `${year}/${post}`,
        ...frontmatter,
        isLegacy: true,
      });
    })
  );
  return (
    <HydrateClient>
      <main className='container mx-auto grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {
          posts.map((post) => (
            <Widgets.Post.PostButton {...post} key={post.slug} />
          ))
        }
      </main>
    </HydrateClient>
  );
}

export function generateStaticParams() {
  return years.map((year) => ({ year: year.toString() }));
}

export const dynamicParams = false;
