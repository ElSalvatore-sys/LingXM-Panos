import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Word, VocabularyData, LanguageCode, TranslationMap, SearchFilters } from '@/types';
import { performSearch, performAdvancedSearch, getFilterStats } from '@/lib/search';

interface UseVocabularyReturn {
  words: Word[];
  isLoading: boolean;
  error: string | null;
  searchWords: (query: string, difficultyLevel?: number) => Word[];
  advancedSearch: (
    query: string,
    filters: SearchFilters,
    options?: {
      learnedWordIds?: Set<number>;
      bookmarkedWordIds?: Set<number>;
      wordsWithExamples?: Set<number>;
    }
  ) => Word[];
  totalWords: number;
  languageName: string;
  translations: TranslationMap;
  filterStats: ReturnType<typeof getFilterStats> | null;
  wordsWithExamples: Set<number>;
}

/**
 * Hook to load and search vocabulary for a given language
 * IMPORTANT: This hook ONLY loads vocabulary for the specified language
 */
export function useVocabulary(languageCode: LanguageCode): UseVocabularyReturn {
  const [data, setData] = useState<VocabularyData | null>(null);
  const [translations, setTranslations] = useState<TranslationMap>({});
  const [wordsWithExamples, setWordsWithExamples] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load vocabulary data and translations for the language
  useEffect(() => {
    let isMounted = true;

    // Clear previous data immediately when language changes
    setData(null);
    setTranslations({});
    setWordsWithExamples(new Set());
    setIsLoading(true);
    setError(null);

    async function loadData() {
      try {
        // Load vocabulary and translations in parallel
        const [vocabResponse, transResponse] = await Promise.all([
          fetch(`/data/${languageCode}.json`),
          fetch(`/data/translations/${languageCode}-en.json`).catch(() => null), // Translations might not exist
        ]);

        if (!vocabResponse.ok) {
          throw new Error(`Failed to load vocabulary for ${languageCode}`);
        }

        const vocabData: VocabularyData = await vocabResponse.json();

        // Load translations if available
        let transData: TranslationMap = {};
        if (transResponse?.ok) {
          transData = await transResponse.json();
        }

        // Build set of words with examples
        const examplesSet = new Set<number>();
        for (const word of vocabData.words) {
          // Check if word has examples in translation data
          // For now, we'll mark words that have translation entries as potentially having examples
          // In a real app, this would come from an examples database
          if (transData[word.word.toLowerCase()]) {
            // Randomly assign ~15% of words as having examples for demo purposes
            if (word.id % 7 === 0) {
              examplesSet.add(word.id);
            }
          }
        }

        if (isMounted) {
          setData(vocabData);
          setTranslations(transData);
          setWordsWithExamples(examplesSet);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load vocabulary');
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [languageCode]);

  // Compute filter stats when data or translations change
  const filterStats = useMemo(() => {
    if (!data?.words) return null;
    return getFilterStats(data.words, translations);
  }, [data, translations]);

  // Legacy search function
  const searchWords = useCallback(
    (query: string, difficultyLevel: number = 0): Word[] => {
      if (!data?.words) {
        return [];
      }

      return performSearch(data.words, query, difficultyLevel);
    },
    [data]
  );

  // Advanced search function with all filters
  const advancedSearch = useCallback(
    (
      query: string,
      filters: SearchFilters,
      options?: {
        learnedWordIds?: Set<number>;
        bookmarkedWordIds?: Set<number>;
        wordsWithExamples?: Set<number>;
      }
    ): Word[] => {
      if (!data?.words) {
        return [];
      }

      return performAdvancedSearch(data.words, query, filters, translations, {
        ...options,
        wordsWithExamples: options?.wordsWithExamples || wordsWithExamples,
      });
    },
    [data, translations, wordsWithExamples]
  );

  return {
    words: data?.words || [],
    isLoading,
    error,
    searchWords,
    advancedSearch,
    totalWords: data?.totalWords || 0,
    languageName: data?.languageName || '',
    translations,
    filterStats,
    wordsWithExamples,
  };
}
