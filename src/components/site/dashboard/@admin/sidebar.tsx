"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import type { FunctionReference } from "convex/server";
import { api } from "convex@/_generated/api";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface props {
  href: string;
  title: string;
  convexAPI?: FunctionReference<"query">;
  subPaths?: string[];
}

const SidebarLinks: props[] = [
  {
    href: "",
    title: "Home",
  },
  {
    href: "/allowedemails",
    title: "Allowed Emails"
  },
  {
    href: "/users",
    title: "Users",
    convexAPI: api.users.usersUnderReview
  },
  {
    href: "/bellschedule",
    title: "Bell Schedule",
  },
  {
    href: "/post",
    title: "Post",
  }
];

export function Sidebar() {
  return (
    <div className='h-[calc(100dvh-3rem)] w-64 border-r border-sidebar-border bg-sidebar text-sidebar-foreground flex flex-col gap-4 p-4 overflow-y-auto'>
      {SidebarLinks.map((v, index) => {
        return (
          <SidebarLink
            href={v.href}
            title={v.title}
            convexAPI={v.convexAPI}
            key={index}
          />
        );
      })}
    </div>
  );
}

function SidebarLink({ href, title, convexAPI }: props) {
  const pathname = usePathname();
  const data = convexAPI && useQuery(convexAPI);
  const fullHREF = "/dashboard" + href;
  const isPath = pathname === fullHREF || href !== "" && pathname.startsWith(fullHREF + "/");

  return (
    <Button
      variant={isPath ? "default" : "outline"}
      asChild
      className='relative'
    >
      <Link href={fullHREF} className='flex items-center'>
        {title}
        {data && (
          <Badge
            variant='destructive_opaque'
            className='absolute -top-1 -right-1 text-xs px-1.5 py-0.5 opacity-100'
          >
            {data}
          </Badge>
        )}
      </Link>
    </Button>
  );
}
