import type { Metadata } from 'next'
import TestimonialsSection from '@/components/sections/TestimonialsSection'

export const metadata: Metadata = {
  title: 'Reviews | Propabridge',
  description:
    'Stories from the buyers, sellers, and dream-chasers we\'ve helped. See what people say about finding their place with Propabridge.',
  keywords: ['Propabridge reviews', 'Nigeria real estate reviews', 'verified property testimonials', 'Propabridge customer stories'],
  openGraph: {
    title: 'Reviews | Propabridge',
    description:
      'Stories from the buyers, sellers, and dream-chasers we\'ve helped. See what people say about finding their place with Propabridge.',
    type: 'website',
  },
}

export default function ReviewsPage() {
  return (
    <main className="bg-beige min-h-screen pt-[72px]">
      <TestimonialsSection isPage={true} />
    </main>
  )
}
