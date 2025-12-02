import { cn } from '@/lib/utils';

interface PartOfSpeechOption {
  value: string;
  label: string;
  count: number;
}

interface PartOfSpeechFilterProps {
  options: PartOfSpeechOption[];
  selected: string[];
  onChange: (values: string[]) => void;
}

export function PartOfSpeechFilter({
  options,
  selected,
  onChange,
}: PartOfSpeechFilterProps) {
  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const selectAll = () => onChange(options.map((o) => o.value));
  const clearAll = () => onChange([]);

  // Sort options by count (most common first)
  const sortedOptions = [...options].sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-2">
      {/* Quick actions */}
      <div className="flex items-center gap-2 text-xs mb-3">
        <button
          onClick={selectAll}
          className="text-[#7b9dd2] hover:underline"
        >
          Select All
        </button>
        <span className="text-gray-300">|</span>
        <button onClick={clearAll} className="text-gray-500 hover:underline">
          Clear
        </button>
        <span className="ml-auto text-gray-400">
          {selected.length} of {options.length}
        </span>
      </div>

      {/* Checkboxes */}
      <div className="space-y-1.5 max-h-[200px] overflow-y-auto">
        {sortedOptions.map((option) => (
          <label
            key={option.value}
            className={cn(
              'flex items-center gap-2 py-1 px-2 rounded cursor-pointer transition-colors',
              selected.includes(option.value)
                ? 'bg-blue-50'
                : 'hover:bg-gray-50'
            )}
          >
            <input
              type="checkbox"
              checked={selected.includes(option.value)}
              onChange={() => toggleOption(option.value)}
              className="w-4 h-4 rounded border-gray-300 text-[#7b9dd2] focus:ring-[#7b9dd2]"
            />
            <span className="text-sm text-gray-700 flex-1">{option.label}</span>
            <span className="text-xs text-gray-400">{option.count.toLocaleString()}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
