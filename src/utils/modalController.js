/**
 * ModalController - Modal open/close with auto-dismiss
 * PARALLEL SAFE: Creates new file only
 */

export class ModalController {
  constructor(modalElement) {
    this.modal = modalElement;
    this.modalContent = modalElement.querySelector('.modal-content');
    this.isMouseInside = false;
    this.setupListeners();
  }

  setupListeners() {
    // Close button
    this.modal.querySelector('.modal-close').addEventListener('click', () => this.close());

    // Click outside
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    // Auto-dismiss on mouse leave
    this.modalContent.addEventListener('mouseenter', () => {
      this.isMouseInside = true;
    });

    this.modalContent.addEventListener('mouseleave', () => {
      this.isMouseInside = false;
      setTimeout(() => {
        if (!this.isMouseInside) this.close();
      }, 300);
    });

    // ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.style.display === 'flex') {
        this.close();
      }
    });
  }

  open(wordData, userLangs) {
    // Populate modal
    this.modal.querySelector('#modalWordTitle').textContent = `📖 ${wordData.word}`;
    this.modal.querySelector('#modalTranslation').textContent =
      `(${wordData.translations[userLangs.native]})`;
    this.modal.querySelector('#modalMeta').textContent =
      `${wordData.category} • #${wordData.frequency_rank} • ${wordData.cefrLevel}`;

    // Translations
    const translationList = this.modal.querySelector('#modalTranslations');
    translationList.innerHTML = '';

    const langs = [userLangs.native, userLangs.learning];
    if (userLangs.additional) langs.push(userLangs.additional);

    langs.forEach(lang => {
      const item = document.createElement('div');
      item.className = 'translation-item';
      item.innerHTML = `
        <strong>${this.getLangName(lang)}:</strong>
        ${wordData.translations[lang]}
      `;
      translationList.appendChild(item);
    });

    // Explanation
    this.modal.querySelector('#modalExplanation').textContent =
      wordData.explanation[userLangs.native];

    // Examples
    const examplesList = this.modal.querySelector('#modalExamples');
    examplesList.innerHTML = '';

    wordData.examples[userLangs.learning].forEach((example, idx) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${example}</strong>
        <br><em>${wordData.examples[userLangs.native][idx]}</em>
      `;
      examplesList.appendChild(li);
    });

    // Show
    this.modal.style.display = 'flex';
    this.isMouseInside = false;
  }

  close() {
    this.modal.style.display = 'none';
  }

  getLangName(code) {
    const names = {
      en: 'English', de: 'German', ar: 'Arabic', fr: 'French',
      it: 'Italian', ru: 'Russian', es: 'Spanish', pl: 'Polish', fa: 'Persian'
    };
    return names[code] || code;
  }
}
