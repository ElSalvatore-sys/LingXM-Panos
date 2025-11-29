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

// Word from vocabulary database
export interface Word {
  id: number;
  word: string;
  translation: string;
  frequency: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  partOfSpeech: string;
  examples: string[];
  declensions?: Record<string, string>;
  conjugations?: Record<string, string>;
  audio?: string;
}

// Search filters
export interface SearchFilters {
  difficulty: number[];
  contentLength: number[];
  query: string;
}

// User progress (for later)
export interface UserProgress {
  learnedWords: number[];
  savedWords: number[];
  currentStreak: number;
  lastPractice: Date | null;
}
