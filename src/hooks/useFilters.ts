import { useState, useCallback, useMemo } from 'react';
import type { SearchFilters } from '@/types';
import { defaultSearchFilters } from '@/types';

interface UseFiltersReturn {
  // Current applied filters
  filters: SearchFilters;

  // Pending filters (before apply)
  pendingFilters: SearchFilters;

  // Update pending filters
  updatePendingFilters: (updates: Partial<SearchFilters>) => void;

  // Apply pending filters
  applyFilters: () => void;

  // Reset to defaults
  resetFilters: () => void;

  // Check if there are pending changes
  hasChanges: boolean;

  // Count of active filters (non-default)
  activeFiltersCount: number;
}

function filtersAreEqual(a: SearchFilters, b: SearchFilters): boolean {
  return (
    a.wordLimit === b.wordLimit &&
    a.bookmarkedOnly === b.bookmarkedOnly &&
    a.notLearnedOnly === b.notLearnedOnly &&
    a.hasExamples === b.hasExamples
  );
}

function countActiveFilters(filters: SearchFilters, defaults: SearchFilters): number {
  let count = 0;

  // Word limit: count if changed from default
  if (filters.wordLimit !== defaults.wordLimit) count++;

  // Quick filters
  if (filters.bookmarkedOnly) count++;
  if (filters.notLearnedOnly) count++;
  if (filters.hasExamples !== null) count++;

  return count;
}

export function useFilters(
  initialFilters: SearchFilters = defaultSearchFilters
): UseFiltersReturn {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [pendingFilters, setPendingFilters] = useState<SearchFilters>(initialFilters);

  const updatePendingFilters = useCallback((updates: Partial<SearchFilters>) => {
    setPendingFilters((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const applyFilters = useCallback(() => {
    setFilters(pendingFilters);
  }, [pendingFilters]);

  const resetFilters = useCallback(() => {
    setPendingFilters(defaultSearchFilters);
    setFilters(defaultSearchFilters);
  }, []);

  const hasChanges = useMemo(() => {
    return !filtersAreEqual(filters, pendingFilters);
  }, [filters, pendingFilters]);

  const activeFiltersCount = useMemo(() => {
    return countActiveFilters(filters, defaultSearchFilters);
  }, [filters]);

  return {
    filters,
    pendingFilters,
    updatePendingFilters,
    applyFilters,
    resetFilters,
    hasChanges,
    activeFiltersCount,
  };
}
