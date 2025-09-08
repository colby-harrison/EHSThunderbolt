"use client";

import { useTheme } from "next-themes";
import MonacoEditor from "@monaco-editor/react";
import { useState, useEffect, useRef } from "react";
import type { editor } from "monaco-editor";
import { mdxToHtml } from "@/lib/mdx"; // returns a React element now
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertTriangleIcon, BellIcon, CalendarIcon, FileText, Radical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  onChange?: (
    value: string | undefined,
    ev: editor.IModelContentChangedEvent
  ) => void;
}

export default function CodeEditor({ onChange }: Props) {
  const [markdown, setMarkdown] = useState(`# Hello World!`);
  // Store a React element instead of an HTML string
  const [renderedMdx, setRenderedMdx] = useState<React.ReactElement | null>(
    null
  );
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const theme = useTheme();

  const editorTheme = theme.resolvedTheme === "light" ? "light" : "vs-dark";

  const handleChange = (
    value: string | undefined,
    ev: editor.IModelContentChangedEvent
  ) => {
    setMarkdown(value ?? "");
    if (onChange) onChange(value, ev);
  };

  // Re-render MDX when markdown changes
  useEffect(() => {
    let cancelled = false;
    const processMarkdown = async () => {
      try {
        if (!markdown) {
          setRenderedMdx(null);
          return;
        }
        const element = await mdxToHtml(markdown);
        if (!cancelled) setRenderedMdx(element);
      } catch (e) {
        // Fallback rendering on error
        if (!cancelled)
          setRenderedMdx(
            <p className="text-sm text-destructive">
              Error rendering content.
            </p>
          );
      }
    };
    processMarkdown();
    return () => {
      cancelled = true;
    };
  }, [markdown]);

  const editorOptions: editor.IStandaloneEditorConstructionOptions = {
    automaticLayout: true,
    scrollBeyondLastLine: false,
    wordWrap: "on",
  };

  const insertAtCursor = (textToInsert: string) => {
    if (!editorRef.current) return;
    const ed = editorRef.current;
    const model = ed.getModel();
    const selection = ed.getSelection();
    if (!model || !selection) return;
    ed.executeEdits("insert-text", [
      {
        range: selection,
        text: textToInsert,
        forceMoveMarkers: true,
      },
    ]);
    ed.focus();
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-row flex-wrap gap-2 items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => insertAtCursor("^[Add Footnote Content here]")}
                size={"icon"}
                variant={"outline"}
              >
                <FileText /> <span className="sr-only">Insert a footnote</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add a footnote</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => insertAtCursor("$$Add LaTeX here$$")}
                size={"icon"}
                variant={"outline"}
              >
                <Radical />{" "}
                <span className="sr-only">Insert a LaTeX formula</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add a LaTeX formula</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>Components</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Static</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  insertAtCursor(
                    "<Alert title='' description='' type='default' /> {/* types: 'default' 'destructive' 'caution' */}"
                  )
                }
                className="flex justify-between gap-2"
              >
                <AlertTriangleIcon /> <span>Alert</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Dynamic</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => insertAtCursor("<BellSchedule />")}
                className="flex justify-between gap-2"
              >
                <BellIcon /> <span>Bell Schedule</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => insertAtCursor("<Calendar />")}
                className="flex justify-between gap-2"
              >
                <CalendarIcon /> <span>Calendar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex flex-row w-full h-full p-0 border-t border-border">
        <div className="basis-1/2 lg:basis-2/3 h-[75dvh] w-full border-r border-border">
          <MonacoEditor
            language={"markdown"}
            value={markdown}
            onChange={handleChange}
            theme={editorTheme}
            options={editorOptions}
            onMount={(editor) => {
              editorRef.current = editor;
            }}
          />
        </div>
        <section className="prose basis-1/2 lg:basis-1/3 overflow-y-auto p-4">
          {renderedMdx}
        </section>
      </CardContent>
    </Card>
  );
}