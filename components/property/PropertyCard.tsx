'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Bed, Bathtub, FrameCorners } from '@phosphor-icons/react/dist/ssr'
import { Property } from '@/lib/types'

interface PropertyCardProps {
  property: Property
  priority?: boolean
}

/** Format full Naira */
function formatNairaFull(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`
}

/** Status text colour — badge bg is always beige per design spec */
const statusTextColor: Record<string, string> = {
  'FOR SALE':  '#1a7a4a',   // Verified Green
  'FOR RENT':  '#006aff',   // Electric Blue
  'OFF-PLAN':  '#d97706',   // Amber
  'SOLD':      '#c0392b',   // Alert Red
  'RESERVED':  '#7c3aed',   // Purple
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
  const badgeColor = statusTextColor[status] ?? '#001a40'

  // Robust image selection — fall back to neutral skeleton, never to Unsplash.
  const displayImage = (images && images.length > 0 && images[0])
    ? images[0]
    : null;

  return (
    <>
      <Link
        href={`/properties-details/${property.slug}`}
        className="group relative block focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-2 rounded-card"
        aria-label={`View listing: ${title}`}
      >
      {/* ── IMAGE ── */}
      <div className="relative overflow-hidden rounded-card bg-divider" style={{ height: 320 }}>
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

      <div
        className="absolute top-0 right-0 flex flex-row items-center justify-center flex-nowrap overflow-visible"
        style={{
          padding: '0px 0px 10px 10px',
          backgroundColor: '#f4f3ea',
          borderRadius: '0px 0px 0px 17px',
          zIndex: 1,
          gap: '10px',
          width: 'min-content',
          height: 'min-content',
        }}
        aria-label={status}
      >
        <span
          className="text-[11px] font-bold uppercase tracking-[0.08em] whitespace-nowrap"
          style={{ color: badgeColor }}
        >
          {status}
        </span>
      </div>

      {/* ── INFO — sits on beige page bg ── */}
      <div className="pt-3 pb-4">
        {/* Row 1: Location */}
        <div className="flex items-start gap-1.5 mb-2.5">
          <MapPin size={14} color="#4a5568" weight="fill" className="mt-0.5 shrink-0" aria-hidden="true" />
          <p className="text-[11px] font-semibold text-grey uppercase tracking-[0.08em] leading-tight">
            {location}
          </p>
        </div>

        {/* Row 2: Specs + Price — on one line */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 text-grey text-[12px] min-w-0 flex-shrink">
            {isAreaOnly ? (
              <div className="flex items-center gap-1.5">
                <FrameCorners size={16} color="#4a5568" weight="regular" aria-hidden="true" />
                <span className="font-medium whitespace-nowrap">
                  {areaLabel ?? areaDisplay ?? '—'}
                </span>
              </div>
            ) : (
              <>
                {beds !== undefined && (
                  <>
                    <div className="flex items-center gap-1">
                      <Bed size={16} color="#4a5568" weight="regular" aria-hidden="true" />
                      <span className="font-medium">{beds}</span>
                    </div>
                    <span className="text-[10px] font-bold text-navy select-none leading-none">●</span>
                  </>
                )}
                {baths !== undefined && (
                  <>
                    <div className="flex items-center gap-1">
                      <Bathtub size={16} color="#4a5568" weight="regular" aria-hidden="true" />
                      <span className="font-medium">{baths}</span>
                    </div>
                    {areaDisplay && (
                      <span className="text-[10px] font-bold text-navy select-none leading-none">●</span>
                    )}
                  </>
                )}
                {areaDisplay && (
                  <div className="flex items-center gap-1">
                    <FrameCorners size={16} color="#4a5568" weight="regular" aria-hidden="true" />
                    <span className="font-medium whitespace-nowrap">{areaDisplay}</span>
                  </div>
                )}
              </>
            )}
          </div>

          <span className="text-navy font-bold text-[15px] shrink-0 whitespace-nowrap ml-2">
            {priceDisplay}
          </span>
        </div>

        <hr className="border-t border-[#b0b8c5] mb-2.5" aria-hidden="true" />

        <h3 className="text-navy font-bold text-[15px] leading-snug line-clamp-2">
          {title}
        </h3>
      </div>
    </Link>
    </>
  )
}
