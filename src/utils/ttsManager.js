/**
 * TTSManager - Text-to-Speech using Web Speech API
 */
export class TTSManager {
  constructor() {
    this.synthesis = window.speechSynthesis;
    this.voices = [];
    this.currentUtterance = null;
    this.speaking = false;

    // Load voices
    this._loadVoices();

    // Voices load asynchronously
    if (this.synthesis.onvoiceschanged !== undefined) {
      this.synthesis.onvoiceschanged = () => this._loadVoices();
    }
  }

  /**
   * Load available voices
   * @private
   */
  _loadVoices() {
    this.voices = this.synthesis.getVoices();
  }

  /**
   * Speak text
   * @param {string} text - Text to speak
   * @param {string} languageCode - Language code (e.g., 'de-DE', 'en-US')
   * @param {Object} options - Voice options {rate, pitch, volume}
   */
  speak(text, languageCode = 'de-DE', options = {}) {
    // Stop current speech
    this.stop();

    // Create utterance
    this.currentUtterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance.lang = languageCode;

    // Set options
    this.currentUtterance.rate = options.rate || 1.0;
    this.currentUtterance.pitch = options.pitch || 1.0;
    this.currentUtterance.volume = options.volume || 1.0;

    // Try to find a voice for the language
    const voice = this._findVoice(languageCode);
    if (voice) {
      this.currentUtterance.voice = voice;
    }

    // Event handlers
    this.currentUtterance.onstart = () => {
      this.speaking = true;
    };

    this.currentUtterance.onend = () => {
      this.speaking = false;
    };

    this.currentUtterance.onerror = (event) => {
      console.error('TTS error:', event);
      this.speaking = false;
    };

    // Speak
    this.synthesis.speak(this.currentUtterance);
  }

  /**
   * Find voice for language
   * @private
   */
  _findVoice(languageCode) {
    // Try exact match
    let voice = this.voices.find(v => v.lang === languageCode);

    // Try language prefix match (e.g., 'de' matches 'de-DE')
    if (!voice) {
      const langPrefix = languageCode.split('-')[0];
      voice = this.voices.find(v => v.lang.startsWith(langPrefix));
    }

    return voice || null;
  }

  /**
   * Stop speaking
   */
  stop() {
    if (this.synthesis.speaking) {
      this.synthesis.cancel();
    }
    this.speaking = false;
    this.currentUtterance = null;
  }

  /**
   * Pause speaking
   */
  pause() {
    if (this.synthesis.speaking && !this.synthesis.paused) {
      this.synthesis.pause();
    }
  }

  /**
   * Resume speaking
   */
  resume() {
    if (this.synthesis.paused) {
      this.synthesis.resume();
    }
  }

  /**
   * Check if TTS is available
   */
  isAvailable() {
    return 'speechSynthesis' in window;
  }

  /**
   * Get available voices for a language
   */
  getVoicesForLanguage(languageCode) {
    const langPrefix = languageCode.split('-')[0];
    return this.voices.filter(v =>
      v.lang === languageCode || v.lang.startsWith(langPrefix)
    );
  }

  /**
   * Get all voices
   */
  getAllVoices() {
    return this.voices;
  }

  /**
   * Check if currently speaking
   */
  isSpeaking() {
    return this.speaking;
  }
}
