import type { types } from "@/lib";
import Form from "../Forms";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const TBTVInputs: types.FormInput[] = [
	{
		name: "Title",
		type: "text",
		placeholder: "TBTV Title...",
		required: true,
	},
	{
		name: "URL",
		type: "text",
		placeholder: "TBTV Video URL...",
		required: true,
	},
];

export default async function TBTVCard() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>TBTV</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-row gap-2">
				<div className=" basis-1/2">
					<Form
						method="POST"
						formFor="create"
						inputs={TBTVInputs}
						action="/api/tbtv/post"
						redirectTo="/admin"
					/>
				</div>
			</CardContent>
		</Card>
	);
}
