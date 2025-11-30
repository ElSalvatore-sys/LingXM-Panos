import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { PlayIcon, PlusIcon, TrashIcon } from 'lucide-react'
import type { LanguageCode } from '@/types'
import { Header, Footer } from '@/components/layout'
import { FlashcardCard } from '@/components/features/FlashcardCard'
import { FlashcardControls } from '@/components/features/FlashcardControls'
import { FlashcardSessionSummary } from '@/components/features/FlashcardSessionSummary'
import { Button } from '@/components/ui/button'
import { useFlashcards } from '@/hooks/useFlashcards'
import { useVocabulary } from '@/hooks/useVocabulary'
import { useTranslation } from '@/hooks/useTranslation'
import { useApp } from '@/contexts/AppContext'
import { languages } from '@/lib/languages'
import { loadTranslations } from '@/lib/grammarData'

export function FlashcardPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { siteLanguage } = useApp()

  // Get languages from URL params
  const fromLang = (searchParams.get('from') || 'el') as LanguageCode
  const toLang = (searchParams.get('to') || 'de') as LanguageCode

  // State for card count
  const [cardCount, setCardCount] = useState(10)
  const [isAddingCards, setIsAddingCards] = useState(false)

  // Flashcard hook
  const {
    cards,
    session,
    isLoading,
    stats,
    startSession,
    rateCard,
    endSession,
    addCardsFromWords,
    resetProgress,
    currentCard,
    isFlipped,
    setIsFlipped,
  } = useFlashcards(toLang)

  // Vocabulary for adding new cards
  const { words, isLoading: vocabLoading } = useVocabulary(toLang)

  // Add cards from vocabulary
  const handleAddCards = async () => {
    if (words.length === 0) return

    setIsAddingCards(true)
    try {
      const translationData = await loadTranslations(toLang)
      if (translationData) {
        const translations: Record<string, string> = {}
        Object.entries(translationData.translations).forEach(([word, data]) => {
          translations[word] = data.translation
        })

        const added = addCardsFromWords(
          words.slice(0, 100), // Add top 100 words
          translations
        )
        if (added > 0) {
          alert(`Added ${added} new flashcards!`)
        } else {
          alert('No new cards to add. All available words already added.')
        }
      } else {
        alert('No translation data available for this language.')
      }
    } catch (error) {
      console.error('Error adding cards:', error)
      alert('Failed to add cards.')
    } finally {
      setIsAddingCards(false)
    }
  }

  // Handle start session
  const handleStartSession = () => {
    if (stats.dueToday === 0 && cards.length === 0) {
      alert('No cards available. Add some cards first!')
      return
    }
    startSession(cardCount)
  }

  // Handle end session
  const handleEndSession = () => {
    endSession()
  }

  // Handle study again
  const handleStudyAgain = () => {
    startSession(cardCount)
  }

  // Handle back to search
  const handleBackToSearch = () => {
    navigate(`/search?from=${fromLang}&to=${toLang}`)
  }

  // Handle reset progress
  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset all flashcard progress? This cannot be undone.')) {
      resetProgress()
    }
  }

  // Render session complete view
  if (session?.isComplete) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header variant="blue" showFlagSelector />
        <main className="flex-1 py-8 px-6">
          <FlashcardSessionSummary
            session={session}
            onStudyAgain={handleStudyAgain}
            onBackToSearch={handleBackToSearch}
            nativeLanguage={siteLanguage}
          />
        </main>
        <Footer variant="simple" />
      </div>
    )
  }

  // Render active session view
  if (session && currentCard) {
    const progress = ((session.currentIndex + 1) / session.cards.length) * 100

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header variant="blue" showFlagSelector />
        <main className="flex-1 py-8 px-6">
          <div className="max-w-2xl mx-auto">
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  {t('flashcards.card')} {session.currentIndex + 1} / {session.cards.length}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEndSession}
                  className="text-gray-500"
                >
                  {t('flashcards.endSession')}
                </Button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-lingxm-blue h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Flashcard */}
            <FlashcardCard
              card={currentCard}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped(!isFlipped)}
              targetLanguage={toLang}
              nativeLanguage={siteLanguage}
            />

            {/* Controls - show only when flipped */}
            {isFlipped && (
              <FlashcardControls
                card={currentCard}
                onRate={rateCard}
                nativeLanguage={siteLanguage}
              />
            )}

            {/* Flip hint when not flipped */}
            {!isFlipped && (
              <p className="text-center text-gray-400 mt-4">
                {t('flashcards.clickToReveal')}
              </p>
            )}
          </div>
        </main>
        <Footer variant="simple" />
      </div>
    )
  }

  // Render dashboard view
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header variant="blue" showFlagSelector />
      <main className="flex-1 py-8 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {t('flashcards.title')}
            </h1>
            <div className="flex items-center gap-2 text-gray-600">
              <img
                src={languages[toLang]?.flag}
                alt={languages[toLang]?.name}
                className="w-6 h-auto rounded-sm"
              />
              <span>{languages[toLang]?.name}</span>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-2xl font-bold text-lingxm-blue">{stats.totalCards}</p>
              <p className="text-sm text-gray-500">{t('flashcards.totalCards')}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-2xl font-bold text-green-500">{stats.dueToday}</p>
              <p className="text-sm text-gray-500">{t('flashcards.dueToday')}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-2xl font-bold text-yellow-500">{stats.newCards}</p>
              <p className="text-sm text-gray-500">{t('flashcards.newCards')}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="text-2xl font-bold text-purple-500">{stats.masteredCards}</p>
              <p className="text-sm text-gray-500">{t('flashcards.mastered')}</p>
            </div>
          </div>

          {/* Card count selector */}
          <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('flashcards.cardsPerSession')}
            </label>
            <div className="flex gap-2">
              {[5, 10, 20, 50].map((count) => (
                <Button
                  key={count}
                  variant={cardCount === count ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCardCount(count)}
                  className={cardCount === count ? 'bg-lingxm-blue' : ''}
                >
                  {count}
                </Button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-4">
            {/* Start session */}
            <Button
              onClick={handleStartSession}
              disabled={isLoading || stats.dueToday === 0}
              className="w-full bg-lingxm-blue hover:bg-lingxm-blue/90 h-14 text-lg"
            >
              <PlayIcon className="w-5 h-5 mr-2" />
              {stats.dueToday > 0
                ? `${t('flashcards.startPractice')} (${stats.dueToday} ${t('flashcards.due')})`
                : t('flashcards.noCardsDue')}
            </Button>

            {/* Add cards */}
            <Button
              onClick={handleAddCards}
              disabled={isAddingCards || vocabLoading}
              variant="outline"
              className="w-full h-12"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              {isAddingCards ? t('flashcards.adding') : t('flashcards.addCards')}
            </Button>

            {/* Reset progress */}
            {cards.length > 0 && (
              <Button
                onClick={handleResetProgress}
                variant="ghost"
                className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <TrashIcon className="w-4 h-4 mr-2" />
                {t('flashcards.resetProgress')}
              </Button>
            )}
          </div>

          {/* Empty state */}
          {cards.length === 0 && !isLoading && (
            <div className="mt-8 text-center text-gray-500">
              <p className="mb-2">{t('flashcards.noCards')}</p>
              <p className="text-sm">{t('flashcards.addFromSearch')}</p>
            </div>
          )}
        </div>
      </main>
      <Footer variant="full" />
    </div>
  )
}
