import type { Metadata } from 'next'
import LocationCard from '@/components/property/LocationCard'
import { MOCK_LOCATIONS } from '@/lib/mock-data'
import { fetchNeighborhoods } from '@/lib/api'
import type { Location } from '@/lib/types'
import { Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Neighborhoods — Propabridge',
  description:
    'Explore verified neighborhoods across Abuja, Kaduna, and Minna. Discover local communities, lifestyle perks, and what makes each area special.',
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

  const apiNeighborhoods = await fetchNeighborhoods()
  const all: Location[] =
    apiNeighborhoods.length > 0
      ? apiNeighborhoods.map((n) => ({
          id: n.slug || n.id,
          name: n.name,
          district: n.name,
          city: n.city,
          state: n.state,
          image: n.coverImage,
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
          Every neighborhood has its rhythm — let&apos;s find the one that fits you best.
        </h1>

        <form action="/neighborhood" className="mt-8 w-full max-w-[560px] mx-auto">
          <div className="flex items-center bg-white border border-grey-light rounded-btn px-4 py-3 gap-3">
            <Search size={18} className="text-navy/60 shrink-0" />
            <input
              name="q"
              defaultValue={params?.q || ''}
              placeholder="Search by neighborhood, city, or district..."
              className="w-full bg-transparent text-[14px] text-navy placeholder:text-navy/45 outline-none"
            />
            <button type="submit" className="bg-navy text-white text-[12px] font-semibold px-4 py-2 rounded-btn">
              SEARCH
            </button>
          </div>
        </form>
      </section>

      <section className="container-site pb-24" aria-label="All neighborhoods">
        <hr className="border-t border-grey-light mb-10" aria-hidden="true" />
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
