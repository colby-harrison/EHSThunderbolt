"use client";

import { useMetadataData } from "@/components/PostMetadataProvider";

export default function PostHeader() {
  const metaData = useMetadataData();
  return (
    <div className='flex flex-col items-center justify-center gap-y-2 py-10'>
      <h1 className='text-4xl font-bold'>Post Header</h1>
    </div>
  );
}
