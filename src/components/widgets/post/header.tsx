"use client";

import { useMetadataData } from "@/components/PostMetadataProvider";

export default function PostHeader() {
  const metaData = useMetadataData();
  const mdtDateString = `${metaData.metadataData.date}T00:00:00-06:00`;
  const dateObjectMDT = new Date(mdtDateString);
  const image = metaData.metadataData.coverImage ? metaData.metadataData.legacy === true ? `/post/legacy/image/${metaData.metadataData.coverImage}` : `/cdn/ut/${metaData.metadataData.coverImage}` : null;
  return (
    <header>
      <h1 className='text-ehs-blue'>{metaData.metadataData.title}</h1>
      <p>{metaData.metadataData.excerpt}</p>
      {metaData.metadataData.author ? (
        typeof metaData.metadataData.author === "string" ? (
          <p>
            {metaData.metadataData.author} • {dateObjectMDT.toDateString()}
          </p>
        ) : (
          <p>
            {metaData.metadataData.author.name},{" "}
            {metaData.metadataData.author.role} • {dateObjectMDT.toDateString()}
          </p>
        )
      ) : null}
      {
        image ? (
          <img src={image} alt={metaData.metadataData.title} />
        ) : null
      }
    </header>
  );
}
