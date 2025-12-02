import { BookOpenIcon, LayersIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

export type LearningMode = 'browse' | 'flashcards';

interface LearningModeToggleProps {
  mode: LearningMode;
  onChange: (mode: LearningMode) => void;
}

export function LearningModeToggle({ mode, onChange }: LearningModeToggleProps) {
  const { t } = useTranslation();

  return (
    <div className="flex gap-2">
      <ModeButton
        icon={<BookOpenIcon className="w-4 h-4" />}
        label={t('sidebar.browse')}
        active={mode === 'browse'}
        onClick={() => onChange('browse')}
      />
      <ModeButton
        icon={<LayersIcon className="w-4 h-4" />}
        label={t('sidebar.flashcards')}
        active={mode === 'flashcards'}
        onClick={() => onChange('flashcards')}
      />
    </div>
  );
}

interface ModeButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function ModeButton({ icon, label, active, onClick }: ModeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border transition-all',
        active
          ? 'bg-[#7b9dd2] text-white border-[#7b9dd2] shadow-sm'
          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      )}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
