import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

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
            className="lg:col-span-9 text-display-lg font-medium text-heading text-center lg:text-left"
          >
            The properties we&apos;ve sold,<br className="hidden sm:block" /> the dreams we&apos;ve delivered
          </h2>
        </div>

        {/* CTA Button — centered */}
        <div className="flex justify-center">
          <Link
            href="/listings"
            className="btn-cream-pill"
          >
            VIEW ALL PROPERTIES
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
