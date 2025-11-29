import { useState, useRef, useEffect } from 'react';
import type { LanguageCode } from '@/types';
import { languages, getAllLanguages } from '@/lib/languages';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface LanguageSelectorProps {
  label: string;
  value: LanguageCode;
  onChange: (code: LanguageCode) => void;
  className?: string;
}

export function LanguageSelector({
  label,
  value,
  onChange,
  className
}: LanguageSelectorProps) {
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
    <div
      ref={dropdownRef}
      className={cn(
        'relative bg-white px-4 py-2.5 flex items-center justify-between gap-4',
        className
      )}
    >
      {/* Label */}
      <span
        className="text-black whitespace-nowrap"
        style={{
          fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif",
          fontSize: '26px',
          lineHeight: '30px'
        }}
      >
        {label}
      </span>

      {/* Flag dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex items-center gap-1 p-1 rounded-md transition-all duration-300',
            isOpen ? 'bg-white' : 'bg-white'
          )}
        >
          <img
            src={selectedLanguage.flag}
            alt={selectedLanguage.name}
            className="w-9 h-auto rounded-sm"
          />
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {/* Dropdown */}
        <div
          className={cn(
            'absolute top-0 right-0 z-50 p-2 bg-white rounded-md transition-all duration-500',
            isOpen
              ? 'opacity-100 visible'
              : 'opacity-0 invisible pointer-events-none'
          )}
          style={{
            boxShadow: isOpen ? '0 2px 10px 2px #dae0e5' : 'none'
          }}
        >
          <div className="flex flex-col gap-2.5">
            {allLanguages.map((lang, index) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={cn(
                  'flex items-center transition-opacity duration-200 hover:opacity-80',
                  index === 0 && 'gap-1'
                )}
              >
                <img
                  src={lang.flag}
                  alt={lang.name}
                  className="w-9 h-auto rounded-sm"
                />
                {index === 0 && (
                  <ChevronUp
                    className="w-4 h-4 text-gray-500 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
