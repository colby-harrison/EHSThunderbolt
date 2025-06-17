import {
  MetadataDataUpdater,
  type MetadataData,
} from "@/components/PostMetadataProvider";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const test = await import(
    `@/content/legacy/${slug.join("/")}/index.md`
  );

  const Post = test.default;

  return (
    <>
      <MetadataDataUpdater data={{legacy: true, ...test.frontmatter} as MetadataData} />
      <Post />
    </>
  );
}
