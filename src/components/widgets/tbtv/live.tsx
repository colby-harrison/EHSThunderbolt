"use client";

import MuxPlayer from "@mux/mux-player-react";
import { useQuery } from "convex/react";
import { api } from "convex@/_generated/api";

export default function Live() {
  const tbtvIsLive = useQuery(api.kv.getByKey, { key: "tbtv_is_live" })?.value == "true";
  if (!tbtvIsLive) return null;
  return (
    <MuxPlayer
      playbackId=''
      autoPlay
      className='sm:col-span-2 sm:row-span-2 w-full h-full aspect-video'
      accentColor='#62C6F2'
    />
  );
}
