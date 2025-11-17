/**
 * CacheManager - Manages localStorage caching for vocabulary and progress
 */
export class CacheManager {
  constructor(prefix = 'lingxm_') {
    this.prefix = prefix;
    this.available = this._checkAvailability();
  }

  /**
   * Check if localStorage is available
   * @private
   */
  _checkAvailability() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      console.warn('localStorage not available:', e);
      return false;
    }
  }

  /**
   * Generate cache key with prefix
   * @private
   */
  _key(key) {
    return `${this.prefix}${key}`;
  }

  /**
   * Set item in cache
   */
  set(key, value, expiryMinutes = null) {
    if (!this.available) return false;

    try {
      const data = {
        value,
        timestamp: Date.now(),
        expiry: expiryMinutes ? Date.now() + (expiryMinutes * 60 * 1000) : null
      };
      localStorage.setItem(this._key(key), JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Cache set error:', e);
      return false;
    }
  }

  /**
   * Get item from cache
   */
  get(key, defaultValue = null) {
    if (!this.available) return defaultValue;

    try {
      const item = localStorage.getItem(this._key(key));
      if (!item) return defaultValue;

      const data = JSON.parse(item);

      // Check expiry
      if (data.expiry && Date.now() > data.expiry) {
        this.remove(key);
        return defaultValue;
      }

      return data.value;
    } catch (e) {
      console.error('Cache get error:', e);
      return defaultValue;
    }
  }

  /**
   * Remove item from cache
   */
  remove(key) {
    if (!this.available) return false;
    try {
      localStorage.removeItem(this._key(key));
      return true;
    } catch (e) {
      console.error('Cache remove error:', e);
      return false;
    }
  }

  /**
   * Clear all cache items with prefix
   */
  clear() {
    if (!this.available) return false;

    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (e) {
      console.error('Cache clear error:', e);
      return false;
    }
  }

  /**
   * Get cache size in bytes (approximate)
   */
  getSize() {
    if (!this.available) return 0;

    let size = 0;
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        size += localStorage.getItem(key).length + key.length;
      }
    });
    return size;
  }

  /**
   * Get all cache keys
   */
  getKeys() {
    if (!this.available) return [];

    const keys = Object.keys(localStorage);
    return keys
      .filter(key => key.startsWith(this.prefix))
      .map(key => key.substring(this.prefix.length));
  }
}
