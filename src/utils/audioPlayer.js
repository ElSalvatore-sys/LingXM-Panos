/**
 * AudioPlayer - Handles audio playback with Web Audio API
 */
export class AudioPlayer {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.currentSource = null;
  }

  /**
   * Play audio from URL
   * @param {string} url - Audio file URL
   * @returns {Promise} Resolves when playback starts
   */
  async play(url) {
    try {
      // Stop current playback
      this.stop();

      // Create new audio element
      this.audio = new Audio(url);
      this.isPlaying = true;

      // Setup event listeners
      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
      });

      this.audio.addEventListener('error', (e) => {
        console.error('Audio playback error:', e);
        this.isPlaying = false;
      });

      // Play
      await this.audio.play();
      return true;
    } catch (error) {
      console.error('Failed to play audio:', error);
      this.isPlaying = false;
      return false;
    }
  }

  /**
   * Stop current playback
   */
  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
    this.isPlaying = false;
  }

  /**
   * Pause playback
   */
  pause() {
    if (this.audio && this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  /**
   * Resume playback
   */
  resume() {
    if (this.audio && !this.isPlaying) {
      this.audio.play();
      this.isPlaying = true;
    }
  }

  /**
   * Set volume (0-1)
   */
  setVolume(volume) {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
    }
  }

  /**
   * Get current state
   */
  getState() {
    return {
      isPlaying: this.isPlaying,
      currentTime: this.audio ? this.audio.currentTime : 0,
      duration: this.audio ? this.audio.duration : 0
    };
  }
}
