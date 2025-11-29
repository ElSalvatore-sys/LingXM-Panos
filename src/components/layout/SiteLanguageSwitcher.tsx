import { useState } from 'react';
import type { SiteLanguage } from '@/types';
import { languages, siteLanguages } from '@/lib/languages';
import { cn } from '@/lib/utils';

interface SiteLanguageSwitcherProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export function SiteLanguageSwitcher({
  variant = 'dark',
  className
}: SiteLanguageSwitcherProps) {
  const [activeLang, setActiveLang] = useState<SiteLanguage>('en');

  const isDark = variant === 'dark';

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <span
        className={cn(
          'text-sm font-normal mr-1',
          isDark ? 'text-black' : 'text-white'
        )}
      >
        Site language:
      </span>
      {siteLanguages.map((langCode) => (
        <button
          key={langCode}
          onClick={() => setActiveLang(langCode)}
          className={cn(
            'px-1.5 py-0.5 text-sm font-normal transition-all duration-500 ease-in-out',
            activeLang === langCode
              ? 'bg-black text-white'
              : isDark
                ? 'text-black hover:bg-black hover:text-white'
                : 'text-white hover:bg-black hover:text-white'
          )}
        >
          {languages[langCode].nativeName.toLowerCase()}
        </button>
      ))}
    </div>
  );
}
