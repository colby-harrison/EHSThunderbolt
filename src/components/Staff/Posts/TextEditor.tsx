import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import Youtube from '@tiptap/extension-youtube';
import Dropcursor from '@tiptap/extension-dropcursor';
import Document from '@tiptap/extension-document';
import Image from '@tiptap/extension-image';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';

import React from 'react';
import {
  Bold as BoldIcon,
  ChevronDown,
  Highlighter,
  Italic as ItalicIcon,
  Strikethrough,
  Underline as UnderlineIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';
import { Card, CardHeader } from '@/components/ui/card';

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [height, setHeight] = React.useState('108');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [width, setWidth] = React.useState('192');

  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL');

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt(width)) || 640,
        height: Math.max(180, parseInt(height)) || 480,
      });
    }
  };

  return (
    <CardHeader className=" border rounded-lg p-2">
      <div className="flex flex-row gap-2 flex-wrap">
        <Toggle
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          pressed={editor.isActive('bold')}
          variant={'outline'}
        >
          <BoldIcon />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          pressed={editor.isActive('italic')}
          variant={'outline'}
        >
          <ItalicIcon />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          pressed={editor.isActive('strike')}
          variant={'outline'}
        >
          <Strikethrough />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          pressed={editor.isActive('underline')}
          variant={'outline'}
        >
          <UnderlineIcon />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          disabled={!editor.can().chain().focus().toggleHighlight().run()}
          pressed={editor.isActive('highlight')}
          variant={'outline'}
        >
          <Highlighter />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().setParagraph().run()}
          pressed={editor.isActive('paragraph')}
          variant={'outline'}
        >
          Paragraph
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          pressed={editor.isActive('heading', { level: 1 })}
          variant={'outline'}
        >
          H1
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          pressed={editor.isActive('heading', { level: 2 })}
          variant={'outline'}
        >
          H2
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          pressed={editor.isActive('heading', { level: 3 })}
          variant={'outline'}
        >
          H3
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          pressed={editor.isActive('heading', { level: 4 })}
          variant={'outline'}
        >
          H4
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          pressed={editor.isActive('heading', { level: 5 })}
          variant={'outline'}
        >
          H5
        </Toggle>
        <Toggle
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          pressed={editor.isActive('heading', { level: 6 })}
          variant={'outline'}
        >
          H6
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          pressed={editor.isActive('bulletList')}
          variant={'outline'}
        >
          Bullet list
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          pressed={editor.isActive('orderedList')}
          variant={'outline'}
        >
          Ordered list
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          pressed={editor.isActive('blockquote')}
          variant={'outline'}
        >
          Blockquote
        </Toggle>
        <Button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          variant={'outline'}
        >
          Horizontal rule
        </Button>
        <Button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          variant={'outline'}
        >
          Hard break
        </Button>
        <Button id="add" onClick={addYoutubeVideo} variant={'outline'}>
          Add YouTube video
        </Button>
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          variant={'outline'}
        >
          Undo
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          variant={'outline'}
        >
          Redo
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Clear <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 gap-2 flex flex-col bg-background p-2 border rounded-lg">
            <DropdownMenuItem>
              <Button
                onClick={() => editor.chain().focus().unsetAllMarks().run()}
                variant={'outline'}
                className="w-full"
              >
                Clear marks
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                onClick={() => editor.chain().focus().clearNodes().run()}
                variant={'outline'}
                className="w-full"
              >
                Clear nodes
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>
  );
};

const extensions = [
  Document,
  Image,
  Dropcursor,
  Text,
  Bold,
  Italic,
  Strike,
  Link,
  Underline,
  Highlight.configure({ multicolor: true }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure(),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      HTMLAttributes: {
        class: 'list-disc',
      },
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      HTMLAttributes: {
        class: 'list-decimal',
      },
    },
  }),
  Youtube.configure({
    controls: true,
    nocookie: true,
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: 'https',
    protocols: ['http', 'https'],
    isAllowedUri: (url, ctx) => {
      try {
        // construct URL
        const parsedUrl = url.includes(':')
          ? new URL(url)
          : new URL(`${ctx.defaultProtocol}://${url}`);

        // use default validation
        if (!ctx.defaultValidate(parsedUrl.href)) {
          return false;
        }

        // disallowed protocols
        const disallowedProtocols = ['ftp', 'file', 'mailto'];
        const protocol = parsedUrl.protocol.replace(':', '');

        if (disallowedProtocols.includes(protocol)) {
          return false;
        }

        // only allow protocols specified in ctx.protocols
        // eslint-disable-next-line id-length
        const allowedProtocols = ctx.protocols.map((p) =>
          typeof p === 'string' ? p : p.scheme,
        );

        if (!allowedProtocols.includes(protocol)) {
          return false;
        }

        // disallowed domains
        const disallowedDomains = [
          'example-phishing.com',
          'malicious-site.net',
        ];
        const domain = parsedUrl.hostname;

        if (disallowedDomains.includes(domain)) {
          return false;
        }

        // all checks have passed
        return true;
      } catch {
        return false;
      }
    },
    shouldAutoLink: (url) => {
      try {
        // construct URL
        const parsedUrl = url.includes(':')
          ? new URL(url)
          : new URL(`https://${url}`);

        // only auto-link if the domain is not in the disallowed list
        const disallowedDomains = [
          'example-no-autolink.com',
          'another-no-autolink.com',
        ];
        const domain = parsedUrl.hostname;

        return !disallowedDomains.includes(domain);
      } catch {
        return false;
      }
    },
  }),
  Placeholder,
  CharacterCount,
];

const content = `
`;

const editorProps = {
  attributes: {
    class: 'prose focus:outline-none',
  },
};

export default function Tiptap() {
  return (
    <Card className="p-2">
      <EditorProvider
        slotBefore={<MenuBar />}
        // @ts-expect-error its being dumb
        extensions={extensions}
        content={content}
        editorProps={editorProps}
      >
        <EditorFormInput />
        <EditorCharacterCount />
      </EditorProvider>
    </Card>
  );
}

const EditorFormInput = () => {
  const { editor } = useCurrentEditor();
  return <input type="hidden" name="html" value={editor?.getHTML()} />;
};

const EditorCharacterCount = () => {
  const { editor } = useCurrentEditor();
  return (
    <div>
      {editor?.storage.characterCount.characters()} characters
      <br />
      {editor?.storage.characterCount.words()} words
    </div>
  );
};
