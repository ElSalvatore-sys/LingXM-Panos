import { cn } from '@/lib/utils';

interface DifficultyFilterSidebarProps {
  selected: number[];
  onChange: (levels: number[]) => void;
}

export function DifficultyFilterSidebar({
  selected,
  onChange,
}: DifficultyFilterSidebarProps) {
  const levels = [1, 2, 3, 4, 5];

  const toggleLevel = (level: number) => {
    if (selected.includes(level)) {
      // Remove level
      onChange(selected.filter((l) => l !== level));
    } else {
      // Add level
      onChange([...selected, level].sort());
    }
  };

  const selectAll = () => onChange([1, 2, 3, 4, 5]);
  const clearAll = () => onChange([]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => toggleLevel(level)}
            className={cn(
              'w-6 h-6 rounded-full transition-all duration-200 flex items-center justify-center text-xs font-medium',
              selected.includes(level)
                ? 'bg-[#7b9dd2] text-white shadow-sm'
                : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
            )}
            title={`Level ${level}`}
          >
            {level}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs">
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
        <span className="ml-auto text-gray-400">
          {selected.length === 0 ? 'None' : selected.length === 5 ? 'All' : selected.join(', ')}
        </span>
      </div>
    </div>
  );
}
