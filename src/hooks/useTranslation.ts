import { useCallback } from 'react';
import { useApp } from '@/contexts/AppContext';
import { translate, type Translations } from '@/lib/translations';

interface UseTranslationReturn {
  t: (key: keyof Translations, params?: Record<string, string | number>) => string;
  language: string;
}

/**
 * Hook for accessing translations based on current site language
 */
export function useTranslation(): UseTranslationReturn {
  const { siteLanguage } = useApp();

  const t = useCallback(
    (key: keyof Translations, params?: Record<string, string | number>) => {
      return translate(siteLanguage, key, params);
    },
    [siteLanguage]
  );

  return {
    t,
    language: siteLanguage,
  };
}
