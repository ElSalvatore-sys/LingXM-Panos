/**
 * SavedWordsManager - Manages user's saved vocabulary words
 */
export class SavedWordsManager {
  constructor(cacheManager) {
    this.cacheManager = cacheManager;
    this.savedWords = this._loadSavedWords();
  }

  /**
   * Load saved words from cache
   * @private
   */
  _loadSavedWords() {
    return this.cacheManager.get('saved_words', []);
  }

  /**
   * Save to cache
   * @private
   */
  _save() {
    this.cacheManager.set('saved_words', this.savedWords);
  }

  /**
   * Save a word
   * @param {Object} wordData - Word data object
   */
  saveWord(wordData) {
    const exists = this.savedWords.find(w => w.id === wordData.id);

    if (!exists) {
      this.savedWords.push({
        ...wordData,
        savedAt: new Date().toISOString()
      });
      this._save();
      return true;
    }

    return false;
  }

  /**
   * Remove a saved word
   */
  removeWord(wordId) {
    const index = this.savedWords.findIndex(w => w.id === wordId);

    if (index !== -1) {
      this.savedWords.splice(index, 1);
      this._save();
      return true;
    }

    return false;
  }

  /**
   * Toggle word saved status
   */
  toggleWord(wordData) {
    if (this.isWordSaved(wordData.id)) {
      return this.removeWord(wordData.id);
    } else {
      return this.saveWord(wordData);
    }
  }

  /**
   * Check if word is saved
   */
  isWordSaved(wordId) {
    return this.savedWords.some(w => w.id === wordId);
  }

  /**
   * Get all saved words
   */
  getAllSavedWords() {
    return [...this.savedWords];
  }

  /**
   * Get saved words count
   */
  getCount() {
    return this.savedWords.length;
  }

  /**
   * Get saved words by language
   */
  getWordsByLanguage(languageCode) {
    return this.savedWords.filter(w => w.language === languageCode);
  }

  /**
   * Search saved words
   */
  search(query) {
    const lowercaseQuery = query.toLowerCase();
    return this.savedWords.filter(w =>
      w.word.toLowerCase().includes(lowercaseQuery) ||
      (w.translations && w.translations.some(t =>
        t.text.toLowerCase().includes(lowercaseQuery)
      ))
    );
  }

  /**
   * Sort saved words
   */
  sort(by = 'savedAt', order = 'desc') {
    const sorted = [...this.savedWords].sort((a, b) => {
      let aVal = a[by];
      let bVal = b[by];

      if (by === 'savedAt') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (order === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return sorted;
  }

  /**
   * Clear all saved words
   */
  clear() {
    this.savedWords = [];
    this._save();
  }

  /**
   * Export saved words as JSON
   */
  export() {
    return JSON.stringify(this.savedWords, null, 2);
  }

  /**
   * Import saved words from JSON
   */
  import(jsonData) {
    try {
      const imported = JSON.parse(jsonData);
      if (Array.isArray(imported)) {
        this.savedWords = imported;
        this._save();
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to import saved words:', e);
      return false;
    }
  }

  /**
   * Get statistics
   */
  getStats() {
    const languages = {};

    this.savedWords.forEach(word => {
      if (!languages[word.language]) {
        languages[word.language] = 0;
      }
      languages[word.language]++;
    });

    return {
      total: this.savedWords.length,
      byLanguage: languages,
      oldest: this.savedWords.length > 0
        ? this.savedWords.reduce((oldest, w) =>
            new Date(w.savedAt) < new Date(oldest.savedAt) ? w : oldest
          ).savedAt
        : null,
      newest: this.savedWords.length > 0
        ? this.savedWords.reduce((newest, w) =>
            new Date(w.savedAt) > new Date(newest.savedAt) ? w : newest
          ).savedAt
        : null
    };
  }
}
