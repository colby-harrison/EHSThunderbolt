import { MetadataProvider } from "@/components/PostMetadataProvider";
import { Widgets } from "@/components/widgets";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MetadataProvider>
      <section className='prose'>
        <Widgets.Post.Header />
        {children}
      </section>
    </MetadataProvider>
  );
}
