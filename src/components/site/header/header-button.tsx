import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeaderBtn({ text, href }: { text: string; href: string }) {
  return (
    <Button variant='outline' asChild>
      <Link href={href}>{text}</Link>
    </Button>
  );
}
