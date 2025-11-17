/**
 * WordMatcher - Matches words in sentences to vocabulary data
 */
export class WordMatcher {
  constructor(vocabularyData = []) {
    this.vocabularyData = vocabularyData;
    this.wordMap = this._buildWordMap(vocabularyData);
  }

  /**
   * Build a map of words for faster lookup
   * @private
   */
  _buildWordMap(vocabulary) {
    const map = new Map();
    vocabulary.forEach(item => {
      const word = item.word.toLowerCase();
      if (!map.has(word)) {
        map.set(word, []);
      }
      map.get(word).push(item);
    });
    return map;
  }

  /**
   * Update vocabulary data
   */
  setVocabulary(vocabularyData) {
    this.vocabularyData = vocabularyData;
    this.wordMap = this._buildWordMap(vocabularyData);
  }

  /**
   * Find vocabulary match for a word
   * @param {string} word - Word to match
   * @returns {Object|null} Vocabulary item or null
   */
  findMatch(word) {
    const normalized = word.toLowerCase().trim();

    // Direct match
    if (this.wordMap.has(normalized)) {
      return this.wordMap.get(normalized)[0];
    }

    // Try without punctuation
    const withoutPunctuation = normalized.replace(/[.,!?;:]/g, '');
    if (this.wordMap.has(withoutPunctuation)) {
      return this.wordMap.get(withoutPunctuation)[0];
    }

    return null;
  }

  /**
   * Find all matches in a sentence
   * @param {string} sentence - Sentence to analyze
   * @returns {Array} Array of matches with positions
   */
  findAllMatches(sentence) {
    const words = sentence.split(/\s+/);
    const matches = [];

    words.forEach((word, index) => {
      const match = this.findMatch(word);
      if (match) {
        matches.push({
          word,
          index,
          data: match
        });
      }
    });

    return matches;
  }

  /**
   * Check if a word is in the vocabulary
   */
  hasWord(word) {
    return this.findMatch(word) !== null;
  }

  /**
   * Get all vocabulary words
   */
  getAllWords() {
    return Array.from(this.wordMap.keys());
  }

  /**
   * Get statistics
   */
  getStats() {
    return {
      totalWords: this.vocabularyData.length,
      uniqueWords: this.wordMap.size
    };
  }
}
