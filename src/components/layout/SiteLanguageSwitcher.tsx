import type { SiteLanguage } from '@/types';
import { languages, siteLanguages } from '@/lib/languages';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

interface SiteLanguageSwitcherProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export function SiteLanguageSwitcher({
  variant = 'dark',
  className
}: SiteLanguageSwitcherProps) {
  const { siteLanguage, setSiteLanguage } = useApp();
  const { t } = useTranslation();

  const isDark = variant === 'dark';

  const handleLanguageChange = (langCode: SiteLanguage) => {
    setSiteLanguage(langCode);
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <span
        className={cn(
          'text-sm font-normal mr-1',
          isDark ? 'text-black' : 'text-white'
        )}
      >
        {t('siteLanguage')}:
      </span>
      {siteLanguages.map((langCode) => (
        <button
          key={langCode}
          onClick={() => handleLanguageChange(langCode)}
          className={cn(
            'px-1.5 py-0.5 text-sm font-normal transition-all duration-500 ease-in-out',
            siteLanguage === langCode
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
