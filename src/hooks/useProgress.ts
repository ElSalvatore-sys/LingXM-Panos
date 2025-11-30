import { useState, useEffect, useCallback } from 'react'
import type { LanguageCode } from '@/types'

const STORAGE_KEY = 'lingxm-progress'
const DEFAULT_DAILY_GOAL = 10

interface ProgressData {
  // Per-language data
  languages: Record<LanguageCode, {
    learnedWords: number[]      // Array of word IDs
    bookmarkedWords: number[]   // Array of word IDs
  }>
  // Global stats
  currentStreak: number
  lastPracticeDate: string | null  // ISO date string (YYYY-MM-DD)
  dailyGoal: number
  todayLearned: number
  todayDate: string | null  // ISO date string for current day's progress
}

interface UseProgressReturn {
  // Stats
  currentStreak: number
  dailyGoal: number
  todayProgress: number
  wordsLearned: number      // For current language
  bookmarkedCount: number   // For current language

  // Actions
  addLearnedWord: (wordId: number) => void
  removeLearnedWord: (wordId: number) => void
  addBookmark: (wordId: number) => void
  removeBookmark: (wordId: number) => void
  isWordLearned: (wordId: number) => boolean
  isWordBookmarked: (wordId: number) => boolean
  setDailyGoal: (goal: number) => void
}

function getDefaultProgress(): ProgressData {
  return {
    languages: {} as Record<LanguageCode, { learnedWords: number[], bookmarkedWords: number[] }>,
    currentStreak: 0,
    lastPracticeDate: null,
    dailyGoal: DEFAULT_DAILY_GOAL,
    todayLearned: 0,
    todayDate: null,
  }
}

function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0]
}

function loadProgress(): ProgressData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return getDefaultProgress()

    const data = JSON.parse(stored) as ProgressData

    // Reset today's progress if it's a new day
    const today = getTodayDateString()
    if (data.todayDate !== today) {
      // Check if we need to update streak
      if (data.lastPracticeDate) {
        const lastDate = new Date(data.lastPracticeDate)
        const todayDate = new Date(today)
        const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))

        if (diffDays > 1) {
          // Streak broken
          data.currentStreak = 0
        }
      }

      data.todayLearned = 0
      data.todayDate = today
    }

    return data
  } catch {
    return getDefaultProgress()
  }
}

function saveProgress(data: ProgressData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save progress to localStorage:', e)
  }
}

export function useProgress(targetLanguage: LanguageCode): UseProgressReturn {
  const [progress, setProgress] = useState<ProgressData>(loadProgress)

  // Ensure language entry exists
  useEffect(() => {
    if (!progress.languages[targetLanguage]) {
      setProgress(prev => ({
        ...prev,
        languages: {
          ...prev.languages,
          [targetLanguage]: { learnedWords: [], bookmarkedWords: [] }
        }
      }))
    }
  }, [targetLanguage, progress.languages])

  // Save to localStorage whenever progress changes
  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const languageData = progress.languages[targetLanguage] || { learnedWords: [], bookmarkedWords: [] }

  const updateStreak = useCallback(() => {
    const today = getTodayDateString()

    setProgress(prev => {
      // If already practiced today, don't update streak
      if (prev.lastPracticeDate === today) {
        return prev
      }

      let newStreak = prev.currentStreak

      if (prev.lastPracticeDate) {
        const lastDate = new Date(prev.lastPracticeDate)
        const todayDate = new Date(today)
        const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))

        if (diffDays === 1) {
          // Consecutive day
          newStreak = prev.currentStreak + 1
        } else if (diffDays > 1) {
          // Streak broken, start new
          newStreak = 1
        }
      } else {
        // First ever practice
        newStreak = 1
      }

      return {
        ...prev,
        currentStreak: newStreak,
        lastPracticeDate: today,
      }
    })
  }, [])

  const addLearnedWord = useCallback((wordId: number) => {
    setProgress(prev => {
      const langData = prev.languages[targetLanguage] || { learnedWords: [], bookmarkedWords: [] }

      if (langData.learnedWords.includes(wordId)) {
        return prev // Already learned
      }

      const today = getTodayDateString()

      return {
        ...prev,
        languages: {
          ...prev.languages,
          [targetLanguage]: {
            ...langData,
            learnedWords: [...langData.learnedWords, wordId]
          }
        },
        todayLearned: prev.todayDate === today ? prev.todayLearned + 1 : 1,
        todayDate: today,
      }
    })

    updateStreak()
  }, [targetLanguage, updateStreak])

  const removeLearnedWord = useCallback((wordId: number) => {
    setProgress(prev => {
      const langData = prev.languages[targetLanguage] || { learnedWords: [], bookmarkedWords: [] }

      return {
        ...prev,
        languages: {
          ...prev.languages,
          [targetLanguage]: {
            ...langData,
            learnedWords: langData.learnedWords.filter(id => id !== wordId)
          }
        }
      }
    })
  }, [targetLanguage])

  const addBookmark = useCallback((wordId: number) => {
    setProgress(prev => {
      const langData = prev.languages[targetLanguage] || { learnedWords: [], bookmarkedWords: [] }

      if (langData.bookmarkedWords.includes(wordId)) {
        return prev // Already bookmarked
      }

      return {
        ...prev,
        languages: {
          ...prev.languages,
          [targetLanguage]: {
            ...langData,
            bookmarkedWords: [...langData.bookmarkedWords, wordId]
          }
        }
      }
    })
  }, [targetLanguage])

  const removeBookmark = useCallback((wordId: number) => {
    setProgress(prev => {
      const langData = prev.languages[targetLanguage] || { learnedWords: [], bookmarkedWords: [] }

      return {
        ...prev,
        languages: {
          ...prev.languages,
          [targetLanguage]: {
            ...langData,
            bookmarkedWords: langData.bookmarkedWords.filter(id => id !== wordId)
          }
        }
      }
    })
  }, [targetLanguage])

  const isWordLearned = useCallback((wordId: number): boolean => {
    return languageData.learnedWords.includes(wordId)
  }, [languageData.learnedWords])

  const isWordBookmarked = useCallback((wordId: number): boolean => {
    return languageData.bookmarkedWords.includes(wordId)
  }, [languageData.bookmarkedWords])

  const setDailyGoal = useCallback((goal: number) => {
    setProgress(prev => ({
      ...prev,
      dailyGoal: Math.max(1, goal)
    }))
  }, [])

  return {
    currentStreak: progress.currentStreak,
    dailyGoal: progress.dailyGoal,
    todayProgress: progress.todayLearned,
    wordsLearned: languageData.learnedWords.length,
    bookmarkedCount: languageData.bookmarkedWords.length,
    addLearnedWord,
    removeLearnedWord,
    addBookmark,
    removeBookmark,
    isWordLearned,
    isWordBookmarked,
    setDailyGoal,
  }
}
