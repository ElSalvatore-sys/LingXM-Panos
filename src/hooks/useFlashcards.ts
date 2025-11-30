import { useState, useEffect, useCallback } from 'react'
import type { Flashcard, FlashcardSession, FlashcardRating, LanguageCode, Word } from '@/types'
import {
  calculateNextReview,
  getDueCards,
  getNewCards,
  calculateStats,
  createFlashcard,
} from '@/lib/spacedRepetition'

const STORAGE_KEY_PREFIX = 'lingxm_flashcards_'
const SESSION_STORAGE_KEY = 'lingxm_flashcard_session'

interface UseFlashcardsReturn {
  // State
  cards: Flashcard[]
  session: FlashcardSession | null
  isLoading: boolean

  // Stats
  stats: {
    totalCards: number
    dueToday: number
    newCards: number
    masteredCards: number
    averageEase: number
  }

  // Actions
  startSession: (cardCount: number, includeNew?: boolean) => void
  rateCard: (rating: FlashcardRating) => void
  nextCard: () => void
  endSession: () => void
  addCard: (word: Word, translation: string) => void
  addCardsFromWords: (words: Word[], translations: Record<string, string>) => number
  removeCard: (cardId: number) => void
  resetProgress: () => void

  // Current card helpers
  currentCard: Flashcard | null
  isFlipped: boolean
  setIsFlipped: (flipped: boolean) => void
}

export function useFlashcards(language: LanguageCode): UseFlashcardsReturn {
  const [cards, setCards] = useState<Flashcard[]>([])
  const [session, setSession] = useState<FlashcardSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFlipped, setIsFlipped] = useState(false)

  const storageKey = `${STORAGE_KEY_PREFIX}${language}`

  // Load cards from localStorage
  useEffect(() => {
    setIsLoading(true)
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const parsed = JSON.parse(stored) as Flashcard[]
        setCards(parsed)
      } else {
        setCards([])
      }

      // Check for saved session
      const savedSession = sessionStorage.getItem(SESSION_STORAGE_KEY)
      if (savedSession) {
        const parsedSession = JSON.parse(savedSession) as FlashcardSession
        if (parsedSession.cards[0]?.language === language && !parsedSession.isComplete) {
          setSession(parsedSession)
        }
      }
    } catch (error) {
      console.error('Failed to load flashcards:', error)
      setCards([])
    } finally {
      setIsLoading(false)
    }
  }, [storageKey, language])

  // Save cards to localStorage
  const saveCards = useCallback(
    (newCards: Flashcard[]) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(newCards))
      } catch (error) {
        console.error('Failed to save flashcards:', error)
      }
    },
    [storageKey]
  )

  // Save session to sessionStorage
  const saveSession = useCallback((newSession: FlashcardSession | null) => {
    try {
      if (newSession) {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession))
      } else {
        sessionStorage.removeItem(SESSION_STORAGE_KEY)
      }
    } catch (error) {
      console.error('Failed to save session:', error)
    }
  }, [])

  // Calculate stats
  const stats = calculateStats(cards)

  // Start a new session
  const startSession = useCallback(
    (cardCount: number, _includeNew: boolean = true) => {
      let sessionCards = getDueCards(cards, cardCount)

      // If we don't have enough due cards and _includeNew is true,
      // we could add new cards here, but we need translations
      // For now, just use what we have

      if (sessionCards.length === 0) {
        return // No cards to study
      }

      // Shuffle the cards
      sessionCards = sessionCards.sort(() => Math.random() - 0.5)

      const newSession: FlashcardSession = {
        cards: sessionCards,
        currentIndex: 0,
        correctCount: 0,
        incorrectCount: 0,
        startTime: new Date().toISOString(),
        isComplete: false,
      }

      setSession(newSession)
      saveSession(newSession)
      setIsFlipped(false)
    },
    [cards, saveSession]
  )

  // Rate the current card
  const rateCard = useCallback(
    (rating: FlashcardRating) => {
      if (!session || session.isComplete) return

      const currentCard = session.cards[session.currentIndex]
      const { interval, easeFactor, repetitions, nextReview } = calculateNextReview(
        currentCard,
        rating
      )

      // Update the card in our deck
      const updatedCard: Flashcard = {
        ...currentCard,
        interval,
        easeFactor,
        repetitions,
        lastReviewed: new Date().toISOString(),
        nextReview: nextReview.toISOString(),
      }

      // Update cards array
      const newCards = cards.map((c) => (c.id === updatedCard.id ? updatedCard : c))
      setCards(newCards)
      saveCards(newCards)

      // Update session stats
      const isCorrect = rating >= 3
      const newSession: FlashcardSession = {
        ...session,
        cards: session.cards.map((c, i) =>
          i === session.currentIndex ? updatedCard : c
        ),
        correctCount: session.correctCount + (isCorrect ? 1 : 0),
        incorrectCount: session.incorrectCount + (isCorrect ? 0 : 1),
      }

      // Move to next card or complete session
      if (session.currentIndex >= session.cards.length - 1) {
        newSession.isComplete = true
      } else {
        newSession.currentIndex += 1
      }

      setSession(newSession)
      saveSession(newSession)
      setIsFlipped(false)
    },
    [session, cards, saveCards, saveSession]
  )

  // Go to next card
  const nextCard = useCallback(() => {
    if (!session || session.isComplete) return

    if (session.currentIndex < session.cards.length - 1) {
      const newSession = {
        ...session,
        currentIndex: session.currentIndex + 1,
      }
      setSession(newSession)
      saveSession(newSession)
      setIsFlipped(false)
    }
  }, [session, saveSession])

  // End session
  const endSession = useCallback(() => {
    setSession(null)
    saveSession(null)
    setIsFlipped(false)
  }, [saveSession])

  // Add a single card
  const addCard = useCallback(
    (word: Word, translation: string) => {
      const exists = cards.some((c) => c.wordId === word.id)
      if (exists) return

      const newCard = createFlashcard(word, translation, language)
      const newCards = [...cards, newCard]
      setCards(newCards)
      saveCards(newCards)
    },
    [cards, language, saveCards]
  )

  // Add multiple cards from words
  const addCardsFromWords = useCallback(
    (words: Word[], translations: Record<string, string>): number => {
      const existingIds = new Set(cards.map((c) => c.wordId))
      const newCards = getNewCards(words, existingIds, translations, language)

      if (newCards.length === 0) return 0

      const updatedCards = [...cards, ...newCards]
      setCards(updatedCards)
      saveCards(updatedCards)

      return newCards.length
    },
    [cards, language, saveCards]
  )

  // Remove a card
  const removeCard = useCallback(
    (cardId: number) => {
      const newCards = cards.filter((c) => c.id !== cardId)
      setCards(newCards)
      saveCards(newCards)
    },
    [cards, saveCards]
  )

  // Reset all progress
  const resetProgress = useCallback(() => {
    setCards([])
    setSession(null)
    saveCards([])
    saveSession(null)
  }, [saveCards, saveSession])

  // Get current card
  const currentCard = session && !session.isComplete
    ? session.cards[session.currentIndex]
    : null

  return {
    cards,
    session,
    isLoading,
    stats,
    startSession,
    rateCard,
    nextCard,
    endSession,
    addCard,
    addCardsFromWords,
    removeCard,
    resetProgress,
    currentCard,
    isFlipped,
    setIsFlipped,
  }
}
