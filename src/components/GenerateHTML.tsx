import { generateHTML } from '@tiptap/html'
import { extensions } from "./TextEditor";
import parse from 'html-react-parser';

export function GenerateHTML(ContentInput: { type: string; content: [] }) {
  console.log(ContentInput)
  return parse(generateHTML(
    ContentInput,
    extensions,
  ));
}