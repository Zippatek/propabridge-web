import { BLOGS } from '@/data/blogs'
import { pickMarkdownFields } from '@/lib/property-markdown'
import { Property } from '@/lib/types'
import { NEIGHBORHOOD_COVERS } from '@/lib/bucket'

import { resolveBlogCoverImage } from '@/lib/blog-media'
import { isAllowedMediaUrl } from '@/lib/media'
import { PUBLIC_API_URL } from '@/lib/env-public'

const API_URL = PUBLIC_API_URL

const DEFAULT_TIMEOUT_MS = 15000

// Wrapper around fetch that aborts after `timeoutMs` so server-rendered pages
// never hang waiting on an unreachable backend.
async function fetchWithTimeout(
  input: string,
  init: RequestInit = {},
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(input, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(id)
  }
}

export type FrontendBlog = {
  id: string
  date: string
  category: string
  title: string
  image: string
  authorName: string
  authorImage?: string
  content?: string
  excerpt?: string
}

function nonEmptyTrimmedUrls(values: unknown[]): string[] {
  return values.filter((x): x is string => typeof x === 'string' && x.trim().length > 0).map((s) => s.trim())
}

/** property_images rows may be URLs or objects with url / image_url. */
function urlsFromPropertyImages(raw: unknown): string[] {
  if (!Array.isArray(raw)) return []
  const out: string[] = []
  for (const item of raw) {
    if (typeof item === 'string' && item.trim()) {
      out.push(item.trim())
      continue
    }
    if (item && typeof item === 'object') {
      const o = item as Record<string, unknown>
      const u = o.url ?? o.image_url ?? o.src
      if (typeof u === 'string' && u.trim()) out.push(u.trim())
    }
  }
  return out
}

/** Gallery first when cover is legacy (Framer); otherwise cover then gallery. Only GCS/CDN URLs. */
function mergeCoverAndGallery(coverRaw: unknown, orderedCandidates: string[]): string[] {
  const cover =
    typeof coverRaw === 'string' && coverRaw.trim() && isAllowedMediaUrl(coverRaw.trim())
      ? coverRaw.trim()
      : ''
  const gallery = orderedCandidates
    .map((u) => (typeof u === 'string' ? u.trim() : ''))
    .filter((u) => u && isAllowedMediaUrl(u))

  const seen = new Set<string>()
  const out: string[] = []
  const push = (url: string) => {
    if (seen.has(url)) return
    seen.add(url)
    out.push(url)
  }
  if (cover) push(cover)
  for (const u of gallery) push(u)
  return out
}

