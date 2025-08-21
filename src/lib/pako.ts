"use server";
import pako from "pako";

/**
 * Takes a string and compresses it into a compressed binary
 *
 * @param string the content to be compressed
 * @returns arrayBuffer of the compressed binary
 */
export function compress({ text }: { text: string }) {
  return pako.deflate(text);
}

/**
 * Takes a compressed binary and returns the string version of the content
 *
 * @param arrayBuffer the arrayBuffer of the compressed content (binary) to be decompressed
 * @returns string of the content
 */
export function decompress({
  arrayBuffer,
}: {
  arrayBuffer: Uint8Array<ArrayBuffer>;
}) {
  return pako.inflate(arrayBuffer, { to: "string" });
}
