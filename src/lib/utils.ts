import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export function toSnakeCase(str: string) {
  return str.replace(/([A-Z])/g, (g) => `_${g.toLowerCase()}`);
}
