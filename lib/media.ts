/**
 * PROPABRIDGE — Zero-Image-Failure Architecture
 * Global utility to enforce CDN-only image rendering.
 */

export const CDN_DOMAIN = 'cdn.propabridge.com';
export const CDN_PREFIX = `https://${CDN_DOMAIN}/`;
export const DEFAULT_PLACEHOLDER = '/images/placeholder.jpg';

/**
 * Ensures a URL is safe to render.
 * If the URL is not a valid Propabridge CDN URL, returns a fallback placeholder.
 * Never throws.
 */
export function safeImage(url: string | null | undefined): string {
  if (!url) return DEFAULT_PLACEHOLDER;

  // 1. Allow local public assets
  if (url.startsWith('/') || url.startsWith('http://localhost') || url.startsWith('https://localhost')) {
    return url;
  }

  // 2. Enforce CDN-only rule for external URLs
  if (url.startsWith(CDN_PREFIX)) {
    return url;
  }

  // 3. Fallback for everything else (Framer, GCS, Unsplash, etc.)
  // Note: These should have been normalized by the backend/DB layer already.
  // This is the final frontend "Firewall".
  return DEFAULT_PLACEHOLDER;
}

/**
 * Utility for arrays of images.
 */
export function safeImages(images: (string | null | undefined)[] | null | undefined): string[] {
  if (!images || !Array.isArray(images)) return [DEFAULT_PLACEHOLDER];
  const cleaned = images.map(safeImage).filter(img => img !== DEFAULT_PLACEHOLDER);
  return cleaned.length > 0 ? cleaned : [DEFAULT_PLACEHOLDER];
}
