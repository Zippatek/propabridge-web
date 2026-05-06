import type { Metadata } from 'next'
import BlogsSection from '@/components/sections/BlogsSection'
import { fetchBlogs } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Blogs & News | Propabridge',
  description:
    'News, stories, and inspiration for better living every day. Read the latest guides on buying, renting, and investing in Nigerian real estate.',
  openGraph: {
    title: 'Blogs & News | Propabridge',
    description:
      'News, stories, and inspiration for better living every day. Read the latest guides on buying, renting, and investing in Nigerian real estate.',
    type: 'website',
  },
}

export default async function BlogsPage() {
  const blogs = await fetchBlogs(12)
  return (
    <main className="bg-beige min-h-screen pt-[72px]">
      <BlogsSection limit={8} isPage={true} blogs={blogs} />
    </main>
  )
}
