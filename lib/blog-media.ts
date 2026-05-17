/**
 * Blog cover resolution — DB often points at GCS blogs/*.jpg objects that were never uploaded.
 * Prefer curated static assets under /public/images/blogs/ (see BLOG_COVERS).
 */

import { BLOG_COVERS } from '@/lib/bucket'

export const BLOG_PLACEHOLDER = '/images/blogs/placeholder.jpg'

/** Long API slugs → BLOG_COVERS key */
const SLUG_TO_COVER_KEY: Record<string, string> = {
  'first-time-homebuyer-s-guide-everything-you-need-to-know-before-getting-the-keys': 'first-time-homebuyer',
  'the-7-documents-you-must-see-before-paying-rent-on-any-nigerian-property': 'property-documents',
  'why-inspection-fees-are-exploitative-and-why-we-banned-them': 'inspection-fees',
}

/** GCS object basename (no ext) → BLOG_COVERS key */
const GCS_BASENAME_TO_COVER_KEY: Record<string, string> = {
  'no-inspection-fees': 'inspection-fees',
}

function coverFromKey(key: string): string | null {
  return BLOG_COVERS[key] ?? null
}

function basenameFromUrl(url: string): string | null {
  try {
    const path = new URL(url.trim()).pathname
    const file = path.split('/').filter(Boolean).pop()
    if (!file) return null
    return file.replace(/\.[a-z0-9]+$/i, '')
  } catch {
    return null
  }
}

function isMissingGcsBlogAsset(url: string): boolean {
  if (!url || typeof url !== 'string') return false
  const t = url.trim()
  return (
    t.includes('storage.googleapis.com') &&
    t.includes('/blogs/') &&
    /\.(jpe?g|png|webp|gif)(\?|$)/i.test(t)
  )
}

/**
 * Resolve a blog card hero image safe for next/image (local or allowed remote only).
 */
export function resolveBlogCoverImage(slug: string, apiCover?: string | null): string {
  const id = (slug || '').trim()
  const cover = typeof apiCover === 'string' ? apiCover.trim() : ''

  if (cover.startsWith('/') && !cover.startsWith('//')) {
    return cover
  }

  if (cover.startsWith('http://') || cover.startsWith('https://')) {
    try {
      const path = new URL(cover).pathname
      if (path.startsWith('/images/blogs/')) return path
    } catch {
      /* fall through */
    }
  }

  const aliasKey = SLUG_TO_COVER_KEY[id] ?? id
  const fromSlug = coverFromKey(aliasKey)
  if (fromSlug) return fromSlug

  if (cover && !isMissingGcsBlogAsset(cover)) {
    return cover
  }

  if (cover && isMissingGcsBlogAsset(cover)) {
    const base = basenameFromUrl(cover)
    if (base) {
      const mappedKey = GCS_BASENAME_TO_COVER_KEY[base] ?? base
      const fromGcs = coverFromKey(mappedKey)
      if (fromGcs) return fromGcs
    }
  }

  for (const key of Object.keys(BLOG_COVERS)) {
    if (id.startsWith(key) || id.includes(key)) {
      const hit = coverFromKey(key)
      if (hit) return hit
    }
  }

  return BLOG_PLACEHOLDER
}
