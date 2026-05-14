import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchListing } from "@/lib/api";
import { PropertyHero } from "@/components/listings/PropertyHero";
import { PropertySpecsBar } from "@/components/listings/PropertySpecsBar";
import { PropertyGallery } from "@/components/listings/PropertyGallery";
import { PropertyContentLayout } from "@/components/listings/PropertyContentLayout";
import { RelatedPropertiesCTA } from "@/components/listings/RelatedPropertiesCTA";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await fetchListing(slug);
  if (!property) return {};

  const title = property.title;
  const description = [
    property.location ? `📍 ${property.location}` : null,
    property.bedrooms ? `${property.bedrooms} bed` : null,
    property.bathrooms ? `${property.bathrooms} bath` : null,
    property.price ? `₦${Number(property.price).toLocaleString()}` : null,
    'Verified by Propabridge — Zero fees. Zero fake listings.',
  ]
    .filter(Boolean)
    .join(' · ');

  // Use first property image if available, otherwise fall back to logo-circle
  const ogImage =
    property.images && property.images.length > 0
      ? property.images[0]
      : 'https://propabridge.com/logo-circle.jpg';

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Propabridge`,
      description,
      url: `https://propabridge.com/properties-details/${slug}`,
      siteName: 'Propabridge',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: 'en_NG',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Propabridge`,
      description,
      images: [ogImage],
    },
  };
}

export default async function PropertyDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  const property = await fetchListing(slug);
  if (!property) notFound();

  return (
    <main className="min-h-screen bg-beige pb-24">
      <PropertyHero property={property} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PropertySpecsBar property={property} />
      </div>
      <PropertyGallery property={property} />
      <PropertyContentLayout property={property} />
      <RelatedPropertiesCTA property={property} />
    </main>
  );
}
