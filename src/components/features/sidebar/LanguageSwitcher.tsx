import { ArrowRightLeftIcon } from 'lucide-react';
import type { LanguageCode } from '@/types';
import { languages } from '@/lib/languages';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface LanguageSwitcherProps {
  nativeLanguage: LanguageCode;
  targetLanguage: LanguageCode;
  onNativeChange: (lang: LanguageCode) => void;
  onTargetChange: (lang: LanguageCode) => void;
  onSwap: () => void;
}

const availableLanguages: LanguageCode[] = ['de', 'en', 'es', 'fr', 'it', 'ru', 'el', 'tr', 'pt'];

export function LanguageSwitcher({
  nativeLanguage,
  targetLanguage,
  onNativeChange,
  onTargetChange,
  onSwap,
}: LanguageSwitcherProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      {/* Native language */}
      <div>
        <label className="text-xs text-gray-500 block mb-1">{t('sidebar.iSpeak')}</label>
        <LanguageSelect
          value={nativeLanguage}
          onChange={onNativeChange}
          excludeLanguage={targetLanguage}
        />
      </div>

      {/* Swap button */}
      <div className="flex justify-center">
        <button
          onClick={onSwap}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title={t('sidebar.swapLanguages')}
        >
          <ArrowRightLeftIcon className="w-4 h-4 text-gray-400 rotate-90" />
        </button>
      </div>

      {/* Target language */}
      <div>
        <label className="text-xs text-gray-500 block mb-1">{t('sidebar.imLearning')}</label>
        <LanguageSelect
          value={targetLanguage}
          onChange={onTargetChange}
          excludeLanguage={nativeLanguage}
        />
      </div>
    </div>
  );
}

interface LanguageSelectProps {
  value: LanguageCode;
  onChange: (lang: LanguageCode) => void;
  excludeLanguage?: LanguageCode;
}

function LanguageSelect({ value, onChange, excludeLanguage }: LanguageSelectProps) {
  const filteredLanguages = availableLanguages.filter((code) => code !== excludeLanguage);

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as LanguageCode)}
        className={cn(
          'w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200',
          'bg-white text-sm appearance-none cursor-pointer',
          'focus:outline-none focus:border-[#7b9dd2]'
        )}
      >
        {filteredLanguages.map((code) => {
          const lang = languages[code];
          return (
            <option key={code} value={code}>
              {lang.name} ({lang.nativeName})
            </option>
          );
        })}
      </select>

      {/* Flag overlay */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <img
          src={languages[value]?.flag}
          alt={languages[value]?.name}
          className="w-5 h-auto rounded-sm"
        />
      </div>

      {/* Dropdown arrow */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
