'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Bed, Bath, Maximize2 } from 'lucide-react'
import { Property } from '@/lib/types'
import HoverCursorWrapper from '@/components/ui/HoverCursorWrapper'

interface PropertyCardProps {
  property: Property
  priority?: boolean
}

function formatNairaFull(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`
}

/** Status colours — brand tokens */
const statusTextColor: Record<string, string> = {
  'FOR SALE': '#324F07',
  'FOR RENT': '#006AFF',
  'OFF-PLAN': '#9E6100',
  SOLD: '#800000',
  RESERVED: '#7c3aed',
}

export default function PropertyCard({ property, priority = false }: PropertyCardProps) {
  const {
    title,
    location,
    price,
    priceLabel,
    areaLabel,
    status,
    beds,
    baths,
    area,
    images,
  } = property

  const areaDisplay = area !== undefined ? `${area} M²` : null
  const priceDisplay = priceLabel ?? formatNairaFull(price)
  const isAreaOnly = beds === undefined && baths === undefined
  const badgeColor = statusTextColor[status] ?? '#001A40'

  const displayImage = images && images.length > 0 && images[0] ? images[0] : null

  return (
    <HoverCursorWrapper>
      <Link
        href={`/properties-details/${property.slug}`}
        className="group relative block rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-2"
        aria-label={`View listing: ${title}`}
      >
        {/* Image wrapper → image */}
        <div className="relative h-[320px] overflow-hidden rounded-card bg-divider">
          {displayImage && (
            <Image
              src={displayImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
            />
          )}
        </div>

        {/* Text block */}
        <div className="pt-4 pb-1">
          {/* Location */}
          <div className="mb-3 flex items-start gap-1.5">
            <MapPin size={14} className="mt-0.5 shrink-0 text-grey" aria-hidden />
            <p className="text-body-uppercase font-semibold uppercase leading-tight tracking-normal text-grey">
              {location}
            </p>
          </div>

          {/* Summary + price */}
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex min-w-0 shrink items-center gap-1.5 text-body-sm text-grey">
              {isAreaOnly ? (
                <div className="flex items-center gap-1.5">
                  <Maximize2 size={16} className="shrink-0 text-grey" aria-hidden />
                  <span className="font-medium whitespace-nowrap">{areaLabel ?? areaDisplay ?? '—'}</span>
                </div>
              ) : (
                <>
                  {beds !== undefined && (
                    <>
                      <div className="flex items-center gap-1">
                        <Bed size={16} className="shrink-0 text-grey" aria-hidden />
                        <span className="font-medium">{beds}</span>
                      </div>
                      <span className="select-none text-[10px] font-bold leading-none text-navy">●</span>
                    </>
                  )}
                  {baths !== undefined && (
                    <>
                      <div className="flex items-center gap-1">
                        <Bath size={16} className="shrink-0 text-grey" aria-hidden />
                        <span className="font-medium">{baths}</span>
                      </div>
                      {areaDisplay && (
                        <span className="select-none text-[10px] font-bold leading-none text-navy">●</span>
                      )}
                    </>
                  )}
                  {areaDisplay && (
                    <div className="flex items-center gap-1">
                      <Maximize2 size={16} className="shrink-0 text-grey" aria-hidden />
                      <span className="font-medium whitespace-nowrap">{areaDisplay}</span>
                    </div>
                  )}
                </>
              )}
            </div>

            <span className="ml-2 shrink-0 whitespace-nowrap text-h5 font-bold text-navy">{priceDisplay}</span>
          </div>

          <hr className="mb-3 border-t border-grey-light/80" aria-hidden />

          {/* Title */}
          <h3 className="text-h3-s line-clamp-2 font-bold leading-snug text-navy">{title}</h3>

          {/* Tag wrapper — curved beige treatment */}
          <div
            className="mt-3 inline-flex min-w-0 items-center bg-brand-light2 pl-3 pr-4 py-2 shadow-sm"
            style={{
              borderRadius: '4px 20px 4px 20px',
            }}
            aria-label={status}
          >
            <span className="badge-text font-bold uppercase tracking-[0.08em]" style={{ color: badgeColor }}>
              {status}
            </span>
          </div>
        </div>
      </Link>
    </HoverCursorWrapper>
  )
}
