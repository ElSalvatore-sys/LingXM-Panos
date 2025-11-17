/**
 * SentenceGenerator - Generates sentences based on vocabulary
 */
export class SentenceGenerator {
  constructor() {
    this.sentenceDatabase = [];
  }

  /**
   * Load sentence database
   */
  async loadDatabase(languageCode) {
    // For now, generate mock sentences
    // In production, this would load from a sentence database
    return this._generateMockSentences(languageCode);
  }

  /**
   * Generate mock sentences for testing
   * @private
   */
  _generateMockSentences(languageCode) {
    const sentences = {
      de: [
        'Ich bin hier.',
        'Das ist gut.',
        'Wie geht es dir?',
        'Ich habe einen Hund.',
        'Der Himmel ist blau.',
        'Wir gehen nach Hause.',
        'Das Wetter ist schön heute.',
        'Ich lerne Deutsch.',
        'Kannst du mir helfen?',
        'Wo ist die Bibliothek?',
        'Ich möchte einen Kaffee, bitte.',
        'Es regnet draußen.',
        'Mein Name ist Anna.',
        'Was machst du gerade?',
        'Ich komme aus Deutschland.',
        'Das Buch liegt auf dem Tisch.',
        'Morgen fahren wir in die Stadt.',
        'Sie singt sehr schön.',
        'Der Zug kommt um acht Uhr.',
        'Ich esse gerne Pizza.'
      ],
      en: [
        'I am here.',
        'This is good.',
        'How are you?',
        'I have a dog.',
        'The sky is blue.',
        'We are going home.',
        'The weather is nice today.',
        'I am learning English.',
        'Can you help me?',
        'Where is the library?'
      ]
    };

    const langSentences = sentences[languageCode] || sentences.en;

    // Convert to sentence objects
    return langSentences.map((text, index) => ({
      id: `sent_${languageCode}_${index}`,
      text,
      language: languageCode,
      difficulty: Math.floor(Math.random() * 5) + 1,
      length: text.split(/\s+/).length
    }));
  }

  /**
   * Generate sentences using specific vocabulary words
   */
  generateWithWords(vocabularyWords, count = 10) {
    // This would use AI or templates to generate sentences
    // For now, return mock data
    return this._generateMockSentences('de').slice(0, count);
  }

  /**
   * Get sentences by difficulty
   */
  getSentencesByDifficulty(difficulty, count = 10) {
    return this.sentenceDatabase
      .filter(s => s.difficulty === difficulty)
      .slice(0, count);
  }

  /**
   * Get sentences by length
   */
  getSentencesByLength(minLength, maxLength, count = 10) {
    return this.sentenceDatabase
      .filter(s => s.length >= minLength && s.length <= maxLength)
      .slice(0, count);
  }

  /**
   * Get random sentences
   */
  getRandomSentences(count = 10) {
    const shuffled = [...this.sentenceDatabase].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  /**
   * Set sentence database
   */
  setDatabase(sentences) {
    this.sentenceDatabase = sentences;
  }
}
