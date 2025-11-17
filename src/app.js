// Import Components
import { WordModal } from './components/WordModal.js';
import { WordTooltip } from './components/WordTooltip.js';

// Import All Utilities
import { VocabularyLoader } from './utils/vocabularyLoader.js';
import { WordMatcher } from './utils/wordMatcher.js';
import { CacheManager } from './utils/cacheManager.js';
import { SentenceParser } from './utils/sentenceParser.js';
import { TooltipPositioner } from './utils/tooltipPositioner.js';
import { ModalController } from './utils/modalController.js';
import { LanguageManager } from './utils/languageManager.js';
import { FlagGenerator } from './utils/flagGenerator.js';
import { LanguageDropdown } from './utils/languageDropdown.js';
import { FilterManager } from './utils/filterManager.js';
import { SentenceGenerator } from './utils/sentenceGenerator.js';
import { DifficultyCalculator } from './utils/difficultyCalculator.js';
import { AudioPlayer } from './utils/audioPlayer.js';
import { TTSManager } from './utils/ttsManager.js';
import { ProgressTracker } from './utils/progressTracker.js';
import { SavedWordsManager } from './utils/savedWordsManager.js';
import { StatsCalculator } from './utils/statsCalculator.js';

/**
 * LingXM Panos - Main Application Class
 * Integrates all systems for language learning
 */
class LingXMApp {
  constructor() {
    // Initialize core systems
    this.cacheManager = new CacheManager('lingxm_');
    this.languageManager = new LanguageManager();
    this.flagGenerator = new FlagGenerator();

    // Initialize data management
    this.vocabularyLoader = new VocabularyLoader();
    this.vocabularyData = [];
    this.wordMatcher = new WordMatcher();

    // Initialize parsing and display
    this.sentenceParser = new SentenceParser(this.wordMatcher);
    this.tooltipPositioner = new TooltipPositioner();
    this.difficultyCalculator = new DifficultyCalculator();

    // Initialize UI components
    this.wordModal = new WordModal();
    this.wordTooltip = new WordTooltip();
    this.modalController = new ModalController();

    // Initialize language UI
    this.languageDropdown = new LanguageDropdown(this.languageManager, this.flagGenerator);

    // Initialize filters and generation
    this.filterManager = new FilterManager();
    this.sentenceGenerator = new SentenceGenerator();

    // Initialize audio systems
    this.audioPlayer = new AudioPlayer();
    this.ttsManager = new TTSManager();

    // Initialize progress tracking
    this.progressTracker = new ProgressTracker(this.cacheManager);
    this.savedWordsManager = new SavedWordsManager(this.cacheManager);
    this.statsCalculator = new StatsCalculator(this.progressTracker, this.savedWordsManager);

    // Current sentences
    this.sentences = [];
    this.currentPage = 0;
    this.sentencesPerPage = 10;

    this.init();
  }

  async init() {
    console.log('🚀 LingXM Panos initializing...');
    console.log('📦 All systems integrated and ready');

    // Load user language preferences
    this.languageManager.loadFromStorage();

    // Load vocabulary for learning language
    const learningLang = this.languageManager.getLanguage('learning');
    await this.loadVocabulary(learningLang);

    // Setup all UI components
    this.setupLanguageDropdowns();
    this.setupWordInteractions();
    this.setupFilters();
    this.setupAudioControls();
    this.setupModalActions();

    // Generate and display initial sentences
    await this.generateSentences();
    this.renderSentences();

    // Update progress
    this.progressTracker.updateStreak();
    this.updateStatsDisplay();

    console.log('✅ LingXM Panos fully operational!');
    console.log('📊 Stats:', this.statsCalculator.getFormattedStats());
  }

  /**
   * Load vocabulary data
   */
  async loadVocabulary(languageCode = 'de') {
    try {
      this.vocabularyData = await this.vocabularyLoader.loadLanguage(languageCode);

      // Update word matcher with new vocabulary
      this.wordMatcher.setVocabulary(this.vocabularyData);

      // Update sentence parser
      this.sentenceParser.setWordMatcher(this.wordMatcher);

      console.log(`✅ Loaded ${this.vocabularyData.length} words for ${languageCode}`);
    } catch (error) {
      console.error('❌ Failed to load vocabulary:', error);
      this.vocabularyData = [];
    }
  }

