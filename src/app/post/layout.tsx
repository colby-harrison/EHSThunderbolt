import { MetadataProvider } from "@/components/PostMetadataProvider";

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return (
    <MetadataProvider>
      
      {children}
    </MetadataProvider>
  );
}