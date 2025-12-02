import { FlameIcon, BookmarkIcon, CheckCircle2Icon, TargetIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressSummaryProps {
  streak: number;
  wordsLearned: number;
  bookmarkedCount: number;
  todayProgress: number;
  dailyGoal: number;
  className?: string;
}

export function ProgressSummary({
  streak,
  wordsLearned,
  bookmarkedCount,
  todayProgress,
  dailyGoal,
  className,
}: ProgressSummaryProps) {
  const progressPercent = Math.min((todayProgress / dailyGoal) * 100, 100);
  const goalReached = todayProgress >= dailyGoal;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Daily goal progress */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-500">Today's Goal</span>
          <span className={cn(
            'text-xs font-medium',
            goalReached ? 'text-green-600' : 'text-gray-600'
          )}>
            {todayProgress} / {dailyGoal}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              goalReached ? 'bg-green-500' : 'bg-[#7b9dd2]'
            )}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2">
        <StatCard
          icon={<FlameIcon className="w-4 h-4" />}
          value={streak}
          label="Day Streak"
          color="text-orange-500"
          bgColor="bg-orange-50"
        />
        <StatCard
          icon={<CheckCircle2Icon className="w-4 h-4" />}
          value={wordsLearned}
          label="Learned"
          color="text-green-500"
          bgColor="bg-green-50"
        />
        <StatCard
          icon={<BookmarkIcon className="w-4 h-4" />}
          value={bookmarkedCount}
          label="Saved"
          color="text-yellow-500"
          bgColor="bg-yellow-50"
        />
        <StatCard
          icon={<TargetIcon className="w-4 h-4" />}
          value={dailyGoal}
          label="Daily Goal"
          color="text-[#7b9dd2]"
          bgColor="bg-blue-50"
        />
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: string;
  bgColor: string;
}

function StatCard({ icon, value, label, color, bgColor }: StatCardProps) {
  return (
    <div className={cn('rounded-lg p-2.5', bgColor)}>
      <div className={cn('flex items-center gap-1.5 mb-1', color)}>
        {icon}
        <span className="font-bold text-lg">{value}</span>
      </div>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}
