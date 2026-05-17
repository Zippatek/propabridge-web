/**
 * GCS bucket helpers — every site image must come from here, never from
 * Unsplash/framerusercontent. If a logical asset is missing from the bucket,
 * skip the image and let the surrounding UI render with a neutral fill.
 */

export const BUCKET_BASE =
  process.env.NEXT_PUBLIC_GCS_BUCKET_BASE ||
  'https://storage.googleapis.com/propabridge-listings-us'

/** Build a full public URL for a path inside the propabridge-listings-us bucket. */
export function bucketUrl(path: string): string {
  const clean = path.replace(/^\/+/, '')
  return `${BUCKET_BASE}/${clean}`
}

/** Curated cover image per blog id (from data/blogs.ts). */
export const BLOG_COVERS: Record<string, string> = {
  'living-in-gwarinpa': '/images/blogs/living-in-gwarinpa.png',
  'renting-abuja': '/images/blogs/renting-abuja.png',
  'spot-fake-listing': '/images/blogs/spot-fake-listing.png',
  'property-documents': '/images/blogs/property-documents.png',
  'gwarinpa-vs-jabi': '/images/blogs/gwarinpa-vs-jabi.png',
  'inspection-fees': '/images/blogs/inspection-fees.png',
  'abuja-prices': '/images/blogs/abuja-prices.png',
  'smart-investors-minna': '/images/blogs/smart-investors-minna.png',
  'first-time-homebuyer': '/images/blogs/property-documents.png',
}

/** Cover image per neighborhood slug. */
export const NEIGHBORHOOD_COVERS: Record<string, string> = {
  'kasuwan-bacci-kaduna': '/images/neighborhoods/kasuwan-bacci-kaduna.png',
  'apo-abuja': '/images/neighborhoods/apo-abuja.png',
  'asokoro-abuja': '/images/neighborhoods/asokoro-abuja.png',
  asokoro: '/images/neighborhoods/asokoro-abuja.png',
  'garki-abuja': '/images/neighborhoods/garki-abuja.png',
  garki: '/images/neighborhoods/garki-abuja.png',
  'katampe-extension-lokogoma-abuja': '/images/neighborhoods/katampe-extension-lokogoma-abuja.png',
  'katampe-extension-abuja': '/images/neighborhoods/katampe-extension-lokogoma-abuja.png',
  'katampe-extension-lokogoma': '/images/neighborhoods/katampe-extension-lokogoma-abuja.png',
  'katampe-lokogoma': '/images/neighborhoods/katampe-extension-lokogoma-abuja.png',
  'kubwa-abuja': '/images/neighborhoods/kubwa-abuja.png',
  'lokogoma-abuja': '/images/neighborhoods/lokogoma-abuja.png',
  lokogoma: '/images/neighborhoods/lokogoma-abuja.png',
  'guzape-abuja': '/images/neighborhoods/guzape-abuja.png',
  'gwarimpa-abuja': '/images/neighborhoods/gwarimpa-abuja.png',
  'gwarinpa-abuja': '/images/neighborhoods/gwarimpa-abuja.png',
  'maitama-abuja': '/images/neighborhoods/maitama-abuja.png',
  'jabi-abuja': '/images/neighborhoods/jabi-abuja.png',
  'wuse-2-abuja': '/images/neighborhoods/wuse-2-abuja.png',
  'barnawa-gra-kaduna': '/images/neighborhoods/barnawa-gra-kaduna.png',
  'barnawa-kaduna': '/images/neighborhoods/barnawa-gra-kaduna.png',
  'chanchaga-minna': '/images/neighborhoods/chanchaga-minna.png',
  'millenium-city': '/images/neighborhoods/millenium-city-kaduna.png',
  'millenium-city-kaduna': '/images/neighborhoods/millenium-city-kaduna.png',
  'fountain-view-residences': '/images/neighborhoods/fountain-view-residences.png',
}

/**
 * Property cover/gallery images keyed by representative property slug.
 * Used by mock-data when wiring sample property cards.
 */
