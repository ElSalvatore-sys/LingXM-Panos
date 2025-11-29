import type { SiteLanguage } from '@/types';

export interface Translations {
  // Landing page
  iSpeak: string;
  iWantToPractice: string;
  go: string;
  learnMore: string;
  languageLearning: string;

  // Search page
  enterPhrase: string;
  searchPlaceholder: string;
  difficulty: string;
  maxDifficulty: string;
  contentLength: string;
  results: string;
  foundWords: string;
  noResults: string;
  loading: string;
  wordsAvailable: string;
  learning: string;
  from: string;

  // Search tips
  searchTips: string;
  tipQuotes: string;
  tipWildcard: string;

  // Vocabulary stats
  vocabularyStats: string;
  totalWords: string;

  // Footer
  about: string;
  contact: string;
  press: string;
  method: string;

  // General
  siteLanguage: string;
  close: string;
  backspace: string;
  shift: string;
  virtualKeyboard: string;
}

const englishTranslations: Translations = {
  // Landing page
  iSpeak: 'I speak',
  iWantToPractice: 'I want to practice:',
  go: 'Go!',
  learnMore: 'Learn more',
  languageLearning: 'Language learning 2.0',

  // Search page
  enterPhrase: 'Enter phrase you want to practice',
  searchPlaceholder: 'Search',
  difficulty: 'Difficulty',
  maxDifficulty: 'Max Difficulty',
  contentLength: 'Content Length',
  results: 'Results:',
  foundWords: 'Found {count} word(s) starting with "{query}"',
  noResults: 'No words found starting with "{query}"',
  loading: 'Loading vocabulary...',
  wordsAvailable: 'words available',
  learning: 'Learning',
  from: 'from',

  // Search tips
  searchTips: 'Search Tips',
  tipQuotes: 'use " " to search exact phrases',
  tipWildcard: 'use * as wildcard e.g. operat* or *ation',

  // Vocabulary stats
  vocabularyStats: 'Vocabulary Stats',
  totalWords: 'Total words',

  // Footer
  about: 'About',
  contact: 'Contact',
  press: 'Press',
  method: 'Method',

  // General
  siteLanguage: 'Site language',
  close: 'Close',
  backspace: 'Backspace',
  shift: 'Shift',
  virtualKeyboard: 'Virtual Keyboard',
};

const germanTranslations: Translations = {
  // Landing page
  iSpeak: 'Ich spreche',
  iWantToPractice: 'Ich möchte üben:',
  go: 'Los!',
  learnMore: 'Mehr erfahren',
  languageLearning: 'Sprachenlernen 2.0',

  // Search page
  enterPhrase: 'Geben Sie die Phrase ein, die Sie üben möchten',
  searchPlaceholder: 'Suchen',
  difficulty: 'Schwierigkeit',
  maxDifficulty: 'Max. Schwierigkeit',
  contentLength: 'Inhaltslänge',
  results: 'Ergebnisse:',
  foundWords: '{count} Wort/Wörter gefunden, die mit "{query}" beginnen',
  noResults: 'Keine Wörter gefunden, die mit "{query}" beginnen',
  loading: 'Vokabular wird geladen...',
  wordsAvailable: 'Wörter verfügbar',
  learning: 'Lernen',
  from: 'von',

  // Search tips
  searchTips: 'Suchtipps',
  tipQuotes: 'Verwenden Sie " " für exakte Phrasen',
  tipWildcard: 'Verwenden Sie * als Platzhalter z.B. operat* oder *ation',

  // Vocabulary stats
  vocabularyStats: 'Vokabelstatistik',
  totalWords: 'Gesamtzahl Wörter',

  // Footer
  about: 'Über uns',
  contact: 'Kontakt',
  press: 'Presse',
  method: 'Methode',

  // General
  siteLanguage: 'Seitensprache',
  close: 'Schließen',
  backspace: 'Löschen',
  shift: 'Umschalt',
  virtualKeyboard: 'Virtuelle Tastatur',
};

const frenchTranslations: Translations = {
  // Landing page
  iSpeak: 'Je parle',
  iWantToPractice: 'Je veux pratiquer:',
  go: 'C\'est parti!',
  learnMore: 'En savoir plus',
  languageLearning: 'Apprentissage des langues 2.0',

  // Search page
  enterPhrase: 'Entrez la phrase que vous voulez pratiquer',
  searchPlaceholder: 'Rechercher',
  difficulty: 'Difficulté',
  maxDifficulty: 'Difficulté max.',
  contentLength: 'Longueur du contenu',
  results: 'Résultats:',
  foundWords: '{count} mot(s) trouvé(s) commençant par "{query}"',
  noResults: 'Aucun mot trouvé commençant par "{query}"',
  loading: 'Chargement du vocabulaire...',
  wordsAvailable: 'mots disponibles',
  learning: 'Apprentissage',
  from: 'de',

  // Search tips
  searchTips: 'Conseils de recherche',
  tipQuotes: 'utilisez " " pour rechercher des phrases exactes',
  tipWildcard: 'utilisez * comme joker ex. operat* ou *ation',

  // Vocabulary stats
  vocabularyStats: 'Statistiques du vocabulaire',
  totalWords: 'Nombre total de mots',

  // Footer
  about: 'À propos',
  contact: 'Contact',
  press: 'Presse',
  method: 'Méthode',

  // General
  siteLanguage: 'Langue du site',
  close: 'Fermer',
  backspace: 'Effacer',
  shift: 'Majuscule',
  virtualKeyboard: 'Clavier virtuel',
};

