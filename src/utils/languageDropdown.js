/**
 * LanguageDropdown - Manages language dropdown UI
 */
export class LanguageDropdown {
  constructor(languageManager, flagGenerator) {
    this.languageManager = languageManager;
    this.flagGenerator = flagGenerator;
    this.pickers = {};
    this.callbacks = {};
  }

  /**
   * Initialize a language picker
   * @param {string} pickerId - DOM element ID
   * @param {string} type - 'native', 'learning', or 'additional'
   */
  init(pickerId, type, onChange) {
    const picker = document.getElementById(pickerId);
    if (!picker) {
      console.error(`Picker not found: ${pickerId}`);
      return;
    }

    this.pickers[type] = picker;
    this.callbacks[type] = onChange;

    const flagDisplay = picker.querySelector('.flag-display');
    const dropdownBtn = picker.querySelector('.dropdown-btn');

    if (!flagDisplay || !dropdownBtn) {
      console.error('Picker missing required elements');
      return;
    }

    // Create dropdown menu
    const dropdown = this._createDropdown(type);
    picker.appendChild(dropdown);

    // Toggle dropdown
    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this._toggleDropdown(type);
    });

    // Close on outside click
    document.addEventListener('click', () => {
      this._closeAllDropdowns();
    });

    // Update initial flag
    const currentLang = this.languageManager.getLanguage(type);
    if (currentLang) {
      this._updateFlag(type, currentLang);
    }
  }

  /**
   * Create dropdown menu
   * @private
   */
  _createDropdown(type) {
    const dropdown = document.createElement('div');
    dropdown.className = 'language-dropdown';
    dropdown.style.display = 'none';

    const languages = this.languageManager.getAllLanguages();
    languages.forEach(lang => {
      const item = document.createElement('div');
      item.className = 'dropdown-item';
      item.innerHTML = `
        <img src="${this.flagGenerator.getFlag(lang.code)}" alt="${lang.name}" class="dropdown-flag">
        <span>${lang.nativeName}</span>
      `;

      item.addEventListener('click', (e) => {
        e.stopPropagation();
        this._selectLanguage(type, lang.code);
      });

      dropdown.appendChild(item);
    });

    return dropdown;
  }

  /**
   * Toggle dropdown visibility
   * @private
   */
  _toggleDropdown(type) {
    const picker = this.pickers[type];
    if (!picker) return;

    const dropdown = picker.querySelector('.language-dropdown');
    if (!dropdown) return;

    // Close other dropdowns
    Object.keys(this.pickers).forEach(t => {
      if (t !== type) {
        const otherDropdown = this.pickers[t].querySelector('.language-dropdown');
        if (otherDropdown) {
          otherDropdown.style.display = 'none';
        }
      }
    });

    // Toggle current
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  }

  /**
   * Close all dropdowns
   * @private
   */
  _closeAllDropdowns() {
    Object.values(this.pickers).forEach(picker => {
      const dropdown = picker.querySelector('.language-dropdown');
      if (dropdown) {
        dropdown.style.display = 'none';
      }
    });
  }

  /**
   * Select a language
   * @private
   */
  _selectLanguage(type, code) {
    this.languageManager.setLanguage(type, code);
    this._updateFlag(type, code);
    this._closeAllDropdowns();

    // Trigger callback
    if (this.callbacks[type]) {
      this.callbacks[type](code);
    }
  }

  /**
   * Update flag display
   * @private
   */
  _updateFlag(type, code) {
    const picker = this.pickers[type];
    if (!picker) return;

    const flagImg = picker.querySelector('.active-flag');
    if (flagImg) {
      flagImg.src = this.flagGenerator.getFlag(code);
      flagImg.alt = this.languageManager.getLanguageName(code);
    }
  }

  /**
   * Get selected language
   */
  getSelected(type) {
    return this.languageManager.getLanguage(type);
  }

  /**
   * Set language programmatically
   */
  setLanguage(type, code) {
    this._selectLanguage(type, code);
  }
}
