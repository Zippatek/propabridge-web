import Link from 'next/link'
import LocationCard from '@/components/property/LocationCard'
import { MOCK_LOCATIONS } from '@/lib/mock-data'

export default function LocationSection() {
  return (
    <section className="bg-beige" aria-labelledby="locations-heading">

      {/* ── DIVIDER LINE — separates from listings section above ── */}
      <hr className="border-t border-[#21201b]/30 mx-6" aria-hidden="true" />

      {/* ── Header — same pattern as RECENT LISTINGS section ── */}
      <div className="container-site pt-20 pb-6">
        {/* Label — small navy square indicator (matches listings section) */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block w-2.5 h-2.5 rounded-sm bg-navy shrink-0" aria-hidden="true" />
          <p className="text-[12px] font-semibold text-navy uppercase tracking-[0.08em]">
            NEIGHBORHOOD
          </p>
        </div>

        {/* Heading — centered, font-bold, same size as listings heading */}
        <h2
          id="locations-heading"
          className="text-display-lg font-medium text-heading text-center"
        >
          Where you live matters—pick the perfect spot.
        </h2>
      </div>

      {/* ── Neighbourhood Grid — 3 columns matching reference ── */}
      <div className="container-site section-pb">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_LOCATIONS.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>

        {/* ── VIEW ALL NEIGHBORHOODS CTA — Electric Blue pill ── */}
        <div className="flex justify-center mt-8">
          <Link
            href="/neighborhood"
            className="btn-navy-pill rounded-[8px]"
          >
            VIEW ALL NEIGHBORHOODS
            <span className="text-[18px] leading-none mb-[3px]">›</span>
          </Link>
        </div>
      </div>

    </section>
  )
}
