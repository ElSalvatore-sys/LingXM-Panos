import { useState, useEffect } from 'react';
import { X, Delete, ArrowBigUp, CornerDownLeft } from 'lucide-react';
import type { LanguageCode } from '@/types';
import { getKeyboard } from '@/lib/keyboards';
import { cn } from '@/lib/utils';

interface VirtualKeyboardProps {
  language: LanguageCode;
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export function VirtualKeyboard({
  language,
  onKeyPress,
  onBackspace,
  onEnter,
  onClose,
  isOpen
}: VirtualKeyboardProps) {
  const [isShift, setIsShift] = useState(false);
  const keyboard = getKeyboard(language);

  // Reset shift when language changes
  useEffect(() => {
    setIsShift(false);
  }, [language]);

  if (!isOpen) {
    return null;
  }

  const rows = isShift ? keyboard.shiftRows : keyboard.rows;
  const specialRow = isShift ? keyboard.specialShiftRow : keyboard.specialRow;

  const handleKeyClick = (key: string) => {
    onKeyPress(key);
    // Auto-disable shift after pressing a key
    if (isShift) {
      setIsShift(false);
    }
  };

  const handleShiftClick = () => {
    setIsShift(!isShift);
  };

  // Common key styles
  const keyBaseClass = cn(
    'flex items-center justify-center rounded-md font-medium',
    'transition-all duration-75 select-none',
    'hover:brightness-110 active:brightness-90 active:scale-95'
  );

  const letterKeyClass = cn(
    keyBaseClass,
    'min-w-[32px] h-10 text-lg bg-[#525252] text-white'
  );

  const specialKeyClass = cn(
    keyBaseClass,
    'h-10 px-3 text-sm bg-[#3a3a3a] text-white'
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />

      {/* Keyboard container */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50',
          'bg-[#1c1c1c] p-3 pb-6',
          'transform transition-transform duration-300 ease-out',
          'shadow-[0_-4px_20px_rgba(0,0,0,0.3)]',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        {/* Header with language name and close button */}
        <div className="flex items-center justify-between mb-3 px-2">
          <span className="text-white/70 text-sm font-medium">
            {keyboard.name} Keyboard
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#3a3a3a] hover:bg-[#4a4a4a] transition-colors"
          >
            <X className="w-4 h-4 text-white/70" />
          </button>
        </div>

        {/* Keyboard rows container */}
        <div className="max-w-3xl mx-auto space-y-2">
          {/* Special characters row (if exists) */}
          {specialRow && specialRow.length > 0 && (
            <div className="flex justify-center gap-1 mb-3 pb-3 border-b border-white/10">
              {specialRow.map((key, idx) => (
                <button
                  key={`special-${idx}`}
                  onClick={() => handleKeyClick(key)}
                  className={cn(letterKeyClass, 'bg-[#4a4a4a]')}
                >
                  {key}
                </button>
              ))}
            </div>
          )}

          {/* Main keyboard rows */}
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-center gap-1"
              style={{
                // Stagger rows slightly like Apple keyboard
                paddingLeft: rowIndex === 1 ? '16px' : rowIndex === 2 ? '32px' : '0'
              }}
            >
              {/* Shift key on the left of last row */}
              {rowIndex === rows.length - 1 && (
                <button
                  onClick={handleShiftClick}
                  className={cn(
                    specialKeyClass,
                    'w-14',
                    isShift && 'bg-white text-black'
                  )}
                >
                  <ArrowBigUp className="w-5 h-5" />
                </button>
              )}

              {/* Letter keys */}
              {row.map((key, keyIndex) => (
                <button
                  key={`${rowIndex}-${keyIndex}`}
                  onClick={() => handleKeyClick(key)}
                  className={letterKeyClass}
                >
                  {key}
                </button>
              ))}

              {/* Backspace key on the right of last row */}
              {rowIndex === rows.length - 1 && (
                <button
                  onClick={onBackspace}
                  className={cn(specialKeyClass, 'w-14')}
                >
                  <Delete className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}

          {/* Bottom row: Space bar and Enter */}
          <div className="flex justify-center gap-1 mt-2">
            <button
              onClick={handleShiftClick}
              className={cn(
                specialKeyClass,
                'w-20',
                isShift && 'bg-white text-black'
              )}
            >
              {isShift ? 'ABC' : '⇧'}
            </button>

            {/* Space bar */}
            <button
              onClick={() => handleKeyClick(' ')}
              className={cn(
                keyBaseClass,
                'flex-1 max-w-[280px] h-10 bg-[#525252] text-white text-sm'
              )}
            >
              space
            </button>

            {/* Enter key */}
            <button
              onClick={onEnter}
              className={cn(specialKeyClass, 'w-20 bg-[#007AFF]')}
            >
              <CornerDownLeft className="w-5 h-5 mr-1" />
              Go
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
