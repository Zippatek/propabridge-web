'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   PROCESS SECTION (HOW IT WORKS)
   "Chat. Choose. Move In." - Alternating Timeline Layout
───────────────────────────────────────────────────────────── */

const PROCESS_STEPS = [
  {
    id: '01',
    badge: 'STEP 01',
    title: 'Chat With Propa',
    desc: 'Tell our AI exactly what you need — neighborhood, budget, bedrooms, must-haves. In plain English. Hausa, Yoruba, Igbo Or Pidgin. She gets it.',
    image: '/images/process/step1.png',
  },
  {
    id: '02',
    badge: 'STEP 02',
    title: 'Browse & Book a Viewing',
    desc: 'We present the best verified matches. You pick your favorites. We confirm your viewing in seconds — with a Propabridge team representative, not a random stranger.',
    image: '/images/process/step2.png',
  },
  {
    id: '03',
    badge: 'STEP 03',
    title: 'Make Your Offer',
    desc: 'Love the place? We handle the negotiation with the property owner on your behalf. Your name, your terms, your best deal.',
    image: '/images/process/step3.png',
  },
  {
    id: '4', // Design specifically shows '4'
    badge: 'STEP 4',
    title: 'Sign. Pay. Move In.',
    desc: 'Documents verified. Payment processed securely through us. Keys collected. Welcome home — zero surprises, zero fears.',
    image: '/images/process/step4.png',
  },
]

export default function HowItWorks() {
  const timelineRef = useRef<HTMLDivElement>(null)

  // Track scroll progress through the timeline container
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  })

  return (
    <section className="bg-beige section-pt section-pb" aria-labelledby="process-heading">

      {/* ── TOP DIVIDER ── */}
      <hr className="border-t border-grey-light mx-6 mb-12" aria-hidden="true" />

      <div className="container-site">
        {/* ── HEADER ── */}
        <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-navy shrink-0" aria-hidden="true" />
            <p className="text-[12px] font-semibold text-navy uppercase tracking-[0.08em]">
              PROCESS
            </p>
          </div>
          <h2
            id="process-heading"
            className="text-display-lg font-medium text-heading"
          >
            Chat. Choose. Move In.
          </h2>
        </div>

        {/* ── TIMELINE CONTAINER ── */}
        <div ref={timelineRef} className="relative max-w-[1040px] mx-auto pb-4 pt-10">

          {/* Vertical Line Track (Desktop) - faint background line, constrained between 1st and 4th badges */}
          <div 
            className="absolute left-1/2 top-[190px] bottom-[190px] w-[2px] bg-navy/15 -translate-x-1/2 z-0 hidden md:block" 
            aria-hidden="true" 
          />

          {/* Vertical Line Progress (Desktop) - animated active line */}
          <motion.div
            className="absolute left-1/2 top-[190px] bottom-[190px] w-[2px] bg-navy -translate-x-1/2 z-10 hidden md:block origin-top"
            style={{ scaleY: scrollYProgress }}
            aria-hidden="true"
          />

          {/* Vertical Line Track (Mobile) */}
          <div 
            className="absolute left-6 top-[150px] bottom-[150px] w-[2px] bg-navy/15 z-0 md:hidden" 
            aria-hidden="true" 
          />

          {/* Vertical Line Progress (Mobile) */}
          <motion.div
            className="absolute left-6 top-[150px] bottom-[150px] w-[2px] bg-navy z-10 md:hidden origin-top"
            style={{ scaleY: scrollYProgress }}
            aria-hidden="true"
          />

          {/* ── STEPS LIST ── */}
          <div className="flex flex-col gap-12 md:gap-24 relative z-20 w-full">
            {PROCESS_STEPS.map((step, index) => {
              const textOnLeft = index % 2 !== 0 // Step 2 (index 1) and Step 4 (index 3)

              return (
                <div key={step.id} className="relative flex flex-col md:flex-row items-center w-full min-h-[300px]">

                  {/* Center Badge (Desktop - absolute middle) */}
                  <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-navy text-white text-[15px] font-medium w-[54px] h-[54px] rounded-[14px] flex items-center justify-center z-30 shadow-[0_4px_10px_rgba(0,0,0,0.1)] hidden md:flex">
                    {step.id}
                  </div>

                  {/* Center Badge (Mobile - attached to top-left of step) */}
                  <div className="absolute left-6 top-1/2 md:hidden -translate-y-1/2 -translate-x-1/2 bg-navy text-white text-[14px] font-medium w-10 h-10 rounded-[12px] flex items-center justify-center z-30 shadow-md">
                    {step.id}
                  </div>

                  {/* ── IMAGE BLOCK ── */}
                  <div className={`w-full md:w-1/2 flex items-center pl-16 pr-4 mb-10 md:mb-0 md:px-0 relative z-20
                    ${textOnLeft ? 'md:order-2 md:pl-12 lg:pl-16 md:justify-end' : 'md:order-1 md:pr-12 lg:pr-16 md:justify-start'}
                  `}>
                    {/* Fixed aspect ratio and max-width ensures proper height relation to text card */}
                    <div className="relative w-full max-w-[480px] overflow-hidden rounded-[24px] aspect-[4/3] md:aspect-[5/3] border-[6px] border-white shadow-md bg-white">
                      <Image src={step.image} alt={step.title} fill className="object-cover" />
                    </div>
                  </div>

                  {/* ── TEXT CARD BLOCK ── */}
                  <div className={`w-full md:w-1/2 flex items-center pl-16 pr-4 md:px-0 relative z-20
                    ${textOnLeft ? 'md:order-1 md:pr-12 lg:pr-16 md:justify-end' : 'md:order-2 md:pl-12 lg:pl-16 md:justify-start'}
                  `}>
                    {/* The text card base: sizes naturally without stretching to full height */}
                    <div className="bg-[#fbfcfa] w-full max-w-[420px] p-8 md:p-10 rounded-[24px] relative shadow-sm self-center flex flex-col justify-center border border-[#ecece0]/50">

                      {/* Step Label: Unified Top-Right Rule for all cards */}
                      <div className="absolute top-0 right-0 bg-navy text-white text-[11px] font-bold px-4 py-2 rounded-tr-[24px] rounded-bl-[16px] uppercase tracking-wider">
                        {step.badge}
                      </div>

                      <h3 className={`text-navy font-medium text-[22px] md:text-[24px] mb-3 mt-4 leading-[1.25]
                        ${textOnLeft ? 'md:text-right text-left' : 'text-left'}
                      `}>
                        {step.title}
                      </h3>

                      <p className={`text-grey text-[15px] leading-[1.65] tracking-tight 
                        ${textOnLeft ? 'md:text-right text-left' : 'text-left'}
                      `}>
                        {step.desc}
                      </p>

                    </div>
                  </div>

                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
