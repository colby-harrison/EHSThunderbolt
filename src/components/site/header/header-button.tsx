export function HeaderBtn({ text, href }: { text: string; href: string }) {
	return (
		<a
			href={href}
			className=" rounded p-2 font-bold text-xs hover:bg-ehs-gray/50 md:text-xl"
		>
			{text}
		</a>
	);
}
