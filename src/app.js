/**
 * LingXM Panos - Main Application
 * Integrates all 6 agent systems
 */

// ===== AGENT 1: Data Loading =====
import { VocabularyLoader } from './utils/vocabularyLoader.js';
import { WordMatcher } from './utils/wordMatcher.js';
import { CacheManager } from './utils/cacheManager.js';

// ===== AGENT 2: Sentence Parsing & Interaction =====
import { SentenceParser } from './utils/sentenceParser.js';
import { TooltipPositioner } from './utils/tooltipPositioner.js';
import { ModalController } from './utils/modalController.js';

// ===== AGENT 3: Language Selection =====
import { LanguageManager } from './utils/languageManager.js';
import { FlagGenerator } from './utils/flagGenerator.js';
import { LanguageDropdown } from './utils/languageDropdown.js';

// ===== AGENT 4: Filters & Sentence Generation =====
import { FilterManager } from './utils/filterManager.js';
import { SentenceGenerator } from './utils/sentenceGenerator.js';
import { DifficultyCalculator } from './utils/difficultyCalculator.js';

// ===== AGENT 5: Audio =====
import { AudioPlayer } from './utils/audioPlayer.js';
import { TTSManager } from './utils/ttsManager.js';
import { AudioCache } from './utils/audioCache.js';

// ===== AGENT 6: Progress Tracking =====
import { ProgressTracker } from './utils/progressTracker.js';
import { SavedWordsManager } from './utils/savedWordsManager.js';
import { StatsCalculator } from './utils/statsCalculator.js';

class LingXMApp {
  constructor() {
    console.log('🚀 Initializing LingXM Panos...');

    // Agent 1: Data
    this.vocabLoader = new VocabularyLoader();
    this.cacheManager = new CacheManager();
    this.wordMatcher = null;
    this.vocabularyData = [];

    // Agent 2: Interaction
    this.sentenceParser = null;
    this.modalController = null;

    // Agent 3: Languages
    this.languageManager = new LanguageManager();
    this.flagGenerator = FlagGenerator;
    this.languageDropdowns = {};

    // Agent 4: Filters
    this.filterManager = new FilterManager();
    this.sentenceGenerator = null;
    this.currentSentences = [];

    // Agent 5: Audio
    this.audioPlayer = new AudioPlayer();
    this.ttsManager = new TTSManager();
    this.audioCache = new AudioCache();

    // Agent 6: Progress
    this.progressTracker = new ProgressTracker();
    this.savedWordsManager = new SavedWordsManager();

    // Initialize
    this.init();
  }

  async init() {
    try {
      console.log('📦 Loading initial data...');

      // Step 1: Load vocabulary for current learning language
      await this.loadVocabularyData();

      // Step 2: Initialize interaction systems
      this.initializeInteractionSystems();

      // Step 3: Setup language selectors
      this.initializeLanguageSelectors();

      // Step 4: Setup filters
      this.initializeFilters();

      // Step 5: Generate initial sentences
      await this.generateAndRenderSentences();

      // Step 6: Setup audio
      this.initializeAudio();

      // Step 7: Load user progress
      await this.loadUserProgress();

      console.log('✅ LingXM Panos ready!');

    } catch (error) {
      console.error('❌ Initialization failed:', error);
      this.showError('Failed to initialize app. Please refresh.');
    }
  }

  // ===== AGENT 1: DATA LOADING =====

  async loadVocabularyData() {
    const language = this.languageManager.state.learning;

    try {
      // Try cache first
      const cached = await this.cacheManager.get(language);

      if (cached && this.cacheManager.isFresh(cached.timestamp)) {
        this.vocabularyData = cached.data;
        console.log(`✅ Loaded ${this.vocabularyData.length} words from cache`);
      } else {
        // Fetch from GitHub
        this.vocabularyData = await this.vocabLoader.loadVocabulary(language);

        // Cache it
        await this.cacheManager.set(language, this.vocabularyData);
        console.log(`✅ Loaded ${this.vocabularyData.length} words from GitHub`);
      }

      // Initialize word matcher
      this.wordMatcher = new WordMatcher(this.vocabularyData);

    } catch (error) {
      console.error('❌ Failed to load vocabulary:', error);

      // Fallback to mock data
      try {
        const response = await fetch('/public/data/universal/MOCK_SAMPLE.json');
        this.vocabularyData = await response.json();
        this.wordMatcher = new WordMatcher(this.vocabularyData);
        console.log('⚠️ Using mock data (5 words)');
      } catch (mockError) {
        throw new Error('Failed to load vocabulary and mock data');
      }
    }
  }

  // ===== AGENT 2: INTERACTION =====

