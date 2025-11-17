/**
 * SentenceParser - Parse sentences and underline known words
 * PARALLEL SAFE: Creates new file only
 */

export class SentenceParser {
  constructor(wordMatcher) {
    this.wordMatcher = wordMatcher;
  }

  parseSentence(text) {
    const tokens = text.split(/(\s+)/);

    return tokens.map(token => {
      if (token.trim() === '') return token;

      const match = this.wordMatcher.matchWord(token);

      if (match && match.confidence >= 0.8) {
        const clean = this.escapeHtml(token);
        return `<span class="underlined-word" data-word-id="${match.id}">${clean}</span>`;
      }

      return this.escapeHtml(token);
    }).join('');
  }

  parseSentences(sentences) {
    return sentences.map(s => ({
      original: s,
      parsed: this.parseSentence(s),
      wordCount: s.split(/\s+/).length
    }));
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  extractUnderlinedWords(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const spans = temp.querySelectorAll('.underlined-word');

    return Array.from(spans).map(span => ({
      word: span.textContent,
      wordId: span.dataset.wordId
    }));
  }
}
