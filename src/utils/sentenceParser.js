/**
 * SentenceParser - Parses sentences and marks vocabulary words
 */
export class SentenceParser {
  constructor(wordMatcher) {
    this.wordMatcher = wordMatcher;
  }

  /**
   * Parse a sentence and wrap vocabulary words with spans
   * @param {string} sentence - Raw sentence text
   * @param {string} languageCode - Language code
   * @returns {string} HTML with marked words
   */
  parse(sentence, languageCode = 'de') {
    if (!sentence) return '';

    const words = sentence.split(/(\s+)/); // Preserve whitespace
    const parsed = words.map(word => {
      if (!word.trim()) return word; // Keep whitespace as-is

      const match = this.wordMatcher.findMatch(word);
      if (match) {
        return `<span class="underlined-word" data-word-id="${match.id}">${this._escapeHtml(word)}</span>`;
      }
      return this._escapeHtml(word);
    });

    return parsed.join('');
  }

  /**
   * Parse multiple sentences
   */
  parseMany(sentences, languageCode = 'de') {
    return sentences.map(sentence => {
      if (typeof sentence === 'string') {
        return {
          text: sentence,
          html: this.parse(sentence, languageCode)
        };
      }
      return {
        ...sentence,
        html: this.parse(sentence.text, languageCode)
      };
    });
  }

  /**
   * Extract vocabulary words from a sentence
   */
  extractWords(sentence) {
    const words = sentence.split(/\s+/);
    const found = [];

    words.forEach(word => {
      const match = this.wordMatcher.findMatch(word);
      if (match) {
        found.push({
          word: word.trim(),
          data: match
        });
      }
    });

    return found;
  }

  /**
   * Count vocabulary words in sentence
   */
  countVocabWords(sentence) {
    return this.extractWords(sentence).length;
  }

  /**
   * Escape HTML special characters
   * @private
   */
  _escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Update word matcher
   */
  setWordMatcher(wordMatcher) {
    this.wordMatcher = wordMatcher;
  }
}
