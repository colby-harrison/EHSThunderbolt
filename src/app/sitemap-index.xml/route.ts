import { api } from "@/trpc/server";
const BASE_URL = "https://nextjs.ehsthunderbolt.org";

async function getCategorySitemaps() {
  const categoriesCount = await api.category.getcount();
  const sitemapPageCount = Math.ceil(categoriesCount / 50000) - 1;
  const sitemaps = [];
  for (let i = 0; i <= sitemapPageCount; i++) {
    sitemaps.push(`${BASE_URL}/category/sitemap/${i}.xml`);
  }
  return sitemaps;
}

async function getPostSitemaps() {
  const postsCount = await api.posts.getcount();
  const sitemapPageCount = Math.ceil(postsCount / 50000) - 1;
  const sitemaps = [];
  for (let i = 0; i <= sitemapPageCount; i++) {
    sitemaps.push(`${BASE_URL}/post/sitemap/${i}.xml`);
  }
  return sitemaps;
}

export async function GET() {
  const sitemaps = [
    ...(await getCategorySitemaps()),
    ...(await getPostSitemaps()),
    `${BASE_URL}/sitemap.xml`,
  ];
  const xml = `
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemaps
        .map((sitemap) => `<sitemap><loc>${sitemap}</loc></sitemap>`)
        .join("")}
    </sitemapindex>
  `;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=3600",
    },
  });
}
