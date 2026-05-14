'use client'

import React from 'react'
import { XSquare, CheckSquare } from 'lucide-react'
import { HERO_IMAGES } from '@/lib/bucket'

/* ─────────────────────────────────────────────────────────────
   WHY CHOOSE US (COMPARISON SECTION)
   "We Removed Everything That Was Wrong."
───────────────────────────────────────────────────────────── */

const OLD_WAY_ITEMS = [
  <span key="1">You pay <span className="line-through opacity-70">₦10,000–₦25,000</span> just to view a house.</span>,
  'Generic listings, often outdated.',
  'Five agents calling. None of them listening.',
  'Listings with photos from a different continent.',
  'You ask a question. You wait three days.',
  'You never know if the landlord even owns the property.',
  'The agent disappears after you pay.',
]

const NEW_WAY_ITEMS = [
  'You pay nothing to search/view.',
  'Verified listings updated daily.',
  'One platform. Your single point of contact.',
  'Every listing physically inspected.',
  'Propa — our AI — replies in seconds.',
  'We sight the C of O and title docs before any listing goes live.',
  "We're with you from first chat to final key handover.",
]

export default function WhyChooseUs() {
  return (
    <section 
      className="relative bg-beige section-pt section-pb overflow-hidden" 
      aria-labelledby="choose-us-heading"
    >
      {/* Background Image (Full width overlay) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${HERO_IMAGES.aboutProblem}')` }}
        aria-hidden="true"
      />
      
      {/* Light gradient overlay to ensure text readability at the top and give a soft glass feel */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-beige/90 via-beige/30 to-beige/90" 
        aria-hidden="true" 
      />
      
      <div className="container-site relative z-10">
        {/* ── HEADER ── */}
        <div className="flex flex-col items-center mb-12 text-center">
          {/* Label */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm bg-navy shrink-0"
              aria-hidden="true"
            />
            <p className="text-[12px] font-semibold text-navy uppercase tracking-[0.08em]">
              WHY CHOOSE US
            </p>
          </div>
          
          {/* Main Title */}
          <h2
            id="choose-us-heading"
            className="text-display-lg font-medium text-heading whitespace-pre-line"
          >
            {'We Removed Everything\nThat Was Wrong.'}
          </h2>
        </div>

        {/* ── COMPARISON SPLIT CARD ── */}
        <div className="mx-auto max-w-[1040px] flex flex-col md:flex-row rounded-[24px] overflow-hidden">
          
          {/* Left Side: The Old Way (Glassmorphism / Light) */}
          <div className="flex-1 bg-[#FFFFF2] p-8 md:p-12 relative z-0 border-r border-navy/10">
            <h3 className="text-navy font-medium text-[24px] md:text-[28px] mb-8 leading-snug tracking-tight">
              The Old Way (Other Platforms)
            </h3>
            
            <ul className="flex flex-col">
              {OLD_WAY_ITEMS.map((item, i) => (
                <li key={i} className="flex flex-col">
                  <div className="flex items-start gap-4 py-4">
                    <XSquare
                      size={20}
                      className="text-navy shrink-0 mt-[1px] opacity-90"
                      aria-hidden="true"
                    />
                    <span className="text-[15px] font-medium text-navy/90 leading-[1.3] tracking-[-0.005em]">
                      {item}
                    </span>
                  </div>
                  {/* Subtle divider except after the last item */}
                  {i < OLD_WAY_ITEMS.length - 1 && (
                    <hr className="border-t border-navy/10 my-0.5" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: The Propabridge Way (Dark Navy) */}
          <div className="flex-1 bg-navy p-8 md:p-12 relative z-10">
            <h3 className="text-white font-medium text-[24px] md:text-[28px] mb-8 leading-snug tracking-tight flex items-center gap-2">
              The Propabridge Way <span className="font-light">✓</span>
            </h3>
            
            <ul className="flex flex-col">
              {NEW_WAY_ITEMS.map((item, i) => (
                <li key={i} className="flex flex-col">
                  <div className="flex items-start gap-4 py-4">
                    <CheckSquare
                      size={20}
                      className="text-white shrink-0 mt-[1px]"
                      aria-hidden="true"
                    />
                    <span className="text-[15px] font-medium text-white leading-[1.3] tracking-[-0.005em]">
                      {item}
                    </span>
                  </div>
                  {/* White subtle divider except after the last item */}
                  {i < NEW_WAY_ITEMS.length - 1 && (
                    <hr className="border-t border-white/10 my-0.5" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
