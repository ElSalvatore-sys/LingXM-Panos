/**
 * SentenceGenerator - Generate sentences using vocabulary
 * PARALLEL SAFE: Creates new file only
 */

export class SentenceGenerator {
  constructor(vocabulary, frequencyLimit = 50) {
    this.vocabulary = vocabulary.filter(w => w.frequency_rank <= frequencyLimit);
    this.patterns = this.loadPatterns();
  }

  loadPatterns() {
    return [
      // Subject + Verb patterns
      { template: '{subject} {verb}.', minWords: 2 },
      { template: '{subject} {verb} {object}.', minWords: 3 },
      { template: '{subject} {verb} {adjective}.', minWords: 3 },
      { template: '{subject} {verb} {adverb}.', minWords: 3 },

      // Question patterns
      { template: '{interrogative} {verb} {subject}?', minWords: 3 },
      { template: '{interrogative} {subject} {verb}?', minWords: 3 },

      // Time expressions
      { template: '{subject} {verb} {time}.', minWords: 3 },
      { template: '{time}, {subject} {verb}.', minWords: 3 },

      // Preposition patterns
      { template: '{subject} {verb} {preposition} {object}.', minWords: 4 },
      { template: '{subject} {verb} {adverb} {preposition} {object}.', minWords: 5 }
    ];
  }

  generate(count = 10, lengthRange = { min: 1, max: 10 }) {
    const sentences = [];

    for (let i = 0; i < count * 3; i++) { // Generate 3x, keep best
      const pattern = this.getRandomPattern(lengthRange);
      const sentence = this.fillPattern(pattern);

      if (sentence && this.isValid(sentence, lengthRange)) {
        sentences.push(sentence);
      }

      if (sentences.length >= count) break;
    }

    return sentences.slice(0, count);
  }

  getRandomPattern(lengthRange) {
    const eligible = this.patterns.filter(p =>
      p.minWords >= lengthRange.min && p.minWords <= lengthRange.max
    );

    return eligible[Math.floor(Math.random() * eligible.length)];
  }

  fillPattern(pattern) {
    let sentence = pattern.template;

    const placeholders = {
      subject: this.getWord('pronouns'),
      verb: this.getWord('verbs'),
      object: this.getWord('nouns'),
      adjective: this.getWord('adjectives'),
      adverb: this.getWord('adverbs'),
      preposition: this.getWord('prepositions'),
      interrogative: this.getWord('interrogatives'),
      time: this.getWord('time_expressions')
    };

    for (const [key, value] of Object.entries(placeholders)) {
      if (value) {
        sentence = sentence.replace(`{${key}}`, value.word);
      }
    }

    // Check if all placeholders filled
    if (sentence.includes('{')) return null;

    return sentence;
  }

  getWord(category) {
    const words = this.vocabulary.filter(w => w.category === category);
    return words[Math.floor(Math.random() * words.length)];
  }

  isValid(sentence, lengthRange) {
    const wordCount = sentence.split(/\s+/).length;
    return wordCount >= lengthRange.min && wordCount <= lengthRange.max;
  }

  updateFrequencyLimit(newLimit) {
    this.vocabulary = this.vocabulary.filter(w => w.frequency_rank <= newLimit);
  }
}
