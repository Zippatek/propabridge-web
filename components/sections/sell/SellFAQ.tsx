'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { cn } from '@/lib/cn'

const FAQ_ITEMS = [
  {
    id: 'sell-faq-1',
    question: 'How do you determine my property\'s value?',
    answer:
      'A licensed Estate Surveyor from our team assesses your property using recent sales data, location analysis, and a physical inspection. You get a real number, not a guess.',
  },
  {
    id: 'sell-faq-2',
    question: 'Do I pay anything upfront?',
    answer:
      'Nothing. We only earn a standard agency fee when your property successfully sells or lets. Zero upfront costs.',
  },
  {
    id: 'sell-faq-3',
    question: 'Will I be dealing with random agents?',
    answer:
      'No. You deal with Propabridge as a single team. We manage all buyer inquiries, viewings, and negotiations on your behalf.',
  },
  {
    id: 'sell-faq-4',
    question: 'How long does it take to sell?',
    answer:
      'Depends on pricing and property type, but our pre-qualified buyer pool means serious inquiries start within days of listing — not weeks.',
  },
  {
    id: 'sell-faq-5',
    question: 'What areas do you cover?',
    answer:
      'Currently Abuja, Kaduna, and Minna — with more cities coming.',
  },
  {
    id: 'sell-faq-6',
    question: 'How much commission do you charge?',
    answer:
      "Our commission is competitive and transparent, with no hidden fees. You'll know exactly what's included — from professional marketing to closing support — so you can make decisions with full clarity.",
  },
  {
    id: 'sell-faq-7',
    question: 'Can you help me get a mortgage or loan?',
    answer:
      "Yes! We work with a network of verified lenders and mortgage brokers. While we don't give out loans ourselves, we connect you with the right people, explain your financing options, and help you understand the paperwork. Think of us as your bridge between lenders and your dream home.",
  },
  {
    id: 'sell-faq-8',
    question: 'Can I sell my home while living in it?',
    answer:
      "Yes, absolutely! Many of our clients do. We'll schedule showings that fit your routine and help you prepare your home without disrupting daily life. You'll have full control over how and when buyers visit.",
  },
]

export default function SellFAQ() {
  const [openId, setOpenId] = useState<string | null>(null)
  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <section className="bg-beige section-pt section-pb" aria-labelledby="sell-faq-heading">

      {/* ── DIVIDER ── */}
      <hr className="border-t border-grey-light mx-6 mb-16" aria-hidden="true" />

      <div className="container-site">

        {/* ── Badge ── */}
        <div className="flex items-center gap-2 mb-10">
          <span className="inline-block w-2.5 h-2.5 rounded-sm bg-navy shrink-0" aria-hidden="true" />
          <p className="text-[11px] font-bold text-navy uppercase tracking-[0.1em]">FAQs</p>
        </div>

        {/* ── Two-column: sticky heading left + accordion right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* LEFT: Sticky heading */}
          <div>
            <h2
              id="sell-faq-heading"
              className="text-display-md text-navy font-medium lg:sticky lg:top-28"
            >
              Everything you wanted to ask (but didn&apos;t know who to)
            </h2>
          </div>

          {/* RIGHT: Accordion */}
          <div>
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openId === item.id
              return (
                <div
                  key={item.id}
                  className={cn(
                    'border-b border-grey-light py-5',
                    index === 0 && 'border-t'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    className="w-full flex items-center gap-5 text-left group focus-visible:outline-none"
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-answer`}
                    id={`${item.id}-btn`}
                  >
                    {/* Circle + icon */}
                    <div className="shrink-0 w-[40px] h-[40px] rounded-full border border-grey-light flex items-center justify-center text-navy group-hover:border-navy transition-colors">
                      {isOpen ? (
                        <X size={14} />
                      ) : (
                        <Plus size={14} />
                      )}
                    </div>
                    <span className="text-navy font-semibold text-[17px] leading-[1.35]">
                      {item.question}
                    </span>
                  </button>

                  {/* Answer */}
                  <div
                    id={`${item.id}-answer`}
                    role="region"
                    aria-labelledby={`${item.id}-btn`}
                    className={cn(
                      'overflow-hidden transition-all duration-300 ease-in-out',
                      isOpen ? 'max-h-[300px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                    )}
                  >
                    <p className="text-grey text-[15px] leading-[1.7] pb-2 pl-[60px]">
                      {item.answer}
                    </p>
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
