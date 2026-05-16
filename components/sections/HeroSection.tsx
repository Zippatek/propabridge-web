'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const HERO_PARTICLES = [
  { left: '8%',  top: '18%', size: 6, opacity: 0.14, duration: 9.5,  delay: 0 },
  { left: '18%', top: '36%', size: 8, opacity: 0.12, duration: 11,   delay: 1.8 },
  { left: '27%', top: '62%', size: 5, opacity: 0.1,  duration: 10.2, delay: 0.6 },
  { left: '39%', top: '24%', size: 7, opacity: 0.13, duration: 12.4, delay: 2.2 },
  { left: '47%', top: '52%', size: 6, opacity: 0.11, duration: 9.8,  delay: 1.2 },
  { left: '56%', top: '34%', size: 9, opacity: 0.12, duration: 12.1, delay: 0.4 },
  { left: '64%', top: '68%', size: 5, opacity: 0.1,  duration: 10.6, delay: 2.6 },
  { left: '72%', top: '26%', size: 7, opacity: 0.12, duration: 11.3, delay: 0.9 },
  { left: '79%', top: '49%', size: 6, opacity: 0.11, duration: 9.9,  delay: 1.5 },
  { left: '86%', top: '73%', size: 8, opacity: 0.1,  duration: 12.7, delay: 2.9 },
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

  // Door panels: false = closed (covering image), true = open (panels slid away)
  const [doorsOpen, setDoorsOpen] = useState(false)
  // Image reveals slightly after doors start opening
  const [imageVisible, setImageVisible] = useState(false)
  // Subtle scale: image starts zoomed in and pulls back as doors open
  const [imageScale, setImageScale] = useState(1.28)
  // Blur: starts high on mount, clears quickly on scroll
  const [blurPx, setBlurPx] = useState(14)

  // ── Door open sequence on mount ──────────────────────────────────────
  useEffect(() => {
    // Small initial paint delay so browser has rendered the closed doors
    const t1 = setTimeout(() => setDoorsOpen(true), 80)
    // Image fades in just after doors start moving
    const t2 = setTimeout(() => {
      setImageVisible(true)
      setImageScale(1.0)
    }, 160)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // ── Scroll: image zooms out (doors opening wider) + blur clears ─────
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight || 1
      // How far the user has scrolled INTO the hero (0 = top, 1 = hero fully scrolled past)
      const scrolledPast = Math.max(-rect.top, 0)
      const scrollRatio = Math.min(scrolledPast / (rect.height || 1), 1)

      // Door-open on scroll: image pulls back (zooms out) as you scroll down
      // 1.0 at top → 0.94 at bottom — feels like walking through an opening door
      setImageScale(Math.max(1.0 - scrollRatio * 0.06, 0.94))

      // Blur clears fast: fully gone after just 25% of the hero height scrolled
      const progress = Math.min(Math.max(-rect.top / (vh * 0.25), 0), 1)
      setBlurPx(Math.max(0, 14 - progress * 14))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Easing curve for the door panels — slow start, fast middle, soft settle
  const doorEase = 'cubic-bezier(0.76, 0, 0.24, 1)'
  const doorDuration = '1.1s'

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-brand-navy"
      style={{ height: '105vh', minHeight: '105vh', marginTop: '-84px' }}
      aria-labelledby="hero-heading"
    >
      {/* ── Image layer: pulls back as doors open ── */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden
        style={{
          opacity: imageVisible ? 1 : 0,
          transform: `scale(${imageScale})`,
          transformOrigin: 'center center',
          transition: imageVisible
            ? 'transform 350ms ease-out'
            : `opacity 0.6s ease, transform 1.4s ${doorEase}`,
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
        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-brand-navy" style={{ opacity: 0.12 }} />
      </div>

      {/* ── Blur overlay (scroll-driven, outside scale layer) ── */}
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
              left: p.left, top: p.top,
              width: `${p.size}px`, height: `${p.size}px`,
              opacity: p.opacity, filter: 'blur(0.8px)',
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

      {/* ══ DOOR PANELS — slide apart from the centre on mount ══════════ */}
      {/* Left door — slides out to the left */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[20] w-1/2 bg-brand-navy"
        aria-hidden
        style={{
          transform: doorsOpen ? 'translateX(-100%)' : 'translateX(0)',
          transition: `transform ${doorDuration} ${doorEase}`,
          willChange: 'transform',
          // Thin seam line on the right edge of the left door
          boxShadow: 'inset -1px 0 0 rgba(255,248,237,0.08)',
        }}
      />
      {/* Right door — slides out to the right */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[20] w-1/2 bg-brand-navy"
        aria-hidden
        style={{
          transform: doorsOpen ? 'translateX(100%)' : 'translateX(0)',
          transition: `transform ${doorDuration} ${doorEase}`,
          willChange: 'transform',
          // Thin seam line on the left edge of the right door
          boxShadow: 'inset 1px 0 0 rgba(255,248,237,0.08)',
        }}
      />

      {/* ── Hero text content ── */}
      {/* z-[25]: above door panels (z-[20]) so h1 is the LCP element and visible immediately */}
      <div className="relative z-[25] flex min-h-screen w-full flex-col items-center px-6 pb-10 pt-28 text-center hero:justify-center hero:pb-16">
        <h1
          id="hero-heading"
          className="mb-0 w-full text-center font-bold leading-[0.92] text-brand-textWhite hero:mb-8"
          style={{
            fontFamily: 'var(--font-hero, var(--font-inter))',
            fontSize: 'clamp(52px, 14.5vw, 220px)',
            letterSpacing: '-0.04em',
            whiteSpace: 'nowrap',
          }}
        >
          <Link href="/listings?type=buy" className="text-brand-textWhite transition-colors duration-200 hover:text-brand-gold">buy.</Link>
          {' '}
          <Link href="/listings?type=sell" className="text-brand-textWhite transition-colors duration-200 hover:text-brand-gold">sell.</Link>
          {' '}
          <Link href="/listings?type=rent" className="text-brand-textWhite transition-colors duration-200 hover:text-brand-gold">rent.</Link>
        </h1>
        {/* Subtitle */}
        <p className="mx-auto mb-10 mt-6 max-w-[820px] text-center text-[clamp(28px,8.4vw,40px)] font-medium leading-[1.08] tracking-[-0.03em] text-brand-textWhite hero:mt-28 hero:mb-12 hero:text-[40px]">
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
          className="btn-cta-strong inline-flex items-center gap-2 rounded-[8px] bg-brand-textWhite px-8 py-3.5 text-brand-textBlack transition-colors duration-200 hover:bg-brand-light1"
        >
          VIEW PROPERTIES
          <span className="text-para-m leading-none">›</span>
        </Link>
      </div>

      <style jsx>{`
        @keyframes heroParticleFloat {
          0%   { transform: translate3d(0, 0, 0);     opacity: 0.08; }
          100% { transform: translate3d(0, -14px, 0); opacity: 0.16; }
        }
      `}</style>
    </section>
  )
}
