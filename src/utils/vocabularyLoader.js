/**
 * VocabularyLoader - Handles loading and caching vocabulary data
 */
export class VocabularyLoader {
  constructor() {
    this.cache = new Map();
    this.loading = new Map();
  }

  /**
   * Load vocabulary for a specific language
   * @param {string} languageCode - ISO language code (e.g., 'de', 'en')
   * @returns {Promise<Array>} Array of vocabulary items
   */
  async loadLanguage(languageCode) {
    // Return cached data if available
    if (this.cache.has(languageCode)) {
      return this.cache.get(languageCode);
    }

    // Return in-progress loading promise if already loading
    if (this.loading.has(languageCode)) {
      return this.loading.get(languageCode);
    }

    // Start loading
    const loadPromise = this._loadFromServer(languageCode);
    this.loading.set(languageCode, loadPromise);

    try {
      const data = await loadPromise;
      this.cache.set(languageCode, data);
      this.loading.delete(languageCode);
      return data;
    } catch (error) {
      this.loading.delete(languageCode);
      throw error;
    }
  }

  /**
   * Load vocabulary from server
   * @private
   */
  async _loadFromServer(languageCode) {
    try {
      // Try universal vocabulary first
      const response = await fetch(`/public/data/universal/MOCK_SAMPLE.json`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ Loaded ${data.length} words for ${languageCode}`);
      return data;
    } catch (error) {
      console.error(`❌ Failed to load vocabulary for ${languageCode}:`, error);
      return [];
    }
  }

  /**
   * Preload multiple languages
   */
  async preloadLanguages(languageCodes) {
    const promises = languageCodes.map(code => this.loadLanguage(code));
    return Promise.all(promises);
  }

  /**
   * Clear cache for a specific language or all languages
   */
  clearCache(languageCode = null) {
    if (languageCode) {
      this.cache.delete(languageCode);
    } else {
      this.cache.clear();
    }
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      languages: Array.from(this.cache.keys()),
      totalWords: Array.from(this.cache.values()).reduce((sum, arr) => sum + arr.length, 0),
      size: this.cache.size
    };
  }
}
