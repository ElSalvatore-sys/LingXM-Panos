import { cn } from '@/lib/utils';

interface GenderOption {
  value: 'm' | 'f' | 'n';
  label: string;
  count: number;
}

interface GenderFilterProps {
  options: GenderOption[];
  selected: string[];
  onChange: (values: string[]) => void;
}

const genderLabels: Record<string, string> = {
  m: 'Masculine (der)',
  f: 'Feminine (die)',
  n: 'Neuter (das)',
};

const genderColors: Record<string, { bg: string; border: string; text: string }> = {
  m: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
  f: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700' },
  n: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
};

export function GenderFilter({
  options,
  selected,
  onChange,
}: GenderFilterProps) {
  const toggleGender = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const selectAll = () => onChange(options.map((o) => o.value));
  const clearAll = () => onChange([]);

  return (
    <div className="space-y-2">
      {/* Quick actions */}
      <div className="flex items-center gap-2 text-xs mb-3">
        <button
          onClick={selectAll}
          className="text-[#7b9dd2] hover:underline"
        >
          All
        </button>
        <span className="text-gray-300">|</span>
        <button onClick={clearAll} className="text-gray-500 hover:underline">
          None
        </button>
      </div>

      {/* Gender buttons */}
      <div className="space-y-2">
        {options.map((option) => {
          const isSelected = selected.includes(option.value);
          const colors = genderColors[option.value];

          return (
            <button
              key={option.value}
              onClick={() => toggleGender(option.value)}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-all',
                isSelected
                  ? `${colors.bg} ${colors.border} ${colors.text}`
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              )}
            >
              <span className="text-sm font-medium">
                {genderLabels[option.value] || option.label}
              </span>
              <span className={cn(
                'text-xs px-2 py-0.5 rounded-full',
                isSelected ? 'bg-white/50' : 'bg-gray-100'
              )}>
                {option.count.toLocaleString()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
