import { notFound } from "next/navigation";
import { MOCK_PROPERTIES } from "@/lib/mock-data";
import { PropertyHero } from "@/components/listings/PropertyHero";
import { PropertySpecsBar } from "@/components/listings/PropertySpecsBar";
import { PropertyGallery } from "@/components/listings/PropertyGallery";
import { PropertyContentLayout } from "@/components/listings/PropertyContentLayout";
import { RelatedPropertiesCTA } from "@/components/listings/RelatedPropertiesCTA";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PropertyDetailsPage({ params }: PageProps) {
  // In Next.js 15+/16, params is a Promise and must be awaited
  const { slug } = await params;

  // Find the property in mock data based on the slug from the URL
  const property = MOCK_PROPERTIES.find((p) => p.slug === slug);

  if (!property) {
    notFound();
    return null; // TypeScript narrowing guard
  }

  return (
    <main className="min-h-screen bg-[#f4f3ea] pb-24">
      {/* 1. Hero Section */}
      <PropertyHero property={property} />

      {/* Container for Specs Bar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Specs Bar */}
        <PropertySpecsBar property={property} />
      </div>

      {/* 3. Image Gallery */}
      <PropertyGallery property={property} />

      {/* 4. Short Description */}
      <div className="container-site mb-10">
        <p
          className="text-[#001a40] leading-[1.65]"
          style={{ fontSize: 'clamp(18px, 1.5vw, 22px)', fontWeight: 500 }}
        >
          {property.fullDescription || property.shortDescription}
        </p>
      </div>

      {/* 5. Two-Column Content Layout */}
      <PropertyContentLayout property={property} />

      {/* 6. Related Properties CTA */}
      <RelatedPropertiesCTA />
    </main>
  );
}

