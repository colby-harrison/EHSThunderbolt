import { Widgets } from "@/components/widgets";
import { env } from "@/env";
import { api, HydrateClient } from "@/trpc/server";
import { NextResponse } from "next/server";
import MuxPlayer from "@mux/mux-player-react";

export default async function Page() {
  const tbtvVideos = (await api.tbtv.getAll()).sort((a, b) => b.id - a.id);
  return (
    <HydrateClient>
      <main className='container mx-auto grid grid-cols-1 gap-4 py-2 sm:grid-cols-2 md:grid-cols-3'>
        {
          env.NODE_ENV === "development" && (
            <MuxPlayer
              playbackId=''
              autoPlay
              className='sm:col-span-2 sm:row-span-2 w-full h-full aspect-video'
              accentColor='#62C6F2'
            />
          ) /* If approved by the district, replace "playbackId" with the playback ID of the live stream */
        }
        <div className='w-full h-full aspect-video'>
          <h1 className='prose-h1'>TBTV</h1>
          <p className='prose-p'>East High School's Student News Brodcast.</p>
        </div>
        {
          tbtvVideos.map((video) => (
            <div key={video.id} className="w-full h-full aspect-video relative">
              <h2 className="absolute top-0 left-0 text-ehs-blue font-bold p-2 text-shadow">{video.title}</h2>
              <iframe src={video.url} title={video.title} allowFullScreen className="w-full h-full" loading="lazy" />
            </div>
          ))
        }
      </main>
    </HydrateClient>
  );
}
