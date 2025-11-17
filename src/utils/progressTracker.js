/**
 * ProgressTracker - Tracks user learning progress
 */
export class ProgressTracker {
  constructor(cacheManager) {
    this.cacheManager = cacheManager;
    this.progress = this._loadProgress();
  }

  /**
   * Load progress from cache
   * @private
   */
  _loadProgress() {
    const defaultProgress = {
      wordsLearned: [],
      sentencesCompleted: [],
      streak: 0,
      lastActive: null,
      statistics: {
        totalWords: 0,
        totalSentences: 0,
        studyTime: 0,
        accuracy: 0
      }
    };

    return this.cacheManager.get('progress', defaultProgress);
  }

  /**
   * Save progress to cache
   * @private
   */
  _saveProgress() {
    this.cacheManager.set('progress', this.progress);
  }

  /**
   * Mark word as learned
   */
  markWordLearned(wordId) {
    if (!this.progress.wordsLearned.includes(wordId)) {
      this.progress.wordsLearned.push(wordId);
      this.progress.statistics.totalWords++;
      this._saveProgress();
    }
  }

  /**
   * Mark sentence as completed
   */
  markSentenceCompleted(sentenceId) {
    if (!this.progress.sentencesCompleted.includes(sentenceId)) {
      this.progress.sentencesCompleted.push(sentenceId);
      this.progress.statistics.totalSentences++;
      this._saveProgress();
    }
  }

  /**
   * Update streak
   */
  updateStreak() {
    const today = new Date().toDateString();
    const lastActive = this.progress.lastActive;

    if (!lastActive) {
      // First day
      this.progress.streak = 1;
    } else {
      const lastDate = new Date(lastActive);
      const daysDiff = this._daysBetween(lastDate, new Date());

      if (daysDiff === 0) {
        // Same day, no change
      } else if (daysDiff === 1) {
        // Consecutive day
        this.progress.streak++;
      } else {
        // Streak broken
        this.progress.streak = 1;
      }
    }

    this.progress.lastActive = today;
    this._saveProgress();
  }

  /**
   * Calculate days between dates
   * @private
   */
  _daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.floor((date2 - date1) / oneDay);
  }

  /**
   * Add study time (minutes)
   */
  addStudyTime(minutes) {
    this.progress.statistics.studyTime += minutes;
    this._saveProgress();
  }

  /**
   * Check if word is learned
   */
  isWordLearned(wordId) {
    return this.progress.wordsLearned.includes(wordId);
  }

  /**
   * Check if sentence is completed
   */
  isSentenceCompleted(sentenceId) {
    return this.progress.sentencesCompleted.includes(sentenceId);
  }

  /**
   * Get progress statistics
   */
  getStats() {
    return {
      ...this.progress.statistics,
      streak: this.progress.streak,
      wordsCount: this.progress.wordsLearned.length,
      sentencesCount: this.progress.sentencesCompleted.length
    };
  }

  /**
   * Get learned words
   */
  getLearnedWords() {
    return [...this.progress.wordsLearned];
  }

  /**
   * Get completed sentences
   */
  getCompletedSentences() {
    return [...this.progress.sentencesCompleted];
  }

  /**
   * Reset progress
   */
  reset() {
    this.progress = {
      wordsLearned: [],
      sentencesCompleted: [],
      streak: 0,
      lastActive: null,
      statistics: {
        totalWords: 0,
        totalSentences: 0,
        studyTime: 0,
        accuracy: 0
      }
    };
    this._saveProgress();
  }

  /**
   * Export progress data
   */
  export() {
    return JSON.stringify(this.progress, null, 2);
  }

  /**
   * Import progress data
   */
  import(jsonData) {
    try {
      const imported = JSON.parse(jsonData);
      this.progress = { ...this.progress, ...imported };
      this._saveProgress();
      return true;
    } catch (e) {
      console.error('Failed to import progress:', e);
      return false;
    }
  }
}
