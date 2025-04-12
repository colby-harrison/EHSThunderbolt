"use client";

import { api } from "@/trpc/react";
import { Suspense } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function NavigationWidget() {
  const [categories] = api.category.getAll.useSuspenseQuery();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='w-full max-w-xs rounded-lg border border-sidebar-border bg-sidebar text-sidebar-foreground shadow-xl'>
        <div className="p-4 border-b-2 border-sidebar-border shadow-xl">
          <h2 className='text-xl font-bold'>Categories</h2>
				</div>
          <ScrollArea className='h-72 w-auto'>

						<div className="p-4">
              {categories?.map((category) => (
                <span key={category.id}>
                  <div key={category.id} className='text-sm'>
										<Link href={`/category/${category.id}`} className="prose-a">
											{category.name}
										</Link>
                  </div>
                  <Separator className='my-2' />
                </span>
              ))}
						</div>
          </ScrollArea>
      </div>
    </Suspense>
  );
}
