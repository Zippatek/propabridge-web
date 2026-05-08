'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

// Framer-style APPEAR effect (custom preset feel): opacity 0 -> 1, scale 1.1 -> 1, ease.
const HERO_APPEAR_EFFECT_DURATION_MS = 800
const HERO_APPEAR_EFFECT_EASE = 'ease'
const HERO_APPEAR_EFFECT_INITIAL_SCALE = 1.1

// Framer-style SCROLL SPEED effect at 30% for the hero visual layer only.
const HERO_SCROLL_SPEED_FACTOR = 0.3
const HERO_SCROLL_SPEED_MAX_TRANSLATE_PX = 120
const HERO_PARTICLES = [
  { left: '8%', top: '18%', size: 6, opacity: 0.14, duration: 9.5, delay: 0 },
  { left: '18%', top: '36%', size: 8, opacity: 0.12, duration: 11, delay: 1.8 },
  { left: '27%', top: '62%', size: 5, opacity: 0.1, duration: 10.2, delay: 0.6 },
  { left: '39%', top: '24%', size: 7, opacity: 0.13, duration: 12.4, delay: 2.2 },
  { left: '47%', top: '52%', size: 6, opacity: 0.11, duration: 9.8, delay: 1.2 },
  { left: '56%', top: '34%', size: 9, opacity: 0.12, duration: 12.1, delay: 0.4 },
  { left: '64%', top: '68%', size: 5, opacity: 0.1, duration: 10.6, delay: 2.6 },
  { left: '72%', top: '26%', size: 7, opacity: 0.12, duration: 11.3, delay: 0.9 },
  { left: '79%', top: '49%', size: 6, opacity: 0.11, duration: 9.9, delay: 1.5 },
  { left: '86%', top: '73%', size: 8, opacity: 0.1, duration: 12.7, delay: 2.9 },
]

function HeroChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-brand-textWhite/20 px-2 py-1 backdrop-blur-sm ring-1 ring-brand-textWhite/25">
      {children}
    </span>
  )
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [blurPx, setBlurPx] = useState(8)
  const [visualLayerTranslateY, setVisualLayerTranslateY] = useState(0)
  const [isAppearEffectActive, setIsAppearEffectActive] = useState(false)

  useEffect(() => {
    // APPEAR effect trigger: first animation frame after mount.
    const enterRaf = window.requestAnimationFrame(() => setIsAppearEffectActive(true))
    return () => window.cancelAnimationFrame(enterRaf)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let baseLocalScroll = 0
    let hasBaseLocalScroll = false

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const progress = Math.min(Math.max((vh - rect.top) / (rect.height + vh), 0), 1)
      const nextBlur = window.innerWidth < 768 ? 6 - progress * 5.2 : 8 - progress * 7.2
      const localScroll = Math.min(Math.max(-rect.top, 0), rect.height)

      if (!hasBaseLocalScroll) {
        baseLocalScroll = localScroll
        hasBaseLocalScroll = true
      }

      // SCROLL SPEED 30% effect: visual layer moves at 0.3x local hero scroll.
      const relativeLocalScroll = localScroll - baseLocalScroll
      const nextTranslate = Math.max(
        -HERO_SCROLL_SPEED_MAX_TRANSLATE_PX,
        Math.min(HERO_SCROLL_SPEED_MAX_TRANSLATE_PX, relativeLocalScroll * HERO_SCROLL_SPEED_FACTOR)
      )

      setBlurPx(Math.max(0, nextBlur))
      setVisualLayerTranslateY(nextTranslate)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-brand-navy"
      style={{ minHeight: '100vh', marginTop: '-84px' }}
      aria-labelledby="hero-heading"
    >
      {/* Hero
          - Background Wrapper
            - Hero Image
              - Blur Overlay
              - Blur Trigger
              - FloatingParticles
          - Top Text
          - Heading and Button
          - Blur (lower/general near bottom over grid region)
          - Pattern (grid)
      */}
      {/* 0 — Background Wrapper: APPEAR effect + SCROLL SPEED (30%) */}
      <div
        className="absolute inset-0 z-0 bg-brand-navy"
        aria-hidden
        style={{
          opacity: isAppearEffectActive ? 1 : 0,
          transform: `translate3d(0, ${visualLayerTranslateY}px, 0) scale(${isAppearEffectActive ? 1 : HERO_APPEAR_EFFECT_INITIAL_SCALE})`,
          transformOrigin: 'center center',
          transition: `opacity ${HERO_APPEAR_EFFECT_DURATION_MS}ms ${HERO_APPEAR_EFFECT_EASE}, transform ${HERO_APPEAR_EFFECT_DURATION_MS}ms ${HERO_APPEAR_EFFECT_EASE}`,
          willChange: 'transform, opacity',
        }}
      >
        <div className="absolute inset-0 z-0 bg-brand-navy" aria-hidden />

        {/* 1 — Hero Image */}
        <div className="absolute inset-0 z-[1]">
          <Image
            src="/images/hero/buy-sell-rent.png"
            alt="Nigerian residential property"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.8]"
          />
        </div>

        {/* 2 — Blur Overlay (general blur across hero image area) */}
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            backdropFilter: `blur(${blurPx}px)`,
            WebkitBackdropFilter: `blur(${blurPx}px)`,
          }}
          aria-hidden
        />

        {/* 3 — Blur Trigger (tone/vignette support layer) */}
        <div
          className="pointer-events-none absolute inset-0 z-[3] bg-brand-navy"
          style={{ opacity: 0.12 }}
          aria-hidden
        />

        {/* 4 — FloatingParticles (subtle, low-opacity, non-interactive) */}
        <div className="pointer-events-none absolute inset-0 z-[4]" aria-hidden>
          {HERO_PARTICLES.map((particle, index) => (
            <span
              // Deterministic decorative particle list.
              key={`${particle.left}-${particle.top}-${index}`}
              className="absolute rounded-full bg-brand-textWhite"
              style={{
                left: particle.left,
                top: particle.top,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
                filter: 'blur(0.8px)',
                transform: 'translate3d(0, 0, 0)',
                animation: `heroParticleFloat ${particle.duration}s ease-in-out ${particle.delay}s infinite alternate`,
                willChange: 'transform, opacity',
              }}
            />
          ))}
        </div>
      </div>

      {/* 5 — Top Text + Heading and Button */}
      <div
        className="relative z-[9] flex min-h-screen w-full flex-col items-center px-6 pb-10 pt-28 text-center hero:justify-center hero:pb-16"
      >
        <h1
          id="hero-heading"
          className="mb-0 text-center text-[clamp(80px,21vw,232px)] font-medium leading-[0.94] tracking-[-0.075em] text-brand-textWhite hero:mb-8 hero:text-[clamp(98px,16.5vw,260px)]"
        >
          <Link
            href="/listings?type=buy"
            className="text-brand-textWhite transition-colors duration-200 hover:text-brand-gold"
          >
            buy.
          </Link>{' '}
          <Link
            href="/listings?type=sell"
            className="text-brand-textWhite transition-colors duration-200 hover:text-brand-gold"
          >
            sell.
          </Link>{' '}
          <Link
            href="/listings?type=rent"
            className="text-brand-textWhite transition-colors duration-200 hover:text-brand-gold"
          >
            rent.
          </Link>
        </h1>
        <div className="h-[24vh] hero:hidden" aria-hidden />

        <p
          id="hero-tagline"
          className="mx-auto mb-8 max-w-[820px] text-center text-[clamp(28px,8.4vw,40px)] font-medium leading-[1.08] tracking-[-0.03em] text-brand-textWhite hero:mb-10 hero:text-[40px]"
        >
          <span className="block w-full text-center">The Smartest Way to</span>
          <span className="mt-2 inline-flex flex-wrap items-center justify-center gap-x-[0.35em] gap-y-2">
            <HeroChip>Rent,</HeroChip>
            <HeroChip>Buy</HeroChip>
            <span className="text-brand-textWhite">and</span>
            <HeroChip>Invest</HeroChip>
            <span className="text-brand-textWhite">in</span>
            <HeroChip>Properties</HeroChip>
            <span className="text-brand-textWhite">in</span>
            <HeroChip>Nigeria</HeroChip>
          </span>
        </p>

        <Link
          href="/listings"
          className="btn-cta-strong inline-flex items-center gap-2 rounded-lg bg-brand-textWhite px-8 py-3.5 text-brand-textBlack transition-colors duration-200 hover:bg-brand-light1"
        >
          VIEW PROPERTIES
          <span className="text-para-m leading-none">›</span>
        </Link>
      </div>

      {/* 6 — Pattern (grid) */}
      <div
        className="pointer-events-none absolute inset-0 z-[7] opacity-[0.2]"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,248,237,0.58) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,248,237,0.58) 1px, transparent 1px)',
          backgroundSize: '96px 96px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.75) 42%, rgba(0,0,0,1) 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.75) 42%, rgba(0,0,0,1) 100%)',
        }}
      />

      {/* 7 — Blur (lower/general near bottom over grid region) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[8] h-[44vh]"
        aria-hidden
        style={{
          backdropFilter: 'blur(9px)',
          WebkitBackdropFilter: 'blur(9px)',
          background:
            'linear-gradient(to top, rgba(9, 17, 34, 0.5) 0%, rgba(9, 17, 34, 0.24) 45%, rgba(9, 17, 34, 0) 100%)',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0.65) 48%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage:
            'linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0.65) 48%, rgba(0,0,0,0) 100%)',
        }}
      />

      <style jsx>{`
        @keyframes heroParticleFloat {
          0% {
            transform: translate3d(0, 0, 0);
            opacity: 0.08;
          }
          100% {
            transform: translate3d(0, -14px, 0);
            opacity: 0.16;
          }
        }
      `}</style>
    </section>
  )
}
