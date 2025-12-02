import type { LanguageCode } from '@/types'

// Types for grammar data
export interface TranslationData {
  translation: string
  partOfSpeech?: string
  gender?: 'm' | 'f' | 'n'
}

export interface TranslationsFile {
  meta?: {
    fromLanguage: string
    toLanguage: string
    wordCount: number
    lastUpdated: string
  }
  language?: string
  targetLanguage?: string
  translations: Record<string, TranslationData> | TranslationArrayEntry[]
}

// Array format entry for translations
export interface TranslationArrayEntry {
  word: string
  translation: string
  partOfSpeech?: string
  gender?: 'm' | 'f' | 'n'
}

// Normalized translations file
export interface NormalizedTranslationsFile {
  language: string
  targetLanguage: string
  translations: Record<string, TranslationData>
}

export interface ExampleSentence {
  sentence: string
  translation: string
}

export interface ExamplesFile {
  meta?: {
    language: string
    wordCount: number
    sentenceCount: number
    lastUpdated: string
  }
  language?: string
  examples: Record<string, ExampleSentence[]> | ExampleArrayEntry[]
}

// Array format entry for examples
export interface ExampleArrayEntry {
  word: string
  sentences: ExampleSentence[]
}

// Normalized examples file
export interface NormalizedExamplesFile {
  language: string
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
  auxiliary?: 'haben' | 'sein'  // German-specific, optional for other languages
  root?: string  // For Turkish agglutinative verbs
  conjugations: Record<string, Record<string, string>>  // Flexible tenses per language
}

// Raw verb entry for array-format conjugation files (es, fr, el, pt, ru, tr)
export interface VerbArrayEntry {
  infinitive: string
  translation: string
  type: 'regular' | 'irregular' | 'modal'
  root?: string  // For Turkish
  conjugations: Record<string, Record<string, string>>
}

// Raw file format - can be object or array
export interface RawConjugationsFile {
  meta?: {
    language: string
    verbCount: number
    lastUpdated: string
  }
  language?: string  // Array format uses this instead of meta
  verbs: Record<string, VerbConjugation> | VerbArrayEntry[]
}

// Normalized format used internally
export interface ConjugationsFile {
  meta?: {
    language: string
    verbCount: number
    lastUpdated: string
  }
  language?: string
  verbs: Record<string, VerbConjugation>
}

