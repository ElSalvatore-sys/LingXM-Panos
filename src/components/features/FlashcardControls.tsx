import { Button } from '@/components/ui/button'
import type { FlashcardRating, Flashcard, SiteLanguage } from '@/types'
import { getNextReviewText, calculateNextReview } from '@/lib/spacedRepetition'
import { getTranslation } from '@/lib/translations'

interface FlashcardControlsProps {
  card: Flashcard
  onRate: (rating: FlashcardRating) => void
  disabled?: boolean
  nativeLanguage: SiteLanguage
}

interface RatingButtonConfig {
  rating: FlashcardRating
  label: string
  color: string
  hoverColor: string
}

export function FlashcardControls({
  card,
  onRate,
  disabled = false,
  nativeLanguage,
}: FlashcardControlsProps) {
  const t = (key: string) => getTranslation(nativeLanguage, key)

  // Calculate preview intervals for each rating
  const getPreviewInterval = (rating: FlashcardRating): string => {
    const { interval } = calculateNextReview(card, rating)
    return getNextReviewText(interval)
  }

  const buttons: RatingButtonConfig[] = [
    {
      rating: 0,
      label: t('flashcards.again'),
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
    },
    {
      rating: 1,
      label: t('flashcards.hard'),
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
    },
    {
      rating: 3,
      label: t('flashcards.good'),
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
    },
    {
      rating: 5,
      label: t('flashcards.easy'),
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
    },
  ]

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <p className="text-sm text-gray-500">{t('flashcards.howWell')}</p>

      <div className="flex gap-3 flex-wrap justify-center">
        {buttons.map(({ rating, label, color, hoverColor }) => (
          <Button
            key={rating}
            onClick={() => onRate(rating)}
            disabled={disabled}
            className={`${color} ${hoverColor} text-white min-w-[80px] flex flex-col items-center py-3 h-auto`}
          >
            <span className="font-semibold">{label}</span>
            <span className="text-xs opacity-80">{getPreviewInterval(rating)}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
