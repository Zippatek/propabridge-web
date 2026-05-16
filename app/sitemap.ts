import { MetadataRoute } from 'next'
import { fetchListings } from '@/lib/api'
import { fetchBlogs } from '@/lib/api'

const BASE_URL = 'https://propabridge.com'

// Static pages with their SEO priority
const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE_URL,                              lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
  { url: `${BASE_URL}/listings`,                lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
  { url: `${BASE_URL}/sell`,                    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/submit-property`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/about`,                   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/blogs`,                   lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  { url: `${BASE_URL}/contact`,                 lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE_URL}/neighborhood`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/reviews`,                 lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE_URL}/privacy`,                 lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
  { url: `${BASE_URL}/terms`,                   lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.2 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Property listing pages ──────────────────────────────────────────
  let propertyRoutes: MetadataRoute.Sitemap = []
  try {
    const listings = await fetchListings({ limit: 500 })
    propertyRoutes = listings
      .filter((p) => p.slug)
      .map((p) => ({
        url: `${BASE_URL}/properties-details/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
  } catch {
    // Non-fatal: sitemap still works without dynamic property URLs
  }

  // ── Blog pages ─────────────────────────────────────────────────────
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const blogs = await fetchBlogs(200)
    blogRoutes = blogs
      .filter((b) => b.id)
      .map((b) => ({
        url: `${BASE_URL}/blogs/${b.id}`,
        lastModified: b.date ? new Date(b.date) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
  } catch {
    // Non-fatal
  }

  return [...STATIC_ROUTES, ...propertyRoutes, ...blogRoutes]
}
