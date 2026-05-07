'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Location } from '@/lib/types'
import HoverCursorWrapper from '@/components/ui/HoverCursorWrapper'

interface LocationCardProps {
  location: Location
}

export default function LocationCard({ location }: LocationCardProps) {
  const { name, city, image } = location
  const href = `/neighborhood/${encodeURIComponent(location.id)}`

  return (
    <HoverCursorWrapper>
      <Link
        href={href}
        className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-2 rounded-[16px]"
        aria-label={`Browse properties in ${name}, ${city}`}
      >
      {/*
        ── CARD CONTAINER ──
        White/off-white background, rounded outer corners, subtle shadow.
        Image sits inside with its own padding and inner rounded corners.
      */}
      <div className="bg-white rounded-[16px] p-2 shadow-card">

        {/* Image — padded inside card, own rounded corners */}
        <div className="relative overflow-hidden rounded-[12px] w-full" style={{ aspectRatio: '4/3' }}>
          <Image
            src={image ?? '/images/locations/placeholder.jpg'}
            alt={`${name}, ${city}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* ── NAME + ARROW ROW — below the image, inside card ── */}
        <div className="flex items-center justify-between px-2 pt-3 pb-1">
          {/* Location name: ALL CAPS, navy, bold */}
          <p className="text-[13px] font-bold text-navy uppercase tracking-[0.04em]">
            {name}, {city}
          </p>

          {/*
            Arrow button:
            Default: light grey background, rounded
            Hover: fills solid dark navy
          */}
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#ebebeb] group-hover:bg-navy transition-colors duration-200 shrink-0"
            aria-hidden="true"
          >
            <ChevronRight
              size={14}
              className="text-navy group-hover:text-white transition-colors duration-200"
            />
          </div>
        </div>

      </div>
    </Link>
    </HoverCursorWrapper>
  )
}
