import Link from 'next/link';

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
        className="text-display-lg text-center text-heading font-sans font-medium mb-12"
      >
        If this one caught your eye,
        <br />
        these might just seal the deal.
      </h2>

      {/* CTA Button */}
      <div className="flex justify-center">
        <Link
          href="/listings"
          className="btn-cream-pill"
        >
          VIEW PROPERTIES
          <span aria-hidden="true">›</span>
        </Link>
      </div>
    </section>
  );
}
