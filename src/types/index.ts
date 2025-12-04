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

// Search filters - simplified filter state
export interface SearchFilters {
  wordLimit: number; // Show top N words by frequency rank (10, 50, 100, 500, 1000, 5000, Infinity)
  bookmarkedOnly: boolean;
  notLearnedOnly: boolean;
  hasExamples: boolean | null; // null = don't filter
}

// Default filter values
export const defaultSearchFilters: SearchFilters = {
  wordLimit: 1000, // Default to top 1000 most frequent words
  bookmarkedOnly: false,
  notLearnedOnly: false,
  hasExamples: null,
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

// Universal vocabulary (multi-language per word)
export interface UniversalWord {
  id: string;
  word: string;
  category: string;
  frequency_rank: number;
  level: string;
  cefrLevel: string;
  translations: Record<string, string>;
  explanation: Record<string, string>;
  examples: Record<string, string[]>;
  conjugations: unknown | null;
}

export interface UniversalVocabulary {
  meta: {
    totalWords: number;
    languages: string[];
    lastUpdated: string;
    source: string;
  };
  words: Record<string, UniversalWord>;
}

// Language pair filtered data (what components receive)
export interface LanguagePairWord {
  id: string;
  word: string;
  translation: string;
  explanation: string;
  examples: Array<{ sentence: string; translation: string }>;
  category: string;
  level: string;
  frequencyRank: number;
}

// Premium packages
export interface PremiumPackage {
  id: string;
  name: string;
  nameTranslations: Record<string, string>;
  description: string;
  icon: string;
  language: LanguageCode;
  level: string;
  domain: string;
  wordCount: number;
  sentenceCount: number;
  price: number;
  isLocked: boolean;
  dataFile: string;
}

export interface PremiumPackagesData {
  packages: PremiumPackage[];
}
