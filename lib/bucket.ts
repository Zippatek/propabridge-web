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
  'gwarinpa-abuja': bucketUrl('neighborhoods/gwarinpa-abuja/03434050cef7.webp'),
  'maitama-abuja': bucketUrl('neighborhoods/maitama-abuja/0eb3ad94ffd7.webp'),
  'jabi-abuja': bucketUrl('neighborhoods/jabi-abuja/0accbce51e29.webp'),
  'kubwa-abuja': bucketUrl('neighborhoods/kubwa-abuja/27c888d9e381.webp'),
  'apo-abuja': bucketUrl('neighborhoods/apo-abuja/1173f69e8b56.webp'),
  'guzape-abuja': bucketUrl('neighborhoods/guzape-abuja/1f1e16ff5c0c.webp'),
  'barnawa-kaduna': bucketUrl('neighborhoods/barnawa-kaduna/03c3152802fc.webp'),
  'kasuwan-bacci-kaduna': bucketUrl('neighborhoods/kasuwan-bacci-kaduna/1ead92d95d6e.webp'),
  'chanchaga-minna': bucketUrl('neighborhoods/chanchaga-minna/01ce3434cb1f.webp'),
  'millenium-city': bucketUrl('neighborhoods/millenium-city/1d89c15ac857.webp'),
  'fountain-view-residences': bucketUrl('neighborhoods/fountain-view-residences/050443cddc6a.webp'),
}

/**
 * Property cover/gallery images keyed by representative property slug.
 * Used by mock-data when wiring sample property cards.
 */
export const PROPERTY_GALLERY: Record<string, string[]> = {
  'gudu-apo-duplex': [
    bucketUrl('properties/exquisite-4-bedroom-fully-detached-duplex-with-basement-gudu–apo/03962f4fb8d2.webp'),
    bucketUrl('properties/exquisite-4-bedroom-fully-detached-duplex-with-basement-gudu–apo/2a0186d7bafd.webp'),
    bucketUrl('properties/exquisite-4-bedroom-fully-detached-duplex-with-basement-gudu–apo/6563596f401f.webp'),
  ],
  'maitama-duplex': [
    bucketUrl('properties/executive-4-bedroom-semi-detached-duplex-with-guest-chalet-maitama/19ba2e8705a7.webp'),
    bucketUrl('properties/executive-4-bedroom-semi-detached-duplex-with-guest-chalet-maitama/9d11784a41e0.webp'),
  ],
  'asokoro-villa': [
    bucketUrl('properties/stunning-5-bedroom-smart-villa-on-julius-nyerere-crescent-asokoro/4de1cd4a4697.webp'),
    bucketUrl('properties/stunning-5-bedroom-smart-villa-on-julius-nyerere-crescent-asokoro/852c2b8a5c7f.webp'),
  ],
  'guzape-residences': [
    bucketUrl('properties/mixed-use-residential-retail-—-the-hills-residences-guzape-district-abuja/0241bd77b2a8.webp'),
    bucketUrl('properties/mixed-use-residential-retail-—-the-hills-residences-guzape-district-abuja/05b358f92308.webp'),
  ],
  'lokogoma-promenade': [
    bucketUrl('properties/mixed-residential-estate-—-the-promenade-estate-lokogoma-abuja/047dc1f48f8d.webp'),
    bucketUrl('properties/mixed-residential-estate-—-the-promenade-estate-lokogoma-abuja/1a4b2eb91793.webp'),
  ],
  'kubwa-brick-city': [
    bucketUrl('properties/mixed-residential-estate-—-brick-city-spring-jibi-district-kubwa-abuja/3b554af1636a.webp'),
    bucketUrl('properties/mixed-residential-estate-—-brick-city-spring-jibi-district-kubwa-abuja/4d3a63940307.webp'),
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
  aboutHero: bucketUrl('properties/stunning-5-bedroom-smart-villa-on-julius-nyerere-crescent-asokoro/4de1cd4a4697.webp'),
  aboutCompany: bucketUrl('properties/mixed-use-residential-retail-—-the-hills-residences-guzape-district-abuja/0241bd77b2a8.webp'),
  aboutProblem: bucketUrl('properties/mixed-residential-estate-—-brick-city-valley-kubwa–zuba-expressway-abuja/0725388b301e.webp'),
  sellHero: bucketUrl('properties/executive-4-bedroom-semi-detached-duplex-with-guest-chalet-maitama/19ba2e8705a7.webp'),
  sellingProcess: bucketUrl('properties/luxury-residential-estate-—-heritage-heights-asokoro-abuja/1cf787ab082d.webp'),
  contactBuy: bucketUrl('properties/mixed-residential-estate-—-the-promenade-estate-lokogoma-abuja/047dc1f48f8d.webp'),
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

/** Ordered property list URL set — used as fallback gallery when a property has none. */
export const FALLBACK_PROPERTY_GALLERY: string[] = [
  ...PROPERTY_GALLERY['gudu-apo-duplex'],
  ...PROPERTY_GALLERY['maitama-duplex'],
  ...PROPERTY_GALLERY['asokoro-villa'],
  ...PROPERTY_GALLERY['guzape-residences'],
  ...PROPERTY_GALLERY['lokogoma-promenade'],
]
