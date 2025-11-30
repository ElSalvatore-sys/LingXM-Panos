import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SearchIcon, BookmarkIcon, BookOpenIcon } from 'lucide-react';
import type { LanguageCode } from '@/types';
import { Logo } from './Logo';
import { FlagDropdown } from './FlagDropdown';
import { SiteLanguageSwitcher } from './SiteLanguageSwitcher';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

interface HeaderProps {
  variant?: 'white' | 'blue';
  showFlagSelector?: boolean;
  showNavigation?: boolean;
  className?: string;
}

export function Header({
  variant = 'white',
  showFlagSelector = false,
  showNavigation = true,
  className
}: HeaderProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('el');
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const isBlue = variant === 'blue';
  const toLang = searchParams.get('to') || 'de';

  const navLinkClass = cn(
    'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
    isBlue
      ? 'text-white/80 hover:text-white hover:bg-white/10'
      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
  );

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

          {/* Center: Navigation */}
          {showNavigation && isBlue && (
            <nav className="hidden sm:flex items-center gap-1">
              <Link to={`/search?to=${toLang}`} className={navLinkClass}>
                <SearchIcon className="w-4 h-4" />
                <span>{t('search')}</span>
              </Link>
              <Link to={`/bookmarks?to=${toLang}`} className={navLinkClass}>
                <BookmarkIcon className="w-4 h-4" />
                <span>{t('bookmarks')}</span>
              </Link>
              <Link to={`/learned?to=${toLang}`} className={navLinkClass}>
                <BookOpenIcon className="w-4 h-4" />
                <span>{t('learned')}</span>
              </Link>
            </nav>
          )}

          {/* Right side: Site language switcher */}
          <SiteLanguageSwitcher variant={isBlue ? 'light' : 'dark'} />
        </div>
      </div>
    </header>
  );
}
