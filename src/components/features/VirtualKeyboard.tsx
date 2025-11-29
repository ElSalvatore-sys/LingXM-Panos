import { useState } from 'react';
import { X, Delete, ArrowBigUp } from 'lucide-react';
import type { LanguageCode } from '@/types';
import { getKeyboard, hasVirtualKeyboard } from '@/lib/keyboards';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

interface VirtualKeyboardProps {
  language: LanguageCode;
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export function VirtualKeyboard({
  language,
  onKeyPress,
  onBackspace,
  onClose,
  isOpen
}: VirtualKeyboardProps) {
  const { t } = useTranslation();
  const [isShift, setIsShift] = useState(false);
  const keyboard = getKeyboard(language);

  // Don't render if no keyboard needed or not open
  if (!isOpen || !hasVirtualKeyboard(language)) {
    return null;
  }

  const rows = isShift && keyboard.shiftRows ? keyboard.shiftRows : keyboard.rows;

  const handleKeyClick = (key: string) => {
    onKeyPress(key);
    // Auto-disable shift after pressing a key (like real keyboard)
    if (isShift) {
      setIsShift(false);
    }
  };

  return (
    <div
      className={cn(
        'absolute top-full left-0 right-0 mt-2 p-3 bg-gray-100 rounded-lg shadow-lg z-50',
        'transform transition-all duration-200',
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      )}
      style={{
        fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif"
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-300">
        <span className="text-sm text-gray-600">
          {t('virtualKeyboard')} - {keyboard.name}
        </span>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-gray-200 transition-colors"
          title={t('close')}
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Keyboard rows */}
      <div className="space-y-1.5">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1">
            {row.map((key, keyIndex) => (
              <button
                key={`${rowIndex}-${keyIndex}`}
                onClick={() => handleKeyClick(key)}
                className={cn(
                  'min-w-[36px] h-9 px-2 rounded-md font-medium text-lg',
                  'bg-white border border-gray-300 shadow-sm',
                  'hover:bg-lingxm-blue hover:text-white hover:border-lingxm-blue',
                  'active:scale-95 transition-all duration-100'
                )}
              >
                {key}
              </button>
            ))}
          </div>
        ))}

        {/* Control row */}
        <div className="flex justify-center gap-1 mt-2 pt-2 border-t border-gray-300">
          {/* Shift button (if keyboard has shift) */}
          {keyboard.hasShift && (
            <button
              onClick={() => setIsShift(!isShift)}
              className={cn(
                'flex items-center gap-1 h-9 px-3 rounded-md text-sm',
                'border shadow-sm transition-all duration-100',
                isShift
                  ? 'bg-lingxm-blue text-white border-lingxm-blue'
                  : 'bg-white border-gray-300 hover:bg-gray-50'
              )}
              title={t('shift')}
            >
              <ArrowBigUp className="w-4 h-4" />
              <span>{t('shift')}</span>
            </button>
          )}

          {/* Backspace button */}
          <button
            onClick={onBackspace}
            className={cn(
              'flex items-center gap-1 h-9 px-3 rounded-md text-sm',
              'bg-white border border-gray-300 shadow-sm',
              'hover:bg-red-50 hover:border-red-300 hover:text-red-600',
              'transition-all duration-100'
            )}
            title={t('backspace')}
          >
            <Delete className="w-4 h-4" />
            <span>{t('backspace')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
