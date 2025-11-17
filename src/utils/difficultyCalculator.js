/**
 * DifficultyCalculator - Calculate sentence difficulty
 * PARALLEL SAFE: Creates new file only
 */

export class DifficultyCalculator {
  static calculate(sentence, wordMatcher) {
    const words = sentence.split(/\s+/).filter(w => w.trim());
    let knownWords = 0;
    let totalFrequencyRank = 0;

    words.forEach(word => {
      const match = wordMatcher.matchWord(word);
      if (match && match.confidence >= 0.8) {
        knownWords++;
        totalFrequencyRank += match.word.frequency_rank;
      }
    });

    const knownPercentage = words.length > 0 ? (knownWords / words.length) : 0;
    const avgFrequency = knownWords > 0 ? (totalFrequencyRank / knownWords) : 1000;

    // Difficulty score: 0 (easiest) to 5 (hardest)
    const lengthFactor = Math.min(words.length / 20, 1); // Longer = harder
    const unknownFactor = 1 - knownPercentage; // More unknown = harder
    const frequencyFactor = Math.min(avgFrequency / 500, 1); // Higher freq rank = harder

    const difficulty = (lengthFactor + unknownFactor + frequencyFactor) / 3;

    return {
      score: difficulty,
      level: Math.ceil(difficulty * 5), // 1-5 dots
      knownWords,
      totalWords: words.length,
      knownPercentage: Math.round(knownPercentage * 100)
    };
  }

  static generateDots(level) {
    const maxDots = 5;
    let html = '';

    for (let i = 0; i < maxDots; i++) {
      html += `<span class="dot ${i < level ? 'filled' : ''}">●</span>`;
    }

    return html;
  }

  static getLabel(level) {
    const labels = {
      1: 'Very Easy',
      2: 'Easy',
      3: 'Medium',
      4: 'Hard',
      5: 'Very Hard'
    };

    return labels[level] || 'Unknown';
  }
}
