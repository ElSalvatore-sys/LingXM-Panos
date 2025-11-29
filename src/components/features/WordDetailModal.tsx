import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { BookmarkIcon, CheckCircleIcon, Volume2Icon } from 'lucide-react'
import type { WordDetail, LanguageCode, SiteLanguage } from '@/types'
import { getTranslation } from '@/lib/translations'

interface WordDetailModalProps {
  word: WordDetail | null
  isOpen: boolean
  onClose: () => void
  targetLanguage: LanguageCode
  nativeLanguage: SiteLanguage
  onToggleBookmark?: (wordId: number) => void
  onToggleLearned?: (wordId: number) => void
}

export function WordDetailModal({
  word,
  isOpen,
  onClose,
  targetLanguage,
  nativeLanguage,
  onToggleBookmark,
  onToggleLearned,
}: WordDetailModalProps) {
  const t = (key: string) => getTranslation(nativeLanguage, key)

  if (!word) return null

  const getDifficultyLabel = (level: number): string => {
    const labels: Record<number, string> = {
      1: t('difficulty.beginner'),
      2: t('difficulty.elementary'),
      3: t('difficulty.intermediate'),
      4: t('difficulty.advanced'),
      5: t('difficulty.expert'),
    }
    return labels[level] || t('difficulty.unknown')
  }

  const getDifficultyColor = (level: number): string => {
    const colors: Record<number, string> = {
      1: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      2: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      3: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      4: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      5: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    }
    return colors[level] || 'bg-gray-100 text-gray-800'
  }

  const getPartOfSpeechLabel = (pos?: string): string => {
    if (!pos) return ''
    const posKey = `partOfSpeech.${pos}`
    return t(posKey)
  }

  const getGenderLabel = (gender?: string): string => {
    if (!gender) return ''
    const genderKey = `gender.${gender}`
    return t(genderKey)
  }

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word.word)
      utterance.lang = targetLanguage
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-2xl font-bold">{word.word}</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSpeak}
                className="h-8 w-8"
                title={t('modal.pronounce')}
              >
                <Volume2Icon className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onToggleBookmark?.(word.id)}
                className={`h-8 w-8 ${word.isBookmarked ? 'text-yellow-500' : ''}`}
                title={word.isBookmarked ? t('modal.removeBookmark') : t('modal.addBookmark')}
              >
                <BookmarkIcon className={`h-5 w-5 ${word.isBookmarked ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onToggleLearned?.(word.id)}
                className={`h-8 w-8 ${word.isLearned ? 'text-green-500' : ''}`}
                title={word.isLearned ? t('modal.markUnlearned') : t('modal.markLearned')}
              >
                <CheckCircleIcon className={`h-5 w-5 ${word.isLearned ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
          <DialogDescription className="sr-only">
            {t('modal.wordDetails')} {word.word}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Translation and basic info */}
          <div className="flex flex-wrap items-center gap-2">
            {word.translation && (
              <span className="text-lg text-muted-foreground">{word.translation}</span>
            )}
            {word.partOfSpeech && (
              <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">
                {getPartOfSpeechLabel(word.partOfSpeech)}
              </span>
            )}
            {word.gender && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-xs">
                {getGenderLabel(word.gender)}
              </span>
            )}
          </div>

          {/* Difficulty and frequency info */}
          <div className="flex flex-wrap gap-2 text-sm">
            <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(word.difficulty)}`}>
              {getDifficultyLabel(word.difficulty)}
            </span>
            <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">
              {t('modal.rank')}: #{word.rank.toLocaleString()}
            </span>
            <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">
              {t('modal.frequency')}: {word.frequency.toLocaleString()}
            </span>
          </div>

          {/* Declension table (for nouns) */}
          {word.declension && Object.keys(word.declension).length > 0 && (
            <div className="border rounded-lg p-3">
              <h3 className="font-semibold mb-2">{t('modal.declension')}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(word.declension).map(([caseType, form]) => (
                  <div key={caseType} className="flex justify-between">
                    <span className="text-muted-foreground capitalize">{caseType}:</span>
                    <span className="font-medium">{form}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conjugation table (for verbs) */}
          {word.conjugation && Object.keys(word.conjugation).length > 0 && (
            <div className="border rounded-lg p-3">
              <h3 className="font-semibold mb-2">{t('modal.conjugation')}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(word.conjugation).map(([person, form]) => (
                  <div key={person} className="flex justify-between">
                    <span className="text-muted-foreground">{person}:</span>
                    <span className="font-medium">{form}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Example sentences */}
          {word.examples && word.examples.length > 0 && (
            <div className="border rounded-lg p-3">
              <h3 className="font-semibold mb-2">{t('modal.examples')}</h3>
              <ul className="space-y-2">
                {word.examples.map((example, index) => (
                  <li key={index} className="text-sm italic text-muted-foreground">
                    "{example}"
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Synonyms */}
          {word.synonyms && word.synonyms.length > 0 && (
            <div className="border rounded-lg p-3">
              <h3 className="font-semibold mb-2">{t('modal.synonyms')}</h3>
              <div className="flex flex-wrap gap-2">
                {word.synonyms.map((synonym, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    {synonym}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
