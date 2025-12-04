import { usePremiumPackages } from '@/hooks/usePremiumPackages';
import { useTranslation } from '@/hooks/useTranslation';
import { useApp } from '@/contexts/AppContext';
import type { PremiumPackage, SiteLanguage } from '@/types';

export function PremiumPackages() {
  const { t } = useTranslation();
  const { targetLanguage, siteLanguage } = useApp();
  const { packages, isLoading, error } = usePremiumPackages(targetLanguage);

  if (isLoading) {
    return (
      <div className="p-3 text-sm text-gray-500">
        {t('sidebar.loading')}
      </div>
    );
  }

  if (error || packages.length === 0) {
    return null; // Don't show section if no packages for this language
  }

  const getLocalizedName = (pkg: PremiumPackage) => {
    return pkg.nameTranslations[siteLanguage as SiteLanguage] || pkg.name;
  };

  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-500 mb-2">
        {t('sidebar.premiumPackagesDescription')}
      </p>

      {packages.map((pkg) => (
        <div
          key={pkg.id}
          className={`
            relative p-3 rounded-lg border transition-all cursor-pointer
            ${pkg.isLocked
              ? 'bg-gray-50 border-gray-200 opacity-75'
              : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-400'
            }
          `}
        >
          {/* Lock indicator */}
          {pkg.isLocked && (
            <div className="absolute top-2 right-2 text-gray-400">
              🔒
            </div>
          )}

          {/* Package info */}
          <div className="flex items-start gap-2">
            <span className="text-2xl">{pkg.icon}</span>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-gray-900 truncate">
                {getLocalizedName(pkg)}
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">
                {pkg.level} • {pkg.wordCount} {t('sidebar.words')}
              </p>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
            <span>📝 {pkg.sentenceCount} {t('sidebar.sentences')}</span>
            {!pkg.isLocked && (
              <span className="ml-auto text-green-600 font-medium">
                ✓ {t('sidebar.active')}
              </span>
            )}
            {pkg.isLocked && (
              <span className="ml-auto text-blue-600 font-medium">
                ${pkg.price}
              </span>
            )}
          </div>
        </div>
      ))}

      {/* Unlock all button (for locked packages) */}
      {packages.some(p => p.isLocked) && (
        <button className="w-full mt-2 py-2 px-3 bg-gradient-to-r from-[#7b9dd2] to-[#e2678b] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
          {t('sidebar.unlockAll')}
        </button>
      )}
    </div>
  );
}
