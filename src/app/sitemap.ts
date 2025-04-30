import type { MetadataRoute } from "next";
const BASE_URL = "https://nextjs.ehsthunderbolt.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    `${BASE_URL}/`,
    `${BASE_URL}/bellschedule`,
    `${BASE_URL}/ehsteachers`,
  ];
  return pages.map((page) => ({
    url: page,
    lastModified: new Date(),
  }));
}