  /**
   * Setup language dropdown controls
   */
  setupLanguageDropdowns() {
    // Initialize language pickers
    this.languageDropdown.init('learningLangPicker', 'learning', (code) => {
      console.log(`Learning language changed to: ${code}`);
      this.loadVocabulary(code).then(() => {
        this.generateSentences().then(() => this.renderSentences());
      });
    });

    this.languageDropdown.init('nativeLangPicker', 'native', (code) => {
      console.log(`Native language changed to: ${code}`);
      this.renderSentences(); // Re-render with new translations
    });

    this.languageDropdown.init('additionalLangPicker', 'additional', (code) => {
      console.log(`Additional language changed to: ${code}`);
      this.renderSentences();
    });

    // Setup add/remove additional language
    const addBtn = document.getElementById('addLangBtn');
    const additionalLang = document.getElementById('additionalLang');
    const removeBtn = document.getElementById('removeLangBtn');

    addBtn?.addEventListener('click', () => {
      if (additionalLang) {
        additionalLang.style.display = 'flex';
        addBtn.style.display = 'none';
      }
    });

    removeBtn?.addEventListener('click', () => {
      if (additionalLang) {
        additionalLang.style.display = 'none';
        if (addBtn) addBtn.style.display = 'block';
        this.languageManager.setLanguage('additional', null);
      }
    });
  }

