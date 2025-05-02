"use client";

import { HeaderBtn } from "@/components/site/header/header-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/react";
import Link from "next/link";

export default function NavigationWidget() {
  const [categories] = api.navbarCategory.getAll.useSuspenseQuery();
  const [categoryList] = api.category.getAll.useSuspenseQuery();
  
  if (!categories || !categoryList) return null;
  
  return (
    <div className='hidden h-full grid-cols-7 gap-2 p-2 lg:grid'>
      {categories.map((category, index) => {
        // Convert categoryId to a number for comparison
        const categoryIdNum = category.categoryId ? Number(category.categoryId) : null;
        
        // Find the matching category using the numeric value
        const matchingCategory = categoryIdNum !== null ? 
          categoryList.find((c) => c.id === categoryIdNum) : null;
        
        const categoryName = matchingCategory?.name || "Unknown";
        
        return (
					<>
            {categoryIdNum !== null && categoryIdNum !== -1 ? (
              <HeaderBtn
                text={categoryName}
                href={`/category/${categoryIdNum}`}
								key={index}
              />
            ) : (
              <div key={index} />
            )}
					</>
        );
      })}
      <HeaderBtn text='2025 Grads' href='/grads' />
      <HeaderBtn text='Offical School Site' href='https://east.laramie1.org' />
    </div>
  );
}
