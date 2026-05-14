'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/cn'

const STEPS = [
  {
    id: 1,
    title: 'Smart Valuation',
    description:
      "We start by evaluating your property's true market value using local insights and professional analysis.",
    quote: '"Know exactly what your home is worth before you list."',
  },
  {
    id: 2,
    title: 'Verification & Listing',
    description:
      'We physically inspect your property, verify title documents, and create a professional listing optimized for serious buyers.',
    quote: '"Your listing goes live only after our team confirms every detail."',
  },
  {
    id: 3,
    title: 'Screened Viewings',
    description:
      'We pre-qualify every interested buyer before they visit. No time-wasters, no tyre-kickers — only serious, verified prospects.',
    quote: '"You only show your home to people who can actually buy it."',
  },
  {
    id: 4,
    title: 'Offers & Negotiations',
    description:
      'We handle all offer communications and negotiate on your behalf to secure the best price and terms for you.',
    quote: '"We fight for your number — so you don\'t have to."',
  },
  {
    id: 5,
    title: 'Secure Closing',
    description:
      'From legal documentation to final transfer, we coordinate every step of the closing process for a smooth, safe handover.',
    quote: '"Your sale completes — completely stress-free."',
  },
]

export default function SellingProcess() {
  const [openStep, setOpenStep] = useState<number>(1)

  return (
    <section className="bg-beige section-pt section-pb" aria-labelledby="selling-process-heading">

      {/* ── DIVIDER ── */}
      <hr className="border-t border-grey-light mx-6 mb-16" aria-hidden="true" />

      <div className="container-site">

        {/* ── Full-width heading ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 mb-12 lg:mb-16 gap-6">
          <div className="lg:col-span-3 flex items-start gap-2 pt-1">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-navy shrink-0 mt-1" aria-hidden="true" />
            <p className="text-[11px] font-bold text-navy uppercase tracking-[0.1em]">Selling Process</p>
          </div>
          <h2
            id="selling-process-heading"
            className="lg:col-span-9 text-navy font-medium leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
          >
            We make the selling process simple, friendly, and easy to follow — just how it should be.
          </h2>
        </div>

        {/* ── Two-column: image left + steps right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* LEFT: Image */}
          <div className="relative rounded-[20px] overflow-hidden aspect-[4/5] lg:aspect-[3/4]">
            <Image
              src="/images/sell/sell-selling-process.png"
              alt="Abstract data visualization representing a clear, guided selling journey"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001a40]/50 to-transparent" />
          </div>

          {/* RIGHT: Step accordion */}
          <div className="flex flex-col pt-2">
            {STEPS.map((step, index) => {
              const isOpen = openStep === step.id
              return (
                <div
                  key={step.id}
                  className={cn(
                    'border-b border-grey-light/70 py-5',
                    index === 0 && 'border-t'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenStep(isOpen ? 0 : step.id)}
                    className="w-full flex items-center gap-4 text-left group focus-visible:outline-none"
                    aria-expanded={isOpen}
                    aria-controls={`step-${step.id}-content`}
                  >
                    {/* Navy number badge */}
                    <div
                      className={cn(
                        'shrink-0 w-[32px] h-[32px] rounded-[8px] flex items-center justify-center text-[13px] font-bold transition-colors duration-200',
                        isOpen ? 'bg-navy text-white' : 'bg-navy/10 text-navy group-hover:bg-navy/20'
                      )}
                    >
                      {step.id}
                    </div>
                    <span
                      className={cn(
                        'text-[17px] font-semibold leading-snug transition-colors duration-200',
                        isOpen ? 'text-navy' : 'text-navy/70 group-hover:text-navy'
                      )}
                    >
                      {step.title}
                    </span>
                  </button>

                  {/* Expanded content */}
                  <div
                    id={`step-${step.id}-content`}
                    className={cn(
                      'overflow-hidden transition-all duration-300 ease-in-out pl-[48px]',
                      isOpen ? 'max-h-[200px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                    )}
                  >
                    <p className="text-grey text-[15px] leading-[1.65] mb-4">
                      {step.description}
                    </p>
                    <blockquote className="border-l-[3px] border-navy/30 pl-4">
                      <p className="text-navy/60 text-[14px] italic leading-[1.5]">
                        {step.quote}
                      </p>
                    </blockquote>
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
