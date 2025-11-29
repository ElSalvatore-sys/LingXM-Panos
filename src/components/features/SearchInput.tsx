import { useState } from 'react';
import { Search, Keyboard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder = 'Enter phrase you want to practice',
  className
}: SearchInputProps) {
  const [showKeyboard, setShowKeyboard] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className={cn('flex items-stretch', className)}>
      {/* Search input */}
      <input
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

      {/* Keyboard button */}
      <button
        onClick={() => setShowKeyboard(!showKeyboard)}
        className="h-8 w-10 flex items-center justify-center border border-l-0 border-black bg-white hover:bg-gray-50 transition-colors"
        title="Virtual keyboard"
      >
        <Keyboard className="w-5 h-5 text-gray-600" />
      </button>

      {/* Search button */}
      <button
        onClick={onSearch}
        className="h-8 w-10 flex items-center justify-center border border-l-0 border-black bg-white hover:bg-gray-50 transition-colors"
        title="Search"
      >
        <Search className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}
