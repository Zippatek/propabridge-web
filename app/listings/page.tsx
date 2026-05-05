'use client'

import { useState, useEffect } from 'react'
import ListingsHero from '@/components/listings/ListingsHero'
import ListingsFilters from '@/components/listings/ListingsFilters'
import PropertyCard from '@/components/property/PropertyCard'
import { fetchListings } from '@/lib/api'
import { Property } from '@/lib/types'

export default function ListingsPage() {
  const [activeStatus, setActiveStatus] = useState('ALL')
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchListings({
          status: activeStatus,
          type: activeCategory,
          limit: 50,
        })
        setProperties(data)
      } catch (err) {
        setError('Could not load listings. Is the backend running?')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [activeStatus, activeCategory])

  return (
    <div className="min-h-screen bg-[#f4f3ea]">
      <ListingsHero
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
      />

      <div className="container-site pb-20">

        <div className="md:hidden mt-8 mb-12">
          <ListingsFilters
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            className="flex-wrap justify-center gap-3"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 mt-12 md:mt-20">

          <div className="hidden md:block w-[240px] shrink-0">
            <div className="sticky top-32">
              <ListingsFilters
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                className="flex-col gap-3"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0 pb-20">
            {loading && (
              <div className="text-center py-20">
                <p className="text-navy/70 text-[14px]">Loading properties...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-20 bg-red-50 rounded-[16px]">
                <h3 className="text-red-600 font-semibold text-[16px]">{error}</h3>
              </div>
            )}

            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
                {properties.length > 0 ? (
                  properties.map((property, index) => (
                    <PropertyCard key={property.id} property={property} priority={index < 4} />
                  ))
                ) : (
                  <div className="text-center py-20 bg-[#E5E7EB] rounded-[16px]">
                    <h3 className="text-navy font-semibold text-[20px] mb-2">No properties found</h3>
                    <p className="text-navy/70 text-[14px]">Try adjusting your search filters.</p>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
