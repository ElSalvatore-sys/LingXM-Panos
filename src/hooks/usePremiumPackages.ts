import { useState, useEffect } from 'react';
import type { PremiumPackage, PremiumPackagesData, LanguageCode } from '@/types';

let cachedPackages: PremiumPackage[] | null = null;

export function usePremiumPackages(targetLanguage?: LanguageCode) {
  const [packages, setPackages] = useState<PremiumPackage[]>(cachedPackages || []);
  const [isLoading, setIsLoading] = useState(!cachedPackages);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedPackages) {
      setPackages(cachedPackages);
      return;
    }

    const loadPackages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/data/premium/packages.json');
        if (!response.ok) throw new Error('Failed to load premium packages');
        const data: PremiumPackagesData = await response.json();
        cachedPackages = data.packages;
        setPackages(data.packages);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    loadPackages();
  }, []);

  // Filter by target language if provided
  const filteredPackages = targetLanguage
    ? packages.filter(p => p.language === targetLanguage)
    : packages;

  // Group by domain
  const packagesByDomain = filteredPackages.reduce((acc, pkg) => {
    const domain = pkg.domain;
    if (!acc[domain]) acc[domain] = [];
    acc[domain].push(pkg);
    return acc;
  }, {} as Record<string, PremiumPackage[]>);

  return {
    packages: filteredPackages,
    packagesByDomain,
    allPackages: packages,
    isLoading,
    error
  };
}
