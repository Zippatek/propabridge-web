import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Verified Properties for Sale & Rent in Nigeria | Propabridge',
  description:
    'Browse verified properties for sale, rent, and investment across Abuja, Kaduna, and Minna. Zero inspection fees. Zero fake listings. Every home physically inspected by our team.',
  keywords: [
    'properties for sale Abuja',
    'houses for rent Nigeria',
    'verified property listings Nigeria',
    'buy property Abuja',
    'rent apartment Kaduna',
    'real estate Nigeria',
    'Minna properties',
    'no inspection fees Nigeria',
  ],
  openGraph: {
    title: 'Verified Properties for Sale & Rent in Nigeria | Propabridge',
    description:
      'Browse verified properties for sale, rent, and investment across Abuja, Kaduna, and Minna. Zero inspection fees. Zero fake listings.',
    url: 'https://propabridge.com/listings',
    siteName: 'Propabridge',
    images: [{ url: 'https://propabridge.com/logo-circle.jpg', width: 400, height: 400 }],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Verified Properties for Sale & Rent in Nigeria | Propabridge',
    description: 'Browse verified properties for sale, rent, and investment. Zero inspection fees.',
  },
}

export default function ListingsLayout({ children }: { children: React.ReactNode }) {
  return children
}
