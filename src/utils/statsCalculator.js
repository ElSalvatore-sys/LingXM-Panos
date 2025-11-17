/**
 * StatsCalculator - Calculate learning statistics
 * PARALLEL SAFE: Creates new file only
 */

export class StatsCalculator {
  static calculateStreak(progressData) {
    if (progressData.length === 0) return 0;

    // Sort by date, most recent first
    const sorted = progressData
      .map(p => new Date(p.lastReviewed))
      .sort((a, b) => b - a);

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const date of sorted) {
      const reviewDate = new Date(date);
      reviewDate.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor((currentDate - reviewDate) / (1000 * 60 * 60 * 24));

      if (daysDiff === streak) {
        streak++;
        currentDate = reviewDate;
      } else if (daysDiff > streak) {
        break;
      }
    }

    return streak;
  }

  static calculateAccuracy(progressData) {
    if (progressData.length === 0) return 0;

    const masterySum = progressData.reduce((sum, p) => sum + p.masteryLevel, 0);
    return Math.round((masterySum / (progressData.length * 5)) * 100);
  }

  static getWordsPerDay(progressData, days = 7) {
    if (progressData.length === 0) return 0;

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    const recentWords = progressData.filter(p =>
      new Date(p.firstSeen) >= cutoff
    );

    return Math.round(recentWords.length / days);
  }

  static getTotalTime(progressData) {
    // Estimate: 30 seconds per review
    const totalReviews = progressData.reduce((sum, p) => sum + p.timesReviewed, 0);
    const seconds = totalReviews * 30;

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return { hours, minutes, seconds };
  }

  static getMasteryDistribution(progressData) {
    const distribution = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0
    };

    progressData.forEach(p => {
      distribution[p.masteryLevel]++;
    });

    return distribution;
  }

  static getWeeklyProgress(progressData) {
    const days = 7;
    const progress = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const count = progressData.filter(p => {
        const reviewDate = new Date(p.lastReviewed);
        return reviewDate >= date && reviewDate < nextDate;
      }).length;

      progress.push({
        date: date.toISOString().split('T')[0],
        count
      });
    }

    return progress;
  }
}
