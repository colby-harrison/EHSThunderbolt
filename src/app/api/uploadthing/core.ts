import { isAuthenticatedNextjs } from "@convex-dev/auth/nextjs/server";
import { fetchMutation } from "convex/nextjs";
import { api } from "convex@/_generated/api";
import type { Id } from "convex@/_generated/dataModel";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  calendar: f({
    pdf: {
      maxFileSize: "1MB",
      maxFileCount: 1,
    },
  }).middleware(async ({ req }) => {
    const isAuthenticated = await isAuthenticatedNextjs();
    const userId = req.headers.get("Authorization");
    if (!isAuthenticated || !userId) throw new UploadThingError("Unauthorized");
    return { userId: userId };
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("Upload complete for userId:", metadata.userId);
    await fetchMutation(api.files.create, {
      uuid: crypto.randomUUID(),
      key: file.key,
      type: file.type,
      fullUrl: file.ufsUrl,
      UploadedBy: metadata.userId as Id<"users">,
    });
    console.log("file url", file.ufsUrl);
    return { uploadedBy: metadata.userId, filekey: file.key };
  }),
  postTitleImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    }
  }).middleware(async ({ req }) => {
    const isAuthenticated = await isAuthenticatedNextjs();
    const userId = req.headers.get("Authorization");
    if (!isAuthenticated || !userId) throw new UploadThingError("Unauthorized");
    return { userId: userId };
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("Upload complete for userId:", metadata.userId);
    await fetchMutation(api.files.create, {
      uuid: crypto.randomUUID(),
      key: file.key,
      type: file.type,
      fullUrl: file.ufsUrl,
      UploadedBy: metadata.userId as Id<"users">,
    });
    console.log("file url", file.ufsUrl);
    return { uploadedBy: metadata.userId, filekey: file.key };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
