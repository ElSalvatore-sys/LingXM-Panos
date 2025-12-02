import { SparklesIcon, CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PremiumTeaserProps {
  className?: string;
}

const premiumFeatures = [
  'Unlimited flashcards',
  'Advanced analytics',
  'Offline mode',
  'No ads',
];

export function PremiumTeaser({ className }: PremiumTeaserProps) {
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
          <h4 className="font-bold text-white">Go Premium</h4>
        </div>

        <p className="text-white/80 text-xs mb-3">
          Unlock all features and accelerate your learning
        </p>

        {/* Features */}
        <ul className="space-y-1 mb-4">
          {premiumFeatures.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-white/90 text-xs">
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
          Upgrade Now
        </button>
      </div>
    </div>
  );
}
