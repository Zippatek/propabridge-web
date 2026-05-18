import { BLOGS } from '@/data/blogs'
import { pickMarkdownFields } from '@/lib/property-markdown'
import { Property } from '@/lib/types'
import { apiGet, apiPost } from './apiClient'

/**
 * PROPABRIDGE — Stable Data Layer
 * This file now uses apiClient.ts (React Query compatible) for all requests.
 * Manual AbortControllers and timeouts have been removed in favor of React Query's lifecycle.
 */

// Maps backend DB fields -> frontend Property type
export function mapListing(p: Record<string, unknown>) {
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

  const images = Array.isArray(p.images) ? (p.images as string[]) : []

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

  const mapped = {
    id: String(p.property_id ?? p.id ?? ''),
    property_id: typeof p.property_id === 'string' ? p.property_id : undefined,
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
    floors: (typeof p.floors === 'number' ? p.floors : undefined) || (typeof p.floor_count === 'number' ? p.floor_count : undefined) || undefined,
    images,
    planUrl: typeof p.plan_url === 'string' && p.plan_url.trim() ? p.plan_url.trim() : undefined,
    planFileName: typeof p.plan_file_name === 'string' && p.plan_file_name.trim() ? p.plan_file_name.trim() : undefined,
    verified: Boolean(p.verified || String(p.verification_status || '').toLowerCase() === 'verified'),
    verificationStatus: (String(p.verification_status || '').toLowerCase() === 'verified' || p.verified) ? 'VERIFIED' : 'PENDING',
    verificationItems: [],
    titleDocumentAvailable: false,
    featured: Boolean(p.featured),
    amenities: amenitiesArr,
    amenityTags: amenitiesArr.length > 0 ? amenitiesArr : undefined,
    condition: (typeof p.condition === 'string' ? p.condition : undefined) || undefined,
    water: (typeof p.water_supply === 'string' ? p.water_supply : undefined) || undefined,
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
  return mapped
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

export async function fetchListings(filters?: {
  status?: string;
  type?: string;
  limit?: number;
}) {
  try {
    const sourceLimit = Math.max(filters?.limit ?? 50, 200)
    const json = await apiGet<any>(`/listings?limit=${sourceLimit}`);
    const raw = extractRawListings(json)
    const rows = raw.map((item) => mapListing(item as Record<string, unknown>))

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
    return []
  }
}

export async function fetchPropertyFilters() {
  try {
    const json = await apiGet<any>('/listings/filters');
    const raw = json.data || [];
    const allCategories = [
      'ALL',
      ...(Array.isArray(raw) ? raw.map((t: { name: string }) => t.name) : []),
    ];
    return Array.from(new Set(allCategories));
  } catch (error) {
    return ['ALL', 'APARTMENT', 'HOUSE', 'DUPLEX', 'BUNGALOW', 'LAND', 'COMMERCIAL', 'VILLA', 'PENTHOUSE'];
  }
}

export async function fetchListing(id: string) {
  try {
    const json = await apiGet<any>(`/listings/${id}`);
    return mapListing(json.data || json);
  } catch {
    return null;
  }
}

export async function fetchBlogs(limit?: number) {
  try {
    const path = limit ? `/blogs?limit=${limit}` : '/blogs';
    const json = await apiGet<any>(path);
    const raw = json.data || json.blogs || json || []
    if (!Array.isArray(raw)) return BLOGS
    return raw.map((item: unknown) => mapBlog(item as Record<string, unknown>)).filter((b) => b.id && b.title)
  } catch {
    return BLOGS
  }
}

export async function fetchBlogBySlug(slug: string) {
  try {
    const json = await apiGet<any>(`/blogs/${slug}`);
    const raw = json.data || json.blog || json
    return mapBlog(raw as Record<string, unknown>)
  } catch {
    return BLOGS.find((b) => b.id === slug) || null
  }
}

export async function createBlog(payload: any) {
  return apiPost('/blogs', {
    ...payload,
    author_name: payload.authorName || 'PROPABRIDGE TEAM',
  });
}

function mapBlog(blog: Record<string, unknown>) {
  return {
    id: String(blog.slug || blog.id || blog.blog_id || ''),
    date: String(blog.published_at || blog.date || blog.created_at || ''),
    category: String(blog.category || 'GUIDE').toUpperCase(),
    title: String(blog.title || ''),
    image: String(blog.cover_image || blog.image || '/images/blogs/rent.png'),
    authorName: String(blog.author_name || blog.authorName || 'PROPABRIDGE TEAM'),
    authorImage: (blog.author_image || blog.authorImage) as string | undefined,
    content: (blog.content_html || blog.content) as string | undefined,
    excerpt: (blog.excerpt || blog.summary) as string | undefined,
  }
}

function mapNeighborhood(n: Record<string, unknown>) {
  const slug = (n.slug as string) || (n.id as string) || ''
  return {
    ...n,
    id: (n.id as string) || slug,
    slug,
    name: (n.name as string) || '',
    city: (n.city as string) || '',
    coverImage: (n.coverImage || n.cover_image || '') as string,
  }
}

export async function fetchNeighborhoods(query?: string) {
  try {
    const path = query ? `/neighborhoods?city=${query}` : '/neighborhoods';
    const json = await apiGet<any>(path);
    const raw = json.neighborhoods || json.data || []
    return Array.isArray(raw) ? raw.map((n) => mapNeighborhood(n as Record<string, unknown>)) : []
  } catch {
    return []
  }
}

export async function fetchNeighborhood(slug: string) {
  try {
    const json = await apiGet<any>(`/neighborhoods/${slug}`);
    return mapNeighborhood(json.data || json)
  } catch {
    return null
  }
}

export async function subscribeNewsletter(email: string) {
  return apiPost('/newsletter/subscribe', { email });
}

export async function submitLead(data: any) {
  return apiPost('/leads', {
    ...data,
    source: 'website_form',
    property_interest: data.property_id ? [data.property_id] : [],
    status: 'new',
  });
}
