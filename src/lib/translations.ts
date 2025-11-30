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
