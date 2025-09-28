"use client";

import { useTheme } from "next-themes";
import MonacoEditor from "@monaco-editor/react";
import { useState, useEffect, useRef } from "react";
import type { editor, Position } from "monaco-editor";
import { mdxToHtml } from "@/lib/mdx"; // returns a React element now
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertTriangleIcon,
  BellIcon,
  CalendarIcon,
  FileText,
  Radical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/radix/tabs";
import { cn } from "@/lib/utils";

interface Props {
  onChange?: (
    value: string | undefined,
    ev: editor.IModelContentChangedEvent
  ) => void;
  value?: string;
  className?: string;
}

export default function CodeEditor({ onChange, className, value }: Props) {
  const isControlled = value !== undefined;
  const [markdown, setMarkdown] = useState(value || `# Hello World!`);
  const [renderedMdx, setRenderedMdx] = useState<React.ReactElement | null>(
    null
  );
  const [isPreview, setIsPreview] = useState(false);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const theme = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const editorTheme = theme.resolvedTheme === "light" ? "light" : "vs-dark";

  const handleChange = (
    val: string | undefined,
    ev: editor.IModelContentChangedEvent
  ) => {
    if (!isControlled) setMarkdown(val ?? "");
    onChange?.(val, ev);
  };

  // keep markdown in sync if controlled
  useEffect(() => {
    if (isControlled) setMarkdown(value!);
  }, [value, isControlled]);

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
        console.error("MDX render error:", e);
        if (!cancelled)
          setRenderedMdx(
            <p className='text-sm text-destructive'>Error rendering content.</p>
          );
      }
    };
    processMarkdown();
    return () => {
      cancelled = true;
    };
  }, [markdown]);

  // dispose monaco on unmount
  useEffect(() => {
    return () => {
      if (editorRef.current) {
        try {
          editorRef.current.dispose();
        } catch (e) {
          console.warn("Editor dispose failed", e);
        }
      }
    };
  }, []);

  const editorOptions: editor.IStandaloneEditorConstructionOptions = {
    automaticLayout: true,
    scrollBeyondLastLine: true,
    wordWrap: "on",
  };

  // smarter insertAtCursor (handles cursor placement & placeholder selection)
  const insertAtCursor = (
    textToInsert: string,
    type?: "latex" | "footnote"
  ) => {
    if (!editorRef.current) return;
    const ed = editorRef.current;
    const model = ed.getModel();
    const selection = ed.getSelection();
    if (!model || !selection) return;

    ed.pushUndoStop();

    ed.executeEdits("insert-text", [
      {
        range: selection,
        text: textToInsert,
        forceMoveMarkers: true,
      },
    ]);

    ed.pushUndoStop();

    // compute where the insertion started
    const startPos = selection.getStartPosition();
    let insertStart: Position = startPos;
    let insertEnd: Position = startPos;

    if (type === "latex") {
      // `$$Add LaTeX here$$`
      const inner = "Add LaTeX here";
      const offset = 2; // skip `$$`
      const startOffset = model.getOffsetAt(startPos);
      insertStart = model.getPositionAt(startOffset + offset);
      insertEnd = model.getPositionAt(startOffset + offset + inner.length);
    } else if (type === "footnote") {
      // `^[Add Footnote Content here]`
      const inner = "Add Footnote Content here";
      const offset = 2; // skip `^[`
      const startOffset = model.getOffsetAt(startPos);
      insertStart = model.getPositionAt(startOffset + offset);
      insertEnd = model.getPositionAt(startOffset + offset + inner.length);
    } else {
      // default: place cursor at end of inserted text
      const startOffset = model.getOffsetAt(startPos);
      const endOffset = startOffset + textToInsert.length;
      insertStart = model.getPositionAt(endOffset);
      insertEnd = model.getPositionAt(endOffset);
    }

    ed.setSelection({
      startLineNumber: insertStart.lineNumber,
      startColumn: insertStart.column,
      endLineNumber: insertEnd.lineNumber,
      endColumn: insertEnd.column,
    });

    ed.focus();
  };

  return (
    <Card className={cn("overflow-hidden h-[calc(100dvh-8rem)]", className)}>
      <Tabs defaultValue='markdown'>
        <CardHeader className={cn(!isPreview && "border-b border-border")}>
          <TabsList className='w-full'>
            <TabsTrigger value='markdown' onClick={() => setIsPreview(false)}>
              Markdown (MDX)
            </TabsTrigger>
            <TabsTrigger value='preview' onClick={() => setIsPreview(true)}>
              Preview
            </TabsTrigger>
          </TabsList>
        </CardHeader>
        <TabsContent value='markdown' forceMount={true} className={cn(isPreview && "hidden")}>
          {mounted && (
            <>
              <CardHeader>
                <div className='flex flex-row flex-wrap gap-2 items-center'>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() =>
                          insertAtCursor(
                            "^[Add Footnote Content here]",
                            "footnote"
                          )
                        }
                        size={"icon"}
                        variant={"outline"}
                      >
                        <FileText />
                        <span className='sr-only'>Insert a footnote</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add a footnote</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() =>
                          insertAtCursor("$$Add LaTeX here$$", "latex")
                        }
                        size={"icon"}
                        variant={"outline"}
                      >
                        <Radical />
                        <span className='sr-only'>Insert a LaTeX formula</span>
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
                        className='flex justify-between gap-2'
                      >
                        <AlertTriangleIcon /> <span>Alert</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Dynamic</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => insertAtCursor("<BellSchedule />")}
                        className='flex justify-between gap-2'
                      >
                        <BellIcon /> <span>Bell Schedule</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => insertAtCursor("<Calendar />")}
                        className='flex justify-between gap-2'
                      >
                        <CalendarIcon /> <span>Calendar</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className='flex flex-col w-full h-[70vh] p-0 border-t border-border'>
                <div className='flex-1 w-full'>
                  <MonacoEditor
                    language={"markdown"}
                    value={markdown}
                    onChange={handleChange}
                    theme={editorTheme}
                    options={editorOptions}
                    onMount={(editor) => {
                      editorRef.current = editor;
                      setTimeout(() => editor.layout(), 0);
                    }}
                    className='h-full w-full'
                  />
                </div>
              </CardContent>
            </>
          )}
        </TabsContent>
        <TabsContent value='preview' className='flex-1 overflow-hidden'>
          {mounted && (
            <CardContent className='flex flex-col w-full h-[calc(100dvh-12rem)] p-4 border-t border-border overflow-hidden'>
              <div className='prose w-full flex-1 overflow-y-auto'>
                {renderedMdx}
              </div>
            </CardContent>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
}
