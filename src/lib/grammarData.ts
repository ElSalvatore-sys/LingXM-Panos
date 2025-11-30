import type { LanguageCode } from '@/types'

// Types for grammar data
export interface TranslationData {
  translation: string
  partOfSpeech?: string
  gender?: 'm' | 'f' | 'n'
}

export interface TranslationsFile {
  meta: {
    fromLanguage: string
    toLanguage: string
    wordCount: number
    lastUpdated: string
  }
  translations: Record<string, TranslationData>
}

export interface ExampleSentence {
  sentence: string
  translation: string
}

export interface ExamplesFile {
  meta: {
    language: string
    wordCount: number
    sentenceCount: number
    lastUpdated: string
  }
  examples: Record<string, ExampleSentence[]>
}

export interface DeclensionCase {
  singular: string
  plural: string
}

export interface NounDeclension {
  gender: 'm' | 'f' | 'n'
  translation: string
  declension: {
    nominativ: DeclensionCase
    genitiv: DeclensionCase
    dativ: DeclensionCase
    akkusativ: DeclensionCase
  }
}

export interface DeclensionsFile {
  meta: {
    language: string
    nounCount: number
    lastUpdated: string
  }
  nouns: Record<string, NounDeclension>
}

export interface VerbConjugation {
  translation: string
  type: 'regular' | 'irregular' | 'modal'
  auxiliary: 'haben' | 'sein'
  conjugations: {
    präsens: Record<string, string>
    präteritum: Record<string, string>
    perfekt: Record<string, string>
  }
}

export interface ConjugationsFile {
  meta: {
    language: string
    verbCount: number
    lastUpdated: string
  }
  verbs: Record<string, VerbConjugation>
}

// Cache for loaded data
const dataCache: {
  translations: Record<string, TranslationsFile | null>
  examples: Record<string, ExamplesFile | null>
  declensions: Record<string, DeclensionsFile | null>
  conjugations: Record<string, ConjugationsFile | null>
} = {
  translations: {},
  examples: {},
  declensions: {},
  conjugations: {},
}

// Generic fetch with caching
async function fetchJson<T>(path: string, cacheKey: string, cache: Record<string, T | null>): Promise<T | null> {
  if (cacheKey in cache) {
    return cache[cacheKey]
  }

  try {
    const response = await fetch(path)
    if (!response.ok) {
      cache[cacheKey] = null
      return null
    }
    const data = await response.json() as T
    cache[cacheKey] = data
    return data
  } catch (error) {
    console.warn(`Failed to load ${path}:`, error)
    cache[cacheKey] = null
    return null
  }
}

/**
 * Load translations for a language pair (e.g., de-en)
 */
export async function loadTranslations(fromLang: LanguageCode, toLang: string = 'en'): Promise<TranslationsFile | null> {
  const cacheKey = `${fromLang}-${toLang}`
  return fetchJson<TranslationsFile>(
    `/data/translations/${cacheKey}.json`,
    cacheKey,
    dataCache.translations
  )
}

/**
 * Load example sentences for a language
 */
export async function loadExamples(language: LanguageCode): Promise<ExamplesFile | null> {
  return fetchJson<ExamplesFile>(
    `/data/examples/${language}.json`,
    language,
    dataCache.examples
  )
}

/**
 * Load noun declensions for a language (currently only German)
 */
export async function loadDeclensions(language: LanguageCode): Promise<DeclensionsFile | null> {
  return fetchJson<DeclensionsFile>(
    `/data/grammar/${language}-declensions.json`,
    language,
    dataCache.declensions
  )
}

/**
 * Load verb conjugations for a language (currently only German)
 */
export async function loadConjugations(language: LanguageCode): Promise<ConjugationsFile | null> {
  return fetchJson<ConjugationsFile>(
    `/data/grammar/${language}-conjugations.json`,
    language,
    dataCache.conjugations
  )
}

/**
 * Get translation for a specific word
 */
export async function getTranslation(word: string, language: LanguageCode): Promise<TranslationData | null> {
  const translations = await loadTranslations(language)
  if (!translations) return null

  // Try exact match first, then lowercase
  return translations.translations[word] || translations.translations[word.toLowerCase()] || null
}

/**
 * Get example sentences for a specific word
 */
export async function getExamples(word: string, language: LanguageCode): Promise<ExampleSentence[] | null> {
  const examples = await loadExamples(language)
  if (!examples) return null

  // Try exact match first, then lowercase
  return examples.examples[word] || examples.examples[word.toLowerCase()] || null
}

/**
 * Get noun declension for a specific word (German only)
 */
export async function getDeclension(word: string, language: LanguageCode): Promise<NounDeclension | null> {
  if (language !== 'de') return null

  const declensions = await loadDeclensions(language)
  if (!declensions) return null

  return declensions.nouns[word] || declensions.nouns[word.toLowerCase()] || null
}

/**
 * Get verb conjugation for a specific word (German only)
 */
export async function getConjugation(word: string, language: LanguageCode): Promise<VerbConjugation | null> {
  if (language !== 'de') return null

  const conjugations = await loadConjugations(language)
  if (!conjugations) return null

  return conjugations.verbs[word] || conjugations.verbs[word.toLowerCase()] || null
}

/**
 * Preload all grammar data for a language
 * Call this on app init to warm the cache
 */
export async function preloadGrammarData(language: LanguageCode): Promise<void> {
  await Promise.all([
    loadTranslations(language),
    loadExamples(language),
    loadDeclensions(language),
    loadConjugations(language),
  ])
}

/**
 * Clear the grammar data cache
 */
export function clearCache(): void {
  dataCache.translations = {}
  dataCache.examples = {}
  dataCache.declensions = {}
  dataCache.conjugations = {}
}
