import MuxPlayer from "@mux/mux-player-react";
import Link from "next/link";
import { HydrateClient, api } from "@/trpc/server";
import { Widgets } from "@/components/widgets";

export default async function Page() {
  return (
    <HydrateClient>
      <main className='container mx-auto'>
        <MuxPlayer
          playbackId='Vzu2w02WXejsrS3HxoEairxiM01RLN3dc4gBNmOoRiSXg'
          metadata={{
            video_title: "TBTV",
          }}
        />
      </main>
    </HydrateClient>
  );
}
