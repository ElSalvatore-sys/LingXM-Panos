import { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface RangeSliderProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onChange: (min: number, max: number) => void;
  step?: number;
  formatLabel?: (value: number) => string;
  className?: string;
}

export function RangeSlider({
  min,
  max,
  minValue,
  maxValue,
  onChange,
  step = 1,
  formatLabel = (v) => v.toString(),
  className,
}: RangeSliderProps) {
  const [localMin, setLocalMin] = useState(minValue);
  const [localMax, setLocalMax] = useState(maxValue);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Sync with props
  useEffect(() => {
    setLocalMin(minValue);
    setLocalMax(maxValue);
  }, [minValue, maxValue]);

  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  const getValueFromPosition = useCallback((clientX: number) => {
    if (!trackRef.current) return min;
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawValue = min + percentage * (max - min);
    return Math.round(rawValue / step) * step;
  }, [min, max, step]);

  const handleMouseDown = (handle: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(handle);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const value = getValueFromPosition(e.clientX);

      if (isDragging === 'min') {
        const newMin = Math.min(value, localMax - step);
        setLocalMin(Math.max(min, newMin));
      } else {
        const newMax = Math.max(value, localMin + step);
        setLocalMax(Math.min(max, newMax));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(null);
      onChange(localMin, localMax);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, localMin, localMax, min, max, step, onChange, getValueFromPosition]);

  const handleInputChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;

    if (type === 'min') {
      const newMin = Math.max(min, Math.min(numValue, localMax - step));
      setLocalMin(newMin);
      onChange(newMin, localMax);
    } else {
      const newMax = Math.min(max, Math.max(numValue, localMin + step));
      setLocalMax(newMax);
      onChange(localMin, newMax);
    }
  };

  const leftPercent = getPercentage(localMin);
  const rightPercent = getPercentage(localMax);

  return (
    <div className={cn('space-y-3', className)}>
      {/* Slider track */}
      <div
        ref={trackRef}
        className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
      >
        {/* Active range */}
        <div
          className="absolute h-full bg-[#7b9dd2] rounded-full"
          style={{
            left: `${leftPercent}%`,
            width: `${rightPercent - leftPercent}%`,
          }}
        />

        {/* Min handle */}
        <div
          onMouseDown={handleMouseDown('min')}
          className={cn(
            'absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#7b9dd2] rounded-full cursor-grab shadow-sm',
            isDragging === 'min' && 'cursor-grabbing ring-2 ring-[#7b9dd2]/30'
          )}
          style={{ left: `calc(${leftPercent}% - 8px)` }}
        />

        {/* Max handle */}
        <div
          onMouseDown={handleMouseDown('max')}
          className={cn(
            'absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#7b9dd2] rounded-full cursor-grab shadow-sm',
            isDragging === 'max' && 'cursor-grabbing ring-2 ring-[#7b9dd2]/30'
          )}
          style={{ left: `calc(${rightPercent}% - 8px)` }}
        />
      </div>

      {/* Input fields */}
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <input
            type="number"
            value={localMin}
            onChange={(e) => handleInputChange('min', e.target.value)}
            min={min}
            max={localMax - step}
            step={step}
            className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:border-[#7b9dd2]"
          />
          <div className="text-xs text-gray-400 mt-0.5 text-center">
            {formatLabel(localMin)}
          </div>
        </div>
        <span className="text-gray-400">—</span>
        <div className="flex-1">
          <input
            type="number"
            value={localMax}
            onChange={(e) => handleInputChange('max', e.target.value)}
            min={localMin + step}
            max={max}
            step={step}
            className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:border-[#7b9dd2]"
          />
          <div className="text-xs text-gray-400 mt-0.5 text-center">
            {formatLabel(localMax)}
          </div>
        </div>
      </div>
    </div>
  );
}
