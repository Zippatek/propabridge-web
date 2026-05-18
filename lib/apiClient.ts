/**
 * PROPABRIDGE — Stable API Client
 * Clean fetch wrapper for React Query integration.
 */

import { PUBLIC_API_URL } from './env-public';

const BASE_URL = PUBLIC_API_URL;

type ApiGetOptions = {
  signal?: AbortSignal;
  timeoutMs?: number;
};

/**
 * Generic GET request wrapper.
 * Supports optional abort/timeout handling for server-side call sites while
 * remaining compatible with React Query-managed client usage.
 */
export async function apiGet<T>(path: string, options: ApiGetOptions = {}): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const { signal, timeoutMs } = options;

  const controller = signal || timeoutMs ? new AbortController() : undefined;
  const onAbort = () => controller?.abort();

  if (signal) {
    if (signal.aborted) {
      controller?.abort();
    } else {
      signal.addEventListener('abort', onAbort, { once: true });
    }
  }

  const timeoutId =
    timeoutMs != null
      ? setTimeout(() => {
          controller?.abort();
        }, timeoutMs)
      : undefined;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller?.signal ?? signal,
      // Next.js caching behavior
      cache: 'no-store'
    });

    if (!res.ok) {
      let errorMsg = `API Error: ${res.status}`;
      try {
        const errorJson = await res.json();
        if (errorJson.error) errorMsg = errorJson.error;
      } catch {
        // Fallback if not JSON
      }
      throw new Error(errorMsg);
    }

    return res.json();
  } finally {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }
    if (signal) {
      signal.removeEventListener('abort', onAbort);
    }
  }
}

/**
 * Generic POST request wrapper.
 */
export async function apiPost<T>(path: string, body: any): Promise<T> {
  const url = `${BASE_URL}${path}`;
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`API POST Error: ${res.status}`);
  }

  return res.json();
}
