"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeaderBtn({ text, href }: { text: string; href: string }) {
	return (
		<Button variant="outline" asChild className="hover:bg-ehs-blue/50">
			<Link href={href}>{text}</Link>
		</Button>
	);
}
