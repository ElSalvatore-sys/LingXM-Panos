/**
 * TTSManager - Text-to-Speech manager with voice selection
 * PARALLEL SAFE: Creates new file only
 */

export class TTSManager {
  constructor() {
    this.voices = [];
    this.preferredVoices = {};
    this.loadVoices();
  }

  loadVoices() {
    // Voices may not be loaded immediately
    if (window.speechSynthesis) {
      this.voices = window.speechSynthesis.getVoices();

      if (this.voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.voices = window.speechSynthesis.getVoices();
          this.selectDefaultVoices();
        };
      } else {
        this.selectDefaultVoices();
      }
    }
  }

  selectDefaultVoices() {
    // Select best voice for each language
    const preferences = {
      de: ['Anna', 'Google Deutsch', 'de-DE'],
      en: ['Samantha', 'Google US English', 'en-US'],
      ar: ['Google العربية', 'ar-SA'],
      fr: ['Google français', 'fr-FR'],
      it: ['Google italiano', 'it-IT'],
      ru: ['Google русский', 'ru-RU'],
      es: ['Google español', 'es-ES'],
      pl: ['Google polski', 'pl-PL'],
      fa: ['Google فارسی', 'fa-IR']
    };

    for (const [lang, names] of Object.entries(preferences)) {
      const voice = this.findBestVoice(names);
      if (voice) {
        this.preferredVoices[lang] = voice;
      }
    }
  }

  findBestVoice(preferredNames) {
    for (const name of preferredNames) {
      const voice = this.voices.find(v =>
        v.name.includes(name) || v.lang.includes(name)
      );

      if (voice) return voice;
    }

    return null;
  }

  getVoiceForLanguage(lang) {
    return this.preferredVoices[lang] || this.voices[0];
  }

  speak(text, language, rate = 0.9) {
    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = this.getVoiceForLanguage(language);

      if (voice) utterance.voice = voice;
      utterance.rate = rate;
      utterance.lang = voice?.lang || 'en-US';

      utterance.onend = resolve;
      utterance.onerror = reject;

      window.speechSynthesis.speak(utterance);
    });
  }

  pause() {
    window.speechSynthesis.pause();
  }

  resume() {
    window.speechSynthesis.resume();
  }

  stop() {
    window.speechSynthesis.cancel();
  }
}
