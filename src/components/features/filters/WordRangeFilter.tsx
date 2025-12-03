import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface WordRangeFilterProps {
  value: number;
  onChange: (value: number) => void;
  totalWords?: number;
}

const PRESETS = [
  { label: '10', value: 10 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
  { label: '500', value: 500 },
  { label: '1K', value: 1000 },
  { label: '5K', value: 5000 },
  { label: 'All', value: Infinity },
];

export function WordRangeFilter({ value, onChange, totalWords: _totalWords }: WordRangeFilterProps) {
  const { t } = useTranslation();

  const displayValue = value === Infinity ? t('sidebar.allWords') : `${t('sidebar.top')} ${value.toLocaleString()}`;

  return (
    <div className="space-y-3">
      {/* Current selection display */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          {t('sidebar.showing')}: <span className="font-medium text-gray-900">{displayValue}</span>
        </p>
        {value !== Infinity && (
          <p className="text-xs text-gray-400 mt-0.5">
            {t('sidebar.mostFrequent')}
          </p>
        )}
      </div>

      {/* Preset buttons - 2 rows */}
      <div className="space-y-2">
        {/* First row: 10, 50, 100, 500 */}
        <div className="grid grid-cols-4 gap-1.5">
          {PRESETS.slice(0, 4).map((preset) => (
            <button
              key={preset.value}
              onClick={() => onChange(preset.value)}
              className={cn(
                'py-2 px-1 text-xs font-medium rounded-md border transition-all',
                value === preset.value
                  ? 'bg-[#7b9dd2] text-white border-[#7b9dd2] shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#7b9dd2] hover:text-[#7b9dd2]'
              )}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Second row: 1K, 5K, All */}
        <div className="grid grid-cols-3 gap-1.5">
          {PRESETS.slice(4).map((preset) => (
            <button
              key={preset.value}
              onClick={() => onChange(preset.value)}
              className={cn(
                'py-2 px-1 text-xs font-medium rounded-md border transition-all',
                value === preset.value
                  ? 'bg-[#7b9dd2] text-white border-[#7b9dd2] shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#7b9dd2] hover:text-[#7b9dd2]'
              )}
            >
              {preset.label === 'All' ? t('sidebar.all') : preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
