import type { Flashcard, FlashcardRating, Word, LanguageCode } from '@/types'

/**
 * SM-2 Spaced Repetition Algorithm
 * Based on SuperMemo's SM-2 algorithm
 *
 * Rating scale:
 * 0 - Complete blackout, wrong answer
 * 1 - Incorrect, but recognized after seeing answer
 * 2 - Incorrect, but easy to recall after seeing answer
 * 3 - Correct, but with difficulty
 * 4 - Correct, with some hesitation
 * 5 - Perfect, instant recall
 */

const MIN_EASE_FACTOR = 1.3
const DEFAULT_EASE_FACTOR = 2.5

/**
 * Calculate the next review interval based on SM-2 algorithm
 */
export function calculateNextReview(
  card: Flashcard,
  rating: FlashcardRating
): {
  interval: number
  easeFactor: number
  repetitions: number
  nextReview: Date
} {
  let { easeFactor, interval, repetitions } = card

  // If rating < 3, reset (failed to recall)
  if (rating < 3) {
    repetitions = 0
    interval = 1 // Review again tomorrow
  } else {
    // Successful recall
    if (repetitions === 0) {
      interval = 1
    } else if (repetitions === 1) {
      interval = 6
    } else {
      interval = Math.round(interval * easeFactor)
    }
    repetitions += 1
  }

  // Update ease factor based on rating
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  // where q is the rating (0-5)
  easeFactor = easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02))

  // Ensure ease factor doesn't go below minimum
  if (easeFactor < MIN_EASE_FACTOR) {
    easeFactor = MIN_EASE_FACTOR
  }

  // Calculate next review date
  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + interval)

  return {
    interval,
    easeFactor,
    repetitions,
    nextReview,
  }
}

/**
 * Create a new flashcard from a Word
 */
export function createFlashcard(
  word: Word,
  translation: string,
  language: LanguageCode
): Flashcard {
  return {
    id: word.id,
    wordId: word.id,
    word: word.word,
    translation,
    difficulty: word.difficulty,
    language,
    lastReviewed: null,
    nextReview: null,
    easeFactor: DEFAULT_EASE_FACTOR,
    interval: 0,
    repetitions: 0,
  }
}

/**
 * Check if a card is due for review
 */
export function isCardDue(card: Flashcard): boolean {
  if (!card.nextReview) {
    return true // New card, never reviewed
  }

  const now = new Date()
  const nextReview = new Date(card.nextReview)
  return now >= nextReview
}

/**
 * Get cards that are due for review today
 */
export function getDueCards(cards: Flashcard[], limit?: number): Flashcard[] {
  const dueCards = cards.filter(isCardDue)

  // Sort by: new cards first, then by next review date (oldest first)
  dueCards.sort((a, b) => {
    // New cards (never reviewed) come first
    if (!a.nextReview && b.nextReview) return -1
    if (a.nextReview && !b.nextReview) return 1
    if (!a.nextReview && !b.nextReview) {
      // Both are new, sort by difficulty (easier first)
      return a.difficulty - b.difficulty
    }

    // Both have been reviewed, sort by next review date
    return new Date(a.nextReview!).getTime() - new Date(b.nextReview!).getTime()
  })

  return limit ? dueCards.slice(0, limit) : dueCards
}

/**
 * Get new cards (never reviewed) from a word list
 */
export function getNewCards(
  words: Word[],
  existingCardIds: Set<number>,
  translations: Record<string, string>,
  language: LanguageCode,
  limit?: number
): Flashcard[] {
  const newCards: Flashcard[] = []

  for (const word of words) {
    if (existingCardIds.has(word.id)) continue

    const translation = translations[word.word] || translations[word.word.toLowerCase()]
    if (!translation) continue // Skip words without translations

    newCards.push(createFlashcard(word, translation, language))

    if (limit && newCards.length >= limit) break
  }

  return newCards
}

/**
 * Calculate statistics for a deck of flashcards
 */
export function calculateStats(cards: Flashcard[]): {
  totalCards: number
  dueToday: number
  newCards: number
  masteredCards: number
  averageEase: number
} {
  const totalCards = cards.length
  const dueToday = cards.filter(isCardDue).length
  const newCards = cards.filter((c) => !c.lastReviewed).length
  const masteredCards = cards.filter((c) => c.interval >= 21).length // 3+ weeks interval

  const cardsWithEase = cards.filter((c) => c.lastReviewed)
  const averageEase =
    cardsWithEase.length > 0
      ? cardsWithEase.reduce((sum, c) => sum + c.easeFactor, 0) / cardsWithEase.length
      : DEFAULT_EASE_FACTOR

  return {
    totalCards,
    dueToday,
    newCards,
    masteredCards,
    averageEase,
  }
}

/**
 * Get human-readable time until next review
 */
export function getNextReviewText(interval: number): string {
  if (interval === 0) return 'Now'
  if (interval === 1) return '1 day'
  if (interval < 7) return `${interval} days`
  if (interval < 30) {
    const weeks = Math.round(interval / 7)
    return weeks === 1 ? '1 week' : `${weeks} weeks`
  }
  const months = Math.round(interval / 30)
  return months === 1 ? '1 month' : `${months} months`
}

/**
 * Get rating label
 */
export function getRatingLabel(rating: FlashcardRating): string {
  const labels: Record<FlashcardRating, string> = {
    0: 'Again',
    1: 'Hard',
    2: 'Good',
    3: 'Easy',
    4: 'Very Easy',
    5: 'Perfect',
  }
  return labels[rating]
}

/**
 * Get rating color
 */
export function getRatingColor(rating: FlashcardRating): string {
  const colors: Record<FlashcardRating, string> = {
    0: 'bg-red-500 hover:bg-red-600',
    1: 'bg-orange-500 hover:bg-orange-600',
    2: 'bg-yellow-500 hover:bg-yellow-600',
    3: 'bg-green-500 hover:bg-green-600',
    4: 'bg-blue-500 hover:bg-blue-600',
    5: 'bg-purple-500 hover:bg-purple-600',
  }
  return colors[rating]
}
