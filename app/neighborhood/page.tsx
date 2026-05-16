import type { Metadata } from 'next'
import LocationCard from '@/components/property/LocationCard'
import { MOCK_LOCATIONS } from '@/lib/mock-data'
import { fetchNeighborhoods } from '@/lib/api'
import { NEIGHBORHOOD_COVERS } from '@/lib/bucket'
import type { Location } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Neighborhoods — Propabridge',
  description:
    'Explore verified neighborhoods across Abuja, Kaduna, and Minna. Discover local communities, lifestyle perks, and what makes each area special.',
  keywords: [
    'Abuja neighborhoods', 'best areas to live Abuja', 'Maitama Abuja', 'Gwarinpa Abuja',
    'Katampe Abuja', 'Kaduna neighborhoods', 'Minna property areas', 'Asokoro Abuja',
  ],
  openGraph: {
    title: 'Neighborhoods — Propabridge',
    description:
      'Explore verified neighborhoods across Abuja, Kaduna, and Minna. Discover local communities, lifestyle perks, and what makes each area special.',
    url: 'https://propabridge.com/neighborhood',
  },
}

export default async function NeighborhoodPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>
}) {
  const params = await searchParams
  const query = (params?.q || '').trim().toLowerCase()

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

  const resolveNeighborhoodCover = (slug?: string, name?: string, city?: string, fallback?: string) => {
    const candidates = [
      slug || '',
      [name, city].filter(Boolean).join('-'),
      name || '',
    ]
      .map(slugify)
      .filter(Boolean)

    for (const key of candidates) {
      if (NEIGHBORHOOD_COVERS[key]) return NEIGHBORHOOD_COVERS[key]
    }
    return fallback || ''
  }

  const apiNeighborhoods = await fetchNeighborhoods()
  const all: Location[] =
    apiNeighborhoods.length > 0
      ? apiNeighborhoods.map((n) => ({
          id: n.slug || n.id,
          name: n.name,
          district: n.name,
          city: n.city,
          state: n.state,
          image: resolveNeighborhoodCover(n.slug || n.id, n.name, n.city, n.coverImage),
          propertyCount: n.listingCount ?? 0,
          description: n.description ?? '',
        }))
      : MOCK_LOCATIONS

  const filteredLocations = query
    ? all.filter((location) =>
        `${location.name} ${location.city} ${location.district}`.toLowerCase().includes(query)
      )
    : all

  return (
    <main className="bg-beige min-h-screen">
      <section className="container-site pt-20 pb-14 text-center" aria-labelledby="neighborhoods-heading">
        <div className="inline-flex items-center gap-2.5 bg-[#eae9e0] rounded-[8px] px-4 py-2 mb-8">
          <span className="w-2 h-2 rounded-sm bg-navy inline-block" aria-hidden="true" />
          <span className="text-[11px] font-semibold text-navy uppercase tracking-[0.12em]">Neighborhoods</span>
          <span className="w-2 h-2 rounded-sm bg-navy inline-block" aria-hidden="true" />
        </div>

        <h1
          id="neighborhoods-heading"
          className="text-display-xl text-heading font-medium max-w-4xl mx-auto"
        >
          Every neighborhood has its rhythm —<br />let&apos;s find the one that<br /> fits you best.
        </h1>

      </section>

      <section className="container-site pb-24" aria-label="All neighborhoods">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLocations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
        {filteredLocations.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <p className="text-navy/50 text-[15px]">No neighborhoods matched your search. Try another term.</p>
          </div>
        )}
      </section>
    </main>
  )
}