  initializeInteractionSystems() {
    // Initialize sentence parser
    this.sentenceParser = new SentenceParser(this.wordMatcher);

    // Initialize modal controller
    const modalElement = document.getElementById('wordModal');
    this.modalController = new ModalController(modalElement);

    console.log('✅ Interaction systems ready');
  }

  attachWordInteractions() {
    const underlinedWords = document.querySelectorAll('.underlined-word');
    const tooltip = document.getElementById('wordTooltip');

    underlinedWords.forEach(wordElement => {
      // Hover - show tooltip
      wordElement.addEventListener('mouseenter', (e) => {
        const wordId = e.target.dataset.wordId;
        const wordData = this.wordMatcher.getWordById(wordId);

        if (wordData) {
          TooltipPositioner.show(
            tooltip,
            wordData,
            this.languageManager.state.native,
            e.target
          );

          // Track word seen
          this.progressTracker.recordWordSeen(wordId, this.languageManager.state.learning);
        }
      });

      // Mouse leave - hide tooltip
      wordElement.addEventListener('mouseleave', () => {
        TooltipPositioner.hide(tooltip);
      });

      // Double-click - open modal
      wordElement.addEventListener('dblclick', (e) => {
        const wordId = e.target.dataset.wordId;
        const wordData = this.wordMatcher.getWordById(wordId);

        if (wordData) {
          TooltipPositioner.hide(tooltip);
          this.modalController.open(wordData, this.languageManager.state);

          // Track interaction
          this.progressTracker.recordWordSeen(wordId, this.languageManager.state.learning);
        }
      });
    });

    console.log(`✅ Attached interactions to ${underlinedWords.length} words`);
  }

  // ===== AGENT 3: LANGUAGE SELECTION =====

  initializeLanguageSelectors() {
    // Learning language dropdown
    const learningPicker = document.getElementById('learningLangPicker');
    if (learningPicker) {
      this.languageDropdowns.learning = new LanguageDropdown(
        learningPicker,
        this.languageManager,
        this.flagGenerator
      );

      this.languageDropdowns.learning.init(
        this.languageManager.state.learning,
        async (lang) => {
          if (this.languageManager.setLearningLanguage(lang)) {
            console.log(`🌍 Learning language changed to: ${lang}`);
            await this.loadVocabularyData();
            await this.generateAndRenderSentences();
          }
        }
      );
    }

    // Native language dropdown
    const nativePicker = document.getElementById('nativeLangPicker');
    if (nativePicker) {
      this.languageDropdowns.native = new LanguageDropdown(
        nativePicker,
        this.languageManager,
        this.flagGenerator
      );

      this.languageDropdowns.native.init(
        this.languageManager.state.native,
        (lang) => {
          if (this.languageManager.setNativeLanguage(lang)) {
            console.log(`🌍 Native language changed to: ${lang}`);
            this.generateAndRenderSentences();
          }
        }
      );
    }

    // Additional language button
    const addBtn = document.getElementById('addLangBtn');
    const additionalLang = document.getElementById('additionalLang');
    const removeBtn = document.getElementById('removeLangBtn');

    if (addBtn && additionalLang) {
      addBtn.addEventListener('click', () => {
        additionalLang.style.display = 'flex';
        addBtn.style.display = 'none';
      });

      if (removeBtn) {
        removeBtn.addEventListener('click', () => {
          additionalLang.style.display = 'none';
          addBtn.style.display = 'block';
          this.languageManager.removeAdditionalLanguage();
        });
      }
    }

    console.log('✅ Language selectors ready');
  }

  // ===== AGENT 4: FILTERS & SENTENCES =====

