'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

function HeroChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-brand-textWhite/20 px-2 py-1 backdrop-blur-sm ring-1 ring-brand-textWhite/25">
      {children}
    </span>
  )
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const blurPx = useTransform(scrollYProgress, [0, 0.65], [24, 0])
  const backdropBlur = useMotionTemplate`blur(${blurPx}px)`
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.65], [0.18, 0.06])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-brand-navy"
      style={{ minHeight: '100vh', marginTop: '-84px' }}
      aria-labelledby="hero-heading"
    >
      {/* 0 — Background */}
      <div className="absolute inset-0 z-0 bg-brand-navy" aria-hidden />

      {/* 1 — Hero image (brightness baseline, scroll “speed” scale) */}
      <motion.div
        className="absolute inset-0 z-[1] origin-center will-change-transform"
        style={{ scale: imageScale }}
      >
        <Image
          src="/images/hero/buy-sell-rent.png"
          alt="Nigerian residential property"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.8]"
        />
      </motion.div>

      {/* 2 — Blur overlay (clears on scroll) */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[2] will-change-[backdrop-filter]"
        style={{
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur,
        }}
        aria-hidden
      />

      {/* 3 — Scroll region (section ref drives progress; spacer for layer parity) */}
      <div className="pointer-events-none absolute inset-0 z-[3]" aria-hidden />

      {/* 4 — Vignette / tone (not pure black) */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[4] bg-brand-navy"
        style={{ opacity: vignetteOpacity }}
        aria-hidden
      />

      {/* 5 — Grid / pattern (behind hero copy) */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] opacity-[0.08] mix-blend-overlay"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,248,237,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,248,237,0.45) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
        }}
      />

      {/* 6 — Hero copy: top line → tagline → CTA */}
      <div
        className="relative z-[6] flex min-h-screen w-full flex-col items-center justify-center px-6 text-center"
        style={{ paddingTop: 100 }}
      >
        <h1
          id="hero-heading"
          className="mb-8 text-center font-medium leading-[1.2] tracking-[-12px] text-brand-textWhite text-[clamp(52px,11vw,140px)]"
        >
          <Link href="/listings?type=buy" className="text-brand-gold transition-colors duration-200">
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

        <p
          id="hero-tagline"
          className="text-balance mx-auto mb-10 max-w-[820px] text-center font-medium leading-[1.1] tracking-[-0.02em] text-brand-textWhite text-[clamp(30px,3.8vw,40px)] hero:text-[40px]"
        >
          <span className="block">The Smartest Way to</span>
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

        <Link href="/listings" className="btn-cream-pill shadow-lg shadow-brand-navy/40">
          VIEW PROPERTIES
          <span className="text-para-m leading-none">&rsaquo;</span>
        </Link>
      </div>
    </section>
  )
}
