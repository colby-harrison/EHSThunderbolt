import * as React from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkDirective from "remark-directive";
import remarkFootnotesExtra from "remark-footnotes-extra";
import rehypeKatex from "rehype-katex";

// Custom components
import AlertComponent from "@/components/site/post-components/alert";
import { Widgets } from "@/components/widgets";
import Link from "next/link";

// Define type for mapped MDX components
type MdxComponents = {
  [key: string]: React.ComponentType<any>;
};

// Register custom components
const components: MdxComponents = {
  a: ({ href, children, ...props }) => {
    if (!href) return <>{children}</>;
    if (href.startsWith("/") || href.startsWith("#") || href.startsWith("?")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },

  code: ({ className, children }) => {
    if (className?.startsWith("language-")) {
      return (
        <Widgets.Post.CodeBlock className={className}>
          {children as string}
        </Widgets.Post.CodeBlock>
      );
    }
    return (
      <code className="px-1 py-0.5 bg-accent rounded-lg">{children}</code>
    );
  },

  Alert: AlertComponent,
  BellSchedule: Widgets.BellSchedule.TableProse,
  Calendar: Widgets.BellSchedule.CalendarProse,
};

// --- MAIN FUNCTION (App Router compatible) ---
export async function mdxToReact(
  mdxContent: string
): Promise<React.ReactNode> {
  const { content } = await compileMDX({
    source: mdxContent,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          remarkMath,
          remarkDirective,
          remarkFootnotesExtra,
        ],
        rehypePlugins: [rehypeKatex],
      },
    },
  });

  return content;
}