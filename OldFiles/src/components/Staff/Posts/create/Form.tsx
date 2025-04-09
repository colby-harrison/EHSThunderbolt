import RTE from "@/components/TextEditor";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { types } from "@/lib";
import { $authStore } from "@clerk/astro/client";
import { useStore } from "@nanostores/react";
import React from "react";
import { CategoriesCombobox } from "./CategoriesCombo";

interface FormProps {
	categories: types.category[];
}

export default function Form({ categories }: FormProps) {
	const { userId } = useStore($authStore);
	const [image, setImage] = React.useState<File | null>(null);
	const [preview, setPreview] = React.useState<string | null>(
		"https://kzekz7a45c.ufs.sh/f/bt0EuG5lPH505nfkSNHmmQCn1kDqg8htKYWxpoiJ9OjyvdaU",
	);

	React.useEffect(() => {
		if (image) {
			const objectUrl = URL.createObjectURL(image);
			setPreview(objectUrl);
			return () => URL.revokeObjectURL(objectUrl);
		}
	}, [image]);

	return (
		<form
			action="/api/posts/post/create"
			method="POST"
			encType="multipart/form-data"
		>
			<input type="hidden" name="formFor" value="posts" />
			<input type="hidden" value="true" name="needsReview" />
			<input type="hidden" value="false" name="published" />
			<input type="hidden" value={userId!} name="author" />
			<input type="hidden" name="redirectTo" value="/staff" />
			<Card>
				<CardHeader>
					<CardTitle>New Post</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-row flex-wrap gap-2 py-2">
						<div className="flex flex-col gap-2">
							<Label htmlFor="title">Title</Label>
							<Input type="text" name="title" />
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="description">Description</Label>
							<Input type="text" name="description" />
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="catagory">Category</Label>
							<CategoriesCombobox categories={categories} />
						</div>
						<div className="flex flex-row gap-2">
							{preview && (
								<img
									src={preview}
									alt="Preview"
									className="h-auto max-h-48 w-full object-contain"
								/>
							)}
							<div className="flex flex-col gap-2">
								<Label htmlFor="image">Poster</Label>
								<Input
									type="file"
									name="image"
									accept=".jpg, .jpeg, .png, .gif, .webp"
									onChange={(value) =>
										setImage(value.target.files?.[0] || null)
									}
								/>
							</div>
						</div>
					</div>
					<RTE />
				</CardContent>
				<CardFooter>
					<Button type="submit">Create</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
