/**
 * AudioCache - Cache audio files for offline playback
 * PARALLEL SAFE: Creates new file only
 */

export class AudioCache {
  constructor() {
    this.cacheName = 'lingxm-audio-v1';
    this.cache = null;
  }

  async init() {
    if ('caches' in window) {
      this.cache = await caches.open(this.cacheName);
    }
  }

  async cacheAudio(url) {
    if (!this.cache) await this.init();

    try {
      const response = await fetch(url);
      if (response.ok) {
        await this.cache.put(url, response);
        console.log(`✅ Cached audio: ${url}`);
      }
    } catch (error) {
      console.error('Failed to cache audio:', error);
    }
  }

  async getAudio(url) {
    if (!this.cache) await this.init();

    const cached = await this.cache.match(url);
    if (cached) {
      console.log(`📦 Using cached audio: ${url}`);
      return cached;
    }

    // Not cached, fetch and cache it
    await this.cacheAudio(url);
    return await this.cache.match(url);
  }

  async clearCache() {
    if ('caches' in window) {
      await caches.delete(this.cacheName);
      console.log('🗑️ Audio cache cleared');
    }
  }

  async getCacheSize() {
    if (!this.cache) await this.init();

    const keys = await this.cache.keys();
    return keys.length;
  }
}
