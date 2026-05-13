'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'
import { Property } from '@/lib/types'

interface PropertyHeroProps {
  property: Property
}

export function PropertyHero({ property }: PropertyHeroProps) {
  const heroImage =
    property.images && property.images.length > 0 ? property.images[0] : null

  const sectionRef = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const [imageScale, setImageScale] = useState(1.08)
  const [translateY, setTranslateY] = useState(0)

  // Door open on mount
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setMounted(true)
      setImageScale(1.0)
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  // Door close as hero scrolls away + parallax
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const scrolledPast = Math.max(-rect.top, 0)
      const scrollRatio = Math.min(scrolledPast / (rect.height || 1), 1)
      // Re-zoom 1.0 → 1.05 as the hero scrolls out (door closes)
      setImageScale(1.0 + scrollRatio * 0.05)
      setTranslateY(Math.min(scrolledPast * 0.25, 80))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const mapsHref = property.location
    ? `https://maps.google.com/?q=${encodeURIComponent(property.location + ', Nigeria')}`
    : null

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      // 88vh so the specs bar is always below the fold on desktop — user must scroll to see it
      style={{ height: '88vh', minHeight: 600, marginTop: '-84px' }}
      aria-labelledby="property-hero-heading"
    >
      {/* ── Image layer: door-open scale + parallax ── */}
      <div
        className="absolute inset-0 z-0 bg-[#1a1a24]"
        style={{
          opacity: mounted ? 1 : 0,
          transform: `scale(${imageScale}) translateY(${translateY}px)`,
          transformOrigin: 'center center',
          transition: mounted
            ? 'transform 0.08s linear'
            : 'opacity 700ms ease, transform 700ms ease',
          willChange: 'transform, opacity',
        }}
      >
        {heroImage && (
          <Image
            src={heroImage}
            alt={property.title}
            fill
            priority
            sizes="100vw"
            // Slightly dimmed so the gradient + white text reads crisply
            className="object-cover object-center brightness-[0.65]"
          />
        )}
      </div>

      {/* ── Dark gradient — covers bottom 55% so title sits on solid contrast ── */}
      {/*    Top of gradient is transparent; bottom is near-opaque dark             */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to top, rgba(10,14,28,0.96) 0%, rgba(10,14,28,0.82) 22%, rgba(10,14,28,0.45) 42%, rgba(10,14,28,0.1) 62%, transparent 78%)',
        }}
      />

      {/* ── Content: pinned to bottom — title + location link ── */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-14 px-4 sm:px-8 lg:px-12 max-w-6xl mx-auto w-full">
        <h1
          id="property-hero-heading"
          className="font-bold text-white max-w-4xl mb-4"
          style={{
            fontSize: 'clamp(26px, 4.5vw, 54px)',
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            textShadow: '0 2px 16px rgba(0,0,0,0.4)',
          }}
        >
          {property.title}
        </h1>

        {mapsHref ? (
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors text-[14px] group w-fit"
            title="Open in Google Maps"
          >
            <MapPin size={16} className="text-white/70 group-hover:text-[#ffc870] transition-colors flex-shrink-0" />
            <span className="group-hover:underline underline-offset-2">{property.location}</span>
            <span className="text-[11px] font-semibold text-[#ffc870] opacity-0 group-hover:opacity-100 transition-opacity ml-0.5">
              → Maps
            </span>
          </a>
        ) : property.location ? (
          <div className="flex items-center gap-2 text-white/80 font-medium text-[14px]">
            <MapPin size={16} className="text-white/70" />
            <span>{property.location}</span>
          </div>
        ) : null}
      </div>
    </section>
  )
}
