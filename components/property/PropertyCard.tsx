'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Bed, Bath, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Property } from '@/lib/types'
import { safeImages } from '@/lib/media'
import { cn } from '@/lib/cn'
import HoverCursorWrapper from '@/components/ui/HoverCursorWrapper'

interface PropertyCardProps {
  property: Property
  priority?: boolean
}

function formatNairaFull(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`
}

/** Sage-pill style: soft fill + dark label, sits on the cream card background */
const statusPillStyle: Record<string, { bg: string; color: string }> = {
  'FOR SALE': { bg: '#DCEBC4', color: '#3A5A1A' },
  'FOR RENT': { bg: '#D7E7FF', color: '#0B3A8A' },
  'OFF-PLAN': { bg: '#FCE6BF', color: '#7A4A00' },
  SOLD: { bg: '#E5E7EB', color: '#6B0F0F' },
  RESERVED: { bg: '#EADCFB', color: '#4C1D95' },
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

  if (images.length === 0) {
    return <div className="h-full bg-[#e8e6df]" />
  }

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
  const pill =
    statusPillStyle[status] ?? ({ bg: '#F3F4F6', color: '#001A40' } as const)

  const displayImages = safeImages(images)

  return (
    <HoverCursorWrapper>
      <Link
        href={`/properties-details/${property.slug}`}
        className={cn(
          'group relative block bg-transparent shadow-none outline-none ring-0',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#006aff] focus-visible:outline-offset-2'
        )}
        aria-label={`View listing: ${title}`}
      >
        <div className="relative">
          {/* Floating sage pill */}
          <div
            className="absolute right-3 top-2 z-20 rounded-full px-4 py-2"
            style={{ backgroundColor: pill.bg }}
          >
            <span
              className="text-[12px] font-bold uppercase leading-none tracking-[0.06em]"
              style={{ color: pill.color }}
            >
              {listingStatusLabel(status)}
            </span>
          </div>

          {/* Photo */}
          <div className="relative h-[300px] overflow-hidden rounded-[14px] bg-[#e8e6df]">
            <ImageCarousel images={displayImages} title={title} priority={priority} />
          </div>
        </div>

        {/* Copy block — spacing aligned to Card A */}
        <div className="px-4 pb-8 pt-5">
          <div className="mb-4 flex items-start gap-2">
            <MapPin
              size={14}
              strokeWidth={1.75}
              className="mt-0.5 shrink-0 text-[#001A40]"
              aria-hidden
            />
            <p className="text-[11px] font-semibold uppercase leading-[1.35] tracking-[0.02em] text-[#4a5568]">
              {location}
            </p>
          </div>

          <div className="mb-4 flex items-baseline justify-between gap-3">
            <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] font-medium text-[#4a5568]">
              {isAreaOnly ? (
                <div className="flex items-center gap-1">
                  <Maximize2 size={15} strokeWidth={1.75} className="shrink-0 text-[#001A40]" aria-hidden />
                  <span className="whitespace-nowrap">{areaLabel ?? areaDisplay ?? '—'}</span>
                </div>
              ) : (
                <>
                  {beds !== undefined && (
                    <>
                      <div className="flex items-center gap-1">
                        <Bed size={15} strokeWidth={1.75} className="shrink-0 text-[#001A40]" aria-hidden />
                        <span>{beds}</span>
                      </div>
                      {(baths !== undefined || areaDisplay) && (
                        <span className="select-none text-[8px] text-[#9aa3b2]" aria-hidden>
                          •
                        </span>
                      )}
                    </>
                  )}
                  {baths !== undefined && (
                    <>
                      <div className="flex items-center gap-1">
                        <Bath size={15} strokeWidth={1.75} className="shrink-0 text-[#001A40]" aria-hidden />
                        <span>{baths}</span>
                      </div>
                      {areaDisplay && (
                        <span className="select-none text-[8px] text-[#9aa3b2]" aria-hidden>
                          •
                        </span>
                      )}
                    </>
                  )}
                  {areaDisplay && (
                    <div className="flex items-center gap-1">
                      <Maximize2 size={15} strokeWidth={1.75} className="shrink-0 text-[#001A40]" aria-hidden />
                      <span className="whitespace-nowrap">{areaDisplay}</span>
                    </div>
                  )}
                </>
              )}
            </div>

            <span className="shrink-0 whitespace-nowrap text-right text-xl font-bold leading-none tracking-tight text-[#0a0a0a]">
              {priceDisplay}
            </span>
          </div>

          <hr className="mb-4 border-0 border-t border-solid border-[#e2e8f0]" aria-hidden />

          <h3 className="line-clamp-2 text-[17px] font-bold leading-snug tracking-tight text-[#001A40]">
            {title}
          </h3>
        </div>
      </Link>
    </HoverCursorWrapper>
  )
}
