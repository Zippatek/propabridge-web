import { useQuery } from '@tanstack/react-query';
import { fetchListings, fetchPropertyFilters, fetchListing } from '@/lib/api';

/**
 * Hook to fetch property categories/filters.
 * Replaces the manual fetchPropertyFilters logic.
 */
export function usePropertyFilters() {
  return useQuery({
    queryKey: ['property-filters'],
    queryFn: () => fetchPropertyFilters(),
    staleTime: 1000 * 60 * 30, // 30 minutes (taxonomy rarely changes)
    retry: 2,
  });
}

/**
 * Hook to fetch property listings with optional filters.
 */
export function useListings(params?: { status?: string; type?: string; limit?: number }) {
  return useQuery({
    queryKey: ['listings', params],
    queryFn: () => fetchListings(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch a single property by ID or slug.
 */
export function useProperty(id: string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchListing(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
