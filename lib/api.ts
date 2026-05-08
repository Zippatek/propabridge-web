import { BLOGS } from '@/data/blogs'
import { FALLBACK_PROPERTY_GALLERY } from '@/lib/bucket'
import { Property } from '@/lib/types'

import { PUBLIC_API_URL } from '@/lib/env-public'

const API_URL = PUBLIC_API_URL

const DEFAULT_TIMEOUT_MS = 12000

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

  const rawImages =
    Array.isArray(p.images) ? (p.images as string[]) :
    Array.isArray(p.media) ? (p.media as string[]) :
    Array.isArray(p.gallery) ? (p.gallery as string[]) :
    []
  const images = rawImages.filter((image) => typeof image === 'string' && image.trim().length > 0)

  const bedrooms = parseInt(String(p.bedrooms ?? p.beds ?? ''), 10)
  const bathrooms = parseInt(String(p.bathrooms ?? p.baths ?? ''), 10)

  const amenitiesArr: string[] = Array.isArray(p.amenities) ? (p.amenities as string[]) : []
  const descriptionStr = String(p.description ?? p.overview ?? '')
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
    status: normalizedStatus,
    type: String(p.property_type ?? p.category ?? p.type ?? 'Apartment') as Property['type'],
    beds: Number.isNaN(bedrooms) ? undefined : bedrooms,
    baths: Number.isNaN(bathrooms) ? undefined : bathrooms,
    area: Number(p.size_sqm ?? p.built_up_area_sqm) || undefined,
    landArea: Number(p.declared_plot_size_sqm ?? p.landArea) || undefined,
    floors: (p.floors as number) || (p.floor_count as number) || undefined,
    images: images.length > 0 ? images : (typeof p.cover_image_url === 'string' && p.cover_image_url ? [p.cover_image_url] : FALLBACK_PROPERTY_GALLERY.slice(0, 3)),
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
    shortDescription: descriptionStr ? `${descriptionStr.substring(0, 150)}...` : undefined,
    bodyParagraphs: bodyParagraphs && bodyParagraphs.length > 0 ? bodyParagraphs : undefined,
    createdAt: (p.created_at as string) || new Date().toISOString(),
    updatedAt: (p.updated_at as string) || new Date().toISOString(),
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

function mapBlog(blog: Record<string, unknown>): FrontendBlog {
  return {
    id: blog.slug || blog.id || blog.blog_id || '',
    date: normalizeBlogDate(blog.published_at || blog.date || blog.created_at),
    category: (blog.category || 'GUIDE').toString().toUpperCase(),
    title: blog.title || '',
    image: blog.cover_image || blog.image || '/images/blogs/rent.png',
    authorName: blog.author_name || blog.authorName || 'PROPABRIDGE TEAM',
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
  const params = new URLSearchParams();
  if (filters?.status && filters.status !== 'ALL') {
    const normalized = filters.status.trim().toUpperCase();
    // UI status chips represent transaction intent for most options; map them
    // to backend `type` to avoid filtering on the sparsely populated `status` column.
    if (normalized === 'FOR SALE') {
      params.set('type', 'sale');
    } else if (normalized === 'FOR RENT') {
      params.set('type', 'rent');
    } else {
      params.set('status', filters.status);
    }
  }
  if (filters?.type && filters.type !== 'ALL') params.set('category', filters.type);
  if (filters?.limit) params.set('limit', filters.limit.toString());

  try {
    // Same /listings endpoint as the admin dashboard (propabridge-backend api-gateway).
    const rows = await fetchListingsFromEndpoint('/listings', params)
    return rows
  } catch {
    // Never serve mock property data in production paths.
    return []
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
  const res = await fetch(`${API_URL}/blogs`, {
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
  return {
    id: (n.id as string) || slug,
    slug,
    name,
    city: (n.city as string) || '',
    state: (n.city as string) === 'Abuja' ? 'FCT' : ((n.state as string) || ''),
    coverImage: (n.coverImage as string) || (n.cover_image as string) || '',
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
  const res = await fetch(`${API_URL}/newsletter/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
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
  const res = await fetch(`${API_URL}/leads`, {
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