  initializeFilters() {
    // Frequency filter
    const frequencyRadios = document.querySelectorAll('input[name="frequency"]');
    frequencyRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.filterManager.setFrequency(e.target.value);
      });
    });

    // Sentence length filter
    const lengthRadios = document.querySelectorAll('input[name="length"]');
    lengthRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.filterManager.setSentenceLength(e.target.value);
      });
    });

    // Go button
    const applyBtn = document.getElementById('applyFiltersBtn');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        console.log('🎯 Applying filters:', this.filterManager.getFilters());
        this.generateAndRenderSentences();
      });
    }

    // Listen to filter changes
    this.filterManager.onChange((filters) => {
      console.log('🎯 Filters changed:', filters);
    });

    console.log('✅ Filters ready');
  }

  async generateAndRenderSentences() {
    const filters = this.filterManager.getFilters();
    const lengthRange = this.filterManager.getSentenceLengthRange();

    // Filter vocabulary by frequency
    const filteredVocab = this.vocabularyData.filter(
      word => word.frequency_rank <= filters.frequency
    );

    // Initialize sentence generator
    this.sentenceGenerator = new SentenceGenerator(filteredVocab, filters.frequency);

    // Generate sentences
    const sentences = this.sentenceGenerator.generate(20, lengthRange);

    // Parse sentences (underline words)
    const parsedSentences = this.sentenceParser.parseSentences(sentences);

    // Calculate difficulty for each
    parsedSentences.forEach(sentence => {
      sentence.difficulty = DifficultyCalculator.calculate(
        sentence.original,
        this.wordMatcher
      );
    });

    // Render to DOM
    this.renderSentences(parsedSentences);

    this.currentSentences = parsedSentences;

    console.log(`✅ Generated and rendered ${parsedSentences.length} sentences`);
  }

  renderSentences(sentences) {
    const sentenceList = document.getElementById('sentenceList');
    if (!sentenceList) return;

    sentenceList.innerHTML = '';

    sentences.forEach((sentence, idx) => {
      const item = document.createElement('div');
      item.className = 'sentence-item';
      item.innerHTML = `
        <p class="sentence-text">${sentence.parsed}</p>
        <div class="sentence-controls">
          <button class="audio-btn" data-sentence="${sentence.original}" title="Play audio">🔊</button>
          <button class="info-btn" title="More info">ℹ️</button>
        </div>
        <div class="difficulty-dots">
          ${DifficultyCalculator.generateDots(sentence.difficulty.level)}
        </div>
      `;
      sentenceList.appendChild(item);
    });

    // Attach word interactions
    this.attachWordInteractions();

    // Attach audio buttons
    this.attachAudioButtons();
  }

  // ===== AGENT 5: AUDIO =====

  initializeAudio() {
    // Initialize audio cache
    this.audioCache.init();

    console.log('✅ Audio system ready');
  }

  attachAudioButtons() {
    const audioButtons = document.querySelectorAll('.audio-btn');

    audioButtons.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const sentence = e.target.dataset.sentence;
        const language = this.languageManager.state.learning;

        try {
          btn.textContent = '⏸️';
          await this.ttsManager.speak(sentence, language);
          btn.textContent = '🔊';
        } catch (error) {
          console.error('Audio playback failed:', error);
          btn.textContent = '🔊';
        }
      });
    });

    // Setup modal audio button
    const modalAudioBtn = document.getElementById('modalAudioBtn');
    if (modalAudioBtn) {
      modalAudioBtn.addEventListener('click', async () => {
        const wordElement = document.querySelector('#modalWordTitle');
        if (wordElement) {
          const word = wordElement.textContent.replace('📖 ', '');
          const language = this.languageManager.state.learning;

          try {
            await this.ttsManager.speak(word, language);
          } catch (error) {
            console.error('Word audio failed:', error);
          }
        }
      });
    }
  }

  // ===== AGENT 6: PROGRESS TRACKING =====

  async loadUserProgress() {
    const language = this.languageManager.state.learning;

    // Load stats
    const stats = await this.progressTracker.getStats(language);
    console.log('📊 User stats:', stats);

    // Load saved words count
    const savedCount = await this.savedWordsManager.getCount(language);
    console.log(`💾 Saved words: ${savedCount}`);

    // Update UI if elements exist
    const savedCountElement = document.querySelector('.saved-count');
    if (savedCountElement) {
      savedCountElement.textContent = `${savedCount} saved words`;
    }

    // Setup save word button in modal
    const modalSaveBtn = document.getElementById('modalSaveBtn');
    if (modalSaveBtn) {
      modalSaveBtn.addEventListener('click', async () => {
        const wordId = this.modalController.modal.dataset.currentWordId;
        const wordData = this.wordMatcher.getWordById(wordId);

        if (wordData) {
          const isSaved = await this.savedWordsManager.isSaved(
            wordId,
            this.languageManager.state.learning
          );

          if (isSaved) {
            await this.savedWordsManager.unsaveWord(
              wordId,
              this.languageManager.state.learning
            );
            modalSaveBtn.textContent = '💾 Save Word';
          } else {
            await this.savedWordsManager.saveWord(
              wordData,
              this.languageManager.state.learning
            );
            modalSaveBtn.textContent = '✅ Saved';
          }

          // Update saved count
          const newCount = await this.savedWordsManager.getCount(
            this.languageManager.state.learning
          );
          if (savedCountElement) {
            savedCountElement.textContent = `${newCount} saved words`;
          }
        }
      });
    }

    console.log('✅ Progress tracking ready');
  }

  // ===== UTILITY METHODS =====

  showError(message) {
    console.error('❌', message);
    // TODO: Show user-friendly error UI
    alert(message);
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.lingxmApp = new LingXMApp();
});

export default LingXMApp;
