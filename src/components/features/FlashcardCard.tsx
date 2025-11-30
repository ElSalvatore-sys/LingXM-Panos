import { useState } from 'react'
import { Volume2Icon, SparklesIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Flashcard, LanguageCode, SiteLanguage } from '@/types'
import { speak, isTTSAvailable } from '@/lib/audioService'
import { getTranslation } from '@/lib/translations'

interface FlashcardCardProps {
  card: Flashcard
  isFlipped: boolean
  onFlip: () => void
  targetLanguage: LanguageCode
  nativeLanguage: SiteLanguage
  example?: string
}

export function FlashcardCard({
  card,
  isFlipped,
  onFlip,
  targetLanguage,
  nativeLanguage,
  example,
}: FlashcardCardProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const t = (key: string) => getTranslation(nativeLanguage, key)

  const handleSpeak = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isTTSAvailable()) return

    setIsSpeaking(true)
    try {
      await speak(card.word, targetLanguage)
    } finally {
      setIsSpeaking(false)
    }
  }

  const getDifficultyDots = (level: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full ${
            i < level ? 'bg-lingxm-blue' : 'bg-gray-200'
          }`}
        />
      ))
  }

  return (
    <div
      className="relative w-full max-w-md mx-auto perspective-1000"
      style={{ perspective: '1000px' }}
    >
      <div
        className={`relative w-full h-72 cursor-pointer transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
        onClick={onFlip}
      >
        {/* Front of card */}
        <div
          className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-lg border-2 border-lingxm-blue/20 flex flex-col items-center justify-center p-6"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Difficulty indicator */}
          <div className="absolute top-4 left-4 flex gap-1">
            {getDifficultyDots(card.difficulty)}
          </div>

          {/* Audio button */}
          {isTTSAvailable() && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSpeak}
              className={`absolute top-4 right-4 h-10 w-10 ${
                isSpeaking ? 'text-lingxm-blue animate-pulse' : 'text-gray-400'
              }`}
              title={t('modal.pronounce')}
              disabled={isSpeaking}
            >
              <Volume2Icon className="h-6 w-6" />
            </Button>
          )}

          {/* Word */}
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{card.word}</h2>

          {/* Tap to flip hint */}
          <p className="text-gray-400 text-sm mt-8">{t('flashcards.tapToFlip')}</p>
        </div>

        {/* Back of card */}
        <div
          className="absolute w-full h-full backface-hidden bg-gradient-to-br from-lingxm-blue to-blue-600 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Translation */}
          <h3 className="text-3xl font-bold text-white mb-2">{card.translation}</h3>

          {/* Word reminder */}
          <p className="text-blue-100 text-lg mb-4">({card.word})</p>

          {/* Example sentence */}
          {example && (
            <div className="mt-4 p-3 bg-white/10 rounded-lg max-w-full">
              <p className="text-white/90 text-sm italic text-center">"{example}"</p>
            </div>
          )}

          {/* SM-2 info */}
          {card.interval > 0 && (
            <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white/60 text-xs">
              <SparklesIcon className="h-3 w-3" />
              <span>Interval: {card.interval} days</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
