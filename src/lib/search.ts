import type { Word, SearchFilters, TranslationMap } from '@/types';

/**
 * Search words that start with the query string
 */
export function searchByWord(words: Word[], query: string): Word[] {
  if (!query.trim()) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();

  return words.filter((word) =>
    word.word.toLowerCase().startsWith(normalizedQuery)
  );
}

/**
 * Search words that contain the query string
 */
export function searchByContains(words: Word[], query: string): Word[] {
  if (!query.trim()) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();

  return words.filter((word) =>
    word.word.toLowerCase().includes(normalizedQuery)
  );
}

/**
 * Filter words by difficulty levels
 */
export function filterByDifficulty(words: Word[], levels: number[]): Word[] {
  if (levels.length === 0) {
    return words;
  }

  return words.filter((word) => levels.includes(word.difficulty));
}

/**
 * Sort words by frequency (most common first)
 */
export function sortByFrequency(words: Word[]): Word[] {
  return [...words].sort((a, b) => b.frequency - a.frequency);
}

/**
 * Sort words by rank (most common first)
 */
export function sortByRank(words: Word[]): Word[] {
  return [...words].sort((a, b) => a.rank - b.rank);
}

/**
 * Get mock example sentences containing a word
 * TODO: Replace with real sentence database
 */
export function getExampleSentences(word: string, language: string): string[] {
  // Mock sentences - in real app, fetch from sentence database
  const mockSentences: Record<string, string[]> = {
    de: [
      `Das Wort "${word}" ist sehr wichtig.`,
      `Können Sie "${word}" in einem Satz verwenden?`,
      `Ich habe "${word}" heute gelernt.`,
    ],
    en: [
      `The word "${word}" is commonly used.`,
      `Can you use "${word}" in a sentence?`,
      `I learned "${word}" today.`,
    ],
    fr: [
      `Le mot "${word}" est très courant.`,
      `Pouvez-vous utiliser "${word}" dans une phrase?`,
    ],
    es: [
      `La palabra "${word}" es muy común.`,
      `¿Puedes usar "${word}" en una oración?`,
    ],
  };

  return mockSentences[language] || mockSentences.en;
}

/**
 * Perform a full search with all filters (legacy version)
 */
export function performSearch(
  words: Word[],
  query: string,
  difficultyLevel: number,
  maxResults: number = 50
): Word[] {
  let results = searchByWord(words, query);

  // If no results with startsWith, try contains
  if (results.length === 0 && query.length >= 2) {
    results = searchByContains(words, query);
  }

  // Filter by difficulty if specified (1-5, filter all words up to that level)
  if (difficultyLevel > 0) {
    const levels = Array.from({ length: difficultyLevel }, (_, i) => i + 1);
    results = filterByDifficulty(results, levels);
  }

  // Sort by rank (most common first)
  results = sortByRank(results);

  // Limit results
  return results.slice(0, maxResults);
}

/**
 * Advanced search with comprehensive filters
 */
export function performAdvancedSearch(
  words: Word[],
  query: string,
  filters: SearchFilters,
  translations: TranslationMap,
  options?: {
    learnedWordIds?: Set<number>;
    bookmarkedWordIds?: Set<number>;
    wordsWithExamples?: Set<number>;
    maxResults?: number;
  }
): Word[] {
  const {
    learnedWordIds = new Set(),
    bookmarkedWordIds = new Set(),
    wordsWithExamples = new Set(),
    maxResults = 100,
  } = options || {};

  // Start with query search
  let results = searchByWord(words, query);

  // If no results with startsWith, try contains
  if (results.length === 0 && query.length >= 2) {
    results = searchByContains(words, query);
  }

  // Apply filters
  results = results.filter((word) => {
    // Difficulty filter
    if (filters.difficulty.length > 0 && filters.difficulty.length < 5) {
      if (!filters.difficulty.includes(word.difficulty)) {
        return false;
      }
    }

    // Word length filter
    const wordLength = word.word.length;
    if (wordLength < filters.wordLengthMin || wordLength > filters.wordLengthMax) {
      return false;
    }

    // Frequency rank filter
    if (word.rank < filters.frequencyMin || word.rank > filters.frequencyMax) {
      return false;
    }

    // Part of speech filter (requires translation data)
    if (filters.partOfSpeech.length > 0) {
      const translation = translations[word.word.toLowerCase()];
      if (!translation || !filters.partOfSpeech.includes(translation.partOfSpeech)) {
        return false;
      }
    }

    // Gender filter (requires translation data, only for nouns)
    if (filters.gender.length > 0) {
      const translation = translations[word.word.toLowerCase()];
      if (!translation || !translation.gender || !filters.gender.includes(translation.gender)) {
        return false;
      }
    }

    // Has examples filter
    if (filters.hasExamples === true && !wordsWithExamples.has(word.id)) {
      return false;
    }
    if (filters.hasExamples === false && wordsWithExamples.has(word.id)) {
      return false;
    }

    // Bookmarked only filter
    if (filters.bookmarkedOnly && !bookmarkedWordIds.has(word.id)) {
      return false;
    }

    // Not learned only filter
    if (filters.notLearnedOnly && learnedWordIds.has(word.id)) {
      return false;
    }

    return true;
  });

  // Sort by rank (most common first)
  results = sortByRank(results);

  // Limit results
  return results.slice(0, maxResults);
}

/**
 * Get filter statistics for the current vocabulary
 */
export function getFilterStats(
  words: Word[],
  translations: TranslationMap
): {
  partOfSpeechCounts: Record<string, number>;
  genderCounts: Record<string, number>;
  difficultyDistribution: Record<number, number>;
  wordLengthRange: { min: number; max: number };
  frequencyRange: { min: number; max: number };
} {
  const partOfSpeechCounts: Record<string, number> = {};
  const genderCounts: Record<string, number> = {};
  const difficultyDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let minLength = Infinity;
  let maxLength = 0;
  let minRank = Infinity;
  let maxRank = 0;

  for (const word of words) {
    // Difficulty distribution
    difficultyDistribution[word.difficulty] = (difficultyDistribution[word.difficulty] || 0) + 1;

    // Word length
    const len = word.word.length;
    if (len < minLength) minLength = len;
    if (len > maxLength) maxLength = len;

    // Frequency rank
    if (word.rank < minRank) minRank = word.rank;
    if (word.rank > maxRank) maxRank = word.rank;

    // Part of speech and gender from translations
    const translation = translations[word.word.toLowerCase()];
    if (translation) {
      const pos = translation.partOfSpeech;
      partOfSpeechCounts[pos] = (partOfSpeechCounts[pos] || 0) + 1;

      if (translation.gender) {
        genderCounts[translation.gender] = (genderCounts[translation.gender] || 0) + 1;
      }
    }
  }

  return {
    partOfSpeechCounts,
    genderCounts,
    difficultyDistribution,
    wordLengthRange: { min: minLength === Infinity ? 1 : minLength, max: maxLength || 30 },
    frequencyRange: { min: minRank === Infinity ? 1 : minRank, max: maxRank || 10000 },
  };
}
