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
  console.log(test.frontmatter);
  console.log(test.default);

  const Post = test.default;

  return (
    <>
      {/* <MetadataDataUpdater data={metadata as MetadataData} /> */}
      <Post />
    </>
  );
}
