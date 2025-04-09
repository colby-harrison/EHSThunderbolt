import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
	secretKey: import.meta.env.CLERK_SECRET_KEY,
});

export default async function AuthorCard({ AuthorID }: { AuthorID: string }) {
	const user = await clerkClient.users.getUser(AuthorID);
	return (
		<div className="w-full rounded-lg border bg-card p-2">
			<p>
				<img
					src={user.imageUrl}
					alt={
						user.username?.slice(0, 2) ||
						(user.firstName + " " + user.lastName).slice(0, 2)
					}
					className="mr-2 inline-flex h-12 w-12 rounded-full border"
				/>
				{user.username || user.firstName + " " + user.lastName}
			</p>
		</div>
	);
}
