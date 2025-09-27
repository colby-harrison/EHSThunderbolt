"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useQuery } from "convex/react";
import { api } from "convex@/_generated/api";
import { useEffect, useRef, useState } from "react";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

export default function CalendarEmbed() {
  const calendar = useQuery(api.kv.getByKey, { key: "calendar" });
  const calendarURL = calendar?.value
    ? `/cdn/ut/${calendar.value}`
    : undefined;

  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // configure worker only once (side effect safe)
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-full overflow-hidden">
      {calendarURL && width ? (
        <Document file={calendarURL} loading={null}>
          <Page
            pageNumber={1}
            width={width}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </Document>
      ) : null}
    </div>
  );
}