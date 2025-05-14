import { api } from "@/trpc/react";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { version } from "pdfjs-dist";

export default function CalendarEmbed() {
  const [calendar] = api.kv.getByKeyNoCache.useSuspenseQuery({
    key: "calendar",
  });
  const calendarURL = `/cdn/ut/${calendar?.value}`;
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
