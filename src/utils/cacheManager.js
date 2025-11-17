/**
 * CacheManager - IndexedDB caching for offline support
 * PARALLEL SAFE: Creates new file only
 */

export class CacheManager {
  constructor() {
    this.dbName = 'LingXMPanos';
    this.storeName = 'vocabulary';
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
          store.createIndex('language', 'language', { unique: false });
        }
      };
    });
  }

  async get(language) {
    await this.init();
    const transaction = this.db.transaction([this.storeName], 'readonly');
    const store = transaction.objectStore(this.storeName);
    const request = store.get(language);

    return new Promise((resolve) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    });
  }

  async set(language, data) {
    await this.init();
    const transaction = this.db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);

    store.put({
      id: language,
      language,
      data,
      timestamp: Date.now()
    });
  }

  isFresh(timestamp) {
    const ONE_DAY = 24 * 60 * 60 * 1000;
    return Date.now() - timestamp < ONE_DAY;
  }
}
