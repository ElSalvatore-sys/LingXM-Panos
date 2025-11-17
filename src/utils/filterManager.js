/**
 * FilterManager - Manages sentence filtering by frequency and length
 */
export class FilterManager {
  constructor() {
    this.filters = {
      frequency: 50,
      length: '1-10',
      search: '',
      includeVocabulary: false,
      includeNumbers: false,
      includeColors: false
    };
  }

  /**
   * Set filter value
   */
  setFilter(key, value) {
    if (key in this.filters) {
      this.filters[key] = value;
      return true;
    }
    return false;
  }

  /**
   * Get filter value
   */
  getFilter(key) {
    return this.filters[key];
  }

  /**
   * Get all filters
   */
  getAllFilters() {
    return { ...this.filters };
  }

  /**
   * Apply filters to sentences
   * @param {Array} sentences - Array of sentence objects
   * @param {Array} vocabularyData - Vocabulary data for frequency check
   * @returns {Array} Filtered sentences
   */
  apply(sentences, vocabularyData) {
    let filtered = [...sentences];

    // Filter by frequency
    if (this.filters.frequency) {
      filtered = this._filterByFrequency(filtered, vocabularyData, this.filters.frequency);
    }

    // Filter by length
    if (this.filters.length) {
      filtered = this._filterByLength(filtered, this.filters.length);
    }

    // Filter by search
    if (this.filters.search) {
      filtered = this._filterBySearch(filtered, this.filters.search);
    }

    return filtered;
  }

  /**
   * Filter by word frequency
   * @private
   */
  _filterByFrequency(sentences, vocabularyData, maxFrequency) {
    // Get top N words by frequency rank
    const topWords = vocabularyData
      .filter(w => w.frequency_rank && w.frequency_rank <= maxFrequency)
      .map(w => w.word.toLowerCase());

    return sentences.filter(sentence => {
      const words = (sentence.text || sentence).toLowerCase().split(/\s+/);
      return words.some(word => {
        const cleaned = word.replace(/[.,!?;:]/g, '');
        return topWords.includes(cleaned);
      });
    });
  }

  /**
   * Filter by sentence length
   * @private
   */
  _filterByLength(sentences, lengthRange) {
    const [min, max] = lengthRange.split('-').map(n => parseInt(n));

    return sentences.filter(sentence => {
      const text = sentence.text || sentence;
      const wordCount = text.split(/\s+/).length;
      return wordCount >= min && wordCount <= max;
    });
  }

  /**
   * Filter by search query
   * @private
   */
  _filterBySearch(sentences, query) {
    const lowercaseQuery = query.toLowerCase();

    return sentences.filter(sentence => {
      const text = (sentence.text || sentence).toLowerCase();
      return text.includes(lowercaseQuery);
    });
  }

  /**
   * Reset filters to defaults
   */
  reset() {
    this.filters = {
      frequency: 50,
      length: '1-10',
      search: '',
      includeVocabulary: false,
      includeNumbers: false,
      includeColors: false
    };
  }

  /**
   * Get filter summary
   */
  getSummary() {
    return {
      frequency: `Top ${this.filters.frequency} words`,
      length: `${this.filters.length} words per sentence`,
      search: this.filters.search || 'None',
      active: this._countActiveFilters()
    };
  }

  /**
   * Count active filters
   * @private
   */
  _countActiveFilters() {
    let count = 0;
    if (this.filters.frequency) count++;
    if (this.filters.length) count++;
    if (this.filters.search) count++;
    return count;
  }
}
