"use client";

import { useTheme } from "next-themes";
import MonacoEditor from "@monaco-editor/react";
import { useState } from "react";
import type { editor } from "monaco-editor";

interface Props {
  onChange?: (
    value: string | undefined,
    ev: editor.IModelContentChangedEvent
  ) => void;
}

export default function RTE({ onChange }: Props) {
  const [language, setLanguage] = useState<"html" | "markdown">("html");
  const [html, setHTML] = useState(`<h1>Hello World!</h1>`);
  const [markdown, setMarkdown] = useState(`# Hello World!`);
  const theme = useTheme()
  const editorTheme = theme.resolvedTheme === "dark" ? "vs-dark" : "light";

  const handleChange = (
    value: string | undefined,
    ev: editor.IModelContentChangedEvent
  ) => {
    if (language === "html") {
      setHTML(value ?? "");

    } else {
      setMarkdown(value ?? "");
    }

    // Call parent onChange if provided
    if (onChange) {
      onChange(value, ev);
    }
  };

  return (
    <div className="h-[50dvh] flex flex-row w-full">
      {/* Example language toggle
      <div style={{ marginBottom: "8px" }}>
        <button onClick={() => setLanguage("html")}>HTML</button>
        <button onClick={() => setLanguage("markdown")}>Markdown</button>
      </div> */}
      <MonacoEditor
        language={language}
        value={language === "html" ? html : markdown}
        onChange={handleChange}
        theme={editorTheme}
        className="basis-1/2"
      />
      <section
        className="prose basis-1/2"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}