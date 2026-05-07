'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, X, ArrowRight } from 'lucide-react'

/* ── Service data — content from reference ─────────────────────────── */
const SERVICES = [
  {
    id: 'buy',
    title: 'Buy a Verified Property',
    description:
      "Stop scrolling through listings you can't trust. Every property on Propabridge has been physically inspected by our team. You search with confidence because we've already done the verification.",
    features: [
      'Conversational search — tell Propa exactly what you need',
      'Verified listings only — no fake photos, no ghost properties',
      'Viewing coordination — we arrange every tour with our representative',
      'Zero inspection fees — you never pay to view. Ever.',
    ],
    cta: 'EXPLORE PROPERTIES',
    href: '/listings',
  },
  {
    id: 'sell',
    title: "Sell Your Property for What It's Worth",
    description:
      "Most sellers in Nigeria never know the real value of their property. We fix that first. Free valuation. Professional marketing. Qualified buyers only.",
    features: [
      'Data-backed free property valuation before you commit',
      'Professional photography and verified listing creation',
      'AI-powered lead qualification — only serious buyers reach you',
      'Expert negotiation and closing coordination from our team',
    ],
    cta: 'GET A FREE VALUATION',
    href: '/sell',
  },
  {
    id: 'submit',
    title: 'Submit Your Property — Let Us Handle the Rest',
    description:
      'For landlords, developers, and verified agencies: you submit. We verify, we list, we market. Your phone stays quiet until a serious buyer is ready to sign.',
    features: [
      'Physical inspection and title document verification by our team',
      'Listed under the Propabridge brand — maximum reach, maximum trust',
      'We manage every viewing and inquiry on your behalf',
      'No open-agent chaos — you deal with one professional team',
    ],
    cta: 'EXPLORE PROPERTIES',
    href: '/listings',
  },
  {
    id: 'rent',
    title: 'Put Your Property to Work',
    description:
      "Owning a property in Abuja, Kaduna, or Minna that isn't earning? We find you verified, screened tenants — and handle the administrative work so you don't have to.",
    features: [
      'Tenant screening and identity verification before introductions',
      'Lease documentation and signing coordination',
      'Viewing management — we show the property, you collect rent',
      'Renewal reminders and ongoing landlord support',
    ],
    cta: 'SUBMIT PROPERTIES',
    href: '/submit-property',
  },
]

export default function ServicesSection() {
  // First item open by default (matches reference)
  const [openId, setOpenId] = useState<string>('')

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? '' : id))

  return (
    <section className="bg-beige" aria-labelledby="services-heading">

      {/* ── DIVIDER — separates from LocationSection above ── */}
      <hr className="border-t border-grey-light mx-6" aria-hidden="true" />

      {/* ── HEADER — both label + heading centered ── */}
      <div className="container-site section-pt pb-10 text-center">
        {/* Label — square indicator, centered */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="inline-block w-2.5 h-2.5 rounded-sm bg-navy shrink-0" aria-hidden="true" />
          <p className="text-[12px] font-semibold text-navy uppercase tracking-[0.08em]">
            SERVICES
          </p>
        </div>

        {/* Heading — large, centered */}
        <h2
          id="services-heading"
          className="text-display-lg font-medium text-heading"
        >
          Everything You Need. Under One Roof.
        </h2>
      </div>

      {/* ── ACCORDION CARD — single white container, max-width centered ── */}
      <div className="container-site section-pb">
        <div
          className="mx-auto bg-beige rounded-[20px] overflow-hidden"
          style={{
            maxWidth: 820,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.06)',
          }}
        >
          {SERVICES.map((service, index) => {
            const isOpen = openId === service.id
            const isLast = index === SERVICES.length - 1

            return (
              <div key={service.id}>
                {/* ── ITEM ── */}
                <div className="px-8 py-7">

                  {/* Entire header + description area is the clickable toggle */}
                  <button
                    onClick={() => toggle(service.id)}
                    className="w-full text-left cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={`service-panel-${service.id}`}
                  >
                    {/* Title row */}
                    <div className="flex items-center gap-5">
                      {/* Circle toggle icon */}
                      <span
                        className="flex items-center justify-center w-10 h-10 rounded-full border border-[#c8c8c0] shrink-0 transition-colors duration-200 group-hover:border-navy"
                        aria-hidden="true"
                      >
                        {isOpen
                          ? <X size={14} color="#001a40" />
                          : <Plus size={14} color="#001a40" />
                        }
                      </span>
                      <h3 className="text-navy font-bold text-[22px] leading-snug">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description — always visible, inside clickable area */}
                    <div className="pt-5 pl-[60px]">
                      <p className="text-grey text-[15px] leading-snug">
                        {service.description}
                      </p>
                    </div>
                  </button>

                  {/* ── EXPANDABLE CONTENT — feature list + CTA ── */}
                  <div
                    id={`service-panel-${service.id}`}
                    className="grid transition-all duration-300 ease-in-out"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                    aria-hidden={!isOpen}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-5 pl-[60px]">
                        {/* Feature list */}
                        <ul className="mb-8" role="list">
                          {service.features.map((feature, i) => (
                            <li
                              key={i}
                              className={`py-3 text-navy text-[15px] leading-snug ${
                                i < service.features.length - 1
                                  ? 'border-b border-grey-light/60'
                                  : ''
                              }`}
                            >
                              {feature}
                            </li>
                          ))}
                        </ul>

                        {/* CTA Button */}
                        <Link
                          href={service.href}
                          className="inline-flex items-center gap-2 bg-blue text-white font-semibold text-[13px] uppercase tracking-wider px-6 py-3 rounded-btn hover:bg-blue-hover transition-colors duration-200 mb-2"
                        >
                          {service.cta}
                          <ArrowRight size={13} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider between items (not after last) */}
                {!isLast && (
                  <hr className="border-t border-grey-light/70 mx-8" aria-hidden="true" />
                )}
              </div>
            )
          })}
        </div>
      </div>

    </section>
  )
}
