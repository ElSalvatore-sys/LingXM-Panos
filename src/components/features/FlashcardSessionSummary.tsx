import { CheckCircleIcon, XCircleIcon, ClockIcon, RotateCcwIcon, SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { FlashcardSession, SiteLanguage } from '@/types'
import { getTranslation } from '@/lib/translations'

interface FlashcardSessionSummaryProps {
  session: FlashcardSession
  onStudyAgain: () => void
  onBackToSearch: () => void
  nativeLanguage: SiteLanguage
}

export function FlashcardSessionSummary({
  session,
  onStudyAgain,
  onBackToSearch,
  nativeLanguage,
}: FlashcardSessionSummaryProps) {
  const t = (key: string) => getTranslation(nativeLanguage, key)

  const startTime = new Date(session.startTime)
  const endTime = new Date()
  const durationMs = endTime.getTime() - startTime.getTime()
  const durationMinutes = Math.round(durationMs / 60000)

  const totalCards = session.cards.length
  const accuracy = totalCards > 0 ? Math.round((session.correctCount / totalCards) * 100) : 0

  const getAccuracyColor = () => {
    if (accuracy >= 80) return 'text-green-500'
    if (accuracy >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 max-w-md mx-auto">
      {/* Success icon */}
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <CheckCircleIcon className="w-12 h-12 text-green-500" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {t('flashcards.sessionComplete')}
      </h2>

      {/* Stats */}
      <div className="w-full bg-gray-50 rounded-xl p-6 mt-4 space-y-4">
        {/* Accuracy */}
        <div className="text-center mb-4">
          <span className={`text-4xl font-bold ${getAccuracyColor()}`}>{accuracy}%</span>
          <p className="text-gray-500 text-sm">{t('flashcards.accuracy')}</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Correct */}
          <div className="flex flex-col items-center p-3 bg-white rounded-lg">
            <CheckCircleIcon className="w-6 h-6 text-green-500 mb-1" />
            <span className="text-xl font-bold text-gray-800">{session.correctCount}</span>
            <span className="text-xs text-gray-500">{t('flashcards.correct')}</span>
          </div>

          {/* Incorrect */}
          <div className="flex flex-col items-center p-3 bg-white rounded-lg">
            <XCircleIcon className="w-6 h-6 text-red-500 mb-1" />
            <span className="text-xl font-bold text-gray-800">{session.incorrectCount}</span>
            <span className="text-xs text-gray-500">{t('flashcards.toReview')}</span>
          </div>

          {/* Duration */}
          <div className="flex flex-col items-center p-3 bg-white rounded-lg">
            <ClockIcon className="w-6 h-6 text-blue-500 mb-1" />
            <span className="text-xl font-bold text-gray-800">{durationMinutes}</span>
            <span className="text-xs text-gray-500">{t('flashcards.minutes')}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-8 w-full">
        <Button
          onClick={onStudyAgain}
          className="flex-1 bg-lingxm-blue hover:bg-lingxm-blue/90"
        >
          <RotateCcwIcon className="w-4 h-4 mr-2" />
          {t('flashcards.studyAgain')}
        </Button>
        <Button
          onClick={onBackToSearch}
          variant="outline"
          className="flex-1"
        >
          <SearchIcon className="w-4 h-4 mr-2" />
          {t('flashcards.backToSearch')}
        </Button>
      </div>
    </div>
  )
}
