"use client";

import { HeaderBtn } from "@/components/site/header/header-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { api } from "convex@/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";
import React from "react";

export default function NavigationWidget() {
  const categories = useQuery(api.categories.getNavbarCategories);

  if (!categories) {
    return (
      <div className='hidden h-full grid-cols-7 gap-2 p-2 lg:grid'>
        <div />
        <div />
        <div />
        <div />
        <div />
        <HeaderBtn text='2026 Grads' href='/grads' />
        <HeaderBtn
          text='Offical School Site'
          href='https://east.laramie1.org'
        />
      </div>
    );
  }

  return (
    <div className='hidden h-full grid-cols-7 gap-2 p-2 lg:grid'>
      {categories.map((category, index) => {
        if (!category.category) return <div />;

        return (
          <React.Fragment key={index}>
            <HeaderBtn
              text={category.category.name}
              href={`/category/${category.category._id}`}
            />
          </React.Fragment>
        );
      })}
      <HeaderBtn text='2026 Grads' href='/grads' />
      <HeaderBtn text='Offical School Site' href='https://east.laramie1.org' />
    </div>
  );
}
