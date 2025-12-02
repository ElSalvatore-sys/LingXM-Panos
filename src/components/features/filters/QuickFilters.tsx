import { cn } from '@/lib/utils';
import { BookmarkIcon, CheckCircle2Icon } from 'lucide-react';

interface QuickFiltersProps {
  hasExamples: boolean | null;
  bookmarkedOnly: boolean;
  notLearnedOnly: boolean;
  onHasExamplesChange: (value: boolean | null) => void;
  onBookmarkedOnlyChange: (value: boolean) => void;
  onNotLearnedOnlyChange: (value: boolean) => void;
  bookmarkedCount?: number;
  learnedCount?: number;
  withExamplesCount?: number;
}

export function QuickFilters({
  hasExamples,
  bookmarkedOnly,
  notLearnedOnly,
  onHasExamplesChange,
  onBookmarkedOnlyChange,
  onNotLearnedOnlyChange,
  bookmarkedCount = 0,
  learnedCount = 0,
  withExamplesCount = 0,
}: QuickFiltersProps) {
  return (
    <div className="space-y-2">
      {/* Bookmarked only */}
      <ToggleButton
        icon={<BookmarkIcon className="w-4 h-4" />}
        label="Bookmarked only"
        count={bookmarkedCount}
        active={bookmarkedOnly}
        onClick={() => onBookmarkedOnlyChange(!bookmarkedOnly)}
        activeColor="text-yellow-600 bg-yellow-50 border-yellow-200"
      />

      {/* Not learned only */}
      <ToggleButton
        icon={<CheckCircle2Icon className="w-4 h-4" />}
        label="Not learned yet"
        count={learnedCount > 0 ? `${learnedCount} learned` : undefined}
        active={notLearnedOnly}
        onClick={() => onNotLearnedOnlyChange(!notLearnedOnly)}
        activeColor="text-green-600 bg-green-50 border-green-200"
      />

      {/* Has examples */}
      <div className="pt-2 border-t border-gray-100">
        <p className="text-xs text-gray-500 mb-2">Example sentences</p>
        <div className="flex gap-2">
          <button
            onClick={() => onHasExamplesChange(null)}
            className={cn(
              'flex-1 py-1.5 px-2 text-xs rounded border transition-all',
              hasExamples === null
                ? 'bg-[#7b9dd2] text-white border-[#7b9dd2]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            )}
          >
            Any
          </button>
          <button
            onClick={() => onHasExamplesChange(true)}
            className={cn(
              'flex-1 py-1.5 px-2 text-xs rounded border transition-all',
              hasExamples === true
                ? 'bg-[#7b9dd2] text-white border-[#7b9dd2]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            )}
          >
            With ({withExamplesCount})
          </button>
          <button
            onClick={() => onHasExamplesChange(false)}
            className={cn(
              'flex-1 py-1.5 px-2 text-xs rounded border transition-all',
              hasExamples === false
                ? 'bg-[#7b9dd2] text-white border-[#7b9dd2]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            )}
          >
            Without
          </button>
        </div>
      </div>
    </div>
  );
}

interface ToggleButtonProps {
  icon: React.ReactNode;
  label: string;
  count?: string | number;
  active: boolean;
  onClick: () => void;
  activeColor: string;
}

function ToggleButton({
  icon,
  label,
  count,
  active,
  onClick,
  activeColor,
}: ToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2 px-3 py-2 rounded-lg border transition-all',
        active
          ? activeColor
          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
      )}
    >
      {icon}
      <span className="text-sm flex-1 text-left">{label}</span>
      {count !== undefined && (
        <span className={cn(
          'text-xs px-2 py-0.5 rounded-full',
          active ? 'bg-white/50' : 'bg-gray-100'
        )}>
          {count}
        </span>
      )}
    </button>
  );
}
