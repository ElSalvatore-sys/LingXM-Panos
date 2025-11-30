import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Volume2Icon, CheckCircleIcon, XIcon } from 'lucide-react'
import type { LanguageCode, Word, WordDetail } from '@/types'
import { Header, Footer } from '@/components/layout'
import { EmptyState, WordDetailModal } from '@/components/features'
import { Button } from '@/components/ui/button'
import { useVocabulary } from '@/hooks/useVocabulary'
import { useProgress } from '@/hooks/useProgress'
import { useTranslation } from '@/hooks/useTranslation'
import { useApp } from '@/contexts/AppContext'
import { languages } from '@/lib/languages'
import { speak, isTTSAvailable } from '@/lib/audioService'
import { getWordDetails } from '@/lib/wordDetails'
import { cn } from '@/lib/utils'

export function BookmarksPage() {
  const [searchParams] = useSearchParams()
  const { t } = useTranslation()
  const { siteLanguage } = useApp()

  // Get target language from URL or default
  const toLang = (searchParams.get('to') || 'de') as LanguageCode

  // State
  const [selectedWord, setSelectedWord] = useState<WordDetail | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [speakingId, setSpeakingId] = useState<number | null>(null)

  // Load vocabulary and progress
  const { words, languageName } = useVocabulary(toLang)
  const {
    bookmarkedWordIds,
    learnedWordIds,
    removeBookmark,
    addLearnedWord,
    removeLearnedWord,
    isWordLearned,
    isWordBookmarked,
  } = useProgress(toLang)

  // Get bookmarked words from vocabulary
  const bookmarkedWords = useMemo(() => {
    if (!words || words.length === 0) return []
    return words.filter((word: Word) => bookmarkedWordIds.includes(word.id))
  }, [words, bookmarkedWordIds])

  // Handle pronunciation
  const handleSpeak = async (e: React.MouseEvent, word: Word) => {
    e.stopPropagation()
    if (!isTTSAvailable()) return

    setSpeakingId(word.id)
    try {
      await speak(word.word, toLang)
    } finally {
      setSpeakingId(null)
    }
  }

  // Handle word click - open modal
  const handleWordClick = (word: Word) => {
    const wordDetails = getWordDetails(word, toLang)
    setSelectedWord(wordDetails)
    setIsModalOpen(true)
  }

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedWord(null)
  }

  // Handle toggle learned
  const handleToggleLearned = (e: React.MouseEvent, wordId: number) => {
    e.stopPropagation()
    if (isWordLearned(wordId)) {
      removeLearnedWord(wordId)
    } else {
      addLearnedWord(wordId)
    }
  }

  // Handle remove bookmark
  const handleRemoveBookmark = (e: React.MouseEvent, wordId: number) => {
    e.stopPropagation()
    removeBookmark(wordId)
  }

  // Difficulty dots
  const DifficultyDots = ({ level }: { level: number }) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((dot) => (
        <span
          key={dot}
          className={cn(
            'w-2 h-2 rounded-full',
            dot <= level ? 'bg-lingxm-blue' : 'bg-gray-200'
          )}
        />
      ))}
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header variant="blue" showFlagSelector />

      <main className="flex-1 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Page title */}
          <div className="flex items-center justify-between mb-8">
            <h1
              className="text-2xl font-bold text-gray-900"
              style={{ fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif" }}
            >
              {t('mySavedWords')}
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">{t('language')}:</span>
              <img
                src={languages[toLang]?.flag}
                alt={languageName}
                className="w-6 h-auto rounded-sm"
              />
              <span className="font-medium">{languageName}</span>
            </div>
          </div>

          {/* Bookmarked words list */}
          {bookmarkedWords.length > 0 ? (
            <div className="space-y-3">
              {bookmarkedWords.map((word) => {
                const learned = learnedWordIds.includes(word.id)
                return (
                  <div
                    key={word.id}
                    onClick={() => handleWordClick(word)}
                    className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-lingxm-blue hover:shadow-sm transition-all cursor-pointer group"
                  >
                    {/* Word info */}
                    <div className="flex items-center gap-4">
                      <span
                        className="text-lg font-medium text-gray-900 group-hover:text-lingxm-blue transition-colors"
                        style={{ fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif" }}
                      >
                        {word.word}
                      </span>
                      <span className="text-sm text-gray-400">#{word.rank}</span>
                      <DifficultyDots level={word.difficulty} />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {/* Speaker */}
                      {isTTSAvailable() && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => handleSpeak(e, word)}
                          className={cn(
                            'h-8 w-8',
                            speakingId === word.id ? 'text-lingxm-blue animate-pulse' : 'text-gray-400 hover:text-gray-600'
                          )}
                        >
                          <Volume2Icon className="h-4 w-4" />
                        </Button>
                      )}

                      {/* Toggle learned */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleToggleLearned(e, word.id)}
                        className={cn(
                          'gap-1 text-sm',
                          learned ? 'text-green-600 hover:text-green-700' : 'text-gray-500 hover:text-gray-700'
                        )}
                      >
                        <CheckCircleIcon className={cn('h-4 w-4', learned && 'fill-current')} />
                        {learned ? t('learned') : t('learn')}
                      </Button>

                      {/* Remove bookmark */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleRemoveBookmark(e, word.id)}
                        className="h-8 w-8 text-gray-400 hover:text-red-500"
                        title={t('removeBookmark')}
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <EmptyState
              type="bookmarks"
              message={t('noBookmarks')}
              actionLabel={t('searchMore')}
              actionLink={`/search?to=${toLang}`}
            />
          )}
        </div>
      </main>

      <Footer variant="full" />

      {/* Word Detail Modal */}
      <WordDetailModal
        word={selectedWord}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        targetLanguage={toLang}
        nativeLanguage={siteLanguage}
        isBookmarked={selectedWord ? isWordBookmarked(selectedWord.id) : false}
        isLearned={selectedWord ? isWordLearned(selectedWord.id) : false}
        onToggleBookmark={(id) => removeBookmark(id)}
        onToggleLearned={(id) => {
          if (isWordLearned(id)) removeLearnedWord(id)
          else addLearnedWord(id)
        }}
      />
    </div>
  )
}
