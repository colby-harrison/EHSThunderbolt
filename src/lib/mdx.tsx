import type React from "react";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkDirective from "remark-directive";
import remarkFootNotesExtra from "remark-footnotes-extra";
import rehypeKatex from "rehype-katex";
import remarkParse from "remark-parse";

// Custom components
import AlertComponent from "@/components/site/post-components/alert";
import { Widgets } from "@/components/widgets";
import Link from "next/link";


// Define MdxComponents type
type MdxComponents = {
  [key: string]: React.ComponentType<any>;
};

// Map MDX component names to actual React components
const components: MdxComponents = {
  // HTML tag replacements
  // Replace all <a> tags with Next.js <Link> for internal links
  a: ({ href, children, ...props }) => {
    if (!href) return <>{children}</>;

    // Internal links → use Next.js <Link>
    if (href.startsWith("/") || href.startsWith("#") || href.startsWith("?")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }

    // External links → fallback to <a> with security best practices
    return (
      <a href={href} target='_blank' rel='noopener noreferrer' {...props}>
        {children}
      </a>
    );
  },

  // Inline code stays as normal <code> (MDX maps inline code by default)
  code: ({ className, children }) => {
    if (className?.startsWith("language-")) {
      // Handle code blocks
      return <Widgets.Post.CodeBlock className={className}>{children as string}</Widgets.Post.CodeBlock>;
    }
    // Inline code
    return <code className="px-1 py-0.5 bg-accent rounded-lg">{children}</code>;
  },

  // Custom components
  Alert: AlertComponent,
  BellSchedule: Widgets.BellSchedule.TableProse,
  Calendar: Widgets.BellSchedule.CalendarProse,
};

// Single function: turns MDX into a React element you can render.
// Note: Do NOT render to a string here; return an element to keep it in-tree.
export async function mdxToHtml(
  mdxContent: string
): Promise<React.ReactElement> {
  // Compile MDX to a form usable by MDXRemote
  const serializedSource = await serialize(mdxContent, {
    mdxOptions: {
      remarkPlugins: [
        remarkParse,
        remarkGfm,
        remarkMath,
        remarkDirective,
        remarkFootNotesExtra,
      ],
      rehypePlugins: [rehypeKatex],
    },
    scope: components,
  });

  // Import MDXRemote dynamically so this file stays isomorphic-friendly
  const ReactModule = await import("react");
  const { MDXRemote } = await import("next-mdx-remote");
  const React = (ReactModule as any).default ?? ReactModule;

  // Return an element that can be rendered inside your Provider tree
  return React.createElement(MDXRemote, {
    ...serializedSource,
    components,
    scope: components,
  });
}
