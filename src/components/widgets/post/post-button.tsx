import * as Card from "@/components/ui/card";

interface PostType {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  coverImage?: string;
  author:
    | {
        name: string;
        role: string;
      }
    | string;
  excerpt?: string;
  isLegacy?: boolean;
}

export default function PostButton({
  slug,
  title,
  date,
  categories,
  coverImage,
  author,
  excerpt,
  isLegacy,
}: PostType) {
  const mdtDateString = `${date}T00:00:00-06:00`;
  const dateObjectMDT = new Date(mdtDateString);
  const image = coverImage ? isLegacy === true ? `/post/legacy/images/${coverImage}` : `/cdn/ut/${coverImage}` : null;
  return (
    <Card.LinkedCard href={isLegacy ? `/post/legacy/${slug}` : `/post/${slug}`}>
      <Card.CardHeader>
        <Card.CardTitle>{title}</Card.CardTitle>
        <Card.CardDescription>
          {author ? (
            typeof author === "string" ? (
              <p>
                {author} • {dateObjectMDT.toDateString()}
              </p>
            ) : (
              <p>
                {author.name}, {author.role} • {dateObjectMDT.toDateString()}
              </p>
            )
          ) : null}
        </Card.CardDescription>
        {
          excerpt && <Card.CardDescription>{excerpt}</Card.CardDescription>
        }
      </Card.CardHeader>
      <Card.CardContent>
        {image ? <img src={image} alt={title} /> : null}
      </Card.CardContent>
    </Card.LinkedCard>
  );
}