// Maps backend DB fields -> frontend Property type
function mapListing(p: Record<string, unknown>) {
  const listingTypeRaw = String(p.listing_type ?? p.type ?? '').trim().toLowerCase()
  const transactionRaw = String(p.transaction_type ?? p.transactionType ?? '').trim().toUpperCase()
  const statusRaw = String(p.status ?? p.listing_status ?? '').trim().toUpperCase()

  const normalizedStatus = (() => {
    if (statusRaw === 'FOR SALE' || statusRaw === 'FOR RENT' || statusRaw === 'SOLD' || statusRaw === 'OFF-PLAN' || statusRaw === 'RESERVED') {
      return statusRaw
    }
    if (listingTypeRaw.includes('rent') || transactionRaw.includes('RENT')) return 'FOR RENT'
    if (listingTypeRaw.includes('off') || transactionRaw.includes('OFF')) return 'OFF-PLAN'
    return 'FOR SALE'
  })()

  const primaryFieldImages = [
    ...(Array.isArray(p.images) ? nonEmptyTrimmedUrls(p.images as unknown[]) : []),
    ...(Array.isArray(p.media) ? nonEmptyTrimmedUrls(p.media as unknown[]) : []),
    ...(Array.isArray(p.gallery) ? nonEmptyTrimmedUrls(p.gallery as unknown[]) : []),
  ]

  const fromNested = urlsFromPropertyImages(p.property_images)
  const mergedCandidates = [...primaryFieldImages, ...fromNested]

  const coverField = p.cover_image_url ?? p.coverImage ?? p.cover_image
  const images = mergeCoverAndGallery(coverField, mergedCandidates)

  const bedrooms = parseInt(String(p.bedrooms ?? p.beds ?? ''), 10)
  const bathrooms = parseInt(String(p.bathrooms ?? p.baths ?? ''), 10)

  const amenitiesArr: string[] = Array.isArray(p.amenities) ? (p.amenities as string[]) : []
  const mdFields = pickMarkdownFields(p)

  const descriptionStr = String(
    p.description ?? p.long_description ?? p.longDescription ?? p.overview ?? p.body ?? '',
  )
  const bodyParagraphs = descriptionStr
    ? descriptionStr.split(/\n\n+/).map((s) => s.trim()).filter(Boolean)
    : undefined

  const district = String(p.neighbourhood ?? p.neighborhood ?? p.district ?? '')
  const city = String(p.city ?? 'Abuja')
  const location = String(p.location ?? p.address ?? [district, city].filter(Boolean).join(', ') ?? '')

  return {
    id: String(p.property_id ?? p.id ?? ''),
    property_id: (p.property_id as string) || undefined,
    slug: String(p.slug ?? p.property_id ?? p.id ?? ''),
    title: String(p.title ?? ''),
    location,
    district,
    city: city as Property['city'],
    state: city.toLowerCase() === 'abuja' ? 'FCT' : city,
    price: parseFloat(String(p.price ?? p.asking_price_ngn ?? '0').replace(/[^0-9.]/g, '')) || 0,
    status: normalizedStatus as Property['status'],
    type: String(p.property_type ?? p.category ?? p.type ?? 'Apartment') as Property['type'],
    beds: Number.isNaN(bedrooms) ? undefined : bedrooms,
    baths: Number.isNaN(bathrooms) ? undefined : bathrooms,
    area: Number(p.size_sqm ?? p.built_up_area_sqm) || undefined,
    landArea: Number(p.declared_plot_size_sqm ?? p.landArea) || undefined,
    floors: (p.floors as number) || (p.floor_count as number) || undefined,
    images,
    planUrl: typeof p.plan_url === 'string' && p.plan_url.trim() ? p.plan_url.trim() : undefined,
    planFileName: typeof p.plan_file_name === 'string' && p.plan_file_name.trim() ? p.plan_file_name.trim() : undefined,
    verified: Boolean(p.verified || (p.verification_status as string) === 'verified'),
    verificationStatus: (p.verification_status as string) === 'verified' || p.verified ? 'VERIFIED' : 'PENDING',
    verificationItems: [],
    titleDocumentAvailable: false,
    featured: Boolean(p.featured),
    amenities: amenitiesArr,
    amenityTags: amenitiesArr.length > 0 ? amenitiesArr : undefined,
    condition: (p.condition as string) || undefined,
    water: (p.water_supply as string) || undefined,
    fullDescription: descriptionStr || undefined,
    descriptionMarkdown: mdFields.descriptionMarkdown,
    overviewMarkdown: mdFields.overviewMarkdown,
    specsMarkdown: mdFields.specsMarkdown,
    shortDescription: descriptionStr ? `${descriptionStr.substring(0, 150)}...` : undefined,
    bodyParagraphs: bodyParagraphs && bodyParagraphs.length > 0 ? bodyParagraphs : undefined,
    createdAt: (p.created_at as string) || new Date().toISOString(),
    updatedAt: (p.updated_at as string) || new Date().toISOString(),
    yearBuilt: (p.year_built as number | string | undefined) ?? undefined,
  }
}

function extractRawListings(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  const root = payload as Record<string, unknown>
  const data = root.data

  if (Array.isArray(data)) return data
  if (Array.isArray(root.listings)) return root.listings as unknown[]
  if (Array.isArray(root.results)) return root.results as unknown[]
  if (Array.isArray(root.items)) return root.items as unknown[]

  if (data && typeof data === 'object') {
    const dataObj = data as Record<string, unknown>
    if (Array.isArray(dataObj.listings)) return dataObj.listings as unknown[]
    if (Array.isArray(dataObj.items)) return dataObj.items as unknown[]
    if (Array.isArray(dataObj.results)) return dataObj.results as unknown[]
  }

  return []
}

async function fetchListingsFromEndpoint(path: string, params: URLSearchParams): Promise<Property[]> {
  const query = params.toString()
  const url = `${API_URL}${path}${query ? `?${query}` : ''}`
  const res = await fetchWithTimeout(url, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error(`Failed to fetch listings from ${path}`)
  }

  const json = await res.json()
  const raw = extractRawListings(json)
  return raw.map((item) => mapListing(item as Record<string, unknown>))
}

function normalizeBlogDate(input?: string) {
  if (!input) return ''
  const date = new Date(input)
  if (Number.isNaN(date.getTime())) return input
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()
}

function mapBlog(blog: Record<string, any>): FrontendBlog {
  const slug = String(blog.slug || blog.id || blog.blog_id || '')
  const apiCover = blog.cover_image || blog.image
  return {
    id: slug,
    date: normalizeBlogDate(blog.published_at || blog.date || blog.created_at),
    category: String(blog.category || 'GUIDE').toUpperCase(),
    title: String(blog.title || ''),
    image: resolveBlogCoverImage(slug, typeof apiCover === 'string' ? apiCover : null),
    authorName: String(blog.author_name || blog.authorName || 'PROPABRIDGE TEAM'),
    authorImage: blog.author_image || blog.authorImage || undefined,
    content: blog.content_html || blog.content || undefined,
    excerpt: blog.excerpt || blog.summary || undefined,
  }
}

