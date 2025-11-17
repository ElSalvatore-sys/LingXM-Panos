/**
 * SavedWordsManager - Manage user's saved words
 * PARALLEL SAFE: Creates new file only
 */

export class SavedWordsManager {
  constructor() {
    this.dbName = 'LingXMSavedWords';
    this.storeName = 'saved';
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
          store.createIndex('savedAt', 'savedAt', { unique: false });
        }
      };
    });
  }

  async saveWord(wordData, language) {
    await this.init();

    const saved = {
      id: `${language}-${wordData.id}`,
      wordId: wordData.id,
      word: wordData.word,
      language,
      translation: wordData.translations.en, // Store primary translation
      savedAt: new Date().toISOString(),
      notes: ''
    };

    const transaction = this.db.transaction([this.storeName], 'readwrite');
    transaction.objectStore(this.storeName).put(saved);

    console.log(`💾 Saved word: ${wordData.word}`);
    return saved;
  }

  async unsaveWord(wordId, language) {
    await this.init();

    const id = `${language}-${wordId}`;
    const transaction = this.db.transaction([this.storeName], 'readwrite');
    transaction.objectStore(this.storeName).delete(id);

    console.log(`🗑️ Unsaved word: ${wordId}`);
  }

  async isSaved(wordId, language) {
    await this.init();

    const id = `${language}-${wordId}`;
    const transaction = this.db.transaction([this.storeName], 'readonly');
    const request = transaction.objectStore(this.storeName).get(id);

    return new Promise((resolve) => {
      request.onsuccess = () => resolve(!!request.result);
      request.onerror = () => resolve(false);
    });
  }

  async getAllSaved(language) {
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

  async getCount(language) {
    const saved = await this.getAllSaved(language);
    return saved.length;
  }

  async addNote(wordId, language, note) {
    await this.init();

    const id = `${language}-${wordId}`;
    const transaction = this.db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    const request = store.get(id);

    return new Promise((resolve) => {
      request.onsuccess = () => {
        const saved = request.result;
        if (saved) {
          saved.notes = note;
          store.put(saved);
        }
        resolve();
      };
      request.onerror = () => resolve();
    });
  }
}
