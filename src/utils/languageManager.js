/**
 * LanguageManager - Manages language configurations and translations
 */
export class LanguageManager {
  constructor() {
    this.languages = this._getLanguageDatabase();
    this.userLanguages = {
      native: 'en',
      learning: 'de',
      additional: null
    };
  }

  /**
   * Get language database
   * @private
   */
  _getLanguageDatabase() {
    return {
      en: { name: 'English', nativeName: 'English', code: 'en' },
      de: { name: 'German', nativeName: 'Deutsch', code: 'de' },
      es: { name: 'Spanish', nativeName: 'Español', code: 'es' },
      fr: { name: 'French', nativeName: 'Français', code: 'fr' },
      it: { name: 'Italian', nativeName: 'Italiano', code: 'it' },
      pt: { name: 'Portuguese', nativeName: 'Português', code: 'pt' },
      ru: { name: 'Russian', nativeName: 'Русский', code: 'ru' },
      zh: { name: 'Chinese', nativeName: '中文', code: 'zh' },
      ja: { name: 'Japanese', nativeName: '日本語', code: 'ja' },
      ko: { name: 'Korean', nativeName: '한국어', code: 'ko' },
      ar: { name: 'Arabic', nativeName: 'العربية', code: 'ar' },
      hi: { name: 'Hindi', nativeName: 'हिन्दी', code: 'hi' },
      nl: { name: 'Dutch', nativeName: 'Nederlands', code: 'nl' },
      pl: { name: 'Polish', nativeName: 'Polski', code: 'pl' },
      tr: { name: 'Turkish', nativeName: 'Türkçe', code: 'tr' },
      sv: { name: 'Swedish', nativeName: 'Svenska', code: 'sv' },
      da: { name: 'Danish', nativeName: 'Dansk', code: 'da' },
      no: { name: 'Norwegian', nativeName: 'Norsk', code: 'no' },
      fi: { name: 'Finnish', nativeName: 'Suomi', code: 'fi' },
      cs: { name: 'Czech', nativeName: 'Čeština', code: 'cs' }
    };
  }

  /**
   * Set user language
   */
  setLanguage(type, code) {
    if (!this.languages[code]) {
      console.error(`Unknown language code: ${code}`);
      return false;
    }

    if (['native', 'learning', 'additional'].includes(type)) {
      this.userLanguages[type] = code;
      this._saveToStorage();
      return true;
    }

    return false;
  }

  /**
   * Get user language
   */
  getLanguage(type) {
    return this.userLanguages[type];
  }

  /**
   * Get all user languages
   */
  getUserLanguages() {
    return { ...this.userLanguages };
  }

  /**
   * Get language info
   */
  getLanguageInfo(code) {
    return this.languages[code] || null;
  }

  /**
   * Get all available languages
   */
  getAllLanguages() {
    return Object.values(this.languages);
  }

  /**
   * Get language name
   */
  getLanguageName(code, native = false) {
    const lang = this.languages[code];
    if (!lang) return code;
    return native ? lang.nativeName : lang.name;
  }

  /**
   * Save to localStorage
   * @private
   */
  _saveToStorage() {
    try {
      localStorage.setItem('lingxm_user_languages', JSON.stringify(this.userLanguages));
    } catch (e) {
      console.error('Failed to save language settings:', e);
    }
  }

  /**
   * Load from localStorage
   */
  loadFromStorage() {
    try {
      const saved = localStorage.getItem('lingxm_user_languages');
      if (saved) {
        this.userLanguages = { ...this.userLanguages, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load language settings:', e);
    }
  }

  /**
   * Reset to defaults
   */
  reset() {
    this.userLanguages = {
      native: 'en',
      learning: 'de',
      additional: null
    };
    this._saveToStorage();
  }
}
