import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MOCK_LOCATIONS, MOCK_PROPERTIES } from '@/lib/mock-data'
import PropertyCard from '@/components/property/PropertyCard'

interface NeighborhoodDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function NeighborhoodDetailPage({ params }: NeighborhoodDetailPageProps) {
  const { slug } = await params
  const location = MOCK_LOCATIONS.find((item) => item.id === slug)

  if (!location) {
    notFound()
  }

  const relatedProperties = MOCK_PROPERTIES.filter((property) => {
    const haystack = `${property.district} ${property.city} ${property.location}`.toLowerCase()
    return haystack.includes(location.name.toLowerCase()) || haystack.includes(location.district.toLowerCase())
  })

  return (
    <main className="bg-beige min-h-screen pt-[96px] pb-20">
      <section className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="inline-flex items-center gap-2 border border-navy/20 rounded-btn px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-[2px] bg-navy inline-block" />
              <span className="text-[11px] font-semibold text-navy uppercase tracking-[0.12em]">Neighborhood</span>
            </div>
            <h1 className="text-[#111111] font-bold leading-[1.1] tracking-[-0.02em]" style={{ fontSize: 'clamp(30px, 4vw, 54px)' }}>
              {location.name}, {location.city}
            </h1>
            <p className="text-grey text-[16px] leading-[1.8] mt-6 max-w-[620px]">
              {location.description || `${location.name} is one of the key areas in ${location.city}, with verified listings and strong local demand.`}
            </p>
            <div className="mt-8">
              <Link href={`/listings?city=${encodeURIComponent(location.city)}&district=${encodeURIComponent(location.name)}`} className="inline-flex items-center gap-2 bg-blue text-white font-semibold text-[14px] px-6 py-3 rounded-btn hover:bg-blue-hover transition-colors">
                View All Properties
              </Link>
            </div>
          </div>
          <div className="relative w-full aspect-[16/10] rounded-[16px] overflow-hidden border border-[#e5e7eb]">
            <Image src={location.image} alt={`${location.name}, ${location.city}`} fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="container-site mt-16">
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-[#111111] text-[24px] font-bold">Properties in this Neighborhood</h2>
          <span className="text-[13px] text-grey font-semibold">{relatedProperties.length} listing(s)</span>
        </div>
        {relatedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-grey-light rounded-[12px] p-8 text-grey">
            No listings available yet for this neighborhood.
          </div>
        )}
      </section>
    </main>
  )
}
