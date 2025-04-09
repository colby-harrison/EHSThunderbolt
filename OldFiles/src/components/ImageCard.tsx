import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { types } from "@/lib";

interface ImageCardProps {
	image: types.image;
}

import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
	secretKey: import.meta.env.CLERK_SECRET_KEY,
});

export default async function ImageCard({ image }: ImageCardProps) {
	const user = await clerkClient.users.getUser(image.author);
	return (
		<Card>
			<CardContent>
				<img src={image.fullUrl} alt={image.id} />
			</CardContent>
			<CardFooter>uploaded by {user.username}</CardFooter>
		</Card>
	);
}
