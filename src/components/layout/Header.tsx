import { useState } from 'react';
import type { LanguageCode } from '@/types';
import { Logo } from './Logo';
import { FlagDropdown } from './FlagDropdown';
import { SiteLanguageSwitcher } from './SiteLanguageSwitcher';
import { cn } from '@/lib/utils';

interface HeaderProps {
  variant?: 'white' | 'blue';
  showFlagSelector?: boolean;
  className?: string;
}

export function Header({
  variant = 'white',
  showFlagSelector = false,
  className
}: HeaderProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('el');

  const isBlue = variant === 'blue';

  return (
    <header
      className={cn(
        'w-full',
        isBlue ? 'bg-lingxm-blue' : 'bg-transparent',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2.5">
          {/* Left side: Logo + optional flag selector */}
          <div className="flex items-center gap-2">
            <Logo variant={isBlue ? 'light' : 'dark'} />

            {showFlagSelector && isBlue && (
              <FlagDropdown
                value={selectedLanguage}
                onChange={setSelectedLanguage}
              />
            )}
          </div>

          {/* Right side: Site language switcher */}
          <SiteLanguageSwitcher variant={isBlue ? 'light' : 'dark'} />
        </div>
      </div>
    </header>
  );
}
