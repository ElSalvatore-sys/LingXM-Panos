/**
 * LanguageManager - Language state and persistence
 * PARALLEL SAFE: Creates new file only
 */

export class LanguageManager {
  constructor() {
    this.languages = {
      en: { name: 'English', nativeName: 'English' },
      de: { name: 'German', nativeName: 'Deutsch' },
      ar: { name: 'Arabic', nativeName: 'العربية' },
      fr: { name: 'French', nativeName: 'Français' },
      it: { name: 'Italian', nativeName: 'Italiano' },
      ru: { name: 'Russian', nativeName: 'Русский' },
      es: { name: 'Spanish', nativeName: 'Español' },
      pl: { name: 'Polish', nativeName: 'Polski' },
      fa: { name: 'Persian', nativeName: 'فارسی' }
    };

    this.state = this.loadState();
    this.listeners = [];
  }

  loadState() {
    const saved = localStorage.getItem('lingxm-languages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved language state');
      }
    }

    return {
      learning: 'de',
      native: 'en',
      additional: null
    };
  }

  saveState() {
    localStorage.setItem('lingxm-languages', JSON.stringify(this.state));
    this.notifyListeners();
  }

  setLearningLanguage(lang) {
    if (lang === this.state.native) {
      console.warn('Cannot learn your native language!');
      return false;
    }

    this.state.learning = lang;
    this.saveState();
    return true;
  }

  setNativeLanguage(lang) {
    if (lang === this.state.learning) {
      console.warn('Cannot set learning language as native!');
      return false;
    }

    this.state.native = lang;
    this.saveState();
    return true;
  }

  setAdditionalLanguage(lang) {
    this.state.additional = lang;
    this.saveState();
  }

  removeAdditionalLanguage() {
    this.state.additional = null;
    this.saveState();
  }

  onChange(callback) {
    this.listeners.push(callback);
  }

  notifyListeners() {
    this.listeners.forEach(cb => cb(this.state));
  }

  getLangName(code) {
    return this.languages[code]?.name || code;
  }

  getAvailableLanguages() {
    return Object.keys(this.languages);
  }
}
