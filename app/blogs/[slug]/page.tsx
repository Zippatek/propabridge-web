import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BLOGS } from '@/data/blogs'
import { Home } from 'lucide-react'
import { BlogShareButtons } from '@/components/blog/BlogShareButtons'
import { fetchBlogBySlug, fetchBlogs } from '@/lib/api'

interface BlogDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params

  const blog = (await fetchBlogBySlug(slug)) || BLOGS.find((b) => b.id === slug)

  if (!blog) {
    notFound()
  }

  const allBlogs = await fetchBlogs(12)
  const otherBlogs = allBlogs.filter((b) => b.id !== slug).slice(0, 3)

  return (
    <main className="bg-[#f4f3ea] min-h-screen pt-[120px] pb-24">
      <div className="container-site">

        {/* ── HERO SECTION ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24 mb-20 md:mb-32">
          {/* Left Column - Meta & Title */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 bg-[#e8e7df] px-3 py-1.5 rounded-[6px] mb-8 w-fit shadow-sm">
              <div className="w-[8px] h-[8px] rounded-[2px] bg-navy" />
              <span className="text-[12px] font-bold text-navy uppercase tracking-[0.08em] leading-none pt-[1px]">BLOG</span>
              <div className="w-[8px] h-[8px] rounded-[2px] bg-navy" />
            </div>

            {/* Title */}
            <h1 className="text-display-xl text-heading font-medium mb-6 font-sans">
              {blog.title}
            </h1>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-grey font-normal text-[16px] md:text-[18px] font-sans leading-[1.7] mb-8 max-w-[90%]">
                {blog.excerpt}
              </p>
            )}

            {/* Meta */}
            <div className="grid grid-cols-3 gap-4 mt-auto pt-8">
              <div>
                <p className="text-[11px] font-bold text-navy/60 uppercase tracking-widest mb-1">AUTHOR</p>
                <p className="text-[14px] md:text-[15px] font-semibold text-navy">{blog.authorName}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-navy/60 uppercase tracking-widest mb-1">PUBLISHED</p>
                <p className="text-[14px] md:text-[15px] font-semibold text-navy">{blog.date}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-navy/60 uppercase tracking-widest mb-1">CATEGORY</p>
                <p className="text-[14px] md:text-[15px] font-semibold text-navy capitalize">{blog.category.toLowerCase()}</p>
              </div>
            </div>

            {/* Share + Copy Link */}
            <BlogShareButtons title={blog.title} />
          </div>

          {/* Right Column - Image */}
          <div className="flex-1 relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-auto lg:h-[500px] xl:h-[600px] rounded-[16px] overflow-hidden bg-[#e0e0d5] shadow-sm">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* ── BODY SECTION ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-24 md:mb-32">

          {/* Left Sidebar (Sticky) */}
          <div className="w-full lg:w-[320px] shrink-0 space-y-6">
            <div className="sticky top-[100px] space-y-6">

              {/* Author Card */}
              <div className="bg-navy rounded-[12px] p-6 text-white shadow-[0_12px_24px_rgba(0,26,64,0.15)]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative w-[60px] h-[60px] rounded-[8px] overflow-hidden bg-white/10 shrink-0">
                    {blog.authorName === 'PROPABRIDGE TEAM' ? (
                      <div className="w-full h-full flex items-center justify-center bg-white/5">
                        <Home size={28} className="text-white" />
                      </div>
                    ) : (
                      <Image src={blog.authorImage || '/images/blogs/author.png'} alt={blog.authorName} fill className="object-cover" />
                    )}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-white/60 mb-1">Author</p>
                    <p className="text-[16px] font-semibold text-white leading-tight">{blog.authorName}</p>
                  </div>
                </div>
                <p className="text-[14px] text-white/80">Propabridge Team</p>
              </div>

              {/* Newsletter Card */}
              <div className="bg-[#fcfaef] rounded-[12px] p-6 shadow-sm border border-[#ecece0]">
                <h3 className="text-navy text-[18px] font-bold leading-tight mb-4">
                  What&apos;s better than insider perks, pro tips, and surprises?
                </h3>
                <p className="text-navy/70 text-[14px] leading-snug mb-6">
                  Sign up to get the most recent blog articles in your email every week.<br /><br />Join now.
                </p>
                <form className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="jane@propabridge.com"
                    className="w-full h-[48px] bg-[#f0efe6] rounded-[8px] px-4 text-[14px] text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-navy/20 transition-all border border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full h-[48px] bg-navy text-white text-[13px] font-bold tracking-widest uppercase rounded-[8px] hover:bg-navy/90 transition-colors flex items-center justify-center gap-2"
                  >
                    SUBSCRIBE <span>›</span>
                  </button>
                </form>
              </div>

            </div>
          </div>

          {/* Right Main Content */}
          <div className="flex-1 max-w-[800px]">
            {blog.content ? (
              <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
            ) : (
              <p className="text-navy/80 text-[18px]">Content coming soon...</p>
            )}
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <hr className="border-t border-[#d8d7cd] mb-16" />

        {/* ── OTHER BLOGS SECTION ── */}
        <div className="mb-20">
          <div className="flex items-start gap-2 mb-8">
            <div className="w-[8px] h-[8px] bg-navy rounded-[2px] shrink-0 mt-[4px]" />
            <span className="text-[12px] font-bold text-navy uppercase tracking-[0.08em]">OTHER BLOGS</span>
          </div>

          <h2 className="text-display-lg text-heading font-medium mb-12 max-w-[900px] mx-auto text-center">
            Why stop here? Explore more blogs and take your knowledge to the next level.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8 mb-16">
            {otherBlogs.map(b => (
              <Link
                href={`/blogs/${b.id}`}
                key={b.id}
                className="group block transition-transform hover:-translate-y-1 duration-300 flex flex-col h-full"
              >
                {/* Image Thumbnail */}
                <div className="relative w-full aspect-[4/3] md:aspect-[3/2] rounded-[16px] overflow-hidden bg-[#e0e0d5] mb-6 border border-[#ecece0]/50 shadow-sm transition-shadow shrink-0">
                  <Image
                    src={b.image}
                    alt={b.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* View Hover Badge */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="w-[80px] h-[80px] rounded-full bg-navy text-white text-[12px] font-bold tracking-widest flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-all duration-300">
                      VIEW ›
                    </div>
                  </div>
                </div>

                {/* Data Row */}
                <div className="flex items-center gap-2 text-navy mb-3 shrink-0">
                  <p className="text-[12px] font-semibold tracking-[0.05em] uppercase">{b.date}</p>
                  <div className="w-1 h-1 rounded-full bg-navy" />
                  <p className="text-[12px] font-semibold tracking-[0.05em] uppercase">{b.category}</p>
                </div>

                {/* Title */}
                <h3 className="text-[20px] md:text-[22px] text-navy font-bold leading-[1.3] tracking-[-0.01em] mb-6 pr-4 flex-grow">
                  {b.title}
                </h3>

                {/* Author Pill */}
                <div className="inline-flex items-center self-start gap-2.5 bg-[#eae9e0] pr-4 pl-1.5 py-1.5 rounded-btn border border-[#ecece0]/80 shrink-0">
                  <div className="relative flex items-center justify-center w-7 h-7 rounded-full overflow-hidden shrink-0 bg-white">
                    {b.authorName === 'PROPABRIDGE TEAM' ? (
                      <Home size={14} className="text-navy" />
                    ) : (
                      <Image src={b.authorImage || '/images/blogs/author.png'} alt={b.authorName} fill className="object-cover" />
                    )}
                  </div>
                  <p className="text-[11px] font-bold text-navy tracking-[0.05em] uppercase">
                    {b.authorName}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* READ ALL CTA */}
          <div className="flex justify-center">
            <Link
              href="/blogs"
              className="inline-flex items-center justify-center bg-blue hover:bg-blue-hover text-white font-sans font-semibold text-[14px] uppercase tracking-wider px-6 py-3 rounded-btn transition-all duration-300 gap-2"
            >
              READ ALL BLOGS
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <path d="M5 12h14"></path>
                <path d="M13 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}
