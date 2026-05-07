import Link from 'next/link'
import PropertyCard from '@/components/property/PropertyCard'
import SearchBar from '@/components/search/SearchBar'
import { fetchListings } from '@/lib/api'

export default async function RecentListings() {
  let listings: any[] = []
  try {
    listings = await fetchListings({ limit: 6 })
  } catch {
    listings = []
  }

  return (
    <section className="bg-beige" aria-labelledby="listings-heading">
      <div className="container-site flex justify-center pt-12 pb-10">
        <SearchBar />
      </div>
      <hr className="border-t border-grey-light mx-6" aria-hidden="true" />
      <div className="container-site pt-10 pb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block w-2.5 h-2.5 rounded-sm bg-navy shrink-0" aria-hidden="true" />
          <p className="text-[12px] font-semibold text-navy uppercase tracking-[0.08em]">RECENT LISTINGS</p>
        </div>
        <h2
          id="listings-heading"
          className="text-navy font-medium leading-[1.15] tracking-[-0.02em] text-center"
          style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}
        >
          Verified, Curated, and Made for You.
        </h2>
      </div>
      <div className="container-site pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
          {listings.length > 0 ? (
            listings.map((property, index) => (
              <PropertyCard key={property.id} property={property} priority={index < 2} />
            ))
          ) : (
            <p className="text-navy/60 text-[14px]">No listings available right now.</p>
          )}
        </div>
        <div className="flex justify-center mt-8">
          <Link
            href="/listings"
            className="inline-flex items-center justify-center bg-blue hover:bg-blue-hover text-white font-sans font-semibold text-[14px] uppercase tracking-wider px-6 py-3 rounded-btn transition-all duration-300 gap-2"
          >
            VIEW PROPERTIES
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
              <path d="M5 12h14"></path><path d="M13 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
