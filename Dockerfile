# Build with an explicit API base when needed, e.g.:
#   docker build --build-arg NEXT_PUBLIC_API_URL=https://staging.example.com .
# If omitted, production default is baked in so the app does not fall back to localhost.
FROM node:20-alpine AS base

# ── deps ────────────────────────────────────────────────────────────
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ── builder ─────────────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_API_URL=https://api.propabridge.com
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_GCS_BUCKET_BASE
ENV NEXT_PUBLIC_GCS_BUCKET_BASE=$NEXT_PUBLIC_GCS_BUCKET_BASE
RUN npm run build

# ── runner ──────────────────────────────────────────────────────────
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
RUN mkdir .next && chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 8080
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
