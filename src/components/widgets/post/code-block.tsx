"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ClipboardCopyIcon } from "lucide-react";
import { toast } from "sonner";
import MonacoEditor from "@monaco-editor/react";
import languageMap from "./code-block-mapping";

type CodeBlockProps = {
  className?: string;
  children: string;
};

export default function CodeBlock({ className, children }: CodeBlockProps) {
  const theme = useTheme();

  const editorTheme = theme.resolvedTheme === "light" ? "light" : "vs-dark";
  const language =
    languageMap[className?.replace("language-", "") || ""] ||
    className?.replace("language-", "") || "text";

  return (
    <div className='p-4'>
      <div className='rounded-lg border border-border overflow-hidden'>
        <div className='border-b border-border p-2 flex flex-row justify-between items-center'>
          <p className='text-sm font-medium text-muted-foreground'>
            {language}
          </p>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => {
              navigator.clipboard
                .writeText(children.trim())
                .then(() => {
                  toast.success("Copied to clipboard!");
                })
                .catch(() => {
                  toast.error("Failed to copy to clipboard!");
                });
            }}
          >
            <ClipboardCopyIcon />
          </Button>
        </div>
        <MonacoEditor
          height='300px'
          defaultLanguage={language}
          value={children.trim()}
          theme={editorTheme}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: true,
            lineNumbers: "on",
          }}
        />
      </div>
    </div>
  );
}
