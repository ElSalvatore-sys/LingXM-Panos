import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { BookmarkIcon, CheckCircleIcon, Volume2Icon, ChevronDownIcon, ChevronUpIcon, SparklesIcon } from 'lucide-react'
import type { WordDetail, LanguageCode, SiteLanguage } from '@/types'
import { getTranslation } from '@/lib/translations'
import { speak, isTTSAvailable } from '@/lib/audioService'

interface WordDetailModalProps {
  word: WordDetail | null
  isOpen: boolean
  onClose: () => void
  targetLanguage: LanguageCode
  nativeLanguage: SiteLanguage
  isBookmarked?: boolean
  isLearned?: boolean
  onToggleBookmark?: (wordId: number) => void
  onToggleLearned?: (wordId: number) => void
}

export function WordDetailModal({
  word,
  isOpen,
  onClose,
  targetLanguage,
  nativeLanguage,
  isBookmarked = false,
  isLearned = false,
  onToggleBookmark,
  onToggleLearned,
}: WordDetailModalProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showFullConjugation, setShowFullConjugation] = useState(false)
  const [showFullDeclension, setShowFullDeclension] = useState(false)
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

  const handleSpeak = async () => {
    if (!isTTSAvailable()) return

    setIsSpeaking(true)
    try {
      await speak(word.word, targetLanguage)
    } finally {
      setIsSpeaking(false)
    }
  }

  const tenseLabels: Record<string, string> = {
    präsens: 'Present',
    präteritum: 'Past (Präteritum)',
    perfekt: 'Perfect',
  }

  const caseLabels: Record<string, string> = {
    nominativ: 'Nominativ',
    genitiv: 'Genitiv',
    dativ: 'Dativ',
    akkusativ: 'Akkusativ',
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-2xl font-bold">{word.word}</DialogTitle>
              {isTTSAvailable() && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSpeak}
                  className={`h-8 w-8 ${isSpeaking ? 'text-lingxm-blue animate-pulse' : ''}`}
                  title={t('modal.pronounce')}
                  disabled={isSpeaking}
                >
                  <Volume2Icon className="h-5 w-5" />
                </Button>
              )}
              {word.hasRealData && (
                <span className="flex items-center gap-1 px-2 py-1 bg-lingxm-blue/10 text-lingxm-blue rounded-full text-xs">
                  <SparklesIcon className="h-3 w-3" />
                  Real Data
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onToggleBookmark?.(word.id)}
                className={`h-8 w-8 ${isBookmarked ? 'text-yellow-500' : ''}`}
                title={isBookmarked ? t('modal.removeBookmark') : t('modal.addBookmark')}
              >
                <BookmarkIcon className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onToggleLearned?.(word.id)}
                className={`h-8 w-8 ${isLearned ? 'text-green-500' : ''}`}
                title={isLearned ? t('modal.markUnlearned') : t('modal.markLearned')}
              >
                <CheckCircleIcon className={`h-5 w-5 ${isLearned ? 'fill-current' : ''}`} />
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
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{t('modal.declension')}</h3>
                {word.fullDeclension && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFullDeclension(!showFullDeclension)}
                    className="h-6 text-xs"
                  >
                    {showFullDeclension ? (
                      <>Less <ChevronUpIcon className="h-3 w-3 ml-1" /></>
                    ) : (
                      <>Full Table <ChevronDownIcon className="h-3 w-3 ml-1" /></>
                    )}
                  </Button>
                )}
              </div>

              {showFullDeclension && word.fullDeclension ? (
                /* Full declension table with singular/plural */
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-1 pr-2 text-muted-foreground">Case</th>
                        <th className="text-left py-1 px-2">Singular</th>
                        <th className="text-left py-1 pl-2">Plural</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(word.fullDeclension.declension).map(([caseType, forms]) => (
                        <tr key={caseType} className="border-b last:border-b-0">
                          <td className="py-1 pr-2 text-muted-foreground">{caseLabels[caseType] || caseType}</td>
                          <td className="py-1 px-2 font-medium">{forms.singular}</td>
                          <td className="py-1 pl-2 font-medium">{forms.plural}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* Simple declension view */
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(word.declension).map(([caseType, form]) => (
                    <div key={caseType} className="flex justify-between">
                      <span className="text-muted-foreground capitalize">{caseType}:</span>
                      <span className="font-medium">{form}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Conjugation table (for verbs) */}
          {word.conjugation && Object.keys(word.conjugation).length > 0 && (
            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{t('modal.conjugation')}</h3>
                {word.fullConjugation && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFullConjugation(!showFullConjugation)}
                    className="h-6 text-xs"
                  >
                    {showFullConjugation ? (
                      <>Less <ChevronUpIcon className="h-3 w-3 ml-1" /></>
                    ) : (
                      <>All Tenses <ChevronDownIcon className="h-3 w-3 ml-1" /></>
                    )}
                  </Button>
                )}
              </div>

              {showFullConjugation && word.fullConjugation ? (
                /* Full conjugation with all tenses */
                <div className="space-y-3">
                  {word.fullConjugation.type && (
                    <div className="flex gap-2 text-xs">
                      <span className="px-2 py-0.5 bg-secondary rounded">
                        {word.fullConjugation.type}
                      </span>
                      <span className="px-2 py-0.5 bg-secondary rounded">
                        aux: {word.fullConjugation.auxiliary}
                      </span>
                    </div>
                  )}
                  {Object.entries(word.fullConjugation.conjugations).map(([tense, forms]) => (
                    <div key={tense}>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">
                        {tenseLabels[tense] || tense}
                      </h4>
                      <div className="grid grid-cols-2 gap-1 text-sm">
                        {Object.entries(forms).map(([person, form]) => (
                          <div key={person} className="flex justify-between">
                            <span className="text-muted-foreground">{person}:</span>
                            <span className="font-medium">{form}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Simple conjugation view (present tense only) */
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(word.conjugation).map(([person, form]) => (
                    <div key={person} className="flex justify-between">
                      <span className="text-muted-foreground">{person}:</span>
                      <span className="font-medium">{form}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Example sentences with translations */}
          {word.examplesWithTranslations && word.examplesWithTranslations.length > 0 ? (
            <div className="border rounded-lg p-3">
              <h3 className="font-semibold mb-2">{t('modal.examples')}</h3>
              <ul className="space-y-3">
                {word.examplesWithTranslations.map((example, index) => (
                  <li key={index} className="text-sm">
                    <div className="font-medium">{example.sentence}</div>
                    <div className="text-muted-foreground text-xs mt-0.5">{example.translation}</div>
                  </li>
                ))}
              </ul>
            </div>
          ) : word.examples && word.examples.length > 0 && (
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
