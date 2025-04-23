import * as Card from "@/components/ui/card.tsx";
import type { types } from "@/lib";
import { AspectRatio } from "./ui/aspect-ratio";

export function PostCard(data: { post: types.post; category: types.category }) {
	const post = data.post;
	const category = data.category;
	return (
		<a href={`/post/${post.id}`}>
			<AspectRatio ratio={16 / 9}>
				<Card.Card
					className={"flex h-full flex-col justify-between"}
					style={{
						backgroundImage: `url(${post.image})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}
				>
					<Card.CardHeader>
						<Card.CardTitle className="flex justify-between">
							<div>{post.title}</div>
							<div>{category.name}</div>
						</Card.CardTitle>
					</Card.CardHeader>
					<Card.CardContent>
						<p>{post.description}</p>
					</Card.CardContent>
				</Card.Card>
			</AspectRatio>
		</a>
	);
}
