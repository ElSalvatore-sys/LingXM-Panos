import { useState, useEffect, useCallback } from 'react';
import type { Word, VocabularyData, LanguageCode } from '@/types';
import { performSearch } from '@/lib/search';

interface UseVocabularyReturn {
  words: Word[];
  isLoading: boolean;
  error: string | null;
  searchWords: (query: string, difficultyLevel?: number) => Word[];
  totalWords: number;
  languageName: string;
}

/**
 * Hook to load and search vocabulary for a given language
 */
export function useVocabulary(languageCode: LanguageCode): UseVocabularyReturn {
  const [data, setData] = useState<VocabularyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load vocabulary data for the language
  useEffect(() => {
    let isMounted = true;

    async function loadVocabulary() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/data/${languageCode}.json`);

        if (!response.ok) {
          throw new Error(`Failed to load vocabulary for ${languageCode}`);
        }

        const vocabData: VocabularyData = await response.json();

        if (isMounted) {
          setData(vocabData);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load vocabulary');
          setIsLoading(false);
        }
      }
    }

    loadVocabulary();

    return () => {
      isMounted = false;
    };
  }, [languageCode]);

  // Search function
  const searchWords = useCallback(
    (query: string, difficultyLevel: number = 0): Word[] => {
      if (!data?.words) {
        return [];
      }

      return performSearch(data.words, query, difficultyLevel);
    },
    [data]
  );

  return {
    words: data?.words || [],
    isLoading,
    error,
    searchWords,
    totalWords: data?.totalWords || 0,
    languageName: data?.languageName || '',
  };
}
