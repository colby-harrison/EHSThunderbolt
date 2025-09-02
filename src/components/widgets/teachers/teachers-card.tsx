"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Id } from "convex@/_generated/dataModel";

interface Teacher {
	_id: Id<"teachers">;
	name: string | null;
	picture: string | null;
	job: string | null;
}

export default function TeacherCard({
	teacher,
	isAdmin,
}: { teacher: Teacher; isAdmin?: boolean }) {
	void isAdmin;
	const imageURL = `/cdn/ut/${teacher.picture}`;
	return (
		<Card>
			<CardHeader>
				<CardTitle>{teacher.name}</CardTitle>
				<CardDescription>{teacher.job}</CardDescription>
			</CardHeader>
			<CardContent>
				<img src={imageURL} alt={teacher.name!} loading="lazy" />
			</CardContent>
		</Card>
	);
}
