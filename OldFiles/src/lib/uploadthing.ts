// UploadThing components | DO NOT TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING
// if you do not know what is going on in this file without comments
// you should not be messing with this file
import {
  generateUploadButton,
  generateUploadDropzone,
} from '@uploadthing/react';

import type { OurFileRouter } from '@/server/uploadthing';

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
