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

/** pb-core-api semantic search service (separate from the main API gateway). */
export const SEARCH_API_URL =
  process.env.NEXT_PUBLIC_SEARCH_API_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://pb-core-api-480235407496.europe-west1.run.app'
    : 'http://127.0.0.1:8080')

/** Propa / ADK chat widget (`widget.html`). Must stay `NEXT_PUBLIC_*` for client components. */
const DEFAULT_PROPABRIDGE_WIDGET =
  'https://propabridge-adk-d7apfb4v6q-uc.a.run.app/widget.html'

export const PROPA_WIDGET_URL =
  process.env.NEXT_PUBLIC_PROPA_WIDGET_URL?.trim() || DEFAULT_PROPABRIDGE_WIDGET

/** WhatsApp number for Chat with Propa (digits only, country code without +). */
export const PROPA_WHATSAPP_MSISDN =
  process.env.NEXT_PUBLIC_PROPA_WHATSAPP_MSISDN?.replace(/\D/g, '') ||
  '2348055551300'

const DEFAULT_PROPA_WHATSAPP_PREFILL =
  'Hi Propa — I found you on Propabridge. I would like help with a verified property.'

/** URL-encoded prefilled WhatsApp chat text (override via NEXT_PUBLIC_PROPA_WHATSAPP_TEXT). */
export const PROPA_WHATSAPP_PREFILL =
  process.env.NEXT_PUBLIC_PROPA_WHATSAPP_TEXT?.trim() || DEFAULT_PROPA_WHATSAPP_PREFILL

/** Open WhatsApp chat with prefilled message. */
export function propaWhatsAppHref(): string {
  const q = encodeURIComponent(PROPA_WHATSAPP_PREFILL)
  return `https://wa.me/${PROPA_WHATSAPP_MSISDN}?text=${q}`
}
