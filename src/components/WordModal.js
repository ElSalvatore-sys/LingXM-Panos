export class WordModal {
  constructor() {
    this.modal = document.getElementById('wordModal');
    this.modalContent = document.getElementById('modalContent');
    this.closeBtn = document.getElementById('modalClose');
    this.isMouseInside = false;

    this.setupEventListeners();
  }

  setupEventListeners() {
    // Close button
    this.closeBtn.addEventListener('click', () => this.close());

    // Click outside to close
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // CRITICAL: Auto-dismiss on mouse leave
    this.modalContent.addEventListener('mouseenter', () => {
      this.isMouseInside = true;
    });

    this.modalContent.addEventListener('mouseleave', () => {
      this.isMouseInside = false;
      // Delay to allow clicking save/audio buttons
      setTimeout(() => {
        if (!this.isMouseInside) {
          this.close();
        }
      }, 300);
    });

    // Keyboard support (Escape to close)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.style.display === 'flex') {
        this.close();
      }
    });
  }

  async open(wordData, userLangs) {
    // Populate modal with word data
    document.getElementById('modalWordTitle').textContent = `📖 ${wordData.word}`;
    document.getElementById('modalTranslation').textContent =
      `(${wordData.translations[userLangs.native]})`;
    document.getElementById('modalMeta').textContent =
      `${wordData.category} • #${wordData.frequency_rank} • ${wordData.cefrLevel}`;

    // Translations
    const translationList = document.getElementById('modalTranslations');
    translationList.innerHTML = '';

    // Show primary language + learning language + optional 3rd
    const langsToShow = [
      userLangs.native,
      userLangs.learning,
      ...(userLangs.additional ? [userLangs.additional] : [])
    ];

    langsToShow.forEach(lang => {
      const item = document.createElement('div');
      item.className = 'translation-item';
      item.innerHTML = `
        <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='16'><rect fill='%23ccc' width='24' height='16'/></svg>">
        ${this.getLangName(lang)}: ${wordData.translations[lang]}
      `;
      translationList.appendChild(item);
    });

    // Explanation
    document.getElementById('modalExplanation').textContent =
      wordData.explanation[userLangs.native];

    // Examples
    const examplesList = document.getElementById('modalExamples');
    examplesList.innerHTML = '';

    wordData.examples[userLangs.learning].forEach((example, idx) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${example}</strong><br>
        <small>${wordData.examples[userLangs.native][idx]}</small>
      `;
      examplesList.appendChild(li);
    });

    // Show modal
    this.modal.style.display = 'flex';
    this.isMouseInside = false;
  }

  close() {
    this.modal.style.display = 'none';
  }

  getLangName(code) {
    const names = {
      en: 'English',
      de: 'German',
      ar: 'Arabic',
      fr: 'French',
      it: 'Italian',
      ru: 'Russian',
      es: 'Spanish',
      pl: 'Polish',
      fa: 'Persian'
    };
    return names[code] || code;
  }
}
