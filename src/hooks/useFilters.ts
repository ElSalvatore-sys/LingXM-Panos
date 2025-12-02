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
    JSON.stringify(a.difficulty.sort()) === JSON.stringify(b.difficulty.sort()) &&
    JSON.stringify(a.partOfSpeech.sort()) === JSON.stringify(b.partOfSpeech.sort()) &&
    JSON.stringify(a.gender.sort()) === JSON.stringify(b.gender.sort()) &&
    a.wordLengthMin === b.wordLengthMin &&
    a.wordLengthMax === b.wordLengthMax &&
    a.frequencyMin === b.frequencyMin &&
    a.frequencyMax === b.frequencyMax &&
    a.hasExamples === b.hasExamples &&
    a.bookmarkedOnly === b.bookmarkedOnly &&
    a.notLearnedOnly === b.notLearnedOnly
  );
}

function countActiveFilters(filters: SearchFilters, defaults: SearchFilters): number {
  let count = 0;

  // Difficulty: count if not all 5 selected
  if (filters.difficulty.length < 5) count++;

  // Part of speech: count if any selected
  if (filters.partOfSpeech.length > 0) count++;

  // Gender: count if any selected
  if (filters.gender.length > 0) count++;

  // Word length: count if changed from defaults
  if (
    filters.wordLengthMin !== defaults.wordLengthMin ||
    filters.wordLengthMax !== defaults.wordLengthMax
  ) {
    count++;
  }

  // Frequency: count if changed from defaults
  if (
    filters.frequencyMin !== defaults.frequencyMin ||
    filters.frequencyMax !== defaults.frequencyMax
  ) {
    count++;
  }

  // Quick filters
  if (filters.hasExamples !== null) count++;
  if (filters.bookmarkedOnly) count++;
  if (filters.notLearnedOnly) count++;

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
