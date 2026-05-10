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

/** Propa / ADK chat widget (`widget.html`). Must stay `NEXT_PUBLIC_*` for client components. */
const DEFAULT_PROPABRIDGE_WIDGET =
  'https://propabridge-adk-d7apfb4v6q-uc.a.run.app/widget.html'

export const PROPA_WIDGET_URL =
  process.env.NEXT_PUBLIC_PROPA_WIDGET_URL?.trim() || DEFAULT_PROPABRIDGE_WIDGET
