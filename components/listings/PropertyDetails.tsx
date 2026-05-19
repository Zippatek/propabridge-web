import { PropertyMarkdown } from '@/components/listings/PropertyMarkdown';
import { amenityIconForLabel, normalizeAmenityLabel } from '@/lib/amenity-icons';
import { Property } from '@/lib/types';

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString('en-NG')}`;
}

interface Props { property: Property }

export function PropertyDetails({ property }: Props) {
  const {
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
    fullDescription,
    overviewMarkdown,
    descriptionMarkdown,
    specsMarkdown,
  } = property;

  return (
    <div className="min-w-0">

      {/* ── AMENITIES PILLS ──────────────────────────────────────────────── */}
      {amenityTags && amenityTags.length > 0 && (
        <div className="mb-10">
          <h2
            className="text-navy font-bold mb-5"
            style={{ fontSize: 'clamp(22px, 2vw, 28px)' }}
          >
            Amenities
          </h2>
          <div className="flex flex-wrap gap-3">
            {amenityTags.map((tag) => (
              <div
                key={tag}
                className="inline-flex items-center gap-2 border border-divider bg-brand-light1 text-navy text-[14px] font-medium px-4 py-2 rounded-panel hover:border-navy transition-colors duration-200"
              >
                <span className="text-grey">
                  {amenityIconForLabel(normalizeAmenityLabel(tag))}
                </span>
                {tag}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── LONG-FORM COPY (Markdown when API/heuristic signals GFM) ─────── */}
      {(overviewMarkdown || descriptionMarkdown || fullDescription) && (
        <div className="mb-10">
          {overviewMarkdown !== undefined && overviewMarkdown.trim().length > 0 && (
            <PropertyMarkdown forceMarkdown content={overviewMarkdown} />
          )}
          {descriptionMarkdown !== undefined && descriptionMarkdown.trim().length > 0 && (
            <PropertyMarkdown
              forceMarkdown
              content={descriptionMarkdown}
              className={overviewMarkdown?.trim() ? 'mt-6' : ''}
            />
          )}
          {!(overviewMarkdown?.trim()) && !(descriptionMarkdown?.trim()) && fullDescription && (
            <PropertyMarkdown content={fullDescription} />
          )}
        </div>
      )}

      {/* ── SPECS (GFM tables from API) ─────────────────────────────────── */}
      {specsMarkdown !== undefined && specsMarkdown.trim().length > 0 && (
        <div className="mb-8">
          <h3 className="text-navy font-bold text-[14px] uppercase tracking-[0.06em] mb-3">
            SPECS
          </h3>
          <PropertyMarkdown forceMarkdown content={specsMarkdown} />
        </div>
      )}

      {/* ── SPECS — structured fallback when no Markdown table block ─────── */}
      {!specsMarkdown?.trim() && (
        <div className="mb-8">
          <h3 className="text-navy font-bold text-[14px] uppercase tracking-[0.06em] mb-3">
            SPECS
          </h3>
          <ul className="space-y-2.5 list-disc list-inside text-navy text-[15px] font-medium">
            {beds !== undefined && beds > 0 && <li>Bedrooms: {beds}</li>}
            {baths !== undefined && baths > 0 && <li>Bathrooms: {baths}</li>}
            {type && <li>Type: {type}</li>}
            {condition && <li>Condition: {condition}</li>}
            {floors !== undefined && <li>Floors: {floors}</li>}
            {water && <li>Water supply: {water}</li>}
            {location && <li>Location: {location}</li>}
          </ul>
        </div>
      )}

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      {pricingBreakdown && (
        <div className="mb-8">
          <h3 className="text-navy font-bold text-[14px] uppercase tracking-[0.06em] mb-3">
            PRICING
          </h3>
          <ul className="space-y-2.5 list-disc list-inside text-navy text-[15px] font-medium">
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
          <h3 className="text-navy font-bold text-[14px] uppercase tracking-[0.06em] mb-3">
            AMENITIES / FEATURES
          </h3>
          <p className="text-navy text-[15px] leading-[1.8] font-medium">
            {features.map((f, i) => (
              <span key={i}>
                <span className="text-navy font-semibold">✓</span>{' '}
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
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(location ? `${location}, Nigeria` : 'Abuja, Nigeria')}&zoom=15`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>

    </div>
  );
}
