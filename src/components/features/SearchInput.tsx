import { useState, useRef } from 'react';
import { Search, Keyboard } from 'lucide-react';
import type { LanguageCode } from '@/types';
import { VirtualKeyboard } from './VirtualKeyboard';
import { hasVirtualKeyboard } from '@/lib/keyboards';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  className?: string;
  targetLanguage?: LanguageCode;
}

export function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = 'Enter phrase you want to practice',
  className,
  targetLanguage = 'de'
}: SearchInputProps) {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const handleVirtualKeyPress = (key: string) => {
    onChange(value + key);
    // Keep focus on input
    inputRef.current?.focus();
  };

  const handleBackspace = () => {
    if (value.length > 0) {
      onChange(value.slice(0, -1));
    }
    inputRef.current?.focus();
  };

  const showKeyboardButton = hasVirtualKeyboard(targetLanguage);

  return (
    <div className={cn('relative', className)}>
      <div className="flex items-stretch">
        {/* Search input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 h-8 px-3 border border-black text-lg outline-none"
          style={{
            fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif",
            fontSize: '18px'
          }}
        />

        {/* Keyboard button - only show for languages with special characters */}
        {showKeyboardButton && (
          <button
            onClick={() => setShowKeyboard(!showKeyboard)}
            className={cn(
              'h-8 w-10 flex items-center justify-center border border-l-0 border-black transition-colors',
              showKeyboard
                ? 'bg-lingxm-blue text-white'
                : 'bg-white hover:bg-gray-50 text-gray-600'
            )}
            title="Virtual keyboard"
          >
            <Keyboard className="w-5 h-5" />
          </button>
        )}

        {/* Search button */}
        <button
          onClick={onSearch}
          className="h-8 w-10 flex items-center justify-center border border-l-0 border-black bg-white hover:bg-gray-50 transition-colors"
          title="Search"
        >
          <Search className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Virtual keyboard */}
      <VirtualKeyboard
        language={targetLanguage}
        isOpen={showKeyboard}
        onKeyPress={handleVirtualKeyPress}
        onBackspace={handleBackspace}
        onClose={() => setShowKeyboard(false)}
      />
    </div>
  );
}
