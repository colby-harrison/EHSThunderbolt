import { Widgets } from "@/components/widgets";
import { env } from "@/env";
import { api } from "convex@/_generated/api";
import { NextResponse } from "next/server";
import MuxPlayer from "@mux/mux-player-react";
import { fetchQuery } from "convex/nextjs";

export default async function Page() {
  const tbtvVideos = (await fetchQuery(api.tbtv.getall)).sort((a, b) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime());
  return (
    <main className='container mx-auto grid grid-cols-1 gap-4 py-2 sm:grid-cols-2 md:grid-cols-date3'>
      <Widgets.TBTV.Live />
      <div className='w-full h-full aspect-video'>
        <h1 className='prose-h1'>TBTV</h1>
        <p className='prose-p'>East High School's Student News Brodcast.</p>
      </div>
      {tbtvVideos.map((video) => (
        <div key={video._id} className='w-full h-full aspect-video relative'>
          <h2 className='absolute top-0 left-0 text-ehs-blue font-bold p-2 text-shadow'>
            {video.title}
          </h2>
          <iframe
            src={video.url}
            title={video.title}
            allowFullScreen
            className='w-full h-full'
            loading='lazy'
          />
        </div>
      ))}
    </main>
  );
}
