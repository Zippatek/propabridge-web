import Link from 'next/link'
import { CaretRight } from '@phosphor-icons/react/dist/ssr'

export default function SoldPropertiesCTA() {
  return (
    <section className="bg-beige section-pt section-pb" aria-labelledby="sold-properties-heading">

      {/* ── DIVIDER ── */}
      <hr className="border-t border-grey-light mx-6 mb-16" aria-hidden="true" />

      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          {/* Badge */}
          <div className="lg:col-span-3 flex items-start gap-2 pt-1">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-navy shrink-0 mt-1" aria-hidden="true" />
            <p className="text-[11px] font-bold text-navy uppercase tracking-[0.1em]">Sold Properties</p>
          </div>

          {/* Heading */}
          <h2
            id="sold-properties-heading"
            className="lg:col-span-9 text-navy font-bold leading-[1.1] tracking-[-0.02em] text-center lg:text-left"
            style={{ fontSize: 'clamp(32px, 4.5vw, 60px)' }}
          >
            The properties we&apos;ve sold,<br className="hidden sm:block" /> the dreams we&apos;ve delivered
          </h2>
        </div>

        {/* CTA Button — centered */}
        <div className="flex justify-center">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 bg-blue hover:bg-[#0052cc] text-white font-bold text-[14px] uppercase tracking-[0.1em] px-10 h-[58px] rounded-btn transition-colors duration-200 shadow-[0_4px_20px_rgba(0,106,255,0.3)]"
          >
            VIEW ALL PROPERTIES
            <CaretRight size={16} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  )
}
