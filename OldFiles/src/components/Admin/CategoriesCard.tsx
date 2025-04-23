import type { types } from "@/lib";
import data from "@/server/queries";
import { Suspense } from "react";
import DeleteBtn from "../DeleteBtn";
import Form from "../Forms";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const categoriesInputs: types.FormInput[] = [
	{
		name: "Name",
		type: "text",
		placeholder: "Category Name...",
		required: true,
	},
];

export default async function CategoriesCard() {
	const allCategories = await data.get.all.categories();
	return (
		<Card>
			<CardHeader>
				<CardTitle>Categories</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-row gap-2">
				<div className=" basis-1/2">
					<Form
						method="POST"
						formFor="categories"
						inputs={categoriesInputs}
						action="/api/categories/post/create"
						redirectTo="/admin"
					/>
				</div>
				<div className="flex basis-1/2 flex-col gap-2 overflow-y-scroll">
					<Suspense fallback={<div>Loading...</div>}>
						{allCategories.map((category) => (
							<div
								className="flex flex-row justify-between gap-2"
								key={category.id}
							>
								<div className="w-full">{category.name}</div>
								{category.id !== "-1" && (
									<DeleteBtn
										table="categories"
										id={category.id}
										action="/api/categories/post/delete"
										redirectTo="/admin"
									/>
								)}
							</div>
						))}
					</Suspense>
				</div>
			</CardContent>
		</Card>
	);
}
