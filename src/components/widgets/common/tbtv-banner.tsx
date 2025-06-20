"use client";

import { useQuery } from "convex/react";
import { api } from "convex@/_generated/api";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

export default function TBTVBanner() {
  const tbtvIsLive = useQuery(api.kv.getByKey, { key: "tbtv_is_live" });
  return (
    <AnimatePresence>
      {tbtvIsLive && tbtvIsLive.value === "true" && (
        <Link href='/tbtv'>
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className='w-full h-16 bg-ehs-blue text-white flex justify-center items-center hover:bg-ehs-blue/50 transition-all'
          >
            <p className='prose-h3 sm:prose-h2 md:prose-h1'>TBTV is Live!</p>
          </motion.div>
        </Link>
      )}
    </AnimatePresence>
  );
}