// Cache for loaded data (normalized format)
const dataCache: {
  translations: Record<string, NormalizedTranslationsFile | null>
  examples: Record<string, NormalizedExamplesFile | null>
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
 * Handles both object format (de, en) and array format (es, fr, el, pt, ru, tr)
 */
export async function loadTranslations(fromLang: LanguageCode, toLang: string = 'en'): Promise<NormalizedTranslationsFile | null> {
  const cacheKey = `${fromLang}-${toLang}`

  // Check cache first
  if (cacheKey in dataCache.translations) {
    return dataCache.translations[cacheKey]
  }

  try {
    const response = await fetch(`/data/translations/${cacheKey}.json`)
    if (!response.ok) {
      dataCache.translations[cacheKey] = null
      return null
    }
    const rawData = await response.json() as TranslationsFile

    // Normalize array format to object format
    let normalizedData: NormalizedTranslationsFile
    if (Array.isArray(rawData.translations)) {
      // Array format - convert to object keyed by word
      const translationsObject: Record<string, TranslationData> = {}
      for (const entry of rawData.translations as TranslationArrayEntry[]) {
        translationsObject[entry.word] = {
          translation: entry.translation,
          partOfSpeech: entry.partOfSpeech,
          gender: entry.gender
        }
      }
      normalizedData = {
        language: rawData.language || rawData.meta?.fromLanguage || fromLang,
        targetLanguage: rawData.targetLanguage || rawData.meta?.toLanguage || toLang,
        translations: translationsObject
      }
    } else {
      // Object format - use as-is
      normalizedData = {
        language: rawData.meta?.fromLanguage || fromLang,
        targetLanguage: rawData.meta?.toLanguage || toLang,
        translations: rawData.translations as Record<string, TranslationData>
      }
    }

    dataCache.translations[cacheKey] = normalizedData
    return normalizedData
  } catch (error) {
    console.warn(`Failed to load translations for ${cacheKey}:`, error)
    dataCache.translations[cacheKey] = null
    return null
  }
}

/**
 * Load example sentences for a language
 * Handles both object format (de, en) and array format (es, fr, el, pt, ru, tr)
 */
export async function loadExamples(language: LanguageCode): Promise<NormalizedExamplesFile | null> {
  // Check cache first
  if (language in dataCache.examples) {
    return dataCache.examples[language]
  }

  try {
    const response = await fetch(`/data/examples/${language}.json`)
    if (!response.ok) {
      dataCache.examples[language] = null
      return null
    }
    const rawData = await response.json() as ExamplesFile

    // Normalize array format to object format
    let normalizedData: NormalizedExamplesFile
    if (Array.isArray(rawData.examples)) {
      // Array format - convert to object keyed by word
      const examplesObject: Record<string, ExampleSentence[]> = {}
      for (const entry of rawData.examples as ExampleArrayEntry[]) {
        examplesObject[entry.word] = entry.sentences
      }
      normalizedData = {
        language: rawData.language || rawData.meta?.language || language,
        examples: examplesObject
      }
    } else {
      // Object format - use as-is
      normalizedData = {
        language: rawData.meta?.language || language,
        examples: rawData.examples as Record<string, ExampleSentence[]>
      }
    }

    dataCache.examples[language] = normalizedData
    return normalizedData
  } catch (error) {
    console.warn(`Failed to load examples for ${language}:`, error)
    dataCache.examples[language] = null
    return null
  }
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
 * Load verb conjugations for a language
 * Handles both object format (de, en) and array format (es, fr, el, pt, ru, tr)
 */
export async function loadConjugations(language: LanguageCode): Promise<ConjugationsFile | null> {
  // Check cache first
  if (language in dataCache.conjugations) {
    return dataCache.conjugations[language]
  }

  try {
    const response = await fetch(`/data/grammar/${language}-conjugations.json`)
    if (!response.ok) {
      dataCache.conjugations[language] = null
      return null
    }
    const rawData = await response.json() as RawConjugationsFile

    // Normalize array format to object format
    let normalizedData: ConjugationsFile
    if (Array.isArray(rawData.verbs)) {
      // Array format - convert to object keyed by infinitive
      const verbsObject: Record<string, VerbConjugation> = {}
      for (const verb of rawData.verbs as VerbArrayEntry[]) {
        verbsObject[verb.infinitive] = {
          translation: verb.translation,
          type: verb.type,
          root: verb.root,
          conjugations: verb.conjugations
        }
      }
      normalizedData = {
        language: rawData.language,
        meta: rawData.meta,
        verbs: verbsObject
      }
    } else {
      // Object format - use as-is
      normalizedData = rawData as ConjugationsFile
    }

    dataCache.conjugations[language] = normalizedData
    return normalizedData
  } catch (error) {
    console.warn(`Failed to load conjugations for ${language}:`, error)
    dataCache.conjugations[language] = null
    return null
  }
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

// Languages that have declension data
const DECLENSION_LANGUAGES: LanguageCode[] = ['de']

// Languages that have conjugation data
const CONJUGATION_LANGUAGES: LanguageCode[] = ['de', 'en', 'es', 'fr', 'el', 'pt', 'ru', 'tr']

/**
 * Get noun declension for a specific word (German only for now)
 */
export async function getDeclension(word: string, language: LanguageCode): Promise<NounDeclension | null> {
  if (!DECLENSION_LANGUAGES.includes(language)) return null

  const declensions = await loadDeclensions(language)
  if (!declensions) return null

  return declensions.nouns[word] || declensions.nouns[word.toLowerCase()] || null
}

/**
 * Get verb conjugation for a specific word
 * Supports: German, English, Spanish, French, Greek, Portuguese, Russian, Turkish
 */
export async function getConjugation(word: string, language: LanguageCode): Promise<VerbConjugation | null> {
  if (!CONJUGATION_LANGUAGES.includes(language)) return null

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
