/**
 * Public API base (no trailing path segment; routes use `/listings`, `/blogs`, etc.).
 * Docker sets NEXT_PUBLIC_API_URL via ARG default (see Dockerfile).
 * If a prod build accidentally omits NEXT_PUBLIC_* inlining, never default to localhost.
 */
const DEV_FALLBACK = 'http://127.0.0.1:8080'
const PROD_FALLBACK = 'https://api.propabridge.com'

export const PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  (process.env.NODE_ENV === 'production' ? PROD_FALLBACK : DEV_FALLBACK)
