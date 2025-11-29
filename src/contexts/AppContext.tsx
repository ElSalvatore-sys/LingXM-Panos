import { createContext, useContext, useState, ReactNode } from 'react';
import type { LanguageCode, SiteLanguage } from '@/types';

interface AppContextType {
  // Language settings
  nativeLanguage: LanguageCode;
  targetLanguage: LanguageCode;
  siteLanguage: SiteLanguage;

  // Setters
  setNativeLanguage: (lang: LanguageCode) => void;
  setTargetLanguage: (lang: LanguageCode) => void;
  setSiteLanguage: (lang: SiteLanguage) => void;
}

const AppContext = createContext<AppContextType | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [nativeLanguage, setNativeLanguage] = useState<LanguageCode>('el');
  const [targetLanguage, setTargetLanguage] = useState<LanguageCode>('de');
  const [siteLanguage, setSiteLanguage] = useState<SiteLanguage>('en');

  const value: AppContextType = {
    nativeLanguage,
    targetLanguage,
    siteLanguage,
    setNativeLanguage,
    setTargetLanguage,
    setSiteLanguage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }

  return context;
}