export const PROPERTY_GALLERY: Record<string, string[]> = {
  'gudu-apo-duplex': [
    bucketUrl('properties/semi-detached-duplex-terrace-estate-—-amina-court-phase-ii-apo-dutse-abuja/333d4e0d57af.webp'),
    bucketUrl('properties/luxury-residential-estate-—-heritage-heights-asokoro-abuja/411190295027.webp'),
    bucketUrl('properties/semi-detached-duplex-terrace-estate-—-amina-court-phase-ii-apo-dutse-abuja/4e1366d72604.webp'),
  ],
  'maitama-duplex': [
    bucketUrl('properties/luxury-residential-estate-—-heritage-heights-asokoro-abuja/0a55747c0639.webp'),
    bucketUrl('properties/well-finished-4-bedroom-terrace-duplex-with-self-contained-bq/00325858fb27.webp'),
    bucketUrl('properties/luxury-residential-estate-—-heritage-heights-asokoro-abuja/1cf787ab082d.webp'),
  ],
  'asokoro-villa': [
    bucketUrl('properties/luxury-residential-estate-—-heritage-heights-asokoro-abuja/0a55747c0639.webp'),
    bucketUrl('properties/luxury-residential-estate-—-heritage-heights-asokoro-abuja/0ae66eef29d4.webp'),
  ],
  'guzape-residences': [
    bucketUrl('properties/shopping-mall-—-guzape-mall-guzape-district-abuja/26193854795e.webp'),
    bucketUrl('properties/luxury-residential-estate-—-heritage-heights-asokoro-abuja/1cf787ab082d.webp'),
  ],
  'lokogoma-promenade': [
    bucketUrl('properties/ultra-modern-commercial-market-—-kasuwan-barci-market-kakuri-kaduna/01f50cdd6bf5.webp'),
    bucketUrl('properties/ultra-modern-commercial-market-—-kasuwan-barci-market-kakuri-kaduna/6bd655095364.webp'),
  ],
  'kubwa-brick-city': [
    bucketUrl('properties/well-finished-4-bedroom-terrace-duplex-with-self-contained-bq/00325858fb27.webp'),
    bucketUrl('properties/luxury-residential-estate-—-heritage-heights-asokoro-abuja/0ae66eef29d4.webp'),
  ],
  'kaduna-millenium': [
    bucketUrl('properties/millenium-city-kaduna-babban-saura/1b787d3f61d9.webp'),
    bucketUrl('properties/millenium-city-kaduna-babban-saura/568b029da47d.webp'),
  ],
  'kaduna-market': [
    bucketUrl('properties/ultra-modern-commercial-market-—-kasuwan-barci-market-kakuri-kaduna/01f50cdd6bf5.webp'),
    bucketUrl('properties/ultra-modern-commercial-market-—-kasuwan-barci-market-kakuri-kaduna/6bd655095364.webp'),
  ],
  'asokoro-heritage': [
    bucketUrl('properties/luxury-residential-estate-—-heritage-heights-asokoro-abuja/0a55747c0639.webp'),
    bucketUrl('properties/luxury-residential-estate-—-heritage-heights-asokoro-abuja/0ae66eef29d4.webp'),
  ],
  'apo-amina-court': [
    bucketUrl('properties/semi-detached-duplex-terrace-estate-—-amina-court-phase-ii-apo-dutse-abuja/333d4e0d57af.webp'),
    bucketUrl('properties/semi-detached-duplex-terrace-estate-—-amina-court-phase-ii-apo-dutse-abuja/4e1366d72604.webp'),
  ],
}

/** Hero / marketing background images sourced from real property bucket assets. */
export const HERO_IMAGES = {
  homeHero: bucketUrl('properties/luxury-residential-estate-—-heritage-heights-asokoro-abuja/0a55747c0639.webp'),
  aboutHero: bucketUrl('properties/luxury-residential-estate-—-heritage-heights-asokoro-abuja/0a55747c0639.webp'),
  aboutCompany: bucketUrl(
    'properties/luxury-residential-estate-—-heritage-heights-asokoro-abuja/411190295027.webp',
  ),
  aboutProblem: bucketUrl(
    'properties/luxury-residential-estate-—-heritage-heights-asokoro-abuja/1cf787ab082d.webp',
  ),
  sellHero: '/images/sell/sell-hero-bg.png',
  sellingProcess: bucketUrl('properties/luxury-residential-estate-—-heritage-heights-asokoro-abuja/1cf787ab082d.webp'),
  contactBuy: bucketUrl('properties/luxury-residential-estate-—-heritage-heights-asokoro-abuja/0a55747c0639.webp'),
  contactRent: bucketUrl('properties/well-finished-4-bedroom-terrace-duplex-with-self-contained-bq/00325858fb27.webp'),
  contactInvest: bucketUrl('properties/millenium-city-kaduna-babban-saura/1b787d3f61d9.webp'),
  // Two propabridge-team headshots used as partner photos in WhySellWithUs etc.
  teamPair: '/images/about/about-aminu.png',
  // History montage — picked four distinct property/neighbourhood images.
  history1: bucketUrl('neighborhoods/maitama-abuja/0eb3ad94ffd7.webp'),
  history2: bucketUrl('properties/luxury-residential-estate-—-heritage-heights-asokoro-abuja/411190295027.webp'),
  history3: bucketUrl('agents/propabridge-team/2c5cdc267690.webp'),
  history4: bucketUrl('properties/shopping-mall-—-guzape-mall-guzape-district-abuja/26193854795e.webp'),
}

