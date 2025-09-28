import { useQuery } from "convex/react";
import { api } from "convex@/_generated/api";
import type { Doc, Id } from "convex@/_generated/dataModel";

export default function AuthorCard({
  author,
}: {
  author: Id<"users"> | Doc<"users">;
}) {
  const authorDoc = useQuery(
    api.users.getById,
    typeof author === "string" ? { id: author as Id<"users"> } : "skip"
  );

  const data = authorDoc ?? (typeof author === "object" ? author : null);
  if (!data) return null;

  const subtitle =
    typeof data.title === "string"
      ? data.title
      : data.title?.join(", ") ?? data.role ?? "Writer";

  return (
    <div className="flex flex-row gap-3 p-3 border border-border rounded-lg items-center">
      <img
        src={data.image}
        alt={`${data.name}'s profile picture`}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex flex-col justify-start items-start">
        <h3 className="text-xl font-semibold leading-tight">{data.name}</h3>
        <p className="text-sm text-muted-foreground leading-tight">{subtitle}</p>
      </div>
    </div>
  );
}