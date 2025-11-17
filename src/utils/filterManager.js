/**
 * FilterManager - Handle frequency and sentence length filters
 * PARALLEL SAFE: Creates new file only
 */

export class FilterManager {
  constructor() {
    this.filters = {
      frequency: 50,
      sentenceLength: '1-10'
    };

    this.listeners = [];
  }

  setFrequency(value) {
    this.filters.frequency = parseInt(value);
    this.notifyListeners();
  }

  setSentenceLength(value) {
    this.filters.sentenceLength = value;
    this.notifyListeners();
  }

  getFilters() {
    return { ...this.filters };
  }

  getSentenceLengthRange() {
    const [min, max] = this.filters.sentenceLength.split('-').map(n => parseInt(n));
    return { min, max };
  }

  onChange(callback) {
    this.listeners.push(callback);
  }

  notifyListeners() {
    this.listeners.forEach(cb => cb(this.filters));
  }

  matchesFilter(sentence) {
    const wordCount = sentence.split(/\s+/).length;
    const { min, max } = this.getSentenceLengthRange();

    return wordCount >= min && wordCount <= max;
  }
}
