import { notFound } from "next/navigation";
import { fetchListing, fetchListings } from "@/lib/api";
import { PropertyHero } from "@/components/listings/PropertyHero";
import { PropertySpecsBar } from "@/components/listings/PropertySpecsBar";
import { PropertyGallery } from "@/components/listings/PropertyGallery";
import { PropertyDescription } from "@/components/listings/PropertyDescription";
import { PropertyPlotMap } from "@/components/listings/PropertyPlotMap";
import { PropertyContentLayout } from "@/components/listings/PropertyContentLayout";
import { RelatedPropertiesCTA } from "@/components/listings/RelatedPropertiesCTA";

export default async function PropertyDetailsPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  let property;
  try {
    if (id) {
      property = await fetchListing(id);
    } else {
      const listings = await fetchListings({ limit: 1 });
      property = listings[0];
    }
  } catch {
    notFound();
  }

  if (!property) notFound();

  return (
    <main className="min-h-screen bg-[#f4f3ea] pb-24">
      <PropertyHero property={property} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PropertySpecsBar property={property} />
      </div>
      <PropertyGallery property={property} />
      <div className="container-site mb-10">
        <p
          className="text-[#001a40] leading-[1.65]"
          style={{ fontSize: 'clamp(18px, 1.5vw, 22px)', fontWeight: 500 }}
        >
          {property.fullDescription || property.shortDescription}
        </p>
      </div>
      <PropertyPlotMap />
      <PropertyContentLayout property={property} />
      <RelatedPropertiesCTA />
    </main>
  );
}