export async function fetchListings(filters?: {
  status?: string;
  type?: string;
  limit?: number;
}) {
  try {
    // Pull from the same canonical source table path as admin listings.
    // We intentionally avoid backend-side status/category filters here because
    // those legacy mappings can hide valid properties that admin still shows.
    const sourceLimit = Math.max(filters?.limit ?? 50, 200)
    const rows = await fetchListingsFromEndpoint('/listings', new URLSearchParams({ limit: String(sourceLimit) }))

    const normalizedStatus = filters?.status?.trim().toUpperCase()
    const normalizedType = filters?.type?.trim().toUpperCase()

    const statusFiltered =
      normalizedStatus && normalizedStatus !== 'ALL'
        ? rows.filter((row) => row.status.toUpperCase() === normalizedStatus)
        : rows

    const typeFiltered =
      normalizedType && normalizedType !== 'ALL'
        ? statusFiltered.filter((row) => {
          const rowType = String(row.type || '').trim().toUpperCase()
          if (rowType === normalizedType) return true
          // Keep current UX labels working even when backend taxonomy differs.
          if (normalizedType === 'LUXURY HOMES') {
            const title = row.title.toUpperCase()
            return title.includes('LUXURY') || title.includes('PREMIUM') || title.includes('MANSION')
          }
          if (normalizedType === 'SINGLE FAMILY HOME') {
            return ['DETACHED', 'SEMI-DETACHED', 'DUPLEX', 'VILLA', 'HOUSE'].includes(rowType)
          }
          if (normalizedType === 'OFFICE SPACE') {
            return rowType === 'OFFICE' || row.title.toUpperCase().includes('OFFICE')
          }
          if (normalizedType === 'RETAIL SHOP') {
            return rowType === 'SHOP' || rowType === 'COMMERCIAL'
          }
          return false
        })
        : statusFiltered

    const finalLimit = filters?.limit ?? typeFiltered.length
    return typeFiltered.slice(0, finalLimit)
  } catch {
    // Never serve mock property data in production paths.
    return []
  }
}

export async function fetchPropertyFilters() {
  try {
    const res = await fetchWithTimeout(`${API_URL}/listings/filters`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch filters');
    const json = await res.json();
    const raw = json.data || [];

    // Return names exactly as they come from the API (dashboard mirror)
    const allCategories = [
      'ALL',
      ...(Array.isArray(raw) ? raw.map((t: any) => t.name.toUpperCase()) : []),
    ];

    return Array.from(new Set(allCategories));
  } catch (error) {
    console.error('fetchPropertyFilters error:', error);
    return ['ALL', 'APARTMENT', 'HOUSE', 'DUPLEX', 'BUNGALOW', 'LAND', 'COMMERCIAL', 'VILLA', 'PENTHOUSE'];
  }
}

export async function fetchListing(id: string) {
  try {
    const res = await fetchWithTimeout(`${API_URL}/listings/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Listing not found');
    const json = await res.json();
    return mapListing(json.data || json);
  } catch {
    return null;
  }
}

export async function fetchBlogs(limit?: number): Promise<FrontendBlog[]> {
  try {
    const params = new URLSearchParams()
    if (limit) params.set('limit', String(limit))

    const res = await fetchWithTimeout(`${API_URL}/blogs?${params.toString()}`, {
      cache: 'no-store',
    })

    if (!res.ok) throw new Error('Failed to fetch blogs')
    const json = await res.json()
    const raw = json.data || json.blogs || json || []
    if (!Array.isArray(raw)) return BLOGS

    const mapped = raw.map((item: unknown) => mapBlog(item as Record<string, unknown>)).filter((b) => b.id && b.title)
    return mapped.length ? mapped : BLOGS
  } catch {
    return BLOGS
  }
}

export async function fetchBlogBySlug(slug: string): Promise<FrontendBlog | null> {
  try {
    const res = await fetchWithTimeout(`${API_URL}/blogs/${slug}`, {
      cache: 'no-store',
    })
    if (!res.ok) throw new Error('Not found')
    const json = await res.json()
    const raw = json.data || json.blog || json
    const mapped = mapBlog(raw as Record<string, unknown>)
    return mapped.id ? mapped : null
  } catch {
    return BLOGS.find((b) => b.id === slug) || null
  }
}

export async function createBlog(payload: {
  slug: string
  title: string
  category: string
  excerpt?: string
  content?: string
  image?: string
  authorName?: string
}) {
  const res = await fetchWithTimeout(`${API_URL}/blogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      slug: payload.slug,
      title: payload.title,
      category: payload.category,
      excerpt: payload.excerpt || '',
      content: payload.content || '',
      image: payload.image || '',
      author_name: payload.authorName || 'PROPABRIDGE TEAM',
    }),
  })

  if (!res.ok) throw new Error('Failed to create blog entry')
  return res.json()
}

