import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface WordRangeFilterProps {
  value: number;
  onChange: (value: number) => void;
  totalWords?: number;
}

// Preset stops for the slider (logarithmic-like distribution)
const STOPS = [10, 50, 100, 500, 1000, 5000, 10000];
const MAX_VALUE = 10000;

export function WordRangeFilter({ value, onChange, totalWords = MAX_VALUE }: WordRangeFilterProps) {
  const { t } = useTranslation();
  const maxWords = Math.max(totalWords, MAX_VALUE);

  // Convert value to slider position (0-100) using logarithmic scale
  const valueToPosition = useMemo(() => {
    return (val: number): number => {
      if (val >= maxWords || val === Infinity) return 100;
      if (val <= STOPS[0]) return (val / STOPS[0]) * (100 / (STOPS.length + 1));

      // Find which segment the value falls into
      for (let i = 1; i < STOPS.length; i++) {
        if (val <= STOPS[i]) {
          const segmentSize = 100 / (STOPS.length + 1);
          const prevStop = STOPS[i - 1];
          const nextStop = STOPS[i];
          const ratio = (val - prevStop) / (nextStop - prevStop);
          return (i * segmentSize) + (ratio * segmentSize);
        }
      }

      // Between last stop and max
      const segmentSize = 100 / (STOPS.length + 1);
      const lastStop = STOPS[STOPS.length - 1];
      const ratio = (val - lastStop) / (maxWords - lastStop);
      return (STOPS.length * segmentSize) + (ratio * segmentSize);
    };
  }, [maxWords]);

  // Convert slider position to value (snaps to nearest preset)
  const positionToValue = (pos: number): number => {
    if (pos >= 95) return maxWords; // Snap to "All" at the end

    const segmentSize = 100 / (STOPS.length + 1);
    const segmentIndex = Math.floor(pos / segmentSize);
    const segmentProgress = (pos % segmentSize) / segmentSize;

    if (segmentIndex === 0) {
      return Math.round(segmentProgress * STOPS[0]);
    }

    if (segmentIndex >= STOPS.length) {
      const lastStop = STOPS[STOPS.length - 1];
      return Math.round(lastStop + (segmentProgress * (maxWords - lastStop)));
    }

    const prevStop = STOPS[segmentIndex - 1];
    const nextStop = STOPS[segmentIndex];

    // Snap to nearest preset if close
    const rawValue = prevStop + (segmentProgress * (nextStop - prevStop));
    const nearestPreset = STOPS.find(s => Math.abs(s - rawValue) < (nextStop - prevStop) * 0.15);

    return nearestPreset || Math.round(rawValue);
  };

  const getDisplayText = () => {
    if (value >= maxWords || value === Infinity) return t('sidebar.allWords');
    return `${t('sidebar.top')} ${value.toLocaleString()}`;
  };

  const sliderPosition = value === Infinity ? 100 : valueToPosition(value);

  return (
    <div className="space-y-3">
      {/* Current value display */}
      <div className="text-center">
        <span className="text-lg font-semibold text-[#7b9dd2]">
          {getDisplayText()}
        </span>
        {value !== Infinity && value < maxWords && (
          <p className="text-xs text-gray-400 mt-0.5">
            {t('sidebar.mostFrequent')}
          </p>
        )}
      </div>

      {/* Slider */}
      <div className="relative px-1">
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={sliderPosition}
          onChange={(e) => onChange(positionToValue(Number(e.target.value)))}
          className="word-range-slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #7b9dd2 ${sliderPosition}%, #e5e7eb ${sliderPosition}%)`
          }}
        />

        {/* Stop markers */}
        <div className="flex justify-between mt-2 px-0.5">
          {STOPS.map((stop) => (
            <button
              key={stop}
              onClick={() => onChange(stop)}
              className="flex flex-col items-center group"
            >
              <div
                className={cn(
                  'w-1.5 h-1.5 rounded-full transition-colors',
                  value >= stop ? 'bg-[#7b9dd2]' : 'bg-gray-300 group-hover:bg-gray-400'
                )}
              />
              <span className={cn(
                'text-[9px] mt-1 transition-colors',
                value === stop ? 'text-[#7b9dd2] font-medium' : 'text-gray-400 group-hover:text-gray-600'
              )}>
                {stop >= 1000 ? `${stop/1000}K` : stop}
              </span>
            </button>
          ))}
          <button
            onClick={() => onChange(maxWords)}
            className="flex flex-col items-center group"
          >
            <div
              className={cn(
                'w-1.5 h-1.5 rounded-full transition-colors',
                value >= maxWords || value === Infinity ? 'bg-[#7b9dd2]' : 'bg-gray-300 group-hover:bg-gray-400'
              )}
            />
            <span className={cn(
              'text-[9px] mt-1 transition-colors',
              value >= maxWords || value === Infinity ? 'text-[#7b9dd2] font-medium' : 'text-gray-400 group-hover:text-gray-600'
            )}>
              {t('sidebar.all')}
            </span>
          </button>
        </div>
      </div>

      {/* Quick preset buttons */}
      <div className="flex flex-wrap gap-1.5 justify-center pt-1">
        {[100, 500, 1000, 5000].map((preset) => (
          <button
            key={preset}
            onClick={() => onChange(preset)}
            className={cn(
              'px-2.5 py-1 text-xs rounded-md transition-all',
              value === preset
                ? 'bg-[#7b9dd2] text-white shadow-sm'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            )}
          >
            {preset >= 1000 ? `${preset/1000}K` : preset}
          </button>
        ))}
        <button
          onClick={() => onChange(maxWords)}
          className={cn(
            'px-2.5 py-1 text-xs rounded-md transition-all',
            value >= maxWords || value === Infinity
              ? 'bg-[#7b9dd2] text-white shadow-sm'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          )}
        >
          {t('sidebar.all')}
        </button>
      </div>
    </div>
  );
}
