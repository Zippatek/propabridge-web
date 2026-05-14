'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

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
    <span
      style={{
        background: 'rgba(255, 248, 237, 0.16)',
        borderRadius: '6px',
        padding: '0 0.18em',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      {children}
    </span>
  )
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)
  // Door-open scale only — NO translateY so the image always covers the full section
  const [imageScale, setImageScale] = useState(1.1)
  // Blur overlay (separate from the image layer — not affected by scale/translate)
  const [blurPx, setBlurPx] = useState(0)

  // Door open on mount
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setMounted(true)
      setImageScale(1.0)
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  // Door close + blur as hero scrolls away
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight || 1

      const scrolledPast = Math.max(-rect.top, 0)
      const scrollRatio = Math.min(scrolledPast / (rect.height || 1), 1)

      // Door close: re-zoom 1.0 → 1.06 as hero scrolls off screen
      setImageScale(1.0 + scrollRatio * 0.06)

      // Blur: fades in as hero leaves viewport
      const progress = Math.min(Math.max((vh - rect.top) / (rect.height + vh), 0), 1)
      const nextBlur = window.innerWidth < 768
        ? Math.max(0, 5 - progress * 5)
        : Math.max(0, 7 - progress * 7)
      setBlurPx(nextBlur)
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
      // 99vh height, matching property hero
      style={{ height: '99vh', minHeight: '100vh', marginTop: '-84px' }}
      aria-labelledby="hero-heading"
    >
      {/* ── Image layer: scale only — no translateY so image always fills the section ── */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden
        style={{
          opacity: mounted ? 1 : 0,
          transform: `scale(${imageScale})`,
          transformOrigin: 'center center',
          // Mount: slow 900ms door-open. Scroll: 350ms ease-out so scrolling back to top is smooth.
          transition: mounted
            ? 'transform 350ms ease-out'
            : 'opacity 900ms ease, transform 900ms ease',
          willChange: 'transform, opacity',
        }}
      >
        <div className="absolute inset-0 bg-brand-navy" />
        <div className="absolute inset-0 z-[1]">
          <Image
            src="/images/hero/buy-sell-rent.png"
            alt="Nigerian residential property"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.82]"
          />
        </div>
        {/* Vignette tint */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-brand-navy" style={{ opacity: 0.12 }} />
      </div>

      {/* ── Blur overlay: separate from scale layer so it never exposes gaps ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        aria-hidden
        style={{
          backdropFilter: `blur(${blurPx}px)`,
          WebkitBackdropFilter: `blur(${blurPx}px)`,
        }}
      />

      {/* ── Floating particles ── */}
      <div className="pointer-events-none absolute inset-0 z-[4]" aria-hidden>
        {HERO_PARTICLES.map((p, i) => (
          <span
            key={`${p.left}-${p.top}-${i}`}
            className="absolute rounded-full bg-brand-textWhite"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              filter: 'blur(0.8px)',
              animation: `heroParticleFloat ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      {/* ── Grid pattern ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] opacity-[0.18]"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,248,237,0.58) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,248,237,0.58) 1px, transparent 1px)',
          backgroundSize: '96px 96px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 42%, rgba(0,0,0,1) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 42%, rgba(0,0,0,1) 100%)',
        }}
      />

      {/* ── Bottom blur / vignette ── */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-[44vh]"
        aria-hidden
        style={{
          backdropFilter: 'blur(9px)',
          WebkitBackdropFilter: 'blur(9px)',
          background: 'linear-gradient(to top, rgba(9,17,34,0.5) 0%, rgba(9,17,34,0.24) 45%, rgba(9,17,34,0) 100%)',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0.65) 48%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0.65) 48%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* ── Hero text content ── */}
      <div className="relative z-[9] flex min-h-screen w-full flex-col items-center px-6 pb-10 pt-28 text-center hero:justify-center hero:pb-16">
        <h1
          id="hero-heading"
          className="mb-0 text-center text-[clamp(80px,21vw,232px)] font-medium leading-[0.94] tracking-[-0.075em] text-brand-textWhite hero:mb-8 hero:text-[clamp(98px,16.5vw,260px)]"
        >
          <Link href="/listings?type=buy" className="text-brand-textWhite transition-colors duration-200 hover:text-brand-gold">
            buy.
          </Link>{' '}
          <Link href="/listings?type=sell" className="text-brand-textWhite transition-colors duration-200 hover:text-brand-gold">
            sell.
          </Link>{' '}
          <Link href="/listings?type=rent" className="text-brand-textWhite transition-colors duration-200 hover:text-brand-gold">
            rent.
          </Link>
        </h1>
        <div className="h-[30vh] hero:hidden" aria-hidden />

        {/* Subtitle */}
        <p className="mx-auto mb-10 max-w-[820px] text-center text-[clamp(28px,8.4vw,40px)] font-medium leading-[1.08] tracking-[-0.03em] text-brand-textWhite hero:mb-12 hero:text-[40px]">
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

        {/* CTA button — reverted to original cream styling */}
        <Link
          href="/listings"
          className="btn-cta-strong inline-flex items-center gap-2 rounded-[8px] bg-brand-textWhite px-8 py-3.5 text-brand-textBlack transition-colors duration-200 hover:bg-brand-light1"
        >
          VIEW PROPERTIES
          <span className="text-para-m leading-none">›</span>
        </Link>
      </div>

      <style jsx>{`
        @keyframes heroParticleFloat {
          0% { transform: translate3d(0, 0, 0); opacity: 0.08; }
          100% { transform: translate3d(0, -14px, 0); opacity: 0.16; }
        }
      `}</style>
    </section>
  )
}
