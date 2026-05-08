/**
 * Public API base URL for browser and server.
 * Dev default uses a port that does not collide with Next.js (3000).
 */
export const PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  'http://127.0.0.1:8080'
