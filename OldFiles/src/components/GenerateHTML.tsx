import { generateHTML } from "@tiptap/html";
import parse from "html-react-parser";
import { extensions } from "./TextEditor";

export function GenerateHTML(ContentInput: { type: string; content: [] }) {
	return parse(generateHTML(ContentInput, extensions));
}