const spanishTranslations: Translations = {
  // Landing page
  iSpeak: 'Hablo',
  iWantToPractice: 'Quiero practicar:',
  go: '¡Vamos!',
  learnMore: 'Más información',
  languageLearning: 'Aprendizaje de idiomas 2.0',

  // Search page
  enterPhrase: 'Ingrese la frase que desea practicar',
  searchPlaceholder: 'Buscar',
  difficulty: 'Dificultad',
  maxDifficulty: 'Dificultad máx.',
  contentLength: 'Longitud del contenido',
  results: 'Resultados:',
  foundWords: '{count} palabra(s) encontrada(s) que comienzan con "{query}"',
  noResults: 'No se encontraron palabras que comiencen con "{query}"',
  loading: 'Cargando vocabulario...',
  wordsAvailable: 'palabras disponibles',
  learning: 'Aprendiendo',
  from: 'desde',

  // Search tips
  searchTips: 'Consejos de búsqueda',
  tipQuotes: 'use " " para buscar frases exactas',
  tipWildcard: 'use * como comodín ej. operat* o *ation',

  // Vocabulary stats
  vocabularyStats: 'Estadísticas de vocabulario',
  totalWords: 'Total de palabras',

  // Footer
  about: 'Acerca de',
  contact: 'Contacto',
  press: 'Prensa',
  method: 'Método',

  // General
  siteLanguage: 'Idioma del sitio',
  close: 'Cerrar',
  backspace: 'Borrar',
  shift: 'Mayúsculas',
  virtualKeyboard: 'Teclado virtual',
};

const russianTranslations: Translations = {
  // Landing page
  iSpeak: 'Я говорю на',
  iWantToPractice: 'Хочу практиковать:',
  go: 'Вперёд!',
  learnMore: 'Узнать больше',
  languageLearning: 'Изучение языков 2.0',

  // Search page
  enterPhrase: 'Введите фразу для практики',
  searchPlaceholder: 'Поиск',
  difficulty: 'Сложность',
  maxDifficulty: 'Макс. сложность',
  contentLength: 'Длина контента',
  results: 'Результаты:',
  foundWords: 'Найдено {count} слово(а), начинающихся с "{query}"',
  noResults: 'Слова, начинающиеся с "{query}", не найдены',
  loading: 'Загрузка словаря...',
  wordsAvailable: 'слов доступно',
  learning: 'Изучаем',
  from: 'с',

  // Search tips
  searchTips: 'Советы по поиску',
  tipQuotes: 'используйте " " для поиска точных фраз',
  tipWildcard: 'используйте * как шаблон, напр. operat* или *ation',

  // Vocabulary stats
  vocabularyStats: 'Статистика словаря',
  totalWords: 'Всего слов',

  // Footer
  about: 'О нас',
  contact: 'Контакты',
  press: 'Пресса',
  method: 'Метод',

  // General
  siteLanguage: 'Язык сайта',
  close: 'Закрыть',
  backspace: 'Удалить',
  shift: 'Регистр',
  virtualKeyboard: 'Виртуальная клавиатура',
};

const greekTranslations: Translations = {
  // Landing page
  iSpeak: 'Μιλάω',
  iWantToPractice: 'Θέλω να εξασκηθώ:',
  go: 'Πάμε!',
  learnMore: 'Μάθε περισσότερα',
  languageLearning: 'Εκμάθηση γλωσσών 2.0',

  // Search page
  enterPhrase: 'Εισάγετε τη φράση που θέλετε να εξασκήσετε',
  searchPlaceholder: 'Αναζήτηση',
  difficulty: 'Δυσκολία',
  maxDifficulty: 'Μέγ. δυσκολία',
  contentLength: 'Μήκος περιεχομένου',
  results: 'Αποτελέσματα:',
  foundWords: 'Βρέθηκαν {count} λέξη(εις) που αρχίζουν με "{query}"',
  noResults: 'Δεν βρέθηκαν λέξεις που αρχίζουν με "{query}"',
  loading: 'Φόρτωση λεξιλογίου...',
  wordsAvailable: 'λέξεις διαθέσιμες',
  learning: 'Μαθαίνω',
  from: 'από',

  // Search tips
  searchTips: 'Συμβουλές αναζήτησης',
  tipQuotes: 'χρησιμοποιήστε " " για ακριβείς φράσεις',
  tipWildcard: 'χρησιμοποιήστε * ως μπαλαντέρ π.χ. operat* ή *ation',

  // Vocabulary stats
  vocabularyStats: 'Στατιστικά λεξιλογίου',
  totalWords: 'Σύνολο λέξεων',

  // Footer
  about: 'Σχετικά',
  contact: 'Επικοινωνία',
  press: 'Τύπος',
  method: 'Μέθοδος',

  // General
  siteLanguage: 'Γλώσσα ιστοσελίδας',
  close: 'Κλείσιμο',
  backspace: 'Διαγραφή',
  shift: 'Shift',
  virtualKeyboard: 'Εικονικό πληκτρολόγιο',
};

// All translations
export const translations: Record<SiteLanguage, Translations> = {
  en: englishTranslations,
  de: germanTranslations,
  fr: frenchTranslations,
  es: spanishTranslations,
  ru: russianTranslations,
  el: greekTranslations,
};

/**
 * Get translation for a key with optional interpolation
 */
export function translate(
  language: SiteLanguage,
  key: keyof Translations,
  params?: Record<string, string | number>
): string {
  let text = translations[language]?.[key] || translations.en[key] || key;

  // Interpolate parameters
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{${param}}`, String(value));
    });
  }

  return text;
}
