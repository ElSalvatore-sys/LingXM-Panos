import { useState, useEffect, useMemo, useCallback } from 'react';
import type { UniversalVocabulary, LanguagePairWord, LanguageCode } from '@/types';

let cachedData: UniversalVocabulary | null = null;

export function useUniversalVocab(nativeLanguage: LanguageCode, targetLanguage: LanguageCode) {
  const [data, setData] = useState<UniversalVocabulary | null>(cachedData);
  const [isLoading, setIsLoading] = useState(!cachedData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedData) {
      setData(cachedData);
      return;
    }

    const loadData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/data/universal/vocabulary.json');
        if (!response.ok) throw new Error('Failed to load universal vocabulary');
        const json = await response.json();
        cachedData = json;
        setData(json);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Get a word filtered by language pair
  const getWord = useCallback((wordText: string): LanguagePairWord | null => {
    if (!data) return null;

    // Find word by matching translations in target language
    const wordEntry = Object.values(data.words).find(
      w => w.translations[targetLanguage]?.toLowerCase() === wordText.toLowerCase()
    );

    if (!wordEntry) return null;

    // Get examples paired by index
    const targetExamples = wordEntry.examples[targetLanguage] || [];
    const nativeExamples = wordEntry.examples[nativeLanguage] || [];

    return {
      id: wordEntry.id,
      word: wordEntry.translations[targetLanguage] || wordEntry.word,
      translation: wordEntry.translations[nativeLanguage] || '',
      explanation: wordEntry.explanation[nativeLanguage] || wordEntry.explanation['en'] || '',
      examples: targetExamples.map((sentence, i) => ({
        sentence,
        translation: nativeExamples[i] || ''
      })),
      category: wordEntry.category,
      level: wordEntry.cefrLevel || wordEntry.level,
      frequencyRank: wordEntry.frequency_rank
    };
  }, [data, nativeLanguage, targetLanguage]);

  // Check if a word exists in universal data
  const hasWord = useCallback((wordText: string): boolean => {
    if (!data) return false;
    return Object.values(data.words).some(
      w => w.translations[targetLanguage]?.toLowerCase() === wordText.toLowerCase()
    );
  }, [data, targetLanguage]);

  // Get supported languages
  const supportedLanguages = useMemo(() => {
    return data?.meta.languages || [];
  }, [data]);

  // Check if current language pair is fully supported
  const isLanguagePairSupported = useMemo(() => {
    return supportedLanguages.includes(nativeLanguage) &&
           supportedLanguages.includes(targetLanguage);
  }, [supportedLanguages, nativeLanguage, targetLanguage]);

  return {
    data,
    isLoading,
    error,
    getWord,
    hasWord,
    supportedLanguages,
    isLanguagePairSupported,
    totalWords: data?.meta.totalWords || 0
  };
}
