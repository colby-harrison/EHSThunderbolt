"use client";

import { useMetadataData } from "@/components/PostMetadataProvider";

export default function PostHeader() {
  const metaData = useMetadataData();
  const mdtDateString = `${metaData.metadataData.date}T00:00:00-06:00`;
  const dateObjectMDT = new Date(mdtDateString);
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
      <img src={metaData.metadataData.coverImage} alt='cover' />
    </header>
  );
}
