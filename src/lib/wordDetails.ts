import type { Word, WordDetail, LanguageCode } from '@/types'
import {
  getTranslation,
  getExamples,
  getDeclension,
  getConjugation,
  type TranslationData,
  type ExampleSentence,
  type NounDeclension,
  type VerbConjugation,
} from './grammarData'

// Fallback translations by language (used when real data not available)
const fallbackTranslations: Record<LanguageCode, Record<string, string>> = {
  de: {
    'der': 'the (masculine)',
    'die': 'the (feminine/plural)',
    'und': 'and',
    'sein': 'to be / his',
    'haben': 'to have',
    'werden': 'to become',
    'können': 'can, to be able to',
    'müssen': 'must, to have to',
    'sagen': 'to say',
    'machen': 'to make, to do',
    'geben': 'to give',
    'kommen': 'to come',
    'wollen': 'to want',
    'gehen': 'to go',
    'wissen': 'to know (fact)',
    'sehen': 'to see',
    'lassen': 'to let, to leave',
    'stehen': 'to stand',
    'finden': 'to find',
    'bleiben': 'to stay',
  },
  en: {
    'the': 'der/die/das',
    'be': 'sein',
    'to': 'zu, nach',
    'of': 'von',
    'and': 'und',
    'a': 'ein/eine',
    'in': 'in',
    'that': 'dass, der/die/das',
    'have': 'haben',
    'I': 'ich',
  },
  fr: {
    'le': 'the (masculine)',
    'la': 'the (feminine)',
    'de': 'of, from',
    'et': 'and',
    'être': 'to be',
    'avoir': 'to have',
    'je': 'I',
    'il': 'he',
    'que': 'that, which',
    'ne': 'not (part 1)',
  },
  es: {
    'el': 'the (masculine)',
    'la': 'the (feminine)',
    'de': 'of, from',
    'que': 'that, which',
    'y': 'and',
    'en': 'in',
    'un': 'a (masculine)',
    'ser': 'to be (permanent)',
    'estar': 'to be (temporary)',
    'haber': 'to have (auxiliary)',
  },
  it: {
    'il': 'the (masculine)',
    'la': 'the (feminine)',
    'di': 'of',
    'e': 'and',
    'che': 'that, which',
    'essere': 'to be',
    'avere': 'to have',
    'non': 'not',
    'un': 'a (masculine)',
    'una': 'a (feminine)',
  },
  ru: {
    'и': 'and',
    'в': 'in',
    'не': 'not',
    'на': 'on',
    'я': 'I',
    'что': 'what, that',
    'он': 'he',
    'с': 'with',
    'это': 'this',
    'как': 'how, as',
  },
  el: {
    'και': 'and',
    'το': 'the (neuter)',
    'ο': 'the (masculine)',
    'η': 'the (feminine)',
    'να': 'to (infinitive marker)',
    'είναι': 'is',
    'για': 'for',
    'με': 'with',
    'δεν': 'not',
    'από': 'from',
  },
  tr: {
    've': 'and',
    'bir': 'a, one',
    'bu': 'this',
    'için': 'for',
    'de': 'also, too',
    'ile': 'with',
    'olarak': 'as',
    'gibi': 'like',
    'çok': 'very, many',
    'var': 'there is',
  },
  pt: {
    'o': 'the (masculine)',
    'a': 'the (feminine)',
    'de': 'of, from',
    'e': 'and',
    'que': 'that, which',
    'em': 'in',
    'um': 'a (masculine)',
    'uma': 'a (feminine)',
    'ser': 'to be (permanent)',
    'estar': 'to be (temporary)',
  },
}