  /**
   * Setup word interaction events (hover, click, double-click)
   */
  setupWordInteractions() {
    const sentenceList = document.getElementById('sentenceList');
    if (!sentenceList) return;

    // Hover for tooltip
    sentenceList.addEventListener('mouseover', (e) => {
      if (e.target.classList.contains('underlined-word')) {
        const wordId = e.target.dataset.wordId;
        const wordData = this.vocabularyData.find(w => w.id === wordId);

        if (wordData) {
          const nativeLang = this.languageManager.getLanguage('native');
          const rect = e.target.getBoundingClientRect();
          this.wordTooltip.show(wordData, nativeLang, {
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

    // Double-click for modal
    sentenceList.addEventListener('dblclick', (e) => {
      if (e.target.classList.contains('underlined-word')) {
        const wordId = e.target.dataset.wordId;
        const wordData = this.vocabularyData.find(w => w.id === wordId);

        if (wordData) {
          const userLanguages = this.languageManager.getUserLanguages();
          this.wordModal.open(wordData, userLanguages);
          this.modalController.open();
          this.wordTooltip.hide();
        }
      }
    });
  }

  /**
   * Setup filter controls
   */
  setupFilters() {
    const applyBtn = document.getElementById('applyFiltersBtn');
    if (!applyBtn) return;

    applyBtn.addEventListener('click', () => {
      // Get filter values
      const frequencyInput = document.querySelector('input[name="frequency"]:checked');
      const lengthInput = document.querySelector('input[name="length"]:checked');

      if (frequencyInput) {
        this.filterManager.setFilter('frequency', parseInt(frequencyInput.value));
      }

      if (lengthInput) {
        this.filterManager.setFilter('length', lengthInput.value);
      }

      console.log('🔍 Filters applied:', this.filterManager.getSummary());

      // Regenerate and render sentences with new filters
      this.generateSentences().then(() => this.renderSentences());
    });

    // Search input
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filterManager.setFilter('search', e.target.value);
        this.renderSentences();
      });
    }
  }

  /**
   * Setup audio controls for sentences
   */
  setupAudioControls() {
    const sentenceList = document.getElementById('sentenceList');
    if (!sentenceList) return;

    sentenceList.addEventListener('click', (e) => {
      // Audio button click
      if (e.target.classList.contains('audio-btn') || e.target.closest('.audio-btn')) {
        const btn = e.target.closest('.audio-btn') || e.target;
        const sentenceItem = btn.closest('.sentence-item');
        const sentenceText = sentenceItem?.querySelector('.sentence-text')?.textContent?.trim();

        if (sentenceText) {
          const learningLang = this.languageManager.getLanguage('learning');
          const langCode = learningLang === 'de' ? 'de-DE' :
                          learningLang === 'es' ? 'es-ES' :
                          learningLang === 'fr' ? 'fr-FR' : 'en-US';

          this.ttsManager.speak(sentenceText, langCode);
          console.log(`🔊 Playing audio: "${sentenceText}"`);
        }
      }
    });
  }

  /**
   * Setup modal action buttons
   */
  setupModalActions() {
    const audioBtn = document.getElementById('modalAudioBtn');
    const saveBtn = document.getElementById('modalSaveBtn');

    // Modal audio button
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const wordTitle = document.getElementById('modalWordTitle')?.textContent;
        if (wordTitle) {
          const word = wordTitle.replace('📖 ', '').trim();
          const learningLang = this.languageManager.getLanguage('learning');
          const langCode = learningLang === 'de' ? 'de-DE' :
                          learningLang === 'es' ? 'es-ES' :
                          learningLang === 'fr' ? 'fr-FR' : 'en-US';

          this.ttsManager.speak(word, langCode);
        }
      });
    }

    // Save word button
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const wordId = saveBtn.dataset.wordId;
        if (wordId) {
          const wordData = this.vocabularyData.find(w => w.id === wordId);
          if (wordData) {
            const saved = this.savedWordsManager.toggleWord(wordData);

            if (saved) {
              saveBtn.textContent = '✅ Saved!';
              this.progressTracker.markWordLearned(wordId);
            } else {
              saveBtn.textContent = '💾 Save Word';
            }

            this.updateStatsDisplay();

            setTimeout(() => {
              saveBtn.textContent = saved ? '✅ Saved!' : '💾 Save Word';
            }, 1000);
          }
        }
      });
    }
  }

  /**
   * Generate sentences based on current filters
   */
  async generateSentences() {
    const learningLang = this.languageManager.getLanguage('learning');

    // Load sentences from generator
    const allSentences = await this.sentenceGenerator.loadDatabase(learningLang);

    // Apply filters
    const filtered = this.filterManager.apply(allSentences, this.vocabularyData);

    this.sentences = filtered;
    this.currentPage = 0;

    console.log(`📝 Generated ${this.sentences.length} sentences`);
  }

  /**
   * Render sentences to the DOM
   */
  renderSentences() {
    const sentenceList = document.getElementById('sentenceList');
    if (!sentenceList) return;

    // Clear existing content
    sentenceList.innerHTML = '';

    // Apply search filter if active
    let displaySentences = [...this.sentences];
    const searchQuery = this.filterManager.getFilter('search');

    if (searchQuery) {
      displaySentences = this.filterManager._filterBySearch(displaySentences, searchQuery);
    }

    // Get page of sentences
    const start = this.currentPage * this.sentencesPerPage;
    const end = start + this.sentencesPerPage;
    const pageSentences = displaySentences.slice(start, end);

    // Render each sentence
    pageSentences.forEach((sentence) => {
      const sentenceItem = this.createSentenceElement(sentence);
      sentenceList.appendChild(sentenceItem);
    });

    // Update pagination
    this.updatePagination(displaySentences.length);
  }

  /**
   * Create a sentence element
   */
  createSentenceElement(sentence) {
    const item = document.createElement('div');
    item.className = 'sentence-item';

    // Parse sentence and highlight vocabulary words
    const learningLang = this.languageManager.getLanguage('learning');
    const parsedHTML = this.sentenceParser.parse(sentence.text, learningLang);

    // Calculate difficulty
    const difficulty = this.difficultyCalculator.calculate(sentence.text, this.vocabularyData);
    const dots = this.difficultyCalculator.generateDots(difficulty);

    item.innerHTML = `
      <p class="sentence-text">${parsedHTML}</p>
      <div class="sentence-controls">
        <button class="audio-btn" title="Play audio">🔊</button>
        <button class="info-btn" title="More info">ℹ️</button>
      </div>
      <div class="difficulty-dots">
        ${dots.map(dot => `<span class="dot ${dot === '●' ? 'filled' : ''}">${dot}</span>`).join('')}
      </div>
    `;

    return item;
  }

  /**
   * Update pagination controls
   */
  updatePagination(totalSentences) {
    const totalPages = Math.ceil(totalSentences / this.sentencesPerPage);
    const pagination = document.querySelector('.pagination');

    if (!pagination) return;

    // Update page dots
    const pageDots = pagination.querySelector('.page-dots');
    if (pageDots) {
      pageDots.innerHTML = '';
      for (let i = 0; i < Math.min(totalPages, 5); i++) {
        const dot = document.createElement('span');
        dot.className = `dot ${i === this.currentPage ? 'filled' : ''}`;
        dot.textContent = i === this.currentPage ? '●' : '○';
        pageDots.appendChild(dot);
      }
    }

    // Setup navigation buttons
    const prevBtn = pagination.querySelector('.nav-btn:first-child');
    const nextBtn = pagination.querySelector('.nav-btn:last-child');

    if (prevBtn) {
      prevBtn.onclick = () => {
        if (this.currentPage > 0) {
          this.currentPage--;
          this.renderSentences();
        }
      };
    }

    if (nextBtn) {
      nextBtn.onclick = () => {
        if (this.currentPage < totalPages - 1) {
          this.currentPage++;
          this.renderSentences();
        }
      };
    }
  }

  /**
   * Update statistics display
   */
  updateStatsDisplay() {
    const savedCount = document.querySelector('.saved-count');
    if (savedCount) {
      const count = this.savedWordsManager.getCount();
      savedCount.textContent = `${count} saved word${count !== 1 ? 's' : ''}`;
    }

    // Log stats to console
    const stats = this.statsCalculator.getFormattedStats();
    console.log('📊 Current Stats:', stats);
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.lingxmApp = new LingXMApp();
});
