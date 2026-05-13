import Link from 'next/link';
import { fetchListings } from '@/lib/api';
import { Property } from '@/lib/types';
import PropertyCard from '@/components/property/PropertyCard';

interface Props {
  property: Property;
}

export async function RelatedPropertiesCTA({ property }: Props) {
  // Score candidates: same city = 3pts, same type = 2pts, similar price = 1pt
  let related: Property[] = [];
  try {
    const candidates = await fetchListings({ status: property.status, limit: 12 });
    const scoreFn = (p: Property) => {
      if (p.id === property.id || p.slug === property.slug) return -1;
      let score = 0;
      if (p.city && property.city && p.city === property.city) score += 3;
      if (p.type === property.type) score += 2;
      if (property.price && p.price) {
        const ratio = p.price / property.price;
        if (ratio >= 0.6 && ratio <= 1.6) score += 1;
      }
      return score;
    };
    related = candidates
      .map((p) => ({ p, score: scoreFn(p) }))
      .filter(({ score }) => score >= 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ p }) => p);
  } catch {
    // silently degrade — show fallback CTA
  }

  return (
    <section className="container-site pt-16 pb-20">
      <hr className="border-t border-[#cbd5e0] mb-14" />

      {/* Section header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-[10px] h-[10px] rounded-[2px] bg-[#001a40] inline-block" />
          <span className="text-[#001a40] text-[11px] font-bold uppercase tracking-[0.1em]">
            RELATED PROPERTIES
          </span>
        </div>
        <h2
          className="text-heading font-medium"
          style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', letterSpacing: '-0.025em', lineHeight: 1.08 }}
        >
          If this one caught your eye,<br />
          these might just seal the deal.
        </h2>
      </div>

      {/* Use existing PropertyCard — same card as the main listings page */}
      {related.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <Link href="/listings" className="btn-cream-pill">
            VIEW ALL PROPERTIES <span aria-hidden="true">›</span>
          </Link>
        </div>
      )}
    </section>
  );
}
