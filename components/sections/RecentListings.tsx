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
    <section className="bg-beige relative z-[9999] recent-listings-section" aria-labelledby="listings-heading">
      <div className="container-site flex justify-center pt-12 pb-10">
        <SearchBar />
      </div>
      <hr className="border-t border-[#21201b]/30 mx-6 search-blur-target" aria-hidden="true" />
      <div className="container-site pt-10 pb-8 search-blur-target">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block w-2.5 h-2.5 rounded-sm bg-navy shrink-0" aria-hidden="true" />
          <p className="text-[12px] font-semibold text-navy uppercase tracking-[0.08em]">RECENT LISTINGS</p>
        </div>
        <h2
          id="listings-heading"
          className="text-display-lg font-medium text-heading text-center"
        >
          Verified, Curated, and Made for You.
        </h2>
      </div>
      <div className="container-site pb-28 search-blur-target">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
          {listings.length > 0 ? (
            listings.map((property, index) => (
              <PropertyCard key={property.id} property={property} priority={index < 2} />
            ))
          ) : (
            <p className="text-heading/60 text-[14px]">No listings available right now.</p>
          )}
        </div>
        <div className="flex justify-center mt-8">
          <Link
            href="/listings"
            className="btn-navy-pill rounded-[8px]"
          >
            VIEW PROPERTIES
            <span className="text-[18px] leading-none mb-[3px]">›</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
