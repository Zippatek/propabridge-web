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
  'living-in-gwarinpa': bucketUrl(
    'blogs/what-it-s-actually-like-to-live-in-gwarinpa-a-real-resident-s-guide/34cc3f19664b.webp',
  ),
  'renting-abuja': bucketUrl(
    "blogs/first-time-homebuyer-s-guide-everything-you-need-to-know-before-getting-the-keys/1a981601ed8c.webp",
  ),
  'spot-fake-listing': bucketUrl(
    'blogs/how-to-spot-a-fake-property-listing-in-nigeria-—-and-what-to-do-when-you-find-one/0704215e8888.webp',
  ),
  'property-documents': bucketUrl(
    'blogs/the-7-documents-you-must-see-before-paying-rent-on-any-nigerian-property/10b76aa1035f.webp',
  ),
  'gwarinpa-vs-jabi': bucketUrl(
    'blogs/gwarinpa-vs-jabi-vs-kubwa-—-which-area-fits-your-budget-in-abuja-right-now/01d31ec21a89.webp',
  ),
  'inspection-fees': bucketUrl(
    'blogs/why-inspection-fees-are-exploitative-and-why-we-banned-them/455195b6e4a4.webp',
  ),
  'abuja-prices': bucketUrl(
    "blogs/abuja-property-prices-in-2026-what-s-actually-happening/288033147d61.webp",
  ),
  'smart-investors-minna': bucketUrl(
    'blogs/why-smart-investors-are-looking-at-minna-and-lokogoma-right-now/051cbc788fbc.webp',
  ),
}

/** Cover image per neighborhood slug. */
export const NEIGHBORHOOD_COVERS: Record<string, string> = {
  'kasuwan-bacci-kaduna': '/images/neighborhoods/kasuwan-bacci-kaduna.png',
  'apo-abuja': '/images/neighborhoods/apo-abuja.png',
  'kubwa-abuja': '/images/neighborhoods/kubwa-abuja.png',
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
  'gudu-apo-duplex': [],
  'maitama-duplex': [],
  'asokoro-villa': [],
  'guzape-residences': [],
  'lokogoma-promenade': [],
  'kubwa-brick-city': [],
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
  teamPair: bucketUrl('agents/propabridge-team/00cc8bac9257.webp'),
  // History montage — picked four distinct property/neighbourhood images.
  history1: bucketUrl('neighborhoods/maitama-abuja/0eb3ad94ffd7.webp'),
  history2: bucketUrl('properties/luxury-residential-estate-—-heritage-heights-asokoro-abuja/411190295027.webp'),
  history3: bucketUrl('agents/propabridge-team/2c5cdc267690.webp'),
  history4: bucketUrl('properties/shopping-mall-—-guzape-mall-guzape-district-abuja/26193854795e.webp'),
}

