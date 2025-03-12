import { createClerkClient } from '@clerk/backend';

const clerkClient = createClerkClient({
  secretKey: import.meta.env.CLERK_SECRET_KEY,
});

export default async function AuthorCard({ AuthorID }: { AuthorID: string }) {
  const user = await clerkClient.users.getUser(AuthorID);
  return (
    <div className="bg-card p-2 rounded-lg w-full border">
      <p>
        <img
          src={user.imageUrl}
          alt={user.username?.slice(0,2) || (user.firstName + ' ' + user.lastName).slice(0,2)}
          className="w-12 h-12 rounded-full inline-flex border mr-2"
        />
        {user.username || user.firstName + ' ' + user.lastName}
      </p>
    </div>
  );
}
