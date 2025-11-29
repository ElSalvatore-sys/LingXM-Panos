import { cn } from '@/lib/utils';

interface DifficultyFilterProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  maxDots?: number;
  className?: string;
}

export function DifficultyFilter({
  label,
  value,
  onChange,
  maxDots = 5,
  className
}: DifficultyFilterProps) {
  const handleDotClick = (dotIndex: number) => {
    // If clicking the same dot, toggle it off (set to 0)
    // Otherwise set to that level
    if (dotIndex === value) {
      onChange(0);
    } else {
      onChange(dotIndex);
    }
  };

  return (
    <div
      className={cn('flex items-center gap-3', className)}
      style={{
        fontFamily: "'Open Sans', Verdana, Arial, Helvetica, sans-serif"
      }}
    >
      {/* Label */}
      <span
        className="text-black min-w-[120px]"
        style={{ fontSize: '14px' }}
      >
        {label}
      </span>

      {/* Dots */}
      <div className="flex items-center gap-1">
        {Array.from({ length: maxDots }, (_, i) => i + 1).map((dotIndex) => (
          <button
            key={dotIndex}
            onClick={() => handleDotClick(dotIndex)}
            className={cn(
              'w-4 h-4 rounded-full transition-colors duration-200',
              dotIndex <= value
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-300 hover:bg-gray-400'
            )}
            title={`Level ${dotIndex}`}
          />
        ))}
      </div>
    </div>
  );
}
