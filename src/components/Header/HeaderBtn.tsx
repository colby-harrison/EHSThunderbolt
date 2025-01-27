export default function HeaderBtn({ text, href }: { text: string, href: string }) {
  return (
    <a href={href} className=" hover:bg-ehs-gray/50 text-xs md:text-xl font-bold rounded p-2">
      {text}
    </a>
  );
}