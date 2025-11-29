import type { Word, WordDetail, LanguageCode } from '@/types'

// Mock translations by language
const mockTranslations: Record<LanguageCode, Record<string, string>> = {
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
    'Hund': 'dog',
    'Katze': 'cat',
    'Haus': 'house',
    'Mann': 'man',
    'Frau': 'woman',
    'Kind': 'child',
    'Tag': 'day',
    'Jahr': 'year',
    'Zeit': 'time',
    'Hand': 'hand',
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

// Mock example sentences by language
const mockExamples: Record<LanguageCode, Record<string, string[]>> = {
  de: {
    'Hund': [
      'Der Hund läuft im Park.',
      'Mein Hund ist sehr freundlich.',
      'Der Hund bellt laut.',
    ],
    'gehen': [
      'Ich gehe nach Hause.',
      'Wir gehen ins Kino.',
      'Er geht zur Arbeit.',
    ],
    'haben': [
      'Ich habe ein Auto.',
      'Hast du Zeit?',
      'Wir haben Hunger.',
    ],
    'sein': [
      'Ich bin müde.',
      'Das ist schön.',
      'Wir sind hier.',
    ],
  },
  en: {
    'dog': [
      'The dog is running in the park.',
      'My dog is very friendly.',
      'The dog barks loudly.',
    ],
    'go': [
      'I go to school every day.',
      'We go to the movies.',
      'She goes to work.',
    ],
  },
  fr: {
    'chien': [
      'Le chien court dans le parc.',
      'Mon chien est très gentil.',
      'Le chien aboie fort.',
    ],
  },
  es: {
    'perro': [
      'El perro corre en el parque.',
      'Mi perro es muy amigable.',
      'El perro ladra fuerte.',
    ],
  },
  it: {},
  ru: {},
  el: {},
  tr: {},
  pt: {},
}

// German noun declensions (example patterns)
const germanDeclensions: Record<string, Record<string, string>> = {
  'Hund': {
    nominativ: 'der Hund',
    genitiv: 'des Hundes',
    dativ: 'dem Hund(e)',
    akkusativ: 'den Hund',
  },
  'Katze': {
    nominativ: 'die Katze',
    genitiv: 'der Katze',
    dativ: 'der Katze',
    akkusativ: 'die Katze',
  },
  'Haus': {
    nominativ: 'das Haus',
    genitiv: 'des Hauses',
    dativ: 'dem Haus(e)',
    akkusativ: 'das Haus',
  },
  'Mann': {
    nominativ: 'der Mann',
    genitiv: 'des Mannes',
    dativ: 'dem Mann(e)',
    akkusativ: 'den Mann',
  },
  'Frau': {
    nominativ: 'die Frau',
    genitiv: 'der Frau',
    dativ: 'der Frau',
    akkusativ: 'die Frau',
  },
}

// German verb conjugations (present tense)
const germanConjugations: Record<string, Record<string, string>> = {
  'gehen': {
    'ich': 'gehe',
    'du': 'gehst',
    'er/sie/es': 'geht',
    'wir': 'gehen',
    'ihr': 'geht',
    'sie/Sie': 'gehen',
  },
  'haben': {
    'ich': 'habe',
    'du': 'hast',
    'er/sie/es': 'hat',
    'wir': 'haben',
    'ihr': 'habt',
    'sie/Sie': 'haben',
  },
  'sein': {
    'ich': 'bin',
    'du': 'bist',
    'er/sie/es': 'ist',
    'wir': 'sind',
    'ihr': 'seid',
    'sie/Sie': 'sind',
  },
  'werden': {
    'ich': 'werde',
    'du': 'wirst',
    'er/sie/es': 'wird',
    'wir': 'werden',
    'ihr': 'werdet',
    'sie/Sie': 'werden',
  },
  'können': {
    'ich': 'kann',
    'du': 'kannst',
    'er/sie/es': 'kann',
    'wir': 'können',
    'ihr': 'könnt',
    'sie/Sie': 'können',
  },
}

// Detect part of speech based on word patterns
function detectPartOfSpeech(word: string, language: LanguageCode): WordDetail['partOfSpeech'] {
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
function detectGender(word: string, language: LanguageCode): WordDetail['gender'] {
  if (language !== 'de') return undefined

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

  // Known words
  const genders: Record<string, WordDetail['gender']> = {
    'Hund': 'masculine',
    'Katze': 'feminine',
    'Haus': 'neuter',
    'Mann': 'masculine',
    'Frau': 'feminine',
    'Kind': 'neuter',
    'Tag': 'masculine',
    'Zeit': 'feminine',
    'Jahr': 'neuter',
  }

  return genders[word]
}

/**
 * Generate detailed word information from a basic Word object
 * In a real app, this would fetch from an API or database
 */
export function getWordDetails(word: Word, language: LanguageCode): WordDetail {
  const partOfSpeech = detectPartOfSpeech(word.word, language)
  const gender = partOfSpeech === 'noun' ? detectGender(word.word, language) : undefined

  // Get translation
  const langTranslations = mockTranslations[language] || {}
  const translation = langTranslations[word.word] || langTranslations[word.word.toLowerCase()]

  // Get examples
  const langExamples = mockExamples[language] || {}
  const examples = langExamples[word.word] || langExamples[word.word.toLowerCase()] || generateGenericExamples(word.word, language)

  // Get declension (for German nouns)
  const declension = language === 'de' && partOfSpeech === 'noun'
    ? germanDeclensions[word.word]
    : undefined

  // Get conjugation (for German verbs)
  const conjugation = language === 'de' && partOfSpeech === 'verb'
    ? germanConjugations[word.word.toLowerCase()]
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
  }
}

// Generate generic example sentences
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
