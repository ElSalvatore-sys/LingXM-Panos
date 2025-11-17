export class WordParser {
  constructor(vocabularyData) {
    this.vocabulary = vocabularyData;
    this.wordMap = new Map();

    // Build word lookup map
    vocabularyData.forEach(word => {
      this.wordMap.set(word.word.toLowerCase(), word);
    });
  }

  parseSentence(sentence) {
    // Split sentence into words
    const words = sentence.split(/(\s+|[.,!?;:])/);

    return words.map(word => {
      const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, '');
      const wordData = this.wordMap.get(cleanWord);

      if (wordData) {
        return {
          original: word,
          wordData: wordData,
          shouldUnderline: true
        };
      }

      return {
        original: word,
        wordData: null,
        shouldUnderline: false
      };
    });
  }
}
