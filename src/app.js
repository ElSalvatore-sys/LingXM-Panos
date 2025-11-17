import { WordModal } from './components/WordModal.js';
import { WordTooltip } from './components/WordTooltip.js';
import { WordParser } from './utils/wordParser.js';

class LingXMApp {
  constructor() {
    this.userLanguages = {
      native: 'en',
      learning: 'de',
      additional: null
    };

    this.vocabularyData = [];
    this.wordModal = new WordModal();
    this.wordTooltip = new WordTooltip();

    this.init();
  }

  async init() {
    console.log('🚀 LingXM Panos initializing...');

    // Load mock data
    await this.loadVocabulary();

    // Setup event listeners
    this.setupLanguageSelector();
    this.setupWordInteractions();
    this.setupFilters();

    console.log('✅ LingXM Panos ready!');
  }

  async loadVocabulary() {
    try {
      const response = await fetch('/public/data/universal/MOCK_SAMPLE.json');
      this.vocabularyData = await response.json();
      console.log(`✅ Loaded ${this.vocabularyData.length} words`);
    } catch (error) {
      console.error('❌ Failed to load vocabulary:', error);
      this.vocabularyData = [];
    }
  }

  setupLanguageSelector() {
    const addBtn = document.getElementById('addLangBtn');
    const additionalLang = document.getElementById('additionalLang');
    const removeBtn = document.getElementById('removeLangBtn');

    addBtn.addEventListener('click', () => {
      additionalLang.style.display = 'flex';
      addBtn.style.display = 'none';
    });

    removeBtn.addEventListener('click', () => {
      additionalLang.style.display = 'none';
      addBtn.style.display = 'block';
      this.userLanguages.additional = null;
    });
  }

  setupWordInteractions() {
    const sentenceList = document.getElementById('sentenceList');

    sentenceList.addEventListener('mouseover', (e) => {
      if (e.target.classList.contains('underlined-word')) {
        const wordId = e.target.dataset.wordId;
        const wordData = this.vocabularyData.find(w => w.id === wordId);

        if (wordData) {
          const rect = e.target.getBoundingClientRect();
          this.wordTooltip.show(wordData, this.userLanguages.native, {
            x: rect.left,
            y: rect.bottom
          });
        }
      }
    });

    sentenceList.addEventListener('mouseout', (e) => {
      if (e.target.classList.contains('underlined-word')) {
        this.wordTooltip.hide();
      }
    });

    sentenceList.addEventListener('dblclick', (e) => {
      if (e.target.classList.contains('underlined-word')) {
        const wordId = e.target.dataset.wordId;
        const wordData = this.vocabularyData.find(w => w.id === wordId);

        if (wordData) {
          this.wordModal.open(wordData, this.userLanguages);
          this.wordTooltip.hide();
        }
      }
    });
  }

  setupFilters() {
    const applyBtn = document.getElementById('applyFiltersBtn');

    applyBtn.addEventListener('click', () => {
      const frequency = document.querySelector('input[name="frequency"]:checked').value;
      const length = document.querySelector('input[name="length"]:checked').value;

      console.log(`Filters applied: frequency=${frequency}, length=${length}`);
      // TODO: Filter sentences based on selection
    });
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.lingxmApp = new LingXMApp();
});
