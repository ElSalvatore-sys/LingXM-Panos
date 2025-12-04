import { useState, useRef, useCallback, useEffect } from 'react';
import { Volume2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { speak, isTTSAvailable } from '@/lib/audioService';
import { WordTooltip } from './WordTooltip';
import { useUniversalVocab } from '@/hooks/useUniversalVocab';
import { useApp } from '@/contexts/AppContext';
import type { LanguageCode } from '@/types';

interface ResultItem {
  id: number;
  sentence: string;
  highlightWord?: string;
}

interface ResultsListProps {
  results: ResultItem[];
  onResultClick: (id: number) => void;
  title?: string;
  className?: string;
  targetLanguage?: LanguageCode;
}

export function ResultsList({
  results,
  onResultClick,
  title = 'Open Results at...',
  className,
  targetLanguage = 'de'
}: ResultsListProps) {
  const [speakingId, setSpeakingId] = useState<number | null>(null);

  // === TOOLTIP STATE (NEW) ===
  const [tooltipData, setTooltipData] = useState<{
    word: string;
    translation?: string;
    category?: string;
    level?: string;
    difficulty?: number;
    position: { x: number; y: number };
  } | null>(null);

  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Get language context
  const { nativeLanguage, targetLanguage: contextTargetLanguage } = useApp();

  // Get universal vocab hook (for richer tooltip data)
  const { getWord: getUniversalWord } = useUniversalVocab(nativeLanguage, contextTargetLanguage);

  // === TOOLTIP HANDLERS (NEW) ===
  const handleWordMouseEnter = useCallback((
    e: React.MouseEvent<HTMLButtonElement>,
    word: string
  ) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    hoverTimeoutRef.current = setTimeout(() => {
      const rect = e.currentTarget.getBoundingClientRect();

      // Try to get universal data for richer tooltip
      const universalData = getUniversalWord(word);

      setTooltipData({
        word: word,
        translation: universalData?.translation,
        category: universalData?.category,
        level: universalData?.level,
        difficulty: 1,
        position: {
          x: rect.left,
          y: rect.bottom + 8
        }
      });
    }, 300); // 300ms delay to prevent flicker
  }, [getUniversalWord]);

  const handleWordMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setTooltipData(null);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Handle pronunciation
  const handleSpeak = async (e: React.MouseEvent, id: number, word: string) => {
    e.stopPropagation(); // Don't trigger row click

    if (!isTTSAvailable()) return;

    setSpeakingId(id);
    try {
      await speak(word, targetLanguage);
    } finally {
      setSpeakingId(null);
    }
  };

  // Helper to highlight a word in the sentence
  const highlightText = (sentence: string, word?: string) => {
    if (!word) return sentence;

    const regex = new RegExp(`(${word})`, 'gi');
    const parts = sentence.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === word.toLowerCase() ? (
        <strong key={index} className="text-lingxm-blue">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  return (
    <div
      className={cn('', className)}
      style={{
        fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif"
      }}
    >
      {/* Header */}
      {title && (
        <h3
          className="text-black mb-4"
          style={{ fontSize: '16px', fontWeight: 600 }}
        >
          {title}
        </h3>
      )}

      {/* Results list */}
      <ul className="space-y-5">
        {results.map((result) => (
          <li key={result.id} className="flex items-center gap-2">
            {/* Speaker button */}
            {isTTSAvailable() && result.highlightWord && (
              <button
                onClick={(e) => handleSpeak(e, result.id, result.highlightWord!)}
                className={cn(
                  'flex-shrink-0 p-1.5 rounded-full hover:bg-gray-100 transition-colors',
                  speakingId === result.id ? 'text-lingxm-blue animate-pulse' : 'text-gray-400 hover:text-gray-600'
                )}
                title="Pronounce"
                aria-label={`Pronounce ${result.highlightWord}`}
              >
                <Volume2Icon className="w-4 h-4" />
              </button>
            )}

            {/* Result text */}
            <button
              onClick={() => onResultClick(result.id)}
              onMouseEnter={(e) => result.highlightWord && handleWordMouseEnter(e, result.highlightWord)}
              onMouseLeave={handleWordMouseLeave}
              className="flex items-start gap-2 text-left hover:text-lingxm-blue transition-colors flex-1"
              style={{
                fontSize: '18px',
                lineHeight: '24px'
              }}
            >
              <span className="text-gray-500 flex-shrink-0">&gt;</span>
              <span>{highlightText(result.sentence, result.highlightWord)}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Empty state */}
      {results.length === 0 && (
        <p className="text-gray-500 italic" style={{ fontSize: '16px' }}>
          No results found. Try a different search term.
        </p>
      )}

      {/* Tooltip (NEW) */}
      {tooltipData && (
        <WordTooltip
          word={tooltipData.word}
          translation={tooltipData.translation}
          category={tooltipData.category}
          level={tooltipData.level}
          difficulty={tooltipData.difficulty}
          isVisible={true}
          position={tooltipData.position}
          onClose={() => setTooltipData(null)}
        />
      )}
    </div>
  );
}
