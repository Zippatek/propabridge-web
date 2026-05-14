import { BLOGS } from '@/data/blogs'
import { Property, PropertyCity } from './types'


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const DEFAULT_TIMEOUT_MS = 3000

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

// Maps backend DB fields → frontend Property type
function mapListing(p: Record<string, any>): Property {
  return {
    id: String(p.property_id || p.id || ''),
    property_id: p.property_id ? String(p.property_id) : undefined,
    slug: String(p.slug || p.property_id || p.id || ''),
    title: String(p.title || ''),
    location: String(p.location || ''),
    district: String(p.neighbourhood || p.area || ''),
    city: (p.city as PropertyCity) || 'Abuja',
    state: 'FCT',
    price: parseFloat(String(p.price || '0').replace(/[^0-9.]/g, '')) || 0,
    status: String(p.transaction_type || '').toUpperCase().includes('RENT') ? 'FOR RENT' : 'FOR SALE',
    type: (p.category as any) || 'Apartment',
    beds: parseInt(String(p.bedrooms || '')) || undefined,
    baths: parseInt(String(p.bathrooms || '')) || undefined,
    area: (p.size_sqm as number) || undefined,
    images: Array.isArray(p.images) ? (p.images as string[]) : [],
    verified: Boolean(p.verified),
    verificationStatus: p.verified ? 'VERIFIED' : 'PENDING',
    verificationItems: [],
    titleDocumentAvailable: false,
    featured: Boolean(p.featured),
    amenities: Array.isArray(p.amenities) ? (p.amenities as string[]) : [],
    fullDescription: (p.description as string) || undefined,
    shortDescription: p.description ? `${String(p.description).substring(0, 150)}...` : undefined,
    createdAt: (p.created_at as string) || new Date().toISOString(),
    updatedAt: (p.updated_at as string) || new Date().toISOString(),
  };
}

function normalizeBlogDate(input?: string) {
  if (!input) return ''
  const date = new Date(input)
  if (Number.isNaN(date.getTime())) return input
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()
}

function mapBlog(blog: Record<string, any>): FrontendBlog {
  return {
    id: String(blog.slug || blog.id || blog.blog_id || ''),
    date: normalizeBlogDate(blog.published_at || blog.date || blog.created_at),
    category: String(blog.category || 'GUIDE').toUpperCase(),
    title: String(blog.title || ''),
    image: String(blog.cover_image || blog.image || '/images/blogs/rent.png'),
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
  const params = new URLSearchParams();
  if (filters?.status && filters.status !== 'ALL') params.set('status', filters.status);
  if (filters?.type && filters.type !== 'ALL') params.set('category', filters.type);
  if (filters?.limit) params.set('limit', filters.limit.toString());

  try {
    const res = await fetchWithTimeout(`${API_URL}/listings?${params.toString()}`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch listings');
    const json = await res.json();
    const raw = json.data || json.listings || json || [];
    return Array.isArray(raw) ? raw.map(mapListing) : [];
  } catch {
    return [];
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
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
