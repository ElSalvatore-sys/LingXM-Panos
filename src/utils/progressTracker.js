/**
 * ProgressTracker - Track user's learning progress
 * PARALLEL SAFE: Creates new file only
 */

export class ProgressTracker {
  constructor() {
    this.dbName = 'LingXMProgress';
    this.storeName = 'progress';
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          store.createIndex('wordId', 'wordId', { unique: false });
          store.createIndex('language', 'language', { unique: false });
          store.createIndex('masteryLevel', 'masteryLevel', { unique: false });
        }
      };
    });
  }

  async recordWordSeen(wordId, language) {
    await this.init();

    const existing = await this.getProgress(wordId);

    const progress = {
      id: `${language}-${wordId}`,
      wordId,
      language,
      timesReviewed: (existing?.timesReviewed || 0) + 1,
      masteryLevel: this.calculateMastery(existing?.timesReviewed || 0),
      lastReviewed: new Date().toISOString(),
      firstSeen: existing?.firstSeen || new Date().toISOString()
    };

    const transaction = this.db.transaction([this.storeName], 'readwrite');
    transaction.objectStore(this.storeName).put(progress);

    return progress;
  }

  calculateMastery(timesReviewed) {
    if (timesReviewed < 3) return 1;
    if (timesReviewed < 7) return 2;
    if (timesReviewed < 15) return 3;
    if (timesReviewed < 30) return 4;
    return 5;
  }

  async getProgress(wordId) {
    await this.init();

    const transaction = this.db.transaction([this.storeName], 'readonly');
    const store = transaction.objectStore(this.storeName);
    const index = store.index('wordId');
    const request = index.get(wordId);

    return new Promise((resolve) => {
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => resolve(null);
    });
  }

  async getAllProgress(language) {
    await this.init();

    const transaction = this.db.transaction([this.storeName], 'readonly');
    const store = transaction.objectStore(this.storeName);
    const index = store.index('language');
    const request = index.getAll(language);

    return new Promise((resolve) => {
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => resolve([]);
    });
  }

  async getWordsByMastery(language, masteryLevel) {
    const all = await this.getAllProgress(language);
    return all.filter(p => p.masteryLevel === masteryLevel);
  }

  async getStats(language) {
    const all = await this.getAllProgress(language);

    const stats = {
      totalWords: all.length,
      byMastery: {
        1: all.filter(p => p.masteryLevel === 1).length,
        2: all.filter(p => p.masteryLevel === 2).length,
        3: all.filter(p => p.masteryLevel === 3).length,
        4: all.filter(p => p.masteryLevel === 4).length,
        5: all.filter(p => p.masteryLevel === 5).length
      },
      totalReviews: all.reduce((sum, p) => sum + p.timesReviewed, 0)
    };

    return stats;
  }
}
