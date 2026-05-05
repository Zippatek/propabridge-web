const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Maps backend DB fields → frontend Property type
function mapListing(p: any) {
  return {
    id: p.property_id || p.id,
    slug: p.slug || p.property_id,
    title: p.title,
    location: p.location || '',
    district: p.neighbourhood || '',
    city: p.city || 'Abuja',
    state: 'FCT',
    price: parseFloat((p.price || '0').toString().replace(/[^0-9.]/g, '')) || 0,
    status: p.transaction_type?.toUpperCase().includes('RENT') ? 'FOR RENT' : 'FOR SALE',
    type: p.category || 'Apartment',
    beds: parseInt(p.bedrooms) || undefined,
    baths: parseInt(p.bathrooms) || undefined,
    area: p.size_sqm || undefined,
    images: Array.isArray(p.images) ? p.images : [],
    verified: p.verified || false,
    verificationStatus: p.verified ? 'VERIFIED' : 'PENDING',
    verificationItems: [],
    titleDocumentAvailable: false,
    featured: p.featured || false,
    amenities: Array.isArray(p.amenities) ? p.amenities : [],
    fullDescription: p.description || undefined,
    shortDescription: p.description ? p.description.substring(0, 150) + "..." : undefined,
    createdAt: p.created_at || new Date().toISOString(),
    updatedAt: p.updated_at || new Date().toISOString(),
  };
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

  const res = await fetch(`${API_URL}/listings?${params.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch listings');

  const json = await res.json();
  const raw = json.data || json.listings || json || [];
  return Array.isArray(raw) ? raw.map(mapListing) : [];
}

export async function fetchListing(id: string) {
  const res = await fetch(`${API_URL}/listings/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Listing not found');
  const json = await res.json();
  return mapListing(json.data || json);
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
