/**
 * DifficultyCalculator - Calculates difficulty scores for sentences
 */
export class DifficultyCalculator {
  constructor() {
    this.weights = {
      length: 0.3,
      vocabularyComplexity: 0.4,
      grammarComplexity: 0.3
    };
  }

  /**
   * Calculate difficulty for a sentence (1-5 scale)
   * @param {string} sentence - The sentence to analyze
   * @param {Array} vocabularyData - Vocabulary database
   * @returns {number} Difficulty score (1-5)
   */
  calculate(sentence, vocabularyData) {
    const lengthScore = this._calculateLengthScore(sentence);
    const vocabScore = this._calculateVocabularyScore(sentence, vocabularyData);
    const grammarScore = this._calculateGrammarScore(sentence);

    const weighted =
      (lengthScore * this.weights.length) +
      (vocabScore * this.weights.vocabularyComplexity) +
      (grammarScore * this.weights.grammarComplexity);

    // Convert to 1-5 scale
    return Math.min(5, Math.max(1, Math.round(weighted)));
  }

  /**
   * Calculate length-based difficulty
   * @private
   */
  _calculateLengthScore(sentence) {
    const words = sentence.split(/\s+/).length;

    if (words <= 5) return 1;
    if (words <= 10) return 2;
    if (words <= 15) return 3;
    if (words <= 20) return 4;
    return 5;
  }

  /**
   * Calculate vocabulary complexity
   * @private
   */
  _calculateVocabularyScore(sentence, vocabularyData) {
    const words = sentence.toLowerCase().split(/\s+/);
    let totalComplexity = 0;
    let matchedWords = 0;

    words.forEach(word => {
      const cleaned = word.replace(/[.,!?;:]/g, '');
      const match = vocabularyData.find(v =>
        v.word.toLowerCase() === cleaned
      );

      if (match && match.frequency_rank) {
        // Lower frequency rank = more common = less complex
        const complexity = match.frequency_rank > 1000 ? 5 :
                          match.frequency_rank > 500 ? 4 :
                          match.frequency_rank > 250 ? 3 :
                          match.frequency_rank > 100 ? 2 : 1;
        totalComplexity += complexity;
        matchedWords++;
      }
    });

    return matchedWords > 0 ? totalComplexity / matchedWords : 3;
  }

  /**
   * Calculate grammar complexity (simplified)
   * @private
   */
  _calculateGrammarScore(sentence) {
    // Simple heuristics for grammar complexity
    let score = 1;

    // Subordinate clauses
    if (/,\s*(dass|weil|wenn|obwohl|während)/i.test(sentence)) {
      score += 1;
    }

    // Question form
    if (sentence.trim().endsWith('?')) {
      score += 0.5;
    }

    // Multiple clauses
    const clauses = sentence.split(/[,;]/).length;
    if (clauses > 2) {
      score += 1;
    }

    return Math.min(5, score);
  }

  /**
   * Get difficulty label
   */
  getDifficultyLabel(score) {
    const labels = {
      1: 'Beginner',
      2: 'Elementary',
      3: 'Intermediate',
      4: 'Advanced',
      5: 'Expert'
    };
    return labels[score] || 'Unknown';
  }

  /**
   * Generate difficulty dots HTML
   */
  generateDots(difficulty) {
    const dots = [];
    for (let i = 1; i <= 5; i++) {
      dots.push(i <= difficulty ? '●' : '○');
    }
    return dots;
  }

  /**
   * Set weights for calculation
   */
  setWeights(weights) {
    this.weights = { ...this.weights, ...weights };
  }
}
