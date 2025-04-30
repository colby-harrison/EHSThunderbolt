import type { MetadataRoute } from 'next'
import { api } from '@/trpc/server'
const BASE_URL = 'https://nextjs.ehsthunderbolt.org'
 
export async function generateSitemaps() {
  const categoriesCount = await api.category.getcount()
  const sitemapPageCount = Math.ceil(categoriesCount / 50000) - 1
  const sitemaps = []
  for (let i = 0; i <= sitemapPageCount; i++) {
    sitemaps.push({ id: i })
  }
  return sitemaps
}
 
export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const start = id * 50000
  const end = start + 50000
  const categories = await api.category.getsitemappage({ start, end })
  return categories.map((category) => ({
    url: `${BASE_URL}/category/${category.id}`,
    lastModified: category.createdAt,
  }))
}