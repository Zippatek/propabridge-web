import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MOCK_LOCATIONS, MOCK_PROPERTIES } from '@/lib/mock-data'
import PropertyCard from '@/components/property/PropertyCard'
import { fetchNeighborhood, fetchListings } from '@/lib/api'

interface NeighborhoodDetailPageProps {
  params: Promise<{ slug: string }>
}

const fmtNaira = (n?: number) =>
  n ? (n >= 1_000_000_000 ? `₦${(n / 1_000_000_000).toFixed(1)}B` : n >= 1_000_000 ? `₦${(n / 1_000_000).toFixed(0)}M` : `₦${n.toLocaleString()}`) : '—'

export default async function NeighborhoodDetailPage({ params }: NeighborhoodDetailPageProps) {
  const { slug } = await params
  const apiData = await fetchNeighborhood(slug)
  const fallback = !apiData ? MOCK_LOCATIONS.find((item) => item.id === slug) : null

  if (!apiData && !fallback) {
    notFound()
  }

  const name = apiData?.name || fallback!.name
  const city = apiData?.city || fallback!.city
  const description = apiData?.description || fallback?.description || `${name} is one of the key areas in ${city}, with verified listings and strong local demand.`
  const image = apiData?.coverImage || fallback?.image || '/images/locations/placeholder.jpg'
  const safetyScore = apiData?.safetyScore
  const averagePrice = apiData?.averagePrice
  const population = apiData?.population
  const amenities = apiData?.amenities

  // Fetch listings for this neighborhood from real API; fall back to mocks
  let related: typeof MOCK_PROPERTIES = []
  try {
    const live = await fetchListings({ limit: 12 })
    related = (live as unknown as typeof MOCK_PROPERTIES).filter((p) => {
      const h = `${p.district} ${p.city} ${p.location}`.toLowerCase()
      return h.includes(name.toLowerCase())
    })
  } catch {
    // ignore
  }
  if (related.length === 0) {
    related = MOCK_PROPERTIES.filter((p) => {
      const h = `${p.district} ${p.city} ${p.location}`.toLowerCase()
      return h.includes(name.toLowerCase())
    })
  }

  return (
    <main className="bg-beige min-h-screen pt-[96px] pb-20">
      <section className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="inline-flex items-center gap-2 border border-navy/20 rounded-btn px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-sm bg-navy inline-block" />
              <span className="text-[11px] font-semibold text-navy uppercase tracking-[0.12em]">Neighborhood</span>
            </div>
            <h1 className="text-display-xl text-heading font-medium">
              {name}, {city}
            </h1>
            <p className="text-grey text-[16px] leading-[1.8] mt-6 max-w-[620px]">{description}</p>

            {(safetyScore || averagePrice || population) && (
              <div className="grid grid-cols-3 gap-4 mt-8 max-w-[560px]">
                {safetyScore != null && (
                  <Stat label="Safety Score" value={`${safetyScore}/100`} />
                )}
                {averagePrice != null && (
                  <Stat label="Avg Price" value={fmtNaira(averagePrice)} />
                )}
                {population != null && (
                  <Stat label="Population" value={population.toLocaleString()} />
                )}
              </div>
            )}

            <div className="mt-8">
              <Link
                href={`/listings?city=${encodeURIComponent(city)}&district=${encodeURIComponent(name)}`}
                className="inline-flex items-center gap-2 bg-blue text-white font-semibold text-[14px] px-6 py-3 rounded-btn hover:bg-blue-hover transition-colors"
              >
                View All Properties
              </Link>
            </div>
          </div>

          <div className="relative w-full aspect-[16/10] rounded-card overflow-hidden border border-grey-light">
            <Image src={image} alt={`${name}, ${city}`} fill className="object-cover" />
          </div>
        </div>

        {amenities && (
          <section className="mt-12">
            <h2 className="text-display-md text-heading font-medium mb-4">What&apos;s Around</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <AmenityList title="Schools" items={amenities.schools} />
              <AmenityList title="Hospitals" items={amenities.hospitals} />
              <AmenityList title="Markets" items={amenities.markets} />
              <AmenityList title="Transit" items={amenities.transit} />
            </div>
          </section>
        )}
      </section>

      <section className="container-site mt-16">
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-display-md text-heading font-medium">Properties in this Neighborhood</h2>
          <span className="text-[13px] text-grey font-semibold">{related.length} listing(s)</span>
        </div>
        {related.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-grey-light rounded-card p-8 text-grey">
            No listings available yet for this neighborhood.
          </div>
        )}
      </section>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-card border border-grey-light p-4">
      <div className="text-[11px] uppercase tracking-wider text-grey font-semibold">{label}</div>
      <div className="text-navy font-bold text-[18px] mt-1">{value}</div>
    </div>
  )
}

function AmenityList({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null
  return (
    <div className="bg-white rounded-card border border-grey-light p-4">
      <div className="text-[11px] uppercase tracking-wider text-grey font-semibold mb-2">{title}</div>
      <ul className="text-[14px] text-navy space-y-1">
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  )
}
