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

// Example sentence with translation
export interface ExampleSentence {
  sentence: string;
  translation: string;
}

// Full noun declension data
export interface NounDeclension {
  gender: 'm' | 'f' | 'n';
  translation: string;
  declension: {
    nominativ: { singular: string; plural: string };
    genitiv: { singular: string; plural: string };
    dativ: { singular: string; plural: string };
    akkusativ: { singular: string; plural: string };
  };
}

// Full verb conjugation data (flexible for all languages)
export interface VerbConjugation {
  translation: string;
  type: 'regular' | 'irregular' | 'modal';
  auxiliary?: 'haben' | 'sein';  // German-specific, optional for other languages
  root?: string;  // For Turkish agglutinative verbs
  conjugations: Record<string, Record<string, string>>;  // Flexible tenses per language
}

// Extended word details for modal display
export interface WordDetail extends Word {
  translation?: string;
  partOfSpeech?: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'pronoun' | 'article' | 'other';
  gender?: 'masculine' | 'feminine' | 'neuter';
  examples?: string[];
  conjugation?: Record<string, string>;  // For verbs: ich gehe, du gehst, etc.
  declension?: Record<string, string>;   // For nouns: der Hund, des Hundes, etc.
  synonyms?: string[];
  isBookmarked?: boolean;
  isLearned?: boolean;
  // New fields for real data
  hasRealData?: boolean;
  fullConjugation?: VerbConjugation;      // Full conjugation data with all tenses
  fullDeclension?: NounDeclension;        // Full declension data with all cases
  examplesWithTranslations?: ExampleSentence[];  // Examples with English translations
}

// Vocabulary data structure (matches JSON file)
export interface VocabularyData {
  language: string;
  languageName: string;
  totalWords: number;
  words: Word[];
}

// Search filters - comprehensive filter state
export interface SearchFilters {
  difficulty: number[]; // [1,2,3,4,5] - which levels to include
  partOfSpeech: string[]; // ['noun', 'verb', 'adjective', ...]
  gender: string[]; // ['m', 'f', 'n'] - for German nouns
  wordLengthMin: number;
  wordLengthMax: number;
  frequencyMin: number; // rank-based (1 = most frequent)
  frequencyMax: number;
  hasExamples: boolean | null; // null = don't filter
  bookmarkedOnly: boolean;
  notLearnedOnly: boolean;
}

// Default filter values
export const defaultSearchFilters: SearchFilters = {
  difficulty: [1, 2, 3, 4, 5],
  partOfSpeech: [],
  gender: [],
  wordLengthMin: 1,
  wordLengthMax: 30,
  frequencyMin: 1,
  frequencyMax: 10000,
  hasExamples: null,
  bookmarkedOnly: false,
  notLearnedOnly: false,
};

// Sidebar state
export interface SidebarState {
  isOpen: boolean;
  activeSection: string | null;
}

// Part of speech options with display info
export interface PartOfSpeechOption {
  value: string;
  label: string;
  count?: number;
}

// Translation data from translations file
export interface TranslationEntry {
  translation: string;
  partOfSpeech: string;
  gender?: 'm' | 'f' | 'n';
  baseForm?: string;
}

export type TranslationMap = Record<string, TranslationEntry>;

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

// Flashcard types
export type FlashcardRating = 0 | 1 | 2 | 3 | 4 | 5; // 0=again, 1=hard, 2=good, 3=easy, 4=very easy, 5=perfect

export interface Flashcard {
  id: number;
  wordId: number;
  word: string;
  translation: string;
  difficulty: number;
  language: LanguageCode;
  // SM-2 algorithm fields
  lastReviewed: string | null;  // ISO date string
  nextReview: string | null;    // ISO date string
  easeFactor: number;           // Default 2.5, min 1.3
  interval: number;             // Days until next review
  repetitions: number;          // Times reviewed successfully
}

export interface FlashcardSession {
  cards: Flashcard[];
  currentIndex: number;
  correctCount: number;
  incorrectCount: number;
  startTime: string;  // ISO date string
  isComplete: boolean;
}

export interface FlashcardStats {
  totalCards: number;
  dueToday: number;
  newCards: number;
  masteredCards: number;
  averageEase: number;
}