export type FrontendNeighborhood = {
  id: string
  slug: string
  name: string
  city: string
  state: string
  coverImage: string
  gallery?: string[]
  description?: string
  safetyScore?: number
  averagePrice?: number
  listingCount?: number
  population?: number
  amenities?: { schools?: string[]; hospitals?: string[]; markets?: string[]; transit?: string[] }
  demographics?: Record<string, unknown>
  reviews?: unknown[]
}

function mapNeighborhood(n: Record<string, unknown>): FrontendNeighborhood {
  const slug = (n.slug as string) || (n.id as string) || ''
  const name = (n.name as string) || ''

  let coverImage = (n.coverImage as string) || (n.cover_image as string) || ''
  let galleryRaw = Array.isArray(n.gallery) ? n.gallery : (Array.isArray(n.images) ? n.images : [])
  let gallery = galleryRaw.filter((g): g is string => typeof g === 'string' && g.trim().length > 0 && !g.includes('googleapis.com'))

  if (!coverImage || coverImage.includes('googleapis.com')) {
    const slugify = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    const candidates = [
      slug || '',
      [name, n.city as string].filter(Boolean).join('-'),
      name || '',
    ].map(slugify).filter(Boolean)

    for (const key of candidates) {
      if (NEIGHBORHOOD_COVERS[key]) {
        coverImage = NEIGHBORHOOD_COVERS[key]
        break
      }
    }
  }

  if (gallery.length === 0 && coverImage && !coverImage.includes('googleapis.com')) {
    gallery = [coverImage]
  }

  return {
    id: (n.id as string) || slug,
    slug,
    name,
    city: (n.city as string) || '',
    state: (n.city as string) === 'Abuja' ? 'FCT' : ((n.state as string) || ''),
    coverImage: coverImage,
    gallery,
    description: (n.description as string) || undefined,
    safetyScore: typeof n.safetyScore === 'number' ? (n.safetyScore as number) : (n.safety_score as number | undefined),
    averagePrice: typeof n.averagePrice === 'number' ? (n.averagePrice as number) : (n.average_price as number | undefined),
    listingCount: (n.listingCount as number) ?? (n.listing_count as number | undefined),
    population: n.population as number | undefined,
    amenities: (n.amenities as FrontendNeighborhood['amenities']) || undefined,
    demographics: (n.demographics as Record<string, unknown>) || undefined,
    reviews: (n.reviews as unknown[]) || undefined,
  }
}

export async function fetchNeighborhoods(query?: string): Promise<FrontendNeighborhood[]> {
  try {
    const params = new URLSearchParams()
    if (query) params.set('city', query)
    const res = await fetchWithTimeout(`${API_URL}/neighborhoods?${params.toString()}`, { cache: 'no-store' })
    if (!res.ok) return []
    const json = await res.json()
    const raw = json.neighborhoods || json.data || []
    return Array.isArray(raw) ? raw.map((n) => mapNeighborhood(n as Record<string, unknown>)) : []
  } catch {
    return []
  }
}

export async function fetchNeighborhood(slug: string): Promise<FrontendNeighborhood | null> {
  try {
    const res = await fetchWithTimeout(`${API_URL}/neighborhoods/${slug}`, { cache: 'no-store' })
    if (!res.ok) return null
    const json = await res.json()
    const raw = json.data || json
    return mapNeighborhood(raw as Record<string, unknown>)
  } catch {
    return null
  }
}

export async function subscribeNewsletter(email: string) {
  const res = await fetchWithTimeout(`${API_URL}/newsletter/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  }, 5000)
  if (!res.ok) {
    const json = await res.json().catch(() => ({}))
    throw new Error(json.error || 'Subscription failed')
  }
  return res.json()
}

export async function submitLead(data: {
  name: string;
  phone: string;
  email?: string;
  intent: string;
  property_id?: string;
  message?: string;
}) {
  const res = await fetchWithTimeout(`${API_URL}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name,
      phone: data.phone,
      email: data.email,
      intent: data.intent,
      source: 'website_form',
      property_interest: data.property_id ? [data.property_id] : [],
      status: 'new',
    }),
  });
  if (!res.ok) throw new Error('Failed to submit lead');
  return res.json();
}
