/**
 * LanguageDropdown - Dropdown UI controller
 * PARALLEL SAFE: Creates new file only
 */

export class LanguageDropdown {
  constructor(containerElement, languageManager, flagGenerator) {
    this.container = containerElement;
    this.langManager = languageManager;
    this.flagGen = flagGenerator;
    this.isOpen = false;
    this.currentLang = null;
    this.onSelectCallback = null;
  }

  init(currentLang, onSelect) {
    this.currentLang = currentLang;
    this.onSelectCallback = onSelect;
    this.render();
    this.attachListeners();
  }

  render() {
    const button = this.container.querySelector('.dropdown-btn');
    const flag = this.container.querySelector('.active-flag');

    if (flag) {
      flag.src = this.flagGen.getDataURL(this.currentLang);
    }

    // Create dropdown menu if doesn't exist
    if (!this.container.querySelector('.dropdown-menu')) {
      const menu = document.createElement('div');
      menu.className = 'dropdown-menu';
      menu.style.display = 'none';

      const langs = this.langManager.getAvailableLanguages();
      langs.forEach(lang => {
        const item = document.createElement('div');
        item.className = 'dropdown-item';
        item.dataset.lang = lang;
        item.innerHTML = `
          <img src="${this.flagGen.getDataURL(lang)}" width="24" height="16">
          <span>${this.langManager.getLangName(lang)}</span>
        `;
        menu.appendChild(item);
      });

      this.container.appendChild(menu);
    }
  }

  attachListeners() {
    const button = this.container.querySelector('.dropdown-btn');
    const menu = this.container.querySelector('.dropdown-menu');

    button.addEventListener('click', () => this.toggle());

    menu.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        const lang = item.dataset.lang;
        this.select(lang);
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!this.container.contains(e.target)) {
        this.close();
      }
    });
  }

  toggle() {
    const menu = this.container.querySelector('.dropdown-menu');
    this.isOpen = !this.isOpen;
    menu.style.display = this.isOpen ? 'block' : 'none';
  }

  close() {
    const menu = this.container.querySelector('.dropdown-menu');
    this.isOpen = false;
    menu.style.display = 'none';
  }

  select(lang) {
    this.currentLang = lang;
    this.render();
    this.close();

    if (this.onSelectCallback) {
      this.onSelectCallback(lang);
    }
  }
}
