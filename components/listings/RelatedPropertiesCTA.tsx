import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export function RelatedPropertiesCTA() {
  return (
    <section className="container-site pt-16 pb-20">
      {/* Top divider */}
      <hr className="border-t border-[#cbd5e0] mb-16" />

      {/* Section tag */}
      <div className="flex items-center gap-2 mb-6">
        <span className="w-[10px] h-[10px] rounded-[2px] bg-[#001a40] inline-block" />
        <span className="text-[#001a40] text-[12px] font-bold uppercase tracking-[0.1em]">
          RELATED PROPERTIES
        </span>
      </div>

      {/* Headline */}
      <h2
        className="text-center text-[#001a40] font-sans font-bold leading-[1.25] mb-12"
        style={{ fontSize: 'clamp(28px, 3.2vw, 44px)' }}
      >
        If this one caught your eye,
        <br />
        these might just seal the deal.
      </h2>

      {/* CTA Button */}
      <div className="flex justify-center">
        <Link
          href="/listings"
          className="inline-flex items-center gap-2 bg-[#006aff] hover:bg-[#0052cc] text-white font-semibold text-[14px] uppercase tracking-[0.05em] px-7 py-3.5 rounded-btn transition-all duration-200"
        >
          VIEW PROPERTIES
          <ArrowRight size={16} weight="bold" />
        </Link>
      </div>
    </section>
  );
}
