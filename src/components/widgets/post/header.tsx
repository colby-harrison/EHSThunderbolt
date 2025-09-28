"use client";

import { useMetadataData } from "@/components/PostMetadataProvider";
import { Widgets } from "..";
import { useQuery } from "convex/react";
import { api } from "convex@/_generated/api";
import type { Id } from "convex@/_generated/dataModel";
import AuthorCard from "./author-card";

export default function PostHeader() {
  const metaData = useMetadataData();
  const author = useQuery(
    api.users.getById,
    !metaData.metadataData.legacy
      ? { id: metaData.metadataData.author as Id<"users"> }
      : "skip"
  );
  const mdtDateString = `${metaData.metadataData.date}T00:00:00-06:00`;
  const dateObjectMDT = new Date(mdtDateString);
  const image = metaData.metadataData.coverImage
    ? metaData.metadataData.legacy === true
      ? `/post/legacy/images/${metaData.metadataData.coverImage}`
      : `/cdn/ut/${metaData.metadataData.coverImage}`
    : null;
  return (
    <header>
      <h1 className='text-ehs-blue'>{metaData.metadataData.title}</h1>
      <p>{metaData.metadataData.excerpt}</p>
      {metaData.metadataData.legacy === true ? (
        metaData.metadataData.author ? (
          typeof metaData.metadataData.author === "string" ? (
            <p>
              {metaData.metadataData.author} • {dateObjectMDT.toDateString()}
            </p>
          ) : (
            <p>
              {metaData.metadataData.author.name},{" "}
              {metaData.metadataData.author.role} •{" "}
              {dateObjectMDT.toDateString()}
            </p>
          )
        ) : null
      ) : metaData.metadataData.author ? (
        typeof metaData.metadataData.author === "string" && author ? (
          <div className="flex flex-row gap-2 items-center p-2">
            <AuthorCard author={author} /> •{" "}
            <Widgets.Common.GetDate date={metaData.metadataData.date} />
          </div>
        ) : (
          <p>{dateObjectMDT.toDateString()}</p>
        )
      ) : null}
      {image ? <img src={image} alt={metaData.metadataData.title} /> : null}
    </header>
  );
}
