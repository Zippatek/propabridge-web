import Image from "next/image";
import { Property } from "@/lib/types";
import { MapPin } from "@phosphor-icons/react/dist/ssr";

interface PropertyHeroProps {
  property: Property;
}

export function PropertyHero({ property }: PropertyHeroProps) {
  // Use the first image as the hero background, or a placeholder if none exists
  const heroImage = (property.images && property.images.length > 0 && property.images[0]) 
    ? property.images[0] 
    : "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1920&q=80";

  return (
    <section className="relative w-full h-[60vh] min-h-[500px] flex flex-col items-center justify-end pb-16 -mt-[84px] pt-[84px]">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={heroImage}
          alt={property.title}
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient that fades from transparent to the beige page background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f4f3ea] via-[#f4f3ea]/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h1 className="text-[#001a40] text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] max-w-4xl mb-4">
          {property.title}
        </h1>
        
        <div className="flex items-center gap-2 text-[#4a5568] font-medium">
          <MapPin size={20} weight="fill" className="text-[#001a40]" />
          <span>{property.location}</span>
        </div>
      </div>
    </section>
  );
}
