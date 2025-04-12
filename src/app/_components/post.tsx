"use client";

import { useState } from "react";

import { api } from "@/trpc/react";

/**
 * @deprecated This is an example of how to use trpc client side. This code does not work. Use of this code will cause a build error.
 */
export function LatestPost() {
	// @ts-expect-error - This works, just this file is used as an example on how to use trpc client side.
	const [latestPost] = api.post.getLatest.useSuspenseQuery();

	const utils = api.useUtils();
	const [name, setName] = useState("");
	// @ts-expect-error - This works, just this file is used as an example on how to use trpc client side.
	const createPost = api.post.create.useMutation({
		onSuccess: async () => {
			await utils.post.invalidate();
			setName("");
		},
	});

	return (
		<div className="w-full max-w-xs">
			{latestPost ? (
				<p className="truncate">Your most recent post: {latestPost.name}</p>
			) : (
				<p>You have no posts yet.</p>
			)}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					createPost.mutate({ name });
				}}
				className="flex flex-col gap-2"
			>
				<input
					type="text"
					placeholder="Title"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
				/>
				<button
					type="submit"
					className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
					disabled={createPost.isPending}
				>
					{createPost.isPending ? "Submitting..." : "Submit"}
				</button>
			</form>
		</div>
	);
}
