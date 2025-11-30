import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Volume2Icon, BookmarkIcon, XIcon } from 'lucide-react'
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

export function LearnedPage() {
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
    learnedWordIds,
    addBookmark,
    removeBookmark,
    removeLearnedWord,
    isWordLearned,
    isWordBookmarked,
  } = useProgress(toLang)

  // Get learned words from vocabulary
  const learnedWords = useMemo(() => {
    if (!words || words.length === 0) return []
    return words.filter((word: Word) => learnedWordIds.includes(word.id))
  }, [words, learnedWordIds])

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

  // Handle toggle bookmark
  const handleToggleBookmark = (e: React.MouseEvent, wordId: number) => {
    e.stopPropagation()
    if (isWordBookmarked(wordId)) {
      removeBookmark(wordId)
    } else {
      addBookmark(wordId)
    }
  }

  // Handle remove from learned
  const handleRemoveLearned = (e: React.MouseEvent, wordId: number) => {
    e.stopPropagation()
    removeLearnedWord(wordId)
  }

  // Difficulty dots
  const DifficultyDots = ({ level }: { level: number }) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((dot) => (
        <span
          key={dot}
          className={cn(
            'w-2 h-2 rounded-full',
            dot <= level ? 'bg-green-500' : 'bg-gray-200'
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
              {t('myLearnedWords')}
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

          {/* Learned words list */}
          {learnedWords.length > 0 ? (
            <div className="space-y-3">
              {learnedWords.map((word) => {
                const bookmarked = isWordBookmarked(word.id)
                return (
                  <div
                    key={word.id}
                    onClick={() => handleWordClick(word)}
                    className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-green-500 hover:shadow-sm transition-all cursor-pointer group"
                  >
                    {/* Word info */}
                    <div className="flex items-center gap-4">
                      <span
                        className="text-lg font-medium text-gray-900 group-hover:text-green-600 transition-colors"
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
                            speakingId === word.id ? 'text-green-500 animate-pulse' : 'text-gray-400 hover:text-gray-600'
                          )}
                        >
                          <Volume2Icon className="h-4 w-4" />
                        </Button>
                      )}

                      {/* Toggle bookmark */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleToggleBookmark(e, word.id)}
                        className={cn(
                          'h-8 w-8',
                          bookmarked ? 'text-lingxm-blue' : 'text-gray-400 hover:text-gray-600'
                        )}
                        title={bookmarked ? t('removeBookmark') : t('addBookmark')}
                      >
                        <BookmarkIcon className={cn('h-4 w-4', bookmarked && 'fill-current')} />
                      </Button>

                      {/* Remove from learned */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleRemoveLearned(e, word.id)}
                        className="h-8 w-8 text-gray-400 hover:text-red-500"
                        title={t('removeLearned')}
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
              type="learned"
              message={t('noLearnedWords')}
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
        onToggleBookmark={(id) => {
          if (isWordBookmarked(id)) removeBookmark(id)
          else addBookmark(id)
        }}
        onToggleLearned={(id) => removeLearnedWord(id)}
      />
    </div>
  )
}
