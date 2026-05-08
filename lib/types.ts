// ─── PROPERTY ─────────────────────────────────────────────────────────────────

export type PropertyStatus = 'FOR SALE' | 'FOR RENT' | 'SOLD' | 'OFF-PLAN' | 'RESERVED'
export type PropertyType = 'Apartment' | 'Terrace' | 'Detached' | 'Semi-Detached' | 'Land' | 'Commercial' | 'Off-Plan' | 'Duplex'
export type PropertyCity = 'Abuja' | 'Kaduna' | 'Minna'
export type VerificationStatus = 'VERIFIED' | 'PENDING' | 'FAILED'

export interface Property {
  id: string                    // Internal UUID
  property_id?: string          // "PB-ABJ-0105"
  slug: string                  // URL slug
  title: string
  shortDescription?: string
  location: string              // "Karsana North District"
  district: string
  city: PropertyCity
  state: string                 // "FCT" | "Kaduna" | "Niger"
  price: number                 // in Naira
  priceLabel?: string           // e.g. "₦2.5M–₦8M" (for ranged prices)
  areaLabel?: string            // e.g. "450–900 SQM" or "12–16 SQM (Units Available)"
  status: PropertyStatus
  type: PropertyType

  // Physical specs
  beds?: number
  baths?: number
  toilets?: number
  area?: number                 // in m²
  landArea?: number             // for land/estate listings
  areaUnit?: 'sqm' | 'sqft' | 'hectares' | 'acres'
  floors?: number
  parkingSpaces?: number

  // Media
  images: string[]              // Array of image URLs
  videoUrl?: string
  virtualTourUrl?: string

  // Verification
  verified: boolean
  verificationStatus: VerificationStatus
  verificationItems: string[]   // ["Title Verified", "Physically Inspected"]
  titleDocumentAvailable: boolean

  // Details Page
  fullDescription?: string
  /** Long-form Markdown from API-only fields (`*_md` / camelCase equivalents). Prefer over plain when set. */
  descriptionMarkdown?: string
  overviewMarkdown?: string
  /** GFM Markdown for spec tables etc. (`specs_md`, `specifications_markdown`, …). */
  specsMarkdown?: string
  bodyParagraphs?: string[]          // Multi-paragraph body text (plain split of description)
  amenityTags?: string[]             // Pill chips (Park, School, Highway etc.)
  amenities?: string[]               // Legacy — kept for compatibility
  features?: string[]                // Checkmark list items
  condition?: string                 // "Brand New"
  water?: string                     // "Solar-powered borehole"
  pricingBreakdown?: {
    netRent?: number
    cautionFee?: number
    serviceCharge?: number
    agencyFeePercentage?: number
    legalFeePercentage?: number
    totalFirstYearCost?: string
  }

  // Listing meta
  featured: boolean
  agent?: Agent
  developer?: Developer
  createdAt: string
  updatedAt: string

  // SEO
  metaTitle?: string
  metaDescription?: string
}

// ─── AGENT ────────────────────────────────────────────────────────────────────

export interface Agent {
  id: string
  name: string
  phone: string
  whatsapp?: string
  email?: string
  avatar?: string
  verified: boolean
  licenseNumber?: string
  propertiesListed?: number
}

// ─── DEVELOPER ────────────────────────────────────────────────────────────────

export interface Developer {
  id: string
  name: string                  // INTERNAL — never show on listing
  // NOTE: Per brand rules, only "Propabridge Team" attribution on listings
}

// ─── LOCATION ─────────────────────────────────────────────────────────────────

export interface Location {
  id: string
  name: string                  // "Gwarinpa"
  district: string
  city: PropertyCity
  state: string
  image: string
  propertyCount: number
  description?: string
  averagePrice?: number
}

// ─── BLOG POST ────────────────────────────────────────────────────────────────

export type BlogCategory =
  | 'Market Insight'
  | 'Neighbourhood Guide'
  | 'Legal Tips'
  | 'Buyer Guide'
  | 'Investment'

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string               // MDX or HTML
  category: BlogCategory
  image: string
  author: string
  publishedAt: string
  readTime: number              // in minutes
}

// ─── TESTIMONIAL ──────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string
  name: string
  location: string              // "Bought in Karsana North, Abuja"
  avatar?: string
  stars: 1 | 2 | 3 | 4 | 5
  quote: string
  verified: boolean
  type: 'Buyer' | 'Renter' | 'Seller' | 'Diaspora Buyer'
  date: string
}

// ─── SEARCH ───────────────────────────────────────────────────────────────────

export interface SearchFilters {
  query?: string
  city?: PropertyCity
  district?: string
  status?: PropertyStatus
  type?: PropertyType
  minPrice?: number
  maxPrice?: number
  minBeds?: number
  maxBeds?: number
  minArea?: number
  verified?: boolean
  page?: number
  limit?: number
  sortBy?: 'createdAt' | 'price_asc' | 'price_desc' | 'relevance'
}

export interface SearchResult {
  properties: Property[]
  total: number
  page: number
  totalPages: number
  filters: SearchFilters
}

// ─── UI STATE ─────────────────────────────────────────────────────────────────

export interface ToastNotification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

export interface NavLink {
  label: string
  href: string
  children?: { label: string; href: string }[]
}
