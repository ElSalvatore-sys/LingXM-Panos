/**
 * WordMatcher - Intelligent word matching with fuzzy search
 * PARALLEL SAFE: Creates new file only
 */

export class WordMatcher {
  constructor(vocabulary) {
    this.vocabulary = vocabulary;
    this.wordMap = new Map();
    this.buildIndex();
  }

  buildIndex() {
    this.vocabulary.forEach(word => {
      this.wordMap.set(word.word.toLowerCase(), word);
      this.wordMap.set(word.id, word);
    });
  }

  matchWord(text) {
    const normalized = text.toLowerCase().trim().replace(/[.,!?;:]/g, '');
    const exact = this.wordMap.get(normalized);

    if (exact) return { word: exact, confidence: 1.0 };

    return this.fuzzyMatch(normalized);
  }

  fuzzyMatch(text) {
    let bestMatch = null;
    let bestDistance = Infinity;

    for (const [word, data] of this.wordMap) {
      if (typeof word !== 'string' || word.length < 2) continue;

      const distance = this.levenshtein(text, word);
      if (distance <= 2 && distance < bestDistance) {
        bestDistance = distance;
        bestMatch = {
          word: data,
          confidence: Math.max(0, 1 - (distance / text.length))
        };
      }
    }

    return bestMatch;
  }

  levenshtein(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  getWordById(id) {
    return this.wordMap.get(id);
  }
}
