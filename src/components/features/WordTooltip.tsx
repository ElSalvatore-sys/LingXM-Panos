import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface WordTooltipProps {
  word: string;
  translation?: string;
  category?: string;
  level?: string;
  difficulty?: number;
  isVisible: boolean;
  position: { x: number; y: number };
  onClose: () => void;
}

export function WordTooltip({
  word,
  translation,
  category,
  level,
  difficulty = 1,
  isVisible,
  position,
  onClose
}: WordTooltipProps) {
  const { t } = useTranslation();
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [adjustedPosition, setAdjustedPosition] = useState(position);

  // Adjust position to stay within viewport
  useEffect(() => {
    if (isVisible && tooltipRef.current) {
      const tooltip = tooltipRef.current;
      const rect = tooltip.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newX = position.x;
      let newY = position.y;

      // Adjust horizontal position
      if (position.x + rect.width > viewportWidth - 20) {
        newX = viewportWidth - rect.width - 20;
      }
      if (newX < 20) newX = 20;

      // Adjust vertical position (show above if too low)
      if (position.y + rect.height > viewportHeight - 20) {
        newY = position.y - rect.height - 40;
      }

      setAdjustedPosition({ x: newX, y: newY });
    }
  }, [isVisible, position]);

  if (!isVisible) return null;

  // Difficulty dots
  const difficultyDots = Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      className={`inline-block w-2 h-2 rounded-full mx-0.5 ${
        i < difficulty ? 'bg-[#7b9dd2]' : 'bg-gray-300'
      }`}
    />
  ));

  return (
    <div
      ref={tooltipRef}
      className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-3 min-w-[200px] max-w-[280px] animate-fade-in"
      style={{
        left: adjustedPosition.x,
        top: adjustedPosition.y,
      }}
      onMouseLeave={onClose}
    >
      {/* Word */}
      <div className="text-lg font-semibold text-gray-900 mb-1">
        {word}
      </div>

      {/* Translation + Category */}
      <div className="text-sm text-gray-600 mb-2">
        {translation && <span className="font-medium">{translation}</span>}
        {category && (
          <span className="text-gray-400 ml-2">({category})</span>
        )}
      </div>

      {/* Difficulty + Level */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
        <div className="flex items-center">
          {difficultyDots}
        </div>
        {level && (
          <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">
            {level}
          </span>
        )}
      </div>

      {/* Hint */}
      <div className="text-xs text-gray-400 border-t border-gray-100 pt-2 mt-2">
        🔊 {t('tooltip.clickForExamples')}
      </div>
    </div>
  );
}