// Detect part of speech based on word patterns
function detectPartOfSpeech(word: string, language: LanguageCode, translationData?: TranslationData | null): WordDetail['partOfSpeech'] {
  // If we have real data, use it
  if (translationData?.partOfSpeech) {
    return translationData.partOfSpeech as WordDetail['partOfSpeech']
  }

  const lowerWord = word.toLowerCase()

  if (language === 'de') {
    // German articles
    if (['der', 'die', 'das', 'ein', 'eine'].includes(lowerWord)) return 'article'
    // German prepositions
    if (['in', 'an', 'auf', 'für', 'mit', 'bei', 'nach', 'von', 'zu', 'aus'].includes(lowerWord)) return 'preposition'
    // German conjunctions
    if (['und', 'oder', 'aber', 'weil', 'dass', 'wenn', 'als', 'ob'].includes(lowerWord)) return 'conjunction'
    // German pronouns
    if (['ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'man'].includes(lowerWord)) return 'pronoun'
    // Verbs (infinitive ending in -en)
    if (lowerWord.endsWith('en') && lowerWord.length > 3) return 'verb'
    // Nouns (capitalized in German)
    if (word[0] === word[0].toUpperCase() && word.length > 1) return 'noun'
  }

  if (language === 'en') {
    if (['the', 'a', 'an'].includes(lowerWord)) return 'article'
    if (['in', 'on', 'at', 'for', 'with', 'by', 'from', 'to'].includes(lowerWord)) return 'preposition'
    if (['and', 'or', 'but', 'because', 'if', 'when', 'while'].includes(lowerWord)) return 'conjunction'
    if (['i', 'you', 'he', 'she', 'it', 'we', 'they'].includes(lowerWord)) return 'pronoun'
  }

  return 'other'
}

// Detect gender for German nouns
function detectGender(
  word: string,
  language: LanguageCode,
  translationData?: TranslationData | null,
  declensionData?: NounDeclension | null
): WordDetail['gender'] {
  if (language !== 'de') return undefined

  // Priority 1: Declension data (most accurate)
  if (declensionData?.gender) {
    const genderMap: Record<string, WordDetail['gender']> = {
      'm': 'masculine',
      'f': 'feminine',
      'n': 'neuter',
    }
    return genderMap[declensionData.gender]
  }

  // Priority 2: Translation data
  if (translationData?.gender) {
    const genderMap: Record<string, WordDetail['gender']> = {
      'm': 'masculine',
      'f': 'feminine',
      'n': 'neuter',
    }
    return genderMap[translationData.gender]
  }

  // Priority 3: Pattern-based detection
  const lowerWord = word.toLowerCase()

  // Common masculine endings
  if (lowerWord.endsWith('er') || lowerWord.endsWith('ling') || lowerWord.endsWith('or')) {
    return 'masculine'
  }
  // Common feminine endings
  if (lowerWord.endsWith('ung') || lowerWord.endsWith('heit') || lowerWord.endsWith('keit') ||
      lowerWord.endsWith('schaft') || lowerWord.endsWith('tion') || lowerWord.endsWith('ie')) {
    return 'feminine'
  }
  // Common neuter endings
  if (lowerWord.endsWith('chen') || lowerWord.endsWith('lein') || lowerWord.endsWith('ment') ||
      lowerWord.endsWith('tum') || lowerWord.endsWith('um')) {
    return 'neuter'
  }

  return undefined
}

// Generate generic example sentences (fallback)
function generateGenericExamples(word: string, language: LanguageCode): string[] {
  const templates: Record<LanguageCode, string[]> = {
    de: [
      `Das Wort "${word}" ist sehr wichtig.`,
      `Können Sie "${word}" in einem Satz verwenden?`,
    ],
    en: [
      `The word "${word}" is commonly used.`,
      `Can you use "${word}" in a sentence?`,
    ],
    fr: [
      `Le mot "${word}" est très courant.`,
      `Pouvez-vous utiliser "${word}" dans une phrase?`,
    ],
    es: [
      `La palabra "${word}" es muy común.`,
      `¿Puedes usar "${word}" en una oración?`,
    ],
    it: [
      `La parola "${word}" è molto comune.`,
      `Puoi usare "${word}" in una frase?`,
    ],
    ru: [
      `Слово "${word}" очень важно.`,
      `Можете использовать "${word}" в предложении?`,
    ],
    el: [
      `Η λέξη "${word}" είναι πολύ συνηθισμένη.`,
      `Μπορείτε να χρησιμοποιήσετε "${word}" σε μια πρόταση;`,
    ],
    tr: [
      `"${word}" kelimesi çok yaygındır.`,
      `"${word}" kelimesini bir cümlede kullanabilir misiniz?`,
    ],
    pt: [
      `A palavra "${word}" é muito comum.`,
      `Você pode usar "${word}" em uma frase?`,
    ],
  }

  return templates[language] || templates['en']
}

// Generate placeholder synonyms
function generateSynonyms(word: string, language: LanguageCode): string[] | undefined {
  const synonyms: Record<string, Record<string, string[]>> = {
    de: {
      'gehen': ['laufen', 'schreiten', 'wandern'],
      'sagen': ['sprechen', 'reden', 'erzählen'],
      'machen': ['tun', 'herstellen', 'anfertigen'],
      'groß': ['riesig', 'gewaltig', 'enorm'],
      'klein': ['winzig', 'gering', 'minimal'],
    },
    en: {
      'go': ['walk', 'proceed', 'move'],
      'say': ['speak', 'tell', 'state'],
      'make': ['create', 'produce', 'build'],
      'big': ['large', 'huge', 'enormous'],
      'small': ['tiny', 'little', 'miniature'],
    },
  }

  const langSynonyms = synonyms[language]
  if (!langSynonyms) return undefined

  return langSynonyms[word.toLowerCase()]
}

// Convert declension data to simple format for WordDetail
function formatDeclension(data: NounDeclension | null): Record<string, string> | undefined {
  if (!data) return undefined

  return {
    nominativ: `${data.declension.nominativ.singular} / ${data.declension.nominativ.plural}`,
    genitiv: `${data.declension.genitiv.singular} / ${data.declension.genitiv.plural}`,
    dativ: `${data.declension.dativ.singular} / ${data.declension.dativ.plural}`,
    akkusativ: `${data.declension.akkusativ.singular} / ${data.declension.akkusativ.plural}`,
  }
}

// Convert conjugation data to simple format for WordDetail
function formatConjugation(data: VerbConjugation | null): Record<string, string> | undefined {
  if (!data) return undefined

  // Return präsens (present tense) for the simple conjugation view
  return data.conjugations.präsens
}

// Convert example sentences to string array
function formatExamples(data: ExampleSentence[] | null): string[] | undefined {
  if (!data || data.length === 0) return undefined

  // Return just the sentences (translations are shown in the modal if needed)
  return data.map((ex) => ex.sentence)
}

/**
 * Generate detailed word information from a basic Word object
 * Uses real data from JSON files when available, with fallbacks
 */
export async function getWordDetailsAsync(word: Word, language: LanguageCode): Promise<WordDetail> {
  // Fetch real data in parallel
  const [translationData, examplesData, declensionData, conjugationData] = await Promise.all([
    getTranslation(word.word, language),
    getExamples(word.word, language),
    getDeclension(word.word, language),
    getConjugation(word.word, language),
  ])

  const partOfSpeech = detectPartOfSpeech(word.word, language, translationData)
  const gender = partOfSpeech === 'noun' ? detectGender(word.word, language, translationData, declensionData) : undefined

  // Get translation (real or fallback)
  let translation: string | undefined
  if (translationData?.translation) {
    translation = translationData.translation
  } else {
    const langTranslations = fallbackTranslations[language] || {}
    translation = langTranslations[word.word] || langTranslations[word.word.toLowerCase()]
  }

  // Get examples (real or generic)
  const examples = formatExamples(examplesData) || generateGenericExamples(word.word, language)

  // Get declension (for German nouns)
  const declension = language === 'de' && partOfSpeech === 'noun'
    ? formatDeclension(declensionData)
    : undefined

  // Get conjugation (for German verbs)
  const conjugation = language === 'de' && partOfSpeech === 'verb'
    ? formatConjugation(conjugationData)
    : undefined

  return {
    ...word,
    translation,
    partOfSpeech,
    gender,
    examples,
    declension,
    conjugation,
    synonyms: generateSynonyms(word.word, language),
    isBookmarked: false,
    isLearned: false,
    // Add metadata about data source
    hasRealData: !!(translationData || examplesData || declensionData || conjugationData),
    // Store full conjugation data for expanded view
    fullConjugation: conjugationData || undefined,
    // Store full declension data for expanded view
    fullDeclension: declensionData || undefined,
    // Store examples with translations
    examplesWithTranslations: examplesData || undefined,
  }
}

/**
 * Synchronous version for backward compatibility
 * Uses only fallback data (no async loading)
 */
export function getWordDetails(word: Word, language: LanguageCode): WordDetail {
  const partOfSpeech = detectPartOfSpeech(word.word, language)
  const gender = partOfSpeech === 'noun' ? detectGender(word.word, language) : undefined

  // Get translation from fallback
  const langTranslations = fallbackTranslations[language] || {}
  const translation = langTranslations[word.word] || langTranslations[word.word.toLowerCase()]

  // Get generic examples
  const examples = generateGenericExamples(word.word, language)

  return {
    ...word,
    translation,
    partOfSpeech,
    gender,
    examples,
    declension: undefined,
    conjugation: undefined,
    synonyms: generateSynonyms(word.word, language),
    isBookmarked: false,
    isLearned: false,
    hasRealData: false,
  }
}
