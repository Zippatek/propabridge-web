import {
  TreePine as Tree, GraduationCap, SquareArrowOutUpRight as ArrowSquareUpRight, Armchair, Bus, Flower2 as Flower,
  Package, Utensils as ForkKnife, Car, Home as House, CircleCheck as CheckCircle,
} from 'lucide-react';
import { Property } from '@/lib/types';
import { ReactNode } from 'react';

// ── Amenity pill icon map ──────────────────────────────────────────────────────
const AMENITY_ICON_MAP: Record<string, ReactNode> = {
  'Park':               <Tree size={18} />,
  'School/university':  <GraduationCap size={18} />,
  'Highway access':     <ArrowSquareUpRight size={18} />,
  'Terrace':            <Armchair size={18} />,
  'Near bus stop':      <Bus size={18} />,
  'Garden':             <Flower size={18} />,
  'Walk-in closet':     <Package size={18} />,
  'Fitted Kitchen':     <ForkKnife size={18} />,
  'Parking':            <Car size={18} />,
  'Balcony':            <House size={18} />,
};
const DEFAULT_ICON = <CheckCircle size={18} />;

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString('en-NG')}`;
}

interface Props { property: Property }

export function PropertyDetails({ property }: Props) {
  const {
    bodyParagraphs,
    amenityTags,
    features,
    pricingBreakdown,
    condition,
    water,
    beds,
    baths,
    floors,
    type,
    location,
    title,
  } = property;

  return (
    <div className="min-w-0">

      {/* ── AMENITIES PILLS ──────────────────────────────────────────────── */}
      {amenityTags && amenityTags.length > 0 && (
        <div className="mb-10">
          <h2
            className="text-[#001a40] font-bold mb-5"
            style={{ fontSize: 'clamp(22px, 2vw, 28px)' }}
          >
            Amenities
          </h2>
          <div className="flex flex-wrap gap-3">
            {amenityTags.map((tag) => (
              <div
                key={tag}
                className="inline-flex items-center gap-2 border border-[#cbd5e0] bg-white text-[#001a40] text-[14px] font-medium px-4 py-2 rounded-[8px] hover:border-[#001a40] transition-colors duration-200"
              >
                <span className="text-[#4a5568]">
                  {AMENITY_ICON_MAP[tag] ?? DEFAULT_ICON}
                </span>
                {tag}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── BODY PARAGRAPHS ──────────────────────────────────────────────── */}
      {bodyParagraphs && bodyParagraphs.length > 0 && (
        <div className="mb-10 space-y-4">
          {bodyParagraphs.map((para, i) => (
            <p
              key={i}
              className="text-[#001a40] leading-[1.7] text-[15px] font-medium"
            >
              {para}
            </p>
          ))}
        </div>
      )}

      {/* ── SPECS ────────────────────────────────────────────────────────── */}
      <div className="mb-8">
        <h3 className="text-[#001a40] font-bold text-[14px] uppercase tracking-[0.06em] mb-3">
          SPECS
        </h3>
        <ul className="space-y-2.5 list-disc list-inside text-[#001a40] text-[15px] font-medium">
          {beds !== undefined && <li>Bedrooms: {beds}</li>}
          {baths !== undefined && <li>Bathrooms: {baths} (all ensuite)</li>}
          <li>BQ: 1-room</li>
          <li>Study: Yes</li>
          {type && <li>Type: {type}</li>}
          {condition && <li>Condition: {condition}</li>}
          {floors !== undefined && <li>Floors: {floors}</li>}
          <li>Parking: Ample — on compound</li>
          {water && <li>Water: {water}</li>}
          {location && <li>Location: {location}</li>}
        </ul>
      </div>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      {pricingBreakdown && (
        <div className="mb-8">
          <h3 className="text-[#001a40] font-bold text-[14px] uppercase tracking-[0.06em] mb-3">
            PRICING
          </h3>
          <ul className="space-y-2.5 list-disc list-inside text-[#001a40] text-[15px] font-medium">
            {pricingBreakdown.netRent !== undefined && (
              <li>Net Rent: {formatNaira(pricingBreakdown.netRent)}</li>
            )}
            {pricingBreakdown.cautionFee !== undefined && (
              <li>Caution Fee: {formatNaira(pricingBreakdown.cautionFee)}</li>
            )}
            {pricingBreakdown.serviceCharge !== undefined && (
              <li>Service Charge: {formatNaira(pricingBreakdown.serviceCharge)}</li>
            )}
            {pricingBreakdown.agencyFeePercentage !== undefined && (
              <li>Agency Fee: {pricingBreakdown.agencyFeePercentage}% of net rent</li>
            )}
            {pricingBreakdown.legalFeePercentage !== undefined && (
              <li>Legal Fee: {pricingBreakdown.legalFeePercentage}% of net rent</li>
            )}
            {pricingBreakdown.totalFirstYearCost && (
              <li>Total First-Year Cost: {pricingBreakdown.totalFirstYearCost}</li>
            )}
          </ul>
        </div>
      )}

      {/* ── AMENITIES / FEATURES ─────────────────────────────────────────── */}
      {features && features.length > 0 && (
        <div className="mb-12">
          <h3 className="text-[#001a40] font-bold text-[14px] uppercase tracking-[0.06em] mb-3">
            AMENITIES / FEATURES
          </h3>
          <p className="text-[#001a40] text-[15px] leading-[1.8] font-medium">
            {features.map((f, i) => (
              <span key={i}>
                <span className="text-[#001a40] font-semibold">✓</span>{' '}
                {f}
                {i < features.length - 1 && ' '}
              </span>
            ))}
          </p>
        </div>
      )}

      {/* ── LOCATION MAP ─────────────────────────────────────────────────── */}
      <div className="mb-4">
        <div className="rounded-[10px] overflow-hidden border border-[#e2e8f0]" style={{ height: 280 }}>
          <iframe
            title="Property Location Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=7.4614%2C9.0372%2C7.5014%2C9.0572&layer=mapnik&marker=9.0472%2C7.4814"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(20%)' }}
            loading="lazy"
          />
        </div>
      </div>

    </div>
  );
}
