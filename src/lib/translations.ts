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

  // Word Detail Modal
  'modal.pronounce': string;
  'modal.addBookmark': string;
  'modal.removeBookmark': string;
  'modal.markLearned': string;
  'modal.markUnlearned': string;
  'modal.wordDetails': string;
  'modal.rank': string;
  'modal.frequency': string;
  'modal.declension': string;
  'modal.conjugation': string;
  'modal.examples': string;
  'modal.synonyms': string;

  // Difficulty levels
  'difficulty.beginner': string;
  'difficulty.elementary': string;
  'difficulty.intermediate': string;
  'difficulty.advanced': string;
  'difficulty.expert': string;
  'difficulty.unknown': string;

  // Parts of speech
  'partOfSpeech.noun': string;
  'partOfSpeech.verb': string;
  'partOfSpeech.adjective': string;
  'partOfSpeech.adverb': string;
  'partOfSpeech.preposition': string;
  'partOfSpeech.conjunction': string;
  'partOfSpeech.pronoun': string;
  'partOfSpeech.article': string;
  'partOfSpeech.other': string;

  // Gender
  'gender.masculine': string;
  'gender.feminine': string;
  'gender.neuter': string;

  // Stats bar
  dayStreak: string;
  wordsLearned: string;
  bookmarked: string;
  todayProgress: string;
  dailyGoal: string;

  // Navigation
  search: string;
  bookmarks: string;
  learned: string;

  // Bookmarks/Learned pages
  mySavedWords: string;
  myLearnedWords: string;
  language: string;
  noBookmarks: string;
  noLearnedWords: string;
  searchMore: string;
  learn: string;
  removeBookmark: string;
  addBookmark: string;
  removeLearned: string;

  // Flashcards
  'flashcards.title': string;
  'flashcards.practice': string;
  'flashcards.tapToFlip': string;
  'flashcards.clickToReveal': string;
  'flashcards.again': string;
  'flashcards.hard': string;
  'flashcards.good': string;
  'flashcards.easy': string;
  'flashcards.card': string;
  'flashcards.cardsRemaining': string;
  'flashcards.sessionComplete': string;
  'flashcards.correct': string;
  'flashcards.toReview': string;
  'flashcards.studyAgain': string;
  'flashcards.backToSearch': string;
  'flashcards.nextReview': string;
  'flashcards.dueToday': string;
  'flashcards.due': string;
  'flashcards.startPractice': string;
  'flashcards.noCardsDue': string;
  'flashcards.totalCards': string;
  'flashcards.newCards': string;
  'flashcards.mastered': string;
  'flashcards.cardsPerSession': string;
  'flashcards.addCards': string;
  'flashcards.adding': string;
  'flashcards.resetProgress': string;
  'flashcards.noCards': string;
  'flashcards.addFromSearch': string;
  'flashcards.endSession': string;
  'flashcards.accuracy': string;
  'flashcards.minutes': string;

  // Sidebar & Filters
  'sidebar.filters': string;
  'sidebar.applyFilters': string;
  'sidebar.reset': string;
  'sidebar.all': string;
  'sidebar.none': string;
  'sidebar.selectAll': string;
  'sidebar.clearAll': string;
  'sidebar.of': string;
  'sidebar.active': string;

  // Sidebar Sections
  'sidebar.languages': string;
  'sidebar.learningMode': string;
  'sidebar.progress': string;
  'sidebar.difficulty': string;
  'sidebar.partOfSpeech': string;
  'sidebar.gender': string;
  'sidebar.wordLength': string;
  'sidebar.frequencyRank': string;
  'sidebar.quickFilters': string;
  'sidebar.settings': string;

  // Language Switcher
  'sidebar.iSpeak': string;
  'sidebar.imLearning': string;
  'sidebar.swapLanguages': string;

  // Learning Mode
  'sidebar.browse': string;
  'sidebar.flashcards': string;

  // Progress
  'sidebar.todaysGoal': string;
  'sidebar.dayStreak': string;
  'sidebar.learned': string;
  'sidebar.saved': string;
  'sidebar.dailyGoal': string;

  // Gender (for sidebar)
  'sidebar.masculineDer': string;
  'sidebar.feminineDie': string;
  'sidebar.neuterDas': string;
  'sidebar.genderMasculine': string;
  'sidebar.genderFeminine': string;
  'sidebar.genderNeuter': string;

  // Difficulty (for sidebar)
  'sidebar.level': string;

  // Range
  'sidebar.chars': string;

  // PartOfSpeech (for sidebar)
  'sidebar.clear': string;

  // Quick Filters
  'sidebar.bookmarkedOnly': string;
  'sidebar.notLearnedYet': string;
  'sidebar.exampleSentences': string;
  'sidebar.any': string;
  'sidebar.with': string;
  'sidebar.without': string;

  // Settings
  'sidebar.showTranslations': string;
  'sidebar.showTranslationsDesc': string;
  'sidebar.autoPlayAudio': string;
  'sidebar.autoPlayAudioDesc': string;

  // Premium
  'sidebar.goPremium': string;
  'sidebar.unlockFeatures': string;
  'sidebar.premiumDescription': string;
  'sidebar.unlimitedFlashcards': string;
  'sidebar.advancedAnalytics': string;
  'sidebar.offlineMode': string;
  'sidebar.noAds': string;
  'sidebar.upgradeNow': string;
  'sidebar.premiumFeature1': string;
  'sidebar.premiumFeature2': string;
  'sidebar.premiumFeature3': string;
  'sidebar.premiumFeature4': string;

  // Mobile
  'sidebar.filtersTitle': string;
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

  // Word Detail Modal
  'modal.pronounce': 'Pronounce',
  'modal.addBookmark': 'Add bookmark',
  'modal.removeBookmark': 'Remove bookmark',
  'modal.markLearned': 'Mark as learned',
  'modal.markUnlearned': 'Mark as not learned',
  'modal.wordDetails': 'Word details for',
  'modal.rank': 'Rank',
  'modal.frequency': 'Frequency',
  'modal.declension': 'Declension',
  'modal.conjugation': 'Conjugation',
  'modal.examples': 'Example sentences',
  'modal.synonyms': 'Synonyms',

  // Difficulty levels
  'difficulty.beginner': 'Beginner',
  'difficulty.elementary': 'Elementary',
  'difficulty.intermediate': 'Intermediate',
  'difficulty.advanced': 'Advanced',
  'difficulty.expert': 'Expert',
  'difficulty.unknown': 'Unknown',

  // Parts of speech
  'partOfSpeech.noun': 'Noun',
  'partOfSpeech.verb': 'Verb',
  'partOfSpeech.adjective': 'Adjective',
  'partOfSpeech.adverb': 'Adverb',
  'partOfSpeech.preposition': 'Preposition',
  'partOfSpeech.conjunction': 'Conjunction',
  'partOfSpeech.pronoun': 'Pronoun',
  'partOfSpeech.article': 'Article',
  'partOfSpeech.other': 'Other',

  // Gender
  'gender.masculine': 'Masculine',
  'gender.feminine': 'Feminine',
  'gender.neuter': 'Neuter',

  // Stats bar
  dayStreak: '{count} day streak',
  wordsLearned: '{count} words learned',
  bookmarked: '{count} bookmarked',
  todayProgress: '{count}/{goal} today',
  dailyGoal: 'Daily goal',

  // Navigation
  search: 'Search',
  bookmarks: 'Bookmarks',
  learned: 'Learned',

  // Bookmarks/Learned pages
  mySavedWords: 'My Saved Words',
  myLearnedWords: 'My Learned Words',
  language: 'Language',
  noBookmarks: "You haven't saved any words yet. Search for words and bookmark them to see them here.",
  noLearnedWords: "You haven't learned any words yet. Mark words as learned to track your progress.",
  searchMore: 'Search Words',
  learn: 'Learn',
  removeBookmark: 'Remove bookmark',
  addBookmark: 'Add bookmark',
  removeLearned: 'Remove from learned',

  // Flashcards
  'flashcards.title': 'Flashcards',
  'flashcards.practice': 'Practice',
  'flashcards.tapToFlip': 'Tap to flip',
  'flashcards.clickToReveal': 'Click to reveal the answer',
  'flashcards.again': 'Again',
  'flashcards.hard': 'Hard',
  'flashcards.good': 'Good',
  'flashcards.easy': 'Easy',
  'flashcards.card': 'Card',
  'flashcards.cardsRemaining': '{count} cards remaining',
  'flashcards.sessionComplete': 'Session Complete!',
  'flashcards.correct': 'Correct',
  'flashcards.toReview': 'To review',
  'flashcards.studyAgain': 'Study Again',
  'flashcards.backToSearch': 'Back to Search',
  'flashcards.nextReview': 'Next review: {time}',
  'flashcards.dueToday': 'Due today',
  'flashcards.due': 'due',
  'flashcards.startPractice': 'Start Practice',
  'flashcards.noCardsDue': 'No cards due!',
  'flashcards.totalCards': 'Total cards',
  'flashcards.newCards': 'New cards',
  'flashcards.mastered': 'Mastered',
  'flashcards.cardsPerSession': 'Cards per session',
  'flashcards.addCards': 'Add Cards from Vocabulary',
  'flashcards.adding': 'Adding cards...',
  'flashcards.resetProgress': 'Reset Progress',
  'flashcards.noCards': 'No flashcards yet',
  'flashcards.addFromSearch': 'Add words from vocabulary to start practicing',
  'flashcards.endSession': 'End Session',
  'flashcards.accuracy': 'Accuracy',
  'flashcards.minutes': 'minutes',

  // Sidebar & Filters
  'sidebar.filters': 'Filters',
  'sidebar.applyFilters': 'Apply Filters',
  'sidebar.reset': 'Reset',
  'sidebar.all': 'All',
  'sidebar.none': 'None',
  'sidebar.selectAll': 'Select All',
  'sidebar.clearAll': 'Clear',
  'sidebar.of': 'of',
  'sidebar.active': 'active',

  // Sidebar Sections
  'sidebar.languages': 'Languages',
  'sidebar.learningMode': 'Learning Mode',
  'sidebar.progress': 'Progress',
  'sidebar.difficulty': 'Difficulty',
  'sidebar.partOfSpeech': 'Part of Speech',
  'sidebar.gender': 'Gender',
  'sidebar.wordLength': 'Word Length',
  'sidebar.frequencyRank': 'Frequency Rank',
  'sidebar.quickFilters': 'Quick Filters',
  'sidebar.settings': 'Settings',

  // Language Switcher
  'sidebar.iSpeak': 'I speak',
  'sidebar.imLearning': "I'm learning",
  'sidebar.swapLanguages': 'Swap languages',

  // Learning Mode
  'sidebar.browse': 'Browse',
  'sidebar.flashcards': 'Flashcards',

  // Progress
  'sidebar.todaysGoal': "Today's Goal",
  'sidebar.dayStreak': 'Day Streak',
  'sidebar.learned': 'Learned',
  'sidebar.saved': 'Saved',
  'sidebar.dailyGoal': 'Daily Goal',

  // Gender (for sidebar)
  'sidebar.masculineDer': 'Masculine (der)',
  'sidebar.feminineDie': 'Feminine (die)',
  'sidebar.neuterDas': 'Neuter (das)',
  'sidebar.genderMasculine': 'Masculine (der)',
  'sidebar.genderFeminine': 'Feminine (die)',
  'sidebar.genderNeuter': 'Neuter (das)',

  // Difficulty (for sidebar)
  'sidebar.level': 'Level',

  // Range
  'sidebar.chars': 'chars',

  // PartOfSpeech (for sidebar)
  'sidebar.clear': 'Clear',

  // Quick Filters
  'sidebar.bookmarkedOnly': 'Bookmarked only',
  'sidebar.notLearnedYet': 'Not learned yet',
  'sidebar.exampleSentences': 'Example sentences',
  'sidebar.any': 'Any',
  'sidebar.with': 'With',
  'sidebar.without': 'Without',

  // Settings
  'sidebar.showTranslations': 'Show translations',
  'sidebar.showTranslationsDesc': 'Display translations in search results',
  'sidebar.autoPlayAudio': 'Auto-play audio',
  'sidebar.autoPlayAudioDesc': 'Play pronunciation when viewing words',

  // Premium
  'sidebar.goPremium': 'Go Premium',
  'sidebar.unlockFeatures': 'Unlock all features and accelerate your learning',
  'sidebar.premiumDescription': 'Unlock all features and accelerate your learning',
  'sidebar.unlimitedFlashcards': 'Unlimited flashcards',
  'sidebar.advancedAnalytics': 'Advanced analytics',
  'sidebar.offlineMode': 'Offline mode',
  'sidebar.noAds': 'No ads',
  'sidebar.upgradeNow': 'Upgrade Now',
  'sidebar.premiumFeature1': 'Unlimited flashcards',
  'sidebar.premiumFeature2': 'Advanced analytics',
  'sidebar.premiumFeature3': 'Offline mode',
  'sidebar.premiumFeature4': 'No ads',

  // Mobile
  'sidebar.filtersTitle': 'Filters',
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

  // Word Detail Modal
  'modal.pronounce': 'Aussprechen',
  'modal.addBookmark': 'Lesezeichen hinzufügen',
  'modal.removeBookmark': 'Lesezeichen entfernen',
  'modal.markLearned': 'Als gelernt markieren',
  'modal.markUnlearned': 'Als nicht gelernt markieren',
  'modal.wordDetails': 'Wortdetails für',
  'modal.rank': 'Rang',
  'modal.frequency': 'Häufigkeit',
  'modal.declension': 'Deklination',
  'modal.conjugation': 'Konjugation',
  'modal.examples': 'Beispielsätze',
  'modal.synonyms': 'Synonyme',

  // Difficulty levels
  'difficulty.beginner': 'Anfänger',
  'difficulty.elementary': 'Grundlegend',
  'difficulty.intermediate': 'Mittelstufe',
  'difficulty.advanced': 'Fortgeschritten',
  'difficulty.expert': 'Experte',
  'difficulty.unknown': 'Unbekannt',

  // Parts of speech
  'partOfSpeech.noun': 'Substantiv',
  'partOfSpeech.verb': 'Verb',
  'partOfSpeech.adjective': 'Adjektiv',
  'partOfSpeech.adverb': 'Adverb',
  'partOfSpeech.preposition': 'Präposition',
  'partOfSpeech.conjunction': 'Konjunktion',
  'partOfSpeech.pronoun': 'Pronomen',
  'partOfSpeech.article': 'Artikel',
  'partOfSpeech.other': 'Sonstige',

  // Gender
  'gender.masculine': 'Maskulin',
  'gender.feminine': 'Feminin',
  'gender.neuter': 'Neutrum',

  // Stats bar
  dayStreak: '{count} Tage Serie',
  wordsLearned: '{count} Wörter gelernt',
  bookmarked: '{count} gespeichert',
  todayProgress: '{count}/{goal} heute',
  dailyGoal: 'Tagesziel',

  // Navigation
  search: 'Suche',
  bookmarks: 'Gespeichert',
  learned: 'Gelernt',

  // Bookmarks/Learned pages
  mySavedWords: 'Meine gespeicherten Wörter',
  myLearnedWords: 'Meine gelernten Wörter',
  language: 'Sprache',
  noBookmarks: 'Du hast noch keine Wörter gespeichert. Suche nach Wörtern und speichere sie.',
  noLearnedWords: 'Du hast noch keine Wörter gelernt. Markiere Wörter als gelernt.',
  searchMore: 'Wörter suchen',
  learn: 'Lernen',
  removeBookmark: 'Lesezeichen entfernen',
  addBookmark: 'Lesezeichen hinzufügen',
  removeLearned: 'Aus gelernt entfernen',

  // Flashcards
  'flashcards.title': 'Karteikarten',
  'flashcards.practice': 'Üben',
  'flashcards.tapToFlip': 'Tippen zum Umdrehen',
  'flashcards.clickToReveal': 'Klicken, um die Antwort zu zeigen',
  'flashcards.again': 'Nochmal',
  'flashcards.hard': 'Schwer',
  'flashcards.good': 'Gut',
  'flashcards.easy': 'Leicht',
  'flashcards.card': 'Karte',
  'flashcards.cardsRemaining': '{count} Karten übrig',
  'flashcards.sessionComplete': 'Sitzung abgeschlossen!',
  'flashcards.correct': 'Richtig',
  'flashcards.toReview': 'Zu wiederholen',
  'flashcards.studyAgain': 'Nochmal lernen',
  'flashcards.backToSearch': 'Zurück zur Suche',
  'flashcards.nextReview': 'Nächste Wiederholung: {time}',
  'flashcards.dueToday': 'Heute fällig',
  'flashcards.due': 'fällig',
  'flashcards.startPractice': 'Übung starten',
  'flashcards.noCardsDue': 'Keine Karten fällig!',
  'flashcards.totalCards': 'Gesamte Karten',
  'flashcards.newCards': 'Neue Karten',
  'flashcards.mastered': 'Gemeistert',
  'flashcards.cardsPerSession': 'Karten pro Sitzung',
  'flashcards.addCards': 'Karten aus Vokabular hinzufügen',
  'flashcards.adding': 'Karten werden hinzugefügt...',
  'flashcards.resetProgress': 'Fortschritt zurücksetzen',
  'flashcards.noCards': 'Noch keine Karteikarten',
  'flashcards.addFromSearch': 'Füge Wörter aus dem Vokabular hinzu, um zu üben',
  'flashcards.endSession': 'Sitzung beenden',
  'flashcards.accuracy': 'Genauigkeit',
  'flashcards.minutes': 'Minuten',

  // Sidebar & Filters
  'sidebar.filters': 'Filter',
  'sidebar.applyFilters': 'Filter anwenden',
  'sidebar.reset': 'Zurücksetzen',
  'sidebar.all': 'Alle',
  'sidebar.none': 'Keine',
  'sidebar.selectAll': 'Alle auswählen',
  'sidebar.clearAll': 'Löschen',
  'sidebar.of': 'von',
  'sidebar.active': 'aktiv',

  // Sidebar Sections
  'sidebar.languages': 'Sprachen',
  'sidebar.learningMode': 'Lernmodus',
  'sidebar.progress': 'Fortschritt',
  'sidebar.difficulty': 'Schwierigkeit',
  'sidebar.partOfSpeech': 'Wortart',
  'sidebar.gender': 'Geschlecht',
  'sidebar.wordLength': 'Wortlänge',
  'sidebar.frequencyRank': 'Häufigkeitsrang',
  'sidebar.quickFilters': 'Schnellfilter',
  'sidebar.settings': 'Einstellungen',

  // Language Switcher
  'sidebar.iSpeak': 'Ich spreche',
  'sidebar.imLearning': 'Ich lerne',
  'sidebar.swapLanguages': 'Sprachen tauschen',

  // Learning Mode
  'sidebar.browse': 'Durchsuchen',
  'sidebar.flashcards': 'Karteikarten',

  // Progress
  'sidebar.todaysGoal': 'Tagesziel',
  'sidebar.dayStreak': 'Tage Serie',
  'sidebar.learned': 'Gelernt',
  'sidebar.saved': 'Gespeichert',
  'sidebar.dailyGoal': 'Tagesziel',

  // Gender (for sidebar)
  'sidebar.masculineDer': 'Maskulin (der)',
  'sidebar.feminineDie': 'Feminin (die)',
  'sidebar.neuterDas': 'Neutrum (das)',
  'sidebar.genderMasculine': 'Maskulin (der)',
  'sidebar.genderFeminine': 'Feminin (die)',
  'sidebar.genderNeuter': 'Neutrum (das)',

  // Difficulty (for sidebar)
  'sidebar.level': 'Stufe',

  // Range
  'sidebar.chars': 'Zeichen',

  // PartOfSpeech (for sidebar)
  'sidebar.clear': 'Löschen',

  // Quick Filters
  'sidebar.bookmarkedOnly': 'Nur Gespeicherte',
  'sidebar.notLearnedYet': 'Noch nicht gelernt',
  'sidebar.exampleSentences': 'Beispielsätze',
  'sidebar.any': 'Alle',
  'sidebar.with': 'Mit',
  'sidebar.without': 'Ohne',

  // Settings
  'sidebar.showTranslations': 'Übersetzungen zeigen',
  'sidebar.showTranslationsDesc': 'Übersetzungen in Suchergebnissen anzeigen',
  'sidebar.autoPlayAudio': 'Audio automatisch',
  'sidebar.autoPlayAudioDesc': 'Aussprache beim Anzeigen abspielen',

  // Premium
  'sidebar.goPremium': 'Premium werden',
  'sidebar.unlockFeatures': 'Alle Funktionen freischalten und schneller lernen',
  'sidebar.premiumDescription': 'Alle Funktionen freischalten und schneller lernen',
  'sidebar.unlimitedFlashcards': 'Unbegrenzte Karteikarten',
  'sidebar.advancedAnalytics': 'Erweiterte Statistiken',
  'sidebar.offlineMode': 'Offline-Modus',
  'sidebar.noAds': 'Keine Werbung',
  'sidebar.upgradeNow': 'Jetzt upgraden',
  'sidebar.premiumFeature1': 'Unbegrenzte Karteikarten',
  'sidebar.premiumFeature2': 'Erweiterte Statistiken',
  'sidebar.premiumFeature3': 'Offline-Modus',
  'sidebar.premiumFeature4': 'Keine Werbung',

  // Mobile
  'sidebar.filtersTitle': 'Filter',
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

  // Word Detail Modal
  'modal.pronounce': 'Prononcer',
  'modal.addBookmark': 'Ajouter aux favoris',
  'modal.removeBookmark': 'Retirer des favoris',
  'modal.markLearned': 'Marquer comme appris',
  'modal.markUnlearned': 'Marquer comme non appris',
  'modal.wordDetails': 'Détails du mot pour',
  'modal.rank': 'Classement',
  'modal.frequency': 'Fréquence',
  'modal.declension': 'Déclinaison',
  'modal.conjugation': 'Conjugaison',
  'modal.examples': 'Exemples de phrases',
  'modal.synonyms': 'Synonymes',

  // Difficulty levels
  'difficulty.beginner': 'Débutant',
  'difficulty.elementary': 'Élémentaire',
  'difficulty.intermediate': 'Intermédiaire',
  'difficulty.advanced': 'Avancé',
  'difficulty.expert': 'Expert',
  'difficulty.unknown': 'Inconnu',

  // Parts of speech
  'partOfSpeech.noun': 'Nom',
  'partOfSpeech.verb': 'Verbe',
  'partOfSpeech.adjective': 'Adjectif',
  'partOfSpeech.adverb': 'Adverbe',
  'partOfSpeech.preposition': 'Préposition',
  'partOfSpeech.conjunction': 'Conjonction',
  'partOfSpeech.pronoun': 'Pronom',
  'partOfSpeech.article': 'Article',
  'partOfSpeech.other': 'Autre',

  // Gender
  'gender.masculine': 'Masculin',
  'gender.feminine': 'Féminin',
  'gender.neuter': 'Neutre',

  // Stats bar
  dayStreak: '{count} jours de suite',
  wordsLearned: '{count} mots appris',
  bookmarked: '{count} favoris',
  todayProgress: "{count}/{goal} aujourd'hui",
  dailyGoal: 'Objectif quotidien',

  // Navigation
  search: 'Recherche',
  bookmarks: 'Favoris',
  learned: 'Appris',

  // Bookmarks/Learned pages
  mySavedWords: 'Mes mots sauvegardés',
  myLearnedWords: 'Mes mots appris',
  language: 'Langue',
  noBookmarks: "Vous n'avez pas encore sauvegardé de mots. Recherchez des mots et ajoutez-les aux favoris.",
  noLearnedWords: "Vous n'avez pas encore appris de mots. Marquez les mots comme appris pour suivre vos progrès.",
  searchMore: 'Rechercher des mots',
  learn: 'Apprendre',
  removeBookmark: 'Retirer des favoris',
  addBookmark: 'Ajouter aux favoris',
  removeLearned: 'Retirer des appris',

  // Flashcards
  'flashcards.title': 'Cartes mémoire',
  'flashcards.practice': 'Pratiquer',
  'flashcards.tapToFlip': 'Appuyer pour retourner',
  'flashcards.clickToReveal': 'Cliquer pour révéler la réponse',
  'flashcards.again': 'Encore',
  'flashcards.hard': 'Difficile',
  'flashcards.good': 'Bien',
  'flashcards.easy': 'Facile',
  'flashcards.card': 'Carte',
  'flashcards.cardsRemaining': '{count} cartes restantes',
  'flashcards.sessionComplete': 'Session terminée !',
  'flashcards.correct': 'Correct',
  'flashcards.toReview': 'À revoir',
  'flashcards.studyAgain': 'Étudier à nouveau',
  'flashcards.backToSearch': 'Retour à la recherche',
  'flashcards.nextReview': 'Prochaine révision : {time}',
  'flashcards.dueToday': 'À revoir aujourd\'hui',
  'flashcards.due': 'à revoir',
  'flashcards.startPractice': 'Commencer la pratique',
  'flashcards.noCardsDue': 'Aucune carte à revoir !',
  'flashcards.totalCards': 'Total des cartes',
  'flashcards.newCards': 'Nouvelles cartes',
  'flashcards.mastered': 'Maîtrisées',
  'flashcards.cardsPerSession': 'Cartes par session',
  'flashcards.addCards': 'Ajouter des cartes du vocabulaire',
  'flashcards.adding': 'Ajout des cartes...',
  'flashcards.resetProgress': 'Réinitialiser le progrès',
  'flashcards.noCards': 'Pas encore de cartes mémoire',
  'flashcards.addFromSearch': 'Ajoutez des mots du vocabulaire pour commencer à pratiquer',
  'flashcards.endSession': 'Terminer la session',
  'flashcards.accuracy': 'Précision',
  'flashcards.minutes': 'minutes',

  // Sidebar & Filters
  'sidebar.filters': 'Filtres',
  'sidebar.applyFilters': 'Appliquer',
  'sidebar.reset': 'Réinitialiser',
  'sidebar.all': 'Tous',
  'sidebar.none': 'Aucun',
  'sidebar.selectAll': 'Tout sélectionner',
  'sidebar.clearAll': 'Effacer',
  'sidebar.of': 'sur',
  'sidebar.active': 'actifs',

  // Sidebar Sections
  'sidebar.languages': 'Langues',
  'sidebar.learningMode': 'Mode d\'apprentissage',
  'sidebar.progress': 'Progrès',
  'sidebar.difficulty': 'Difficulté',
  'sidebar.partOfSpeech': 'Nature du mot',
  'sidebar.gender': 'Genre',
  'sidebar.wordLength': 'Longueur du mot',
  'sidebar.frequencyRank': 'Rang de fréquence',
  'sidebar.quickFilters': 'Filtres rapides',
  'sidebar.settings': 'Paramètres',

  // Language Switcher
  'sidebar.iSpeak': 'Je parle',
  'sidebar.imLearning': 'J\'apprends',
  'sidebar.swapLanguages': 'Échanger les langues',

  // Learning Mode
  'sidebar.browse': 'Parcourir',
  'sidebar.flashcards': 'Cartes mémoire',

  // Progress
  'sidebar.todaysGoal': 'Objectif du jour',
  'sidebar.dayStreak': 'Jours consécutifs',
  'sidebar.learned': 'Appris',
  'sidebar.saved': 'Sauvegardés',
  'sidebar.dailyGoal': 'Objectif quotidien',

  // Gender (for sidebar)
  'sidebar.masculineDer': 'Masculin (der)',
  'sidebar.feminineDie': 'Féminin (die)',
  'sidebar.neuterDas': 'Neutre (das)',
  'sidebar.genderMasculine': 'Masculin (der)',
  'sidebar.genderFeminine': 'Féminin (die)',
  'sidebar.genderNeuter': 'Neutre (das)',

  // Difficulty (for sidebar)
  'sidebar.level': 'Niveau',

  // Range
  'sidebar.chars': 'caract.',

  // PartOfSpeech (for sidebar)
  'sidebar.clear': 'Effacer',

  // Quick Filters
  'sidebar.bookmarkedOnly': 'Favoris uniquement',
  'sidebar.notLearnedYet': 'Non appris',
  'sidebar.exampleSentences': 'Exemples',
  'sidebar.any': 'Tous',
  'sidebar.with': 'Avec',
  'sidebar.without': 'Sans',

  // Settings
  'sidebar.showTranslations': 'Afficher traductions',
  'sidebar.showTranslationsDesc': 'Afficher les traductions dans les résultats',
  'sidebar.autoPlayAudio': 'Lecture auto',
  'sidebar.autoPlayAudioDesc': 'Jouer la prononciation automatiquement',

  // Premium
  'sidebar.goPremium': 'Passer Premium',
  'sidebar.unlockFeatures': 'Débloquez toutes les fonctionnalités',
  'sidebar.premiumDescription': 'Débloquez toutes les fonctionnalités',
  'sidebar.unlimitedFlashcards': 'Cartes illimitées',
  'sidebar.advancedAnalytics': 'Statistiques avancées',
  'sidebar.offlineMode': 'Mode hors ligne',
  'sidebar.noAds': 'Sans publicité',
  'sidebar.upgradeNow': 'Passer à Pro',
  'sidebar.premiumFeature1': 'Cartes illimitées',
  'sidebar.premiumFeature2': 'Statistiques avancées',
  'sidebar.premiumFeature3': 'Mode hors ligne',
  'sidebar.premiumFeature4': 'Sans publicité',

  // Mobile
  'sidebar.filtersTitle': 'Filtres',
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

  // Word Detail Modal
  'modal.pronounce': 'Pronunciar',
  'modal.addBookmark': 'Agregar a favoritos',
  'modal.removeBookmark': 'Quitar de favoritos',
  'modal.markLearned': 'Marcar como aprendido',
  'modal.markUnlearned': 'Marcar como no aprendido',
  'modal.wordDetails': 'Detalles de la palabra para',
  'modal.rank': 'Rango',
  'modal.frequency': 'Frecuencia',
  'modal.declension': 'Declinación',
  'modal.conjugation': 'Conjugación',
  'modal.examples': 'Oraciones de ejemplo',
  'modal.synonyms': 'Sinónimos',

  // Difficulty levels
  'difficulty.beginner': 'Principiante',
  'difficulty.elementary': 'Elemental',
  'difficulty.intermediate': 'Intermedio',
  'difficulty.advanced': 'Avanzado',
  'difficulty.expert': 'Experto',
  'difficulty.unknown': 'Desconocido',

  // Parts of speech
  'partOfSpeech.noun': 'Sustantivo',
  'partOfSpeech.verb': 'Verbo',
  'partOfSpeech.adjective': 'Adjetivo',
  'partOfSpeech.adverb': 'Adverbio',
  'partOfSpeech.preposition': 'Preposición',
  'partOfSpeech.conjunction': 'Conjunción',
  'partOfSpeech.pronoun': 'Pronombre',
  'partOfSpeech.article': 'Artículo',
  'partOfSpeech.other': 'Otro',

  // Gender
  'gender.masculine': 'Masculino',
  'gender.feminine': 'Femenino',
  'gender.neuter': 'Neutro',

  // Stats bar
  dayStreak: '{count} días seguidos',
  wordsLearned: '{count} palabras aprendidas',
  bookmarked: '{count} guardados',
  todayProgress: '{count}/{goal} hoy',
  dailyGoal: 'Meta diaria',

  // Navigation
  search: 'Buscar',
  bookmarks: 'Guardados',
  learned: 'Aprendidos',

  // Bookmarks/Learned pages
  mySavedWords: 'Mis palabras guardadas',
  myLearnedWords: 'Mis palabras aprendidas',
  language: 'Idioma',
  noBookmarks: 'Aún no has guardado palabras. Busca palabras y guárdalas como favoritos.',
  noLearnedWords: 'Aún no has aprendido palabras. Marca las palabras como aprendidas.',
  searchMore: 'Buscar palabras',
  learn: 'Aprender',
  removeBookmark: 'Quitar de guardados',
  addBookmark: 'Agregar a guardados',
  removeLearned: 'Quitar de aprendidos',

  // Flashcards
  'flashcards.title': 'Tarjetas de memoria',
  'flashcards.practice': 'Practicar',
  'flashcards.tapToFlip': 'Toca para voltear',
  'flashcards.clickToReveal': 'Haz clic para revelar la respuesta',
  'flashcards.again': 'Otra vez',
  'flashcards.hard': 'Difícil',
  'flashcards.good': 'Bien',
  'flashcards.easy': 'Fácil',
  'flashcards.card': 'Tarjeta',
  'flashcards.cardsRemaining': '{count} tarjetas restantes',
  'flashcards.sessionComplete': '¡Sesión completada!',
  'flashcards.correct': 'Correcto',
  'flashcards.toReview': 'Para repasar',
  'flashcards.studyAgain': 'Estudiar de nuevo',
  'flashcards.backToSearch': 'Volver a buscar',
  'flashcards.nextReview': 'Próxima revisión: {time}',
  'flashcards.dueToday': 'Pendientes hoy',
  'flashcards.due': 'pendientes',
  'flashcards.startPractice': 'Comenzar práctica',
  'flashcards.noCardsDue': '¡Sin tarjetas pendientes!',
  'flashcards.totalCards': 'Total de tarjetas',
  'flashcards.newCards': 'Tarjetas nuevas',
  'flashcards.mastered': 'Dominadas',
  'flashcards.cardsPerSession': 'Tarjetas por sesión',
  'flashcards.addCards': 'Agregar tarjetas del vocabulario',
  'flashcards.adding': 'Agregando tarjetas...',
  'flashcards.resetProgress': 'Reiniciar progreso',
  'flashcards.noCards': 'Sin tarjetas de memoria todavía',
  'flashcards.addFromSearch': 'Agrega palabras del vocabulario para empezar a practicar',
  'flashcards.endSession': 'Terminar sesión',
  'flashcards.accuracy': 'Precisión',
  'flashcards.minutes': 'minutos',

  // Sidebar & Filters
  'sidebar.filters': 'Filtros',
  'sidebar.applyFilters': 'Aplicar filtros',
  'sidebar.reset': 'Restablecer',
  'sidebar.all': 'Todos',
  'sidebar.none': 'Ninguno',
  'sidebar.selectAll': 'Seleccionar todo',
  'sidebar.clearAll': 'Borrar',
  'sidebar.of': 'de',
  'sidebar.active': 'activos',

  // Sidebar Sections
  'sidebar.languages': 'Idiomas',
  'sidebar.learningMode': 'Modo de aprendizaje',
  'sidebar.progress': 'Progreso',
  'sidebar.difficulty': 'Dificultad',
  'sidebar.partOfSpeech': 'Categoría gramatical',
  'sidebar.gender': 'Género',
  'sidebar.wordLength': 'Longitud de palabra',
  'sidebar.frequencyRank': 'Rango de frecuencia',
  'sidebar.quickFilters': 'Filtros rápidos',
  'sidebar.settings': 'Ajustes',

  // Language Switcher
  'sidebar.iSpeak': 'Hablo',
  'sidebar.imLearning': 'Estoy aprendiendo',
  'sidebar.swapLanguages': 'Intercambiar idiomas',

  // Learning Mode
  'sidebar.browse': 'Explorar',
  'sidebar.flashcards': 'Tarjetas',

  // Progress
  'sidebar.todaysGoal': 'Meta de hoy',
  'sidebar.dayStreak': 'Días seguidos',
  'sidebar.learned': 'Aprendidas',
  'sidebar.saved': 'Guardadas',
  'sidebar.dailyGoal': 'Meta diaria',

  // Gender (for sidebar)
  'sidebar.masculineDer': 'Masculino (der)',
  'sidebar.feminineDie': 'Femenino (die)',
  'sidebar.neuterDas': 'Neutro (das)',
  'sidebar.genderMasculine': 'Masculino (der)',
  'sidebar.genderFeminine': 'Femenino (die)',
  'sidebar.genderNeuter': 'Neutro (das)',

  // Difficulty (for sidebar)
  'sidebar.level': 'Nivel',

  // Range
  'sidebar.chars': 'caract.',

  // PartOfSpeech (for sidebar)
  'sidebar.clear': 'Borrar',

  // Quick Filters
  'sidebar.bookmarkedOnly': 'Solo guardados',
  'sidebar.notLearnedYet': 'No aprendido',
  'sidebar.exampleSentences': 'Ejemplos',
  'sidebar.any': 'Cualquiera',
  'sidebar.with': 'Con',
  'sidebar.without': 'Sin',

  // Settings
  'sidebar.showTranslations': 'Mostrar traducciones',
  'sidebar.showTranslationsDesc': 'Mostrar traducciones en los resultados',
  'sidebar.autoPlayAudio': 'Reproducir auto',
  'sidebar.autoPlayAudioDesc': 'Reproducir pronunciación automáticamente',

  // Premium
  'sidebar.goPremium': 'Hazte Premium',
  'sidebar.unlockFeatures': 'Desbloquea todas las funciones',
  'sidebar.premiumDescription': 'Desbloquea todas las funciones',
  'sidebar.unlimitedFlashcards': 'Tarjetas ilimitadas',
  'sidebar.advancedAnalytics': 'Estadísticas avanzadas',
  'sidebar.offlineMode': 'Modo sin conexión',
  'sidebar.noAds': 'Sin anuncios',
  'sidebar.upgradeNow': 'Actualizar ahora',
  'sidebar.premiumFeature1': 'Tarjetas ilimitadas',
  'sidebar.premiumFeature2': 'Estadísticas avanzadas',
  'sidebar.premiumFeature3': 'Modo sin conexión',
  'sidebar.premiumFeature4': 'Sin anuncios',

  // Mobile
  'sidebar.filtersTitle': 'Filtros',
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

  // Word Detail Modal
  'modal.pronounce': 'Произнести',
  'modal.addBookmark': 'Добавить в закладки',
  'modal.removeBookmark': 'Удалить из закладок',
  'modal.markLearned': 'Отметить как выученное',
  'modal.markUnlearned': 'Отметить как невыученное',
  'modal.wordDetails': 'Детали слова для',
  'modal.rank': 'Ранг',
  'modal.frequency': 'Частота',
  'modal.declension': 'Склонение',
  'modal.conjugation': 'Спряжение',
  'modal.examples': 'Примеры предложений',
  'modal.synonyms': 'Синонимы',

  // Difficulty levels
  'difficulty.beginner': 'Начинающий',
  'difficulty.elementary': 'Элементарный',
  'difficulty.intermediate': 'Средний',
  'difficulty.advanced': 'Продвинутый',
  'difficulty.expert': 'Эксперт',
  'difficulty.unknown': 'Неизвестно',

  // Parts of speech
  'partOfSpeech.noun': 'Существительное',
  'partOfSpeech.verb': 'Глагол',
  'partOfSpeech.adjective': 'Прилагательное',
  'partOfSpeech.adverb': 'Наречие',
  'partOfSpeech.preposition': 'Предлог',
  'partOfSpeech.conjunction': 'Союз',
  'partOfSpeech.pronoun': 'Местоимение',
  'partOfSpeech.article': 'Артикль',
  'partOfSpeech.other': 'Другое',

  // Gender
  'gender.masculine': 'Мужской',
  'gender.feminine': 'Женский',
  'gender.neuter': 'Средний',

  // Stats bar
  dayStreak: '{count} дней подряд',
  wordsLearned: '{count} слов изучено',
  bookmarked: '{count} сохранено',
  todayProgress: '{count}/{goal} сегодня',
  dailyGoal: 'Ежедневная цель',

  // Navigation
  search: 'Поиск',
  bookmarks: 'Закладки',
  learned: 'Изучено',

  // Bookmarks/Learned pages
  mySavedWords: 'Мои сохранённые слова',
  myLearnedWords: 'Мои изученные слова',
  language: 'Язык',
  noBookmarks: 'Вы ещё не сохранили слова. Найдите слова и добавьте их в закладки.',
  noLearnedWords: 'Вы ещё не изучили слова. Отмечайте слова как изученные.',
  searchMore: 'Искать слова',
  learn: 'Учить',
  removeBookmark: 'Удалить из закладок',
  addBookmark: 'Добавить в закладки',
  removeLearned: 'Удалить из изученных',

  // Flashcards
  'flashcards.title': 'Карточки',
  'flashcards.practice': 'Практика',
  'flashcards.tapToFlip': 'Нажмите, чтобы перевернуть',
  'flashcards.clickToReveal': 'Нажмите, чтобы увидеть ответ',
  'flashcards.again': 'Ещё раз',
  'flashcards.hard': 'Сложно',
  'flashcards.good': 'Хорошо',
  'flashcards.easy': 'Легко',
  'flashcards.card': 'Карточка',
  'flashcards.cardsRemaining': 'Осталось {count} карточек',
  'flashcards.sessionComplete': 'Сессия завершена!',
  'flashcards.correct': 'Правильно',
  'flashcards.toReview': 'На повторение',
  'flashcards.studyAgain': 'Учить снова',
  'flashcards.backToSearch': 'Вернуться к поиску',
  'flashcards.nextReview': 'Следующее повторение: {time}',
  'flashcards.dueToday': 'На сегодня',
  'flashcards.due': 'к изучению',
  'flashcards.startPractice': 'Начать практику',
  'flashcards.noCardsDue': 'Нет карточек к изучению!',
  'flashcards.totalCards': 'Всего карточек',
  'flashcards.newCards': 'Новые карточки',
  'flashcards.mastered': 'Изучено',
  'flashcards.cardsPerSession': 'Карточек за сессию',
  'flashcards.addCards': 'Добавить карточки из словаря',
  'flashcards.adding': 'Добавление карточек...',
  'flashcards.resetProgress': 'Сбросить прогресс',
  'flashcards.noCards': 'Пока нет карточек',
  'flashcards.addFromSearch': 'Добавьте слова из словаря, чтобы начать практику',
  'flashcards.endSession': 'Завершить сессию',
  'flashcards.accuracy': 'Точность',
  'flashcards.minutes': 'минут',

  // Sidebar & Filters
  'sidebar.filters': 'Фильтры',
  'sidebar.applyFilters': 'Применить',
  'sidebar.reset': 'Сбросить',
  'sidebar.all': 'Все',
  'sidebar.none': 'Нет',
  'sidebar.selectAll': 'Выбрать все',
  'sidebar.clearAll': 'Очистить',
  'sidebar.of': 'из',
  'sidebar.active': 'активно',

  // Sidebar Sections
  'sidebar.languages': 'Языки',
  'sidebar.learningMode': 'Режим обучения',
  'sidebar.progress': 'Прогресс',
  'sidebar.difficulty': 'Сложность',
  'sidebar.partOfSpeech': 'Часть речи',
  'sidebar.gender': 'Род',
  'sidebar.wordLength': 'Длина слова',
  'sidebar.frequencyRank': 'Ранг частоты',
  'sidebar.quickFilters': 'Быстрые фильтры',
  'sidebar.settings': 'Настройки',

  // Language Switcher
  'sidebar.iSpeak': 'Я говорю',
  'sidebar.imLearning': 'Изучаю',
  'sidebar.swapLanguages': 'Поменять языки',

  // Learning Mode
  'sidebar.browse': 'Обзор',
  'sidebar.flashcards': 'Карточки',

  // Progress
  'sidebar.todaysGoal': 'Цель на сегодня',
  'sidebar.dayStreak': 'Дней подряд',
  'sidebar.learned': 'Изучено',
  'sidebar.saved': 'Сохранено',
  'sidebar.dailyGoal': 'Дневная цель',

  // Gender (for sidebar)
  'sidebar.masculineDer': 'Мужской (der)',
  'sidebar.feminineDie': 'Женский (die)',
  'sidebar.neuterDas': 'Средний (das)',
  'sidebar.genderMasculine': 'Мужской (der)',
  'sidebar.genderFeminine': 'Женский (die)',
  'sidebar.genderNeuter': 'Средний (das)',

  // Difficulty (for sidebar)
  'sidebar.level': 'Уровень',

  // Range
  'sidebar.chars': 'симв.',

  // PartOfSpeech (for sidebar)
  'sidebar.clear': 'Очистить',

  // Quick Filters
  'sidebar.bookmarkedOnly': 'Только избранное',
  'sidebar.notLearnedYet': 'Не изучено',
  'sidebar.exampleSentences': 'Примеры',
  'sidebar.any': 'Любые',
  'sidebar.with': 'С',
  'sidebar.without': 'Без',

  // Settings
  'sidebar.showTranslations': 'Показать переводы',
  'sidebar.showTranslationsDesc': 'Показывать переводы в результатах поиска',
  'sidebar.autoPlayAudio': 'Автовоспроизведение',
  'sidebar.autoPlayAudioDesc': 'Воспроизводить произношение автоматически',

  // Premium
  'sidebar.goPremium': 'Премиум',
  'sidebar.unlockFeatures': 'Разблокируйте все функции',
  'sidebar.premiumDescription': 'Разблокируйте все функции',
  'sidebar.unlimitedFlashcards': 'Безлимитные карточки',
  'sidebar.advancedAnalytics': 'Расширенная статистика',
  'sidebar.offlineMode': 'Офлайн режим',
  'sidebar.noAds': 'Без рекламы',
  'sidebar.upgradeNow': 'Обновить сейчас',
  'sidebar.premiumFeature1': 'Безлимитные карточки',
  'sidebar.premiumFeature2': 'Расширенная статистика',
  'sidebar.premiumFeature3': 'Офлайн режим',
  'sidebar.premiumFeature4': 'Без рекламы',

  // Mobile
  'sidebar.filtersTitle': 'Фильтры',
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

  // Word Detail Modal
  'modal.pronounce': 'Προφορά',
  'modal.addBookmark': 'Προσθήκη σελιδοδείκτη',
  'modal.removeBookmark': 'Αφαίρεση σελιδοδείκτη',
  'modal.markLearned': 'Σημείωση ως μαθημένο',
  'modal.markUnlearned': 'Σημείωση ως μη μαθημένο',
  'modal.wordDetails': 'Λεπτομέρειες λέξης για',
  'modal.rank': 'Κατάταξη',
  'modal.frequency': 'Συχνότητα',
  'modal.declension': 'Κλίση',
  'modal.conjugation': 'Κλίση ρήματος',
  'modal.examples': 'Παραδείγματα προτάσεων',
  'modal.synonyms': 'Συνώνυμα',

  // Difficulty levels
  'difficulty.beginner': 'Αρχάριος',
  'difficulty.elementary': 'Στοιχειώδες',
  'difficulty.intermediate': 'Μεσαίο',
  'difficulty.advanced': 'Προχωρημένο',
  'difficulty.expert': 'Ειδικός',
  'difficulty.unknown': 'Άγνωστο',

  // Parts of speech
  'partOfSpeech.noun': 'Ουσιαστικό',
  'partOfSpeech.verb': 'Ρήμα',
  'partOfSpeech.adjective': 'Επίθετο',
  'partOfSpeech.adverb': 'Επίρρημα',
  'partOfSpeech.preposition': 'Πρόθεση',
  'partOfSpeech.conjunction': 'Σύνδεσμος',
  'partOfSpeech.pronoun': 'Αντωνυμία',
  'partOfSpeech.article': 'Άρθρο',
  'partOfSpeech.other': 'Άλλο',

  // Gender
  'gender.masculine': 'Αρσενικό',
  'gender.feminine': 'Θηλυκό',
  'gender.neuter': 'Ουδέτερο',

  // Stats bar
  dayStreak: '{count} ημέρες σερί',
  wordsLearned: '{count} λέξεις μαθημένες',
  bookmarked: '{count} αποθηκευμένα',
  todayProgress: '{count}/{goal} σήμερα',
  dailyGoal: 'Ημερήσιος στόχος',

  // Navigation
  search: 'Αναζήτηση',
  bookmarks: 'Αποθηκευμένα',
  learned: 'Μαθημένα',

  // Bookmarks/Learned pages
  mySavedWords: 'Οι αποθηκευμένες μου λέξεις',
  myLearnedWords: 'Οι μαθημένες μου λέξεις',
  language: 'Γλώσσα',
  noBookmarks: 'Δεν έχετε αποθηκεύσει λέξεις ακόμα. Αναζητήστε λέξεις και αποθηκεύστε τες.',
  noLearnedWords: 'Δεν έχετε μάθει λέξεις ακόμα. Σημειώστε λέξεις ως μαθημένες.',
  searchMore: 'Αναζήτηση λέξεων',
  learn: 'Μάθε',
  removeBookmark: 'Αφαίρεση αποθήκευσης',
  addBookmark: 'Αποθήκευση',
  removeLearned: 'Αφαίρεση από μαθημένα',

  // Flashcards
  'flashcards.title': 'Κάρτες μνήμης',
  'flashcards.practice': 'Εξάσκηση',
  'flashcards.tapToFlip': 'Πατήστε για αναστροφή',
  'flashcards.clickToReveal': 'Κάντε κλικ για να δείτε την απάντηση',
  'flashcards.again': 'Ξανά',
  'flashcards.hard': 'Δύσκολο',
  'flashcards.good': 'Καλά',
  'flashcards.easy': 'Εύκολο',
  'flashcards.card': 'Κάρτα',
  'flashcards.cardsRemaining': '{count} κάρτες απομένουν',
  'flashcards.sessionComplete': 'Συνεδρία ολοκληρώθηκε!',
  'flashcards.correct': 'Σωστά',
  'flashcards.toReview': 'Για επανάληψη',
  'flashcards.studyAgain': 'Μελέτη ξανά',
  'flashcards.backToSearch': 'Πίσω στην αναζήτηση',
  'flashcards.nextReview': 'Επόμενη επανάληψη: {time}',
  'flashcards.dueToday': 'Σήμερα',
  'flashcards.due': 'εκκρεμείς',
  'flashcards.startPractice': 'Έναρξη εξάσκησης',
  'flashcards.noCardsDue': 'Δεν υπάρχουν κάρτες!',
  'flashcards.totalCards': 'Συνολικές κάρτες',
  'flashcards.newCards': 'Νέες κάρτες',
  'flashcards.mastered': 'Εκμαθημένες',
  'flashcards.cardsPerSession': 'Κάρτες ανά συνεδρία',
  'flashcards.addCards': 'Προσθήκη καρτών από το λεξιλόγιο',
  'flashcards.adding': 'Προσθήκη καρτών...',
  'flashcards.resetProgress': 'Επαναφορά προόδου',
  'flashcards.noCards': 'Δεν υπάρχουν κάρτες ακόμα',
  'flashcards.addFromSearch': 'Προσθέστε λέξεις από το λεξιλόγιο για να ξεκινήσετε',
  'flashcards.endSession': 'Τέλος συνεδρίας',
  'flashcards.accuracy': 'Ακρίβεια',
  'flashcards.minutes': 'λεπτά',

  // Sidebar & Filters
  'sidebar.filters': 'Φίλτρα',
  'sidebar.applyFilters': 'Εφαρμογή',
  'sidebar.reset': 'Επαναφορά',
  'sidebar.all': 'Όλα',
  'sidebar.none': 'Κανένα',
  'sidebar.selectAll': 'Επιλογή όλων',
  'sidebar.clearAll': 'Καθαρισμός',
  'sidebar.of': 'από',
  'sidebar.active': 'ενεργά',

  // Sidebar Sections
  'sidebar.languages': 'Γλώσσες',
  'sidebar.learningMode': 'Λειτουργία',
  'sidebar.progress': 'Πρόοδος',
  'sidebar.difficulty': 'Δυσκολία',
  'sidebar.partOfSpeech': 'Μέρος του λόγου',
  'sidebar.gender': 'Γένος',
  'sidebar.wordLength': 'Μήκος λέξης',
  'sidebar.frequencyRank': 'Κατάταξη συχνότητας',
  'sidebar.quickFilters': 'Γρήγορα φίλτρα',
  'sidebar.settings': 'Ρυθμίσεις',

  // Language Switcher
  'sidebar.iSpeak': 'Μιλάω',
  'sidebar.imLearning': 'Μαθαίνω',
  'sidebar.swapLanguages': 'Εναλλαγή γλωσσών',

  // Learning Mode
  'sidebar.browse': 'Περιήγηση',
  'sidebar.flashcards': 'Κάρτες',

  // Progress
  'sidebar.todaysGoal': 'Στόχος σήμερα',
  'sidebar.dayStreak': 'Ημέρες σερί',
  'sidebar.learned': 'Μαθημένα',
  'sidebar.saved': 'Αποθηκευμένα',
  'sidebar.dailyGoal': 'Ημερήσιος στόχος',

  // Gender (for sidebar)
  'sidebar.masculineDer': 'Αρσενικό (der)',
  'sidebar.feminineDie': 'Θηλυκό (die)',
  'sidebar.neuterDas': 'Ουδέτερο (das)',
  'sidebar.genderMasculine': 'Αρσενικό (der)',
  'sidebar.genderFeminine': 'Θηλυκό (die)',
  'sidebar.genderNeuter': 'Ουδέτερο (das)',

  // Difficulty (for sidebar)
  'sidebar.level': 'Επίπεδο',

  // Range
  'sidebar.chars': 'χαρ.',

  // PartOfSpeech (for sidebar)
  'sidebar.clear': 'Καθαρισμός',

  // Quick Filters
  'sidebar.bookmarkedOnly': 'Μόνο αποθηκευμένα',
  'sidebar.notLearnedYet': 'Μη μαθημένα',
  'sidebar.exampleSentences': 'Παραδείγματα',
  'sidebar.any': 'Όλα',
  'sidebar.with': 'Με',
  'sidebar.without': 'Χωρίς',

  // Settings
  'sidebar.showTranslations': 'Εμφάνιση μεταφράσεων',
  'sidebar.showTranslationsDesc': 'Εμφάνιση μεταφράσεων στα αποτελέσματα',
  'sidebar.autoPlayAudio': 'Αυτόματη αναπαραγωγή',
  'sidebar.autoPlayAudioDesc': 'Αναπαραγωγή προφοράς αυτόματα',

  // Premium
  'sidebar.goPremium': 'Premium',
  'sidebar.unlockFeatures': 'Ξεκλειδώστε όλες τις λειτουργίες',
  'sidebar.premiumDescription': 'Ξεκλειδώστε όλες τις λειτουργίες',
  'sidebar.unlimitedFlashcards': 'Απεριόριστες κάρτες',
  'sidebar.advancedAnalytics': 'Προηγμένα στατιστικά',
  'sidebar.offlineMode': 'Λειτουργία εκτός σύνδεσης',
  'sidebar.noAds': 'Χωρίς διαφημίσεις',
  'sidebar.upgradeNow': 'Αναβάθμιση τώρα',
  'sidebar.premiumFeature1': 'Απεριόριστες κάρτες',
  'sidebar.premiumFeature2': 'Προηγμένα στατιστικά',
  'sidebar.premiumFeature3': 'Λειτουργία εκτός σύνδεσης',
  'sidebar.premiumFeature4': 'Χωρίς διαφημίσεις',

  // Mobile
  'sidebar.filtersTitle': 'Φίλτρα',
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

/**
 * Get translation by dynamic key string (for modal components)
 * Falls back to English, then to the key itself
 */
export function getTranslation(
  language: SiteLanguage,
  key: string
): string {
  const langTranslations = translations[language] as unknown as Record<string, string>;
  const enTranslations = translations.en as unknown as Record<string, string>;

  return langTranslations?.[key] || enTranslations?.[key] || key;
}
