/**
 * AudioPlayer - Play audio for sentences and words
 * PARALLEL SAFE: Creates new file only
 */

export class AudioPlayer {
  constructor() {
    this.currentAudio = null;
    this.isPlaying = false;
  }

  async play(text, language) {
    // Stop any current playback
    this.stop();

    try {
      // Try Web Speech API first
      if ('speechSynthesis' in window) {
        await this.playWithWebSpeech(text, language);
      } else {
        console.warn('Speech synthesis not supported');
      }
    } catch (error) {
      console.error('Audio playback failed:', error);
    }
  }

  playWithWebSpeech(text, language) {
    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = this.getLanguageCode(language);
      utterance.rate = 0.9; // Slightly slower for learning

      utterance.onend = () => {
        this.isPlaying = false;
        resolve();
      };

      utterance.onerror = (error) => {
        this.isPlaying = false;
        reject(error);
      };

      this.isPlaying = true;
      window.speechSynthesis.speak(utterance);
    });
  }

  stop() {
    if (this.isPlaying) {
      window.speechSynthesis.cancel();
      this.isPlaying = false;
    }

    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
  }

  getLanguageCode(lang) {
    const codes = {
      en: 'en-US',
      de: 'de-DE',
      ar: 'ar-SA',
      fr: 'fr-FR',
      it: 'it-IT',
      ru: 'ru-RU',
      es: 'es-ES',
      pl: 'pl-PL',
      fa: 'fa-IR'
    };

    return codes[lang] || 'en-US';
  }

  getAvailableVoices(language) {
    const voices = window.speechSynthesis.getVoices();
    const langCode = this.getLanguageCode(language);

    return voices.filter(voice => voice.lang.startsWith(langCode.split('-')[0]));
  }
}
