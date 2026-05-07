'use client';

import { 
  Key, 
  Money, 
  Bed, 
  Bathtub, 
  Calendar, 
  Stairs, 
  Car, 
  IdentificationCard, 
  Copy, 
  DownloadSimple,
  Ruler,
  SquaresFour
} from "@phosphor-icons/react/dist/ssr";
import { Property } from "@/lib/types";

interface PropertySpecsBarProps {
  property: Property;
}

export function PropertySpecsBar({ property }: PropertySpecsBarProps) {
  // Built in date (default to 2024 for this phase)
  const builtIn = "2024";

  // Define specs based on property type
  const isLand = property.type === "Land";
  
  const specs = [
    { 
      label: "Type", 
      value: property.status === "FOR RENT" ? "For Rent" : "For Sale", 
      icon: <Key size={26} weight="light" color="#001a40" /> 
    },
    { 
      label: "Price", 
      value: property.priceLabel || `₦${property.price?.toLocaleString()}`, 
      icon: <Money size={26} weight="light" color="#001a40" /> 
    },
  ];

  if (isLand) {
    // Land-specific specs
    specs.push(
      { 
        label: "Size", 
        value: property.areaLabel || (property.area ? `${property.area} SQM` : "—"), 
        icon: <Ruler size={26} weight="light" color="#001a40" /> 
      },
      { 
        label: "Lot Size", 
        value: property.landArea || "—", 
        icon: <SquaresFour size={26} weight="light" color="#001a40" /> 
      }
    );
  } else {
    // Residential-specific specs
    if (property.beds) {
      specs.push({ label: "Beds", value: property.beds, icon: <Bed size={26} weight="light" color="#001a40" /> });
    }
    if (property.baths) {
      specs.push({ label: "Baths", value: property.baths, icon: <Bathtub size={26} weight="light" color="#001a40" /> });
    }
    if (property.floors) {
      specs.push({ label: "Floors", value: property.floors, icon: <Stairs size={26} weight="light" color="#001a40" /> });
    }
  }

  // Always show Built in and Property ID
  specs.push({ label: "Built in", value: builtIn, icon: <Calendar size={26} weight="light" color="#001a40" /> });
  
  // Property ID (Priority to property_id)
  specs.push({ 
    label: "Property ID", 
    value: property.property_id || property.id, 
    icon: <IdentificationCard size={26} weight="light" color="#001a40" />, 
    isId: true 
  });

  return (
    <div className="w-full relative z-20 mx-auto max-w-5xl mt-12 mb-20">
      {/* Specs Card */}
      <div className="bg-[#faf9f3] rounded-[16px] shadow-card p-8 md:p-12 mb-10">
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-${Math.min(specs.length, 5)} gap-y-10 gap-x-6 text-center`}>
          {specs.map((spec, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-4 flex items-center justify-center h-8">
                {spec.icon}
              </div>
              <h4 className="text-[#001a40] font-semibold text-[15px] mb-1">
                {spec.label}
              </h4>
              <div className="flex items-center gap-1.5 text-[#4a5568] text-[14px]">
                {spec.value}
                {spec.isId && (
                  <button 
                    className="hover:text-[#006aff] transition-colors mt-0.5"
                    aria-label="Copy Property ID"
                    title="Copy ID"
                    onClick={() => {
                      navigator.clipboard.writeText(String(spec.value));
                    }}
                  >
                    <Copy size={14} weight="regular" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Download Plan Button (Outside the card) */}
      <div className="flex justify-center">
        <button className="inline-flex items-center justify-center bg-[#006aff] hover:bg-[#0052cc] text-white font-semibold text-[14px] uppercase tracking-[0.05em] px-8 py-4 rounded-[8px] transition-all duration-300 gap-2 outline-none focus:outline-none focus:ring-0 border-none">
          <DownloadSimple size={20} weight="bold" />
          DOWNLOAD PLAN
        </button>
      </div>
    </div>
  );
}
