import type { Word } from '@/types';

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
 * Perform a full search with all filters
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
