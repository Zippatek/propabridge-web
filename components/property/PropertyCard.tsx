'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Bed, Bath, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Property } from '@/lib/types'
import HoverCursorWrapper from '@/components/ui/HoverCursorWrapper'

interface PropertyCardProps {
  property: Property
  priority?: boolean
}

function formatNairaFull(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`
}

/** Status accent — curved tag text on listing cards */
const statusTextColor: Record<string, string> = {
  'FOR SALE': '#324F07',
  'FOR RENT': '#006AFF',
  'OFF-PLAN': '#9E6100',
  SOLD: '#800000',
  RESERVED: '#7c3aed',
}

function listingStatusLabel(status: string): string {
  switch (status) {
    case 'FOR RENT':
      return 'For Rent'
    case 'FOR SALE':
      return 'For Sale'
    case 'OFF-PLAN':
      return 'Off-Plan'
    default:
      return status
  }
}

function ImageCarousel({ images, title, priority }: { images: string[]; title: string; priority: boolean }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation()
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation()
    emblaApi?.scrollNext()
  }, [emblaApi])

  if (images.length === 0) return <div className="h-full bg-divider rounded-card" />

  if (images.length === 1) {
    return (
      <Image
        src={images[0]}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
      />
    )
  }

  return (
    <>
      <div ref={emblaRef} className="overflow-hidden h-full w-full">
        <div className="flex h-full">
          {images.map((src, i) => (
            <div key={src + i} className="relative flex-[0_0_100%] h-full">
              <Image
                src={src}
                alt={`${title} — ${i + 1}`}
                fill
                className="object-cover"
                priority={priority && i === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={scrollPrev}
        aria-label="Previous image"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next image"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
      >
        <ChevronRight size={16} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); emblaApi?.scrollTo(i) }}
            aria-label={`Image ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-200 ${i === selectedIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
          />
        ))}
      </div>
    </>
  )
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

  const displayImages = images && images.length > 0 ? images.filter(Boolean) : []

  return (
    <HoverCursorWrapper>
      <Link
        href={`/properties-details/${property.slug}`}
        className="group relative block rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-2"
        aria-label={`View listing: ${title}`}
      >
        {/* Image wrapper → carousel */}
        <div className="relative h-[320px] overflow-hidden rounded-card bg-divider">
          <ImageCarousel images={displayImages} title={title} priority={priority} />

          {/* Status — curved beige tag, top-right (same treatment as previously below title) */}
          <div
            className="absolute top-3 right-3 z-10 inline-flex max-w-[min(200px,calc(100%-1.5rem))] items-center bg-brand-light2 pl-3 pr-4 py-2 shadow-md"
            style={{ borderRadius: '4px 20px 4px 20px' }}
          >
            <span className="text-[11px] font-semibold tracking-[0.04em]" style={{ color: badgeColor }}>
              {listingStatusLabel(status)}
            </span>
          </div>
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
        </div>
      </Link>
    </HoverCursorWrapper>
  )
}
