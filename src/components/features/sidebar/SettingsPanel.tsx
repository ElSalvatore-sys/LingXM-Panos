import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface SettingsPanelProps {
  dailyGoal: number;
  onDailyGoalChange: (goal: number) => void;
  showTranslations: boolean;
  onShowTranslationsChange: (show: boolean) => void;
  autoPlayAudio: boolean;
  onAutoPlayAudioChange: (autoPlay: boolean) => void;
}

const goalOptions = [5, 10, 15, 20, 30, 50];

export function SettingsPanel({
  dailyGoal,
  onDailyGoalChange,
  showTranslations,
  onShowTranslationsChange,
  autoPlayAudio,
  onAutoPlayAudioChange,
}: SettingsPanelProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {/* Daily goal */}
      <div>
        <label className="text-xs text-gray-500 block mb-2">{t('sidebar.dailyGoal')}</label>
        <div className="flex flex-wrap gap-1.5">
          {goalOptions.map((goal) => (
            <button
              key={goal}
              onClick={() => onDailyGoalChange(goal)}
              className={cn(
                'px-3 py-1.5 text-sm rounded-lg border transition-all',
                dailyGoal === goal
                  ? 'bg-[#7b9dd2] text-white border-[#7b9dd2]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              )}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>

      {/* Toggle settings */}
      <div className="space-y-3">
        <ToggleSetting
          label={t('sidebar.showTranslations')}
          description={t('sidebar.showTranslationsDesc')}
          checked={showTranslations}
          onChange={onShowTranslationsChange}
        />
        <ToggleSetting
          label={t('sidebar.autoPlayAudio')}
          description={t('sidebar.autoPlayAudioDesc')}
          checked={autoPlayAudio}
          onChange={onAutoPlayAudioChange}
        />
      </div>
    </div>
  );
}

interface ToggleSettingProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleSetting({ label, description, checked, onChange }: ToggleSettingProps) {
  return (
    <div className="flex items-start gap-3">
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          'relative w-10 h-5 rounded-full transition-colors flex-shrink-0 mt-0.5',
          checked ? 'bg-[#7b9dd2]' : 'bg-gray-200'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform',
            checked ? 'translate-x-5' : 'translate-x-0.5'
          )}
        />
      </button>
      <div>
        <p className="text-sm text-gray-700">{label}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </div>
  );
}
