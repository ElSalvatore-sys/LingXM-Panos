import { describe, it, expect } from 'vitest'
import {
  searchByWord,
  searchByContains,
  filterByDifficulty,
  sortByFrequency,
  sortByRank,
  performSearch,
  getExampleSentences,
} from '../search'
import type { Word } from '@/types'

// Test data
const mockWords: Word[] = [
  { id: 1, word: 'der', frequency: 10000, rank: 1, difficulty: 1 },
  { id: 2, word: 'die', frequency: 9500, rank: 2, difficulty: 1 },
  { id: 3, word: 'und', frequency: 9000, rank: 3, difficulty: 1 },
  { id: 4, word: 'deren', frequency: 1000, rank: 50, difficulty: 3 },
  { id: 5, word: 'Deutschland', frequency: 500, rank: 100, difficulty: 4 },
  { id: 6, word: 'aber', frequency: 8000, rank: 10, difficulty: 2 },
  { id: 7, word: 'sein', frequency: 8500, rank: 5, difficulty: 1 },
]

describe('searchByWord', () => {
  it('finds words that start with query', () => {
    const results = searchByWord(mockWords, 'der')
    expect(results).toHaveLength(2) // der, deren
    expect(results[0].word).toBe('der')
    expect(results[1].word).toBe('deren')
  })

  it('is case insensitive', () => {
    const results = searchByWord(mockWords, 'DER')
    expect(results).toHaveLength(2)
  })

  it('returns empty array for empty query', () => {
    expect(searchByWord(mockWords, '')).toEqual([])
    expect(searchByWord(mockWords, '   ')).toEqual([])
  })

  it('returns empty array for no matches', () => {
    expect(searchByWord(mockWords, 'xyz')).toEqual([])
  })

  it('trims whitespace from query', () => {
    const results = searchByWord(mockWords, '  der  ')
    expect(results).toHaveLength(2)
  })
})

describe('searchByContains', () => {
  it('finds words containing query anywhere', () => {
    const results = searchByContains(mockWords, 'er')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(w => w.word === 'der')).toBe(true)
    expect(results.some(w => w.word === 'deren')).toBe(true)
    expect(results.some(w => w.word === 'aber')).toBe(true)
  })

  it('is case insensitive', () => {
    const results = searchByContains(mockWords, 'ER')
    expect(results.some(w => w.word === 'der')).toBe(true)
  })

  it('returns empty array for empty query', () => {
    expect(searchByContains(mockWords, '')).toEqual([])
  })
})

describe('filterByDifficulty', () => {
  it('filters words by specified difficulty levels', () => {
    const results = filterByDifficulty(mockWords, [1])
    expect(results).toHaveLength(4) // der, die, und, sein
    expect(results.every(w => w.difficulty === 1)).toBe(true)
  })

  it('supports multiple difficulty levels', () => {
    const results = filterByDifficulty(mockWords, [1, 2])
    expect(results).toHaveLength(5) // 4 level 1 + 1 level 2
  })

  it('returns all words when levels array is empty', () => {
    const results = filterByDifficulty(mockWords, [])
    expect(results).toHaveLength(mockWords.length)
  })

  it('returns empty array when no words match', () => {
    const results = filterByDifficulty(mockWords, [5])
    expect(results).toHaveLength(0)
  })
})

describe('sortByFrequency', () => {
  it('sorts words by frequency (highest first)', () => {
    const unsorted: Word[] = [
      { id: 1, word: 'a', frequency: 100, rank: 3, difficulty: 1 },
      { id: 2, word: 'b', frequency: 300, rank: 1, difficulty: 1 },
      { id: 3, word: 'c', frequency: 200, rank: 2, difficulty: 1 },
    ]
    const sorted = sortByFrequency(unsorted)
    expect(sorted[0].frequency).toBe(300)
    expect(sorted[1].frequency).toBe(200)
    expect(sorted[2].frequency).toBe(100)
  })

  it('does not mutate original array', () => {
    const original = [...mockWords]
    sortByFrequency(mockWords)
    expect(mockWords).toEqual(original)
  })
})

describe('sortByRank', () => {
  it('sorts words by rank (lowest first = most common)', () => {
    const unsorted: Word[] = [
      { id: 1, word: 'a', frequency: 100, rank: 3, difficulty: 1 },
      { id: 2, word: 'b', frequency: 300, rank: 1, difficulty: 1 },
      { id: 3, word: 'c', frequency: 200, rank: 2, difficulty: 1 },
    ]
    const sorted = sortByRank(unsorted)
    expect(sorted[0].rank).toBe(1)
    expect(sorted[1].rank).toBe(2)
    expect(sorted[2].rank).toBe(3)
  })

  it('does not mutate original array', () => {
    const original = [...mockWords]
    sortByRank(mockWords)
    expect(mockWords).toEqual(original)
  })
})

describe('getExampleSentences', () => {
  it('returns German sentences for de language', () => {
    const sentences = getExampleSentences('Hund', 'de')
    expect(sentences.length).toBeGreaterThan(0)
    expect(sentences[0]).toContain('Hund')
  })

  it('returns English sentences for en language', () => {
    const sentences = getExampleSentences('dog', 'en')
    expect(sentences.length).toBeGreaterThan(0)
    expect(sentences[0]).toContain('dog')
  })

  it('falls back to English for unknown language', () => {
    const sentences = getExampleSentences('test', 'unknown')
    expect(sentences.length).toBeGreaterThan(0)
  })
})

describe('performSearch', () => {
  it('combines search and filter operations', () => {
    const results = performSearch(mockWords, 'de', 3, 50)
    expect(results.length).toBeGreaterThan(0)
    // Should find "der", "deren" but not "Deutschland" (difficulty 4)
    expect(results.some(w => w.word === 'der')).toBe(true)
    expect(results.some(w => w.word === 'deren')).toBe(true)
    expect(results.some(w => w.word === 'Deutschland')).toBe(false)
  })

  it('falls back to contains search when no startsWith matches', () => {
    const results = performSearch(mockWords, 'eutsch', 5, 50)
    expect(results.some(w => w.word === 'Deutschland')).toBe(true)
  })

  it('respects maxResults limit', () => {
    const results = performSearch(mockWords, 'd', 5, 2)
    expect(results.length).toBeLessThanOrEqual(2)
  })

  it('sorts results by rank', () => {
    const results = performSearch(mockWords, 'de', 5, 50)
    // Results should be sorted by rank (ascending)
    for (let i = 0; i < results.length - 1; i++) {
      expect(results[i].rank).toBeLessThanOrEqual(results[i + 1].rank)
    }
  })

  it('returns all difficulty levels when difficultyLevel is 0', () => {
    const results = performSearch(mockWords, 'de', 0, 50)
    expect(results.some(w => w.word === 'Deutschland')).toBe(true)
  })
})
