'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const blur = useTransform(scrollYProgress, [0, 0.7], [20, 0])
  const filter = useTransform(blur, (b) => `blur(${b}px)`)
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [0.35, 0.15])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100vh', marginTop: '-84px' }}
      aria-labelledby="hero-heading"
    >
      <motion.div
        className="absolute inset-0 will-change-[filter]"
        style={{ filter }}
      >
        <Image
          src="/images/hero/buy-sell-rent.png"
          alt="Nigerian residential property"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
        aria-hidden="true"
      />

      {/* Faint white grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center justify-center text-center w-full px-6"
        style={{ minHeight: '100vh', paddingTop: 100 }}
      >
        <h1
          id="hero-heading"
          className="mb-8 text-center font-medium leading-[0.95] tracking-[-0.04em] text-[#f0efeb] text-[clamp(64px,14vw,200px)]"
        >
          <Link
            href="/listings?type=buy"
            className="text-[#ffc870] hover:opacity-90 transition-opacity duration-200"
          >
            buy.
          </Link>{' '}
          <Link
            href="/listings?type=sell"
            className="text-[#f0efeb] hover:opacity-90 transition-opacity duration-200"
          >
            sell.
          </Link>{' '}
          <Link
            href="/listings?type=rent"
            className="text-[#f0efeb] hover:opacity-90 transition-opacity duration-200"
          >
            rent.
          </Link>
        </h1>

        <p className="mx-auto mb-10 max-w-[820px] text-center text-[clamp(20px,2.4vw,34px)] font-medium leading-[1.25] tracking-[-0.02em] text-[#f0efeb]">
          <span>The Smartest Way to</span>
          <br />
          <span className="inline-flex flex-wrap items-center justify-center gap-x-[0.35em] gap-y-2">
            <span className="rounded-sm bg-black/30 px-2 py-0.5 backdrop-blur-[2px]">
              Rent, Buy
            </span>
            <span>and</span>
            <span className="rounded-sm bg-black/30 px-2 py-0.5 backdrop-blur-[2px]">
              Invest
            </span>
            <span>in</span>
            <span className="rounded-sm bg-black/30 px-2 py-0.5 backdrop-blur-[2px]">
              Properties
            </span>
            <span>in</span>
            <span className="rounded-sm bg-black/30 px-2 py-0.5 backdrop-blur-[2px]">
              Nigeria
            </span>
          </span>
        </p>

        <Link href="/listings" className="btn-cream-pill shadow-lg shadow-black/20">
          VIEW PROPERTIES
          <span className="text-[18px] leading-none">&rsaquo;</span>
        </Link>
      </div>
    </section>
  )
}
