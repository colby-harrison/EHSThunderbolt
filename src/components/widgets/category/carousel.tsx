"use client";

import * as Carousel from "@/components/ui/carousel";
import { api } from "@/trpc/react";
import Autoplay from "embla-carousel-autoplay";
import router from "next/router";

export default function CarouselWidget({ categoryId }: { categoryId: number }) {
  const [posts] = api.posts.getRecentByCategory.useSuspenseQuery({
    categoryId,
    limit: 5,
  });
  return (
    <div className='col-span-2 bg-red-500'>
      <Carousel.Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        {posts.map((post) => (
          <Carousel.CarouselItem
            key={post.id}
            onClick={() => router.push(`/post/${post.id}`)}
          >
            <img
              src={post.image}
              alt={post.title}
              className='w-full h-full object-cover'
            />
          </Carousel.CarouselItem>
        ))}
      </Carousel.Carousel>
    </div>
  );
}
