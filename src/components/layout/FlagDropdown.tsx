import { useState, useRef, useEffect } from 'react';
import type { LanguageCode } from '@/types';
import { languages, getAllLanguages } from '@/lib/languages';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FlagDropdownProps {
  value: LanguageCode;
  onChange: (code: LanguageCode) => void;
  className?: string;
}

export function FlagDropdown({ value, onChange, className }: FlagDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLanguage = languages[value];
  const allLanguages = getAllLanguages();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: LanguageCode) => {
    onChange(code);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      {/* Selected flag button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1 p-1.5 rounded-md border transition-all duration-300',
          isOpen
            ? 'bg-white border-white shadow-lg'
            : 'bg-lingxm-blue border-lingxm-blue'
        )}
      >
        <img
          src={selectedLanguage.flag}
          alt={selectedLanguage.name}
          className="w-8 h-auto rounded-sm"
        />
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-white" />
        )}
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          'absolute top-0 left-0 z-50 p-1.5 bg-white border border-white rounded-md shadow-lg transition-all duration-500',
          isOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none'
        )}
        style={{
          boxShadow: '0 2px 10px 2px #dae0e5'
        }}
      >
        <div className="flex flex-col gap-2">
          {allLanguages.map((lang, index) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={cn(
                'flex items-center justify-center transition-opacity duration-200 hover:opacity-80',
                index === 0 && 'flex-row gap-1'
              )}
            >
              <img
                src={lang.flag}
                alt={lang.name}
                className="w-8 h-auto rounded-sm"
              />
              {index === 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="ml-1"
                >
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                </button>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
