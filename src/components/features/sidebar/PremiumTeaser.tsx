import { SparklesIcon, CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface PremiumTeaserProps {
  className?: string;
}

export function PremiumTeaser({ className }: PremiumTeaserProps) {
  const { t } = useTranslation();

  const premiumFeatures = [
    t('sidebar.premiumFeature1'),
    t('sidebar.premiumFeature2'),
    t('sidebar.premiumFeature3'),
    t('sidebar.premiumFeature4'),
  ];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl p-4',
        'bg-gradient-to-br from-[#7b9dd2] to-[#e2678b]',
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      {/* Content */}
      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <SparklesIcon className="w-5 h-5 text-yellow-300" />
          <h4 className="font-bold text-white">{t('sidebar.goPremium')}</h4>
        </div>

        <p className="text-white/80 text-xs mb-3">
          {t('sidebar.premiumDescription')}
        </p>

        {/* Features */}
        <ul className="space-y-1 mb-4">
          {premiumFeatures.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-white/90 text-xs">
              <CheckIcon className="w-3 h-3" />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          className={cn(
            'w-full py-2 rounded-lg font-medium text-sm',
            'bg-white text-[#7b9dd2] hover:bg-gray-50',
            'transition-colors shadow-sm'
          )}
        >
          {t('sidebar.upgradeNow')}
        </button>
      </div>
    </div>
  );
}
