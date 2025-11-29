// Language codes supported by LingXM
export type LanguageCode = 'de' | 'en' | 'es' | 'fr' | 'it' | 'ru' | 'el' | 'tr' | 'pt';

// Site UI language (subset of above)
export type SiteLanguage = 'en' | 'de' | 'fr' | 'es' | 'ru' | 'el';

// Language metadata
export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string; // path to flag image
}

// Word from vocabulary database (matches JSON structure)
export interface Word {
  id: number;
  word: string;
  frequency: number;
  rank: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
}

// Vocabulary data structure (matches JSON file)
export interface VocabularyData {
  language: string;
  languageName: string;
  totalWords: number;
  words: Word[];
}

// Search filters
export interface SearchFilters {
  difficulty: number[];
  contentLength: number[];
  query: string;
}

// Search result for display
export interface SearchResult {
  id: number;
  word: string;
  rank: number;
  frequency: number;
  difficulty: number;
  examples?: string[];
}

// User progress (for later)
export interface UserProgress {
  learnedWords: number[];
  savedWords: number[];
  currentStreak: number;
  lastPractice: Date | null;
}
