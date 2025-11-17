/**
 * StatsCalculator - Calculates learning statistics and analytics
 */
export class StatsCalculator {
  constructor(progressTracker, savedWordsManager) {
    this.progressTracker = progressTracker;
    this.savedWordsManager = savedWordsManager;
  }

  /**
   * Get comprehensive statistics
   */
  getStats() {
    const progress = this.progressTracker.getStats();
    const savedWords = this.savedWordsManager.getStats();

    return {
      progress,
      savedWords,
      combined: {
        totalWords: progress.wordsCount + savedWords.total,
        streak: progress.streak,
        studyTime: progress.studyTime
      }
    };
  }

  /**
   * Calculate learning velocity (words per day)
   */
  calculateVelocity() {
    const progress = this.progressTracker.getStats();
    const lastActive = this.progressTracker.progress.lastActive;

    if (!lastActive) return 0;

    // Calculate days since start
    const daysSinceStart = this._daysSinceDate(new Date(lastActive));

    if (daysSinceStart === 0) return progress.wordsCount;

    return (progress.wordsCount / daysSinceStart).toFixed(2);
  }

  /**
   * Calculate retention rate
   */
  calculateRetention() {
    const learned = this.progressTracker.getLearnedWords().length;
    const saved = this.savedWordsManager.getCount();

    if (learned === 0) return 0;

    return ((saved / learned) * 100).toFixed(1);
  }

  /**
   * Get daily goal progress
   */
  getDailyGoalProgress(dailyGoal = 10) {
    // This would track words learned today
    // For now, simplified version
    const progress = this.progressTracker.getStats();
    const current = Math.min(progress.wordsCount, dailyGoal);

    return {
      current,
      goal: dailyGoal,
      percentage: ((current / dailyGoal) * 100).toFixed(0),
      completed: current >= dailyGoal
    };
  }

  /**
   * Get weekly statistics
   */
  getWeeklyStats() {
    // This would require date-tracked progress
    // Simplified version for now
    const progress = this.progressTracker.getStats();

    return {
      wordsLearned: progress.wordsCount,
      sentencesCompleted: progress.sentencesCount,
      studyTime: progress.studyTime,
      streak: progress.streak
    };
  }

  /**
   * Calculate mastery level (0-100)
   */
  calculateMastery(targetWords = 1000) {
    const learned = this.progressTracker.getLearnedWords().length;
    return Math.min(100, ((learned / targetWords) * 100).toFixed(1));
  }

  /**
   * Get achievement milestones
   */
  getAchievements() {
    const progress = this.progressTracker.getStats();
    const achievements = [];

    const milestones = [
      { words: 10, name: 'First Steps', icon: '🌱' },
      { words: 50, name: 'Getting Started', icon: '🌿' },
      { words: 100, name: 'Century Club', icon: '💯' },
      { words: 250, name: 'Quarter Master', icon: '⭐' },
      { words: 500, name: 'Half-Way Hero', icon: '🎖️' },
      { words: 1000, name: 'Thousand Words', icon: '🏆' }
    ];

    milestones.forEach(milestone => {
      if (progress.wordsCount >= milestone.words) {
        achievements.push({
          ...milestone,
          unlocked: true
        });
      } else {
        achievements.push({
          ...milestone,
          unlocked: false,
          progress: ((progress.wordsCount / milestone.words) * 100).toFixed(0)
        });
      }
    });

    return achievements;
  }

  /**
   * Calculate study streak quality (consistency)
   */
  calculateStreakQuality() {
    const streak = this.progressTracker.progress.streak;

    if (streak === 0) return 'Start your journey';
    if (streak < 3) return 'Building momentum';
    if (streak < 7) return 'Getting consistent';
    if (streak < 14) return 'Strong habit';
    if (streak < 30) return 'Dedicated learner';
    return 'Master of consistency';
  }

  /**
   * Days since a date
   * @private
   */
  _daysSinceDate(date) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.floor((new Date() - date) / oneDay);
  }

  /**
   * Get formatted statistics for display
   */
  getFormattedStats() {
    const stats = this.getStats();
    const velocity = this.calculateVelocity();
    const retention = this.calculateRetention();
    const mastery = this.calculateMastery();

    return {
      'Words Learned': stats.progress.wordsCount,
      'Words Saved': stats.savedWords.total,
      'Sentences Completed': stats.progress.sentencesCount,
      'Study Streak': `${stats.progress.streak} days`,
      'Study Time': `${stats.progress.studyTime} min`,
      'Learning Velocity': `${velocity} words/day`,
      'Retention Rate': `${retention}%`,
      'Mastery Level': `${mastery}%`,
      'Streak Quality': this.calculateStreakQuality()
    };
  }
}
