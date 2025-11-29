import type { Language, LanguageCode, SiteLanguage } from '@/types';

import flagDE from '@/assets/flags/flags1_V2.png';
import flagEN from '@/assets/flags/flags2_V2.png';
import flagES from '@/assets/flags/flags3_V2.png';
import flagFR from '@/assets/flags/flags4_V2.png';
import flagIT from '@/assets/flags/flags5_V2.png';
import flagRU from '@/assets/flags/flags6_V2.png';
import flagEL from '@/assets/flags/flags7_V2.png';
import flagTR from '@/assets/flags/flags8_V2.png';
import flagPT from '@/assets/flags/flags9_V2.png';

export const languages: Record<LanguageCode, Language> = {
  de: { code: 'de', name: 'German', nativeName: 'Deutsch', flag: flagDE },
  en: { code: 'en', name: 'English', nativeName: 'English', flag: flagEN },
  es: { code: 'es', name: 'Spanish', nativeName: 'Español', flag: flagES },
  fr: { code: 'fr', name: 'French', nativeName: 'Français', flag: flagFR },
  it: { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: flagIT },
  ru: { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: flagRU },
  el: { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: flagEL },
  tr: { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: flagTR },
  pt: { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: flagPT },
};

export const siteLanguages: SiteLanguage[] = ['en', 'de', 'fr', 'es', 'ru', 'el'];

export const getLanguage = (code: LanguageCode): Language => languages[code];

export const getAllLanguages = (): Language[] => Object.values(languages);
