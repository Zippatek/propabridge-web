import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import LocationCard from '@/components/property/LocationCard'
import { MOCK_LOCATIONS } from '@/lib/mock-data'

export default function LocationSection() {
  return (
    <section className="bg-beige" aria-labelledby="locations-heading">

      {/* ── DIVIDER LINE — separates from listings section above ── */}
      <hr className="border-t border-grey-light mx-6" aria-hidden="true" />

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
          className="text-navy font-medium leading-[1.15] tracking-[-0.02em] text-center"
          style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}
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
        <div className="flex justify-center mt-10">
          <Link
            href="/neighborhood"
            className="inline-flex items-center justify-center bg-blue hover:bg-blue-hover text-white font-sans font-semibold text-[14px] uppercase tracking-wider px-6 py-3 rounded-btn transition-all duration-300 gap-2"
          >
            VIEW ALL NEIGHBORHOODS
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
              <path d="M5 12h14"></path>
              <path d="M13 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>

    </section>
  )
}
