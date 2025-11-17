/**
 * VocabularyLoader - GitHub-integrated vocabulary fetching
 * PARALLEL SAFE: Creates new file only
 */

export class VocabularyLoader {
  constructor() {
    this.githubBaseUrl = 'https://raw.githubusercontent.com/ElSalvatore-sys/LingXM-Personal/main/public/data/universal/';
  }

  async loadVocabulary(language, level = 'a1') {
    console.log(`📥 Loading ${language} vocabulary...`);

    const batchCount = 14;
    const promises = [];

    for (let i = 1; i <= batchCount; i++) {
      const url = `${this.githubBaseUrl}${language}-${level}-batch${i}.json`;
      promises.push(
        fetch(url)
          .then(res => res.ok ? res.json() : [])
          .catch(() => [])
      );
    }

    const batches = await Promise.all(promises);
    const words = batches.flat().filter(w => w && w.id);

    console.log(`✅ Loaded ${words.length} ${language} words`);
    return words;
  }

  async getWordsByFrequency(language, maxFreq = 50) {
    const vocab = await this.loadVocabulary(language);
    return vocab
      .filter(w => w.frequency_rank <= maxFreq)
      .sort((a, b) => a.frequency_rank - b.frequency_rank);
  }

  validateSchema(vocabulary) {
    if (!Array.isArray(vocabulary) || vocabulary.length === 0) return false;
    const sample = vocabulary[0];
    return sample.id && sample.word && sample.translations && sample.examples;
  }
}
