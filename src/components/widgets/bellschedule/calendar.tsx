"use client";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { version } from "pdfjs-dist";
import { useQuery } from "convex/react";
import { api } from "convex@/_generated/api";

export default function CalendarEmbed() {
  const calendar = useQuery(api.kv.getByKey, { key: "calendar" });
  const calendarURL = `/cdn/ut/${calendar?.value}`;
  if (!calendar || !calendar.value) {
    return;
  }
  return (
    <>
      {calendarURL ? (
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`}
        >
          <div className='rounded-lg'>
            <Viewer fileUrl={calendarURL} />
          </div>
        </Worker>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
